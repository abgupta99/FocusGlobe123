
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import StudyGlobe from './components/StudyGlobe';
import HUD from './components/HUD';
import StartStudyingDialog from './components/StartStudyingDialog';
import { supabase } from './supabaseClient';

function App() {
  const [isStudying, setIsStudying] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Location fuzzing: ~50km is approximately 0.45 degrees
  const fuzzLocation = (lat, lng) => {
    const latOffset = (Math.random() - 0.5) * 0.9; // +/- 0.45 degrees (~50km)
    const lngOffset = (Math.random() - 0.5) * 0.9;
    return {
      lat: lat + latOffset,
      lng: lng + lngOffset
    };
  };

  const handleStartStudying = () => {
    // Open dialog first
    setDialogOpen(true);
  };

  const handleDialogSubmit = async ({ name, subject, message }) => {
    setDialogOpen(false);

    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    // Request user's current location
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        // Get real coordinates
        const baseLat = position.coords.latitude;
        const baseLng = position.coords.longitude;

        // Apply location fuzzing for privacy (~20km offset)
        const { lat, lng } = fuzzLocation(baseLat, baseLng);

        try {
          const sessionId = localStorage.getItem('focus_globe_session_id') || crypto.randomUUID();
          localStorage.setItem('focus_globe_session_id', sessionId);

          const { error } = await supabase
            .from('active_sessions')
            .upsert({
              id: sessionId,
              name: name,
              latitude: lat,
              longitude: lng,
              subject: subject,
              message: message || null,
              last_seen: new Date().toISOString()
            });

          if (error) {
            console.error('Error starting session:', error);
            alert('Failed to join the globe. Check console.');
          } else {
            console.log('Joined the globe with fuzzed location');
            setIsStudying(true);
            setRefreshTrigger(prev => prev + 1); // Trigger immediate refresh
          }
        } catch (err) {
          console.error('Unexpected error:', err);
        }
      },
      (error) => {
        // Handle geolocation errors
        console.error('Geolocation error:', error);
        alert(`Unable to get your location: ${error.message}. Please allow location access.`);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const handleStopStudying = async () => {
    try {
      const sessionId = localStorage.getItem('focus_globe_session_id');
      if (sessionId) {
        const { error } = await supabase
          .from('active_sessions')
          .delete()
          .eq('id', sessionId);

        if (error) {
          console.error('Error stopping session:', error);
        } else {
          console.log('Left the globe');
          setIsStudying(false);
          setRefreshTrigger(prev => prev + 1); // Trigger immediate refresh
        }
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  // Heartbeat: Update last_seen every 3 minutes while studying
  useEffect(() => {
    if (!isStudying) return;

    const updateHeartbeat = async () => {
      const sessionId = localStorage.getItem('focus_globe_session_id');
      if (sessionId) {
        try {
          const { error } = await supabase
            .from('active_sessions')
            .update({ last_seen: new Date().toISOString() })
            .eq('id', sessionId);

          if (error) {
            console.error('Error updating heartbeat:', error);
          } else {
            console.log('Heartbeat updated');
          }
        } catch (err) {
          console.error('Unexpected error updating heartbeat:', err);
        }
      }
    };

    // Update immediately when starting
    updateHeartbeat();

    // Then update every 3 minutes (180000ms) - well within the 10-minute timeout
    const heartbeatInterval = setInterval(updateHeartbeat, 180000);

    return () => clearInterval(heartbeatInterval);
  }, [isStudying]);

  // Cleanup on tab close
  useEffect(() => {
    const handleBeforeUnload = async () => {
      const sessionId = localStorage.getItem('focus_globe_session_id');
      if (sessionId && isStudying) {
        // Use sendBeacon for reliable cleanup on page unload
        const { error } = await supabase
          .from('active_sessions')
          .delete()
          .eq('id', sessionId);

        if (!error) {
          console.log('Session cleaned up on close');
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isStudying]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <StudyGlobe onUserCountChange={setUserCount} refreshTrigger={refreshTrigger} />
        <HUD
          onStartStudying={handleStartStudying}
          onStopStudying={handleStopStudying}
          isStudying={isStudying}
          userCount={userCount}
        />
        <StartStudyingDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onSubmit={handleDialogSubmit}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
