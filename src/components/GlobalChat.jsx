import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Paper,
    TextField,
    IconButton,
    Typography,
    List,
    ListItem,
    ListItemText,
    Collapse,
    Divider,
    Badge
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import { supabase } from '../supabaseClient';

const GlobalChat = ({ username, isStudying }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);

    // Auto-scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Fetch initial messages
    const fetchMessages = async () => {
        try {
            const { data, error } = await supabase
                .from('global_chat')
                .select('*')
                .order('created_at', { ascending: true })
                .limit(100); // Last 100 messages

            if (error) {
                console.error('Error fetching messages:', error);
            } else {
                setMessages(data || []);
                setTimeout(scrollToBottom, 100);
            }
        } catch (err) {
            console.error('Unexpected error fetching messages:', err);
        }
    };

    // Subscribe to new messages
    useEffect(() => {
        fetchMessages();

        const channel = supabase
            .channel('global_chat_channel')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'global_chat'
                },
                (payload) => {
                    setMessages((current) => [...current, payload.new]);

                    // Increment unread count if chat is closed
                    if (!isOpen) {
                        setUnreadCount((count) => count + 1);
                    }

                    setTimeout(scrollToBottom, 100);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [isOpen]);

    // Reset unread count when chat is opened
    useEffect(() => {
        if (isOpen) {
            setUnreadCount(0);
            setTimeout(scrollToBottom, 100);
        }
    }, [isOpen]);

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!newMessage.trim() || !isStudying) return;

        try {
            const sessionId = localStorage.getItem('focus_globe_session_id');

            const { error } = await supabase
                .from('global_chat')
                .insert({
                    session_id: sessionId,
                    username: username || 'Anonymous',
                    message: newMessage.trim()
                });

            if (error) {
                console.error('Error sending message:', error);
            } else {
                setNewMessage('');
            }
        } catch (err) {
            console.error('Unexpected error sending message:', err);
        }
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 20,
                right: 20,
                zIndex: 1000,
            }}
        >
            {/* Chat Toggle Button */}
            {!isOpen && (
                <IconButton
                    onClick={() => setIsOpen(true)}
                    sx={{
                        width: 60,
                        height: 60,
                        background: 'linear-gradient(135deg, #00f3ff 0%, #ff00ff 100%)',
                        color: 'white',
                        boxShadow: '0 4px 20px rgba(0, 243, 255, 0.4)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #00d4e6 0%, #e600e6 100%)',
                            transform: 'scale(1.1)',
                        },
                        transition: 'all 0.3s ease',
                    }}
                >
                    <Badge badgeContent={unreadCount} color="error">
                        <ChatIcon sx={{ fontSize: 28 }} />
                    </Badge>
                </IconButton>
            )}

            {/* Chat Window */}
            <Collapse in={isOpen}>
                <Paper
                    elevation={8}
                    sx={{
                        width: 350,
                        height: 500,
                        display: 'flex',
                        flexDirection: 'column',
                        background: 'rgba(20, 20, 40, 0.95)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(0, 243, 255, 0.3)',
                        borderRadius: 3,
                        overflow: 'hidden',
                    }}
                >
                    {/* Header */}
                    <Box
                        sx={{
                            background: 'linear-gradient(135deg, #00f3ff 0%, #ff00ff 100%)',
                            p: 2,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                            🌍 Global Chat
                        </Typography>
                        <IconButton
                            size="small"
                            onClick={() => setIsOpen(false)}
                            sx={{ color: 'white' }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Messages */}
                    <List
                        ref={chatContainerRef}
                        sx={{
                            flex: 1,
                            overflowY: 'auto',
                            p: 2,
                            '&::-webkit-scrollbar': {
                                width: '8px',
                            },
                            '&::-webkit-scrollbar-track': {
                                background: 'rgba(255, 255, 255, 0.05)',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                background: 'rgba(0, 243, 255, 0.3)',
                                borderRadius: '4px',
                            },
                        }}
                    >
                        {messages.length === 0 ? (
                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'rgba(255, 255, 255, 0.5)',
                                    textAlign: 'center',
                                    mt: 4
                                }}
                            >
                                No messages yet. Be the first to say hi! 👋
                            </Typography>
                        ) : (
                            messages.map((msg, index) => (
                                <ListItem
                                    key={msg.id || index}
                                    sx={{
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        mb: 1,
                                        p: 0,
                                    }}
                                >
                                    <Box sx={{ width: '100%' }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    color: '#00f3ff',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {msg.username}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                sx={{ color: 'rgba(255, 255, 255, 0.4)' }}
                                            >
                                                {formatTime(msg.created_at)}
                                            </Typography>
                                        </Box>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: 'white',
                                                background: 'rgba(255, 255, 255, 0.05)',
                                                p: 1,
                                                borderRadius: 2,
                                                wordBreak: 'break-word',
                                            }}
                                        >
                                            {msg.message}
                                        </Typography>
                                    </Box>
                                </ListItem>
                            ))
                        )}
                        <div ref={messagesEndRef} />
                    </List>

                    <Divider sx={{ borderColor: 'rgba(0, 243, 255, 0.2)' }} />

                    {/* Input */}
                    <Box
                        component="form"
                        onSubmit={handleSendMessage}
                        sx={{
                            p: 2,
                            display: 'flex',
                            gap: 1,
                        }}
                    >
                        <TextField
                            fullWidth
                            size="small"
                            placeholder={isStudying ? "Type a message..." : "Start studying to chat"}
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            disabled={!isStudying}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    color: 'white',
                                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                    borderRadius: 2,
                                    '& fieldset': {
                                        borderColor: 'rgba(0, 243, 255, 0.3)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'rgba(0, 243, 255, 0.5)',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#00f3ff',
                                    },
                                },
                                '& .MuiInputBase-input::placeholder': {
                                    color: 'rgba(255, 255, 255, 0.4)',
                                    opacity: 1,
                                },
                            }}
                        />
                        <IconButton
                            type="submit"
                            disabled={!isStudying || !newMessage.trim()}
                            sx={{
                                background: 'linear-gradient(135deg, #00f3ff 0%, #ff00ff 100%)',
                                color: 'white',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #00d4e6 0%, #e600e6 100%)',
                                },
                                '&.Mui-disabled': {
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    color: 'rgba(255, 255, 255, 0.3)',
                                },
                            }}
                        >
                            <SendIcon />
                        </IconButton>
                    </Box>
                </Paper>
            </Collapse>
        </Box>
    );
};

export default GlobalChat;
