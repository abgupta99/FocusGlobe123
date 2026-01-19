import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    Chip,
} from '@mui/material';

const UserDetailDialog = ({ open, onClose, userData }) => {
    if (!userData) return null;

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
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ color: 'primary.main', fontWeight: 'bold', pb: 1 }}>
                {subjectEmoji[userData.subject] || '📖'} {userData.name || 'Anonymous'}
            </DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box>
                        <Typography variant="caption" color="text.secondary">
                            Studying
                        </Typography>
                        <Box sx={{ mt: 0.5 }}>
                            <Chip
                                label={userData.subject || 'Unknown'}
                                color="primary"
                                size="small"
                            />
                        </Box>
                    </Box>

                    {userData.message && (
                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                What they're doing
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 0.5, fontStyle: 'italic' }}>
                                "{userData.message}"
                            </Typography>
                        </Box>
                    )}

                    <Box>
                        <Typography variant="caption" color="text.secondary">
                            Location
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 0.5 }}>
                            📍 Approximate (~20km radius for privacy)
                        </Typography>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button onClick={onClose} variant="contained" color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserDetailDialog;
