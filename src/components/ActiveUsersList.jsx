import React from 'react';
import { Box, Paper, Typography, List, ListItem, ListItemText, Chip } from '@mui/material';

const ActiveUsersList = ({ users }) => {
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

    return (
        <Paper
            sx={{
                position: 'absolute',
                // Desktop: right sidebar
                top: { xs: 'auto', md: '20px' },
                bottom: { xs: '80px', md: 'auto' },
                right: { xs: '10px', md: '20px' },
                left: { xs: '10px', md: 'auto' },
                width: { xs: 'auto', md: '320px' },
                maxWidth: { xs: '100%', md: '320px' },
                maxHeight: { xs: '40vh', md: 'calc(100vh - 40px)' },
                overflow: 'auto',
                zIndex: 15,
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(0, 243, 255, 0.3)',
            }}
        >
            <Box sx={{ p: { xs: 1.5, sm: 2 }, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                    Active Students
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    {users.length} studying now
                </Typography>
            </Box>

            <List sx={{ p: 0 }}>
                {users.length === 0 ? (
                    <ListItem>
                        <ListItemText
                            primary="No active students"
                            secondary="Be the first to join!"
                            primaryTypographyProps={{ color: 'text.secondary', fontSize: { xs: '0.875rem', sm: '1rem' } }}
                            secondaryTypographyProps={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                        />
                    </ListItem>
                ) : (
                    users.map((user, index) => (
                        <ListItem
                            key={user.id || index}
                            sx={{
                                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                gap: 1,
                                py: { xs: 1.5, sm: 2 },
                                px: { xs: 1.5, sm: 2 },
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                                <Typography
                                    variant="subtitle2"
                                    color="primary"
                                    sx={{
                                        fontWeight: 'bold',
                                        fontSize: { xs: '0.875rem', sm: '1rem' }
                                    }}
                                >
                                    {subjectEmoji[user.subject] || '📖'} {user.name || 'Anonymous'}
                                </Typography>
                            </Box>

                            <Chip
                                label={user.subject || 'Unknown'}
                                size="small"
                                color="secondary"
                                sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}
                            />

                            {user.message && (
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{
                                        fontStyle: 'italic',
                                        display: 'block',
                                        mt: 0.5,
                                        lineHeight: 1.3,
                                        fontSize: { xs: '0.7rem', sm: '0.75rem' }
                                    }}
                                >
                                    "{user.message}"
                                </Typography>
                            )}
                        </ListItem>
                    ))
                )}
            </List>
        </Paper>
    );
};

export default ActiveUsersList;
