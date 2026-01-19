
import React from 'react';
import { Box, Typography, Button, Chip, Paper } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

const HUD = ({ onStartStudying, onStopStudying, isStudying, userCount }) => {
    return (
        <Box
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                p: { xs: 2, sm: 3 },
            }}
        >
            {/* Top Left: Title & Status */}
            <Box sx={{ pointerEvents: 'auto' }}>
                <Typography
                    variant="h4"
                    component="h1"
                    color="primary"
                    sx={{
                        fontWeight: 'bold',
                        textShadow: '0 0 10px rgba(0, 243, 255, 0.5)',
                        fontSize: { xs: '1.5rem', sm: '2rem' }
                    }}
                >
                    FOCUSGLOBE
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                    <Chip
                        icon={<CircleIcon sx={{ fontSize: '10px !important' }} />}
                        label="LIVE"
                        size="small"
                    />
                    <Chip
                        label={`${userCount || 0} Students Studying`}
                        size="small"
                        color="secondary"
                    />
                </Box>
            </Box>

            {/* Bottom Center: Action Panel */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: { xs: 2, sm: 4 }, pointerEvents: 'auto' }}>
                <Paper
                    elevation={4}
                    sx={{
                        p: { xs: 1.5, sm: 2 },
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        borderRadius: '24px',
                    }}
                >
                    <Button
                        variant="contained"
                        color={isStudying ? "secondary" : "primary"}
                        size="large"
                        onClick={isStudying ? onStopStudying : onStartStudying}
                        sx={{ px: { xs: 3, sm: 4 }, fontSize: { xs: '0.875rem', sm: '1rem' } }}
                    >
                        {isStudying ? 'Stop Studying' : 'Start Studying'}
                    </Button>
                </Paper>
            </Box>
        </Box>
    );
};

export default HUD;
