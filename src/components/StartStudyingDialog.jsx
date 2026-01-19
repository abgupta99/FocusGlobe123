import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
} from '@mui/material';

const StartStudyingDialog = ({ open, onClose, onSubmit }) => {
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = () => {
        if (name.trim() && subject) {
            onSubmit({ name: name.trim(), subject, message: message.trim() });
            setName('');
            setSubject('');
            setMessage('');
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                Join the Globe
            </DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                    <TextField
                        autoFocus
                        label="Your Name"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Alex"
                        required
                    />
                    <FormControl fullWidth required>
                        <InputLabel>Subject</InputLabel>
                        <Select
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            label="Subject"
                        >
                            <MenuItem value="coding">💻 Coding</MenuItem>
                            <MenuItem value="math">🔢 Math</MenuItem>
                            <MenuItem value="science">🔬 Science</MenuItem>
                            <MenuItem value="literature">📚 Literature</MenuItem>
                            <MenuItem value="languages">🌍 Languages</MenuItem>
                            <MenuItem value="art">🎨 Art</MenuItem>
                            <MenuItem value="music">🎵 Music</MenuItem>
                            <MenuItem value="other">📖 Other</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="What are you doing?"
                        fullWidth
                        value={message}
                        onChange={(e) => {
                            if (e.target.value.length <= 50) {
                                setMessage(e.target.value);
                            }
                        }}
                        placeholder="e.g. Building a React app"
                        helperText={`${message.length}/50 characters`}
                        multiline
                        rows={2}
                    />
                </Box>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button onClick={onClose} color="inherit">
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    disabled={!name.trim() || !subject}
                >
                    Start Studying
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default StartStudyingDialog;
