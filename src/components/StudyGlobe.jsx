
import React, { useEffect, useState, useRef } from 'react';
import Globe from 'react-globe.gl';
import { supabase } from '../supabaseClient';
import { Box } from '@mui/material';
import UserDetailDialog from './UserDetailDialog';
import ActiveUsersList from './ActiveUsersList';

const StudyGlobe = ({ onUserCountChange, refreshTrigger }) => {
    const globeEl = useRef();
    const [pointsData, setPointsData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [activeUsers, setActiveUsers] = useState([]);

    // Fetch active users from Supabase
    const fetchActiveUsers = async () => {
        try {
            // Calculate timestamp for 10 minutes ago
            const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();

            const { data, error } = await supabase
                .from('active_sessions')
                .select('*')
                .gt('last_seen', tenMinutesAgo);

            if (error) {
                console.error('Error fetching active users:', error);
            } else {
                // Map data to globe points
                const points = data.map(user => {
                    // Subject emoji mapping
                    const subjectEmoji = {
                        coding: '💻',
                        math: '🔢',
                        science: '🔬',
                        literature: '📚',
                        languages: '🌍',
                        art: '🎨',
                        music: '🎵',
                        other: '📖'
                    };

                    return {
                        lat: user.latitude,
                        lng: user.longitude,
                        size: 0.5,
                        color: user.subject === 'coding' ? '#00f3ff' : '#ff00ff', // Cyan vs Pink
                        label: `${subjectEmoji[user.subject] || '📖'} ${user.name || 'Anonymous'}\nStudying: ${user.subject || 'Unknown'}${user.message ? `\n\n"${user.message}"` : ''}`,
                        userData: user // Store full user data for click handler
                    };
                });
                setPointsData(points);
                setActiveUsers(data); // Store raw user data for sidebar
                // Notify parent of user count
                if (onUserCountChange) {
                    onUserCountChange(points.length);
                }
            }
        } catch (err) {
            console.error('Unexpected error fetching users:', err);
        }
    };

    useEffect(() => {
        // Initial fetch
        fetchActiveUsers();

        // Poll every 15 seconds
        const intervalId = setInterval(fetchActiveUsers, 15000);

        return () => clearInterval(intervalId);
    }, [refreshTrigger]); // Re-run when refreshTrigger changes

    useEffect(() => {
        // Auto-rotate
        if (globeEl.current) {
            globeEl.current.controls().autoRotate = true;
            globeEl.current.controls().autoRotateSpeed = 0.5;
        }
    }, []);

    return (
        <Box sx={{ width: '100vw', height: '100vh', backgroundColor: '#000000' }}>
            <Globe
                ref={globeEl}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                pointsData={pointsData}
                pointAltitude={0.1}
                pointColor="color"
                pointRadius="size"
                pointsMerge={true}
                pointLabel="label"
                onPointClick={(point) => {
                    setSelectedUser(point.userData);
                    setDialogOpen(true);
                }}
                onPointHover={(point) => {
                    // Add cursor pointer on hover
                    document.body.style.cursor = point ? 'pointer' : 'auto';
                }}
                atmosphereColor="#00f3ff"
                atmosphereAltitude={0.2}
            />
            <UserDetailDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                userData={selectedUser}
            />
            <ActiveUsersList users={activeUsers} />
        </Box>
    );
};

export default StudyGlobe;
