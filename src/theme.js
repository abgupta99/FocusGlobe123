
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#00f3ff', // Neon Cyan
        },
        secondary: {
            main: '#ff00ff', // Neon Pink
        },
        background: {
            default: '#000000', // Pitch Black
            paper: '#121212',
        },
        text: {
            primary: '#ffffff',
            secondary: 'rgba(255, 255, 255, 0.7)',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
            letterSpacing: '0.1em',
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#000000',
                    scrollbarColor: '#333 #000',
                    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                        borderRadius: '8px',
                        backgroundColor: '#333',
                        minHeight: '24px',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '50px', // Pill shape
                    textTransform: 'none',
                    fontWeight: 600,
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                        boxShadow: '0 0 15px rgba(0, 243, 255, 0.5)', // Neon glow
                    },
                },
                containedPrimary: {
                    '&:hover': {
                        boxShadow: '0 0 20px rgba(0, 243, 255, 0.7)',
                    },
                },
                containedSecondary: {
                    '&:hover': {
                        boxShadow: '0 0 20px rgba(255, 0, 255, 0.7)',
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(0, 243, 255, 0.1)',
                    border: '1px solid rgba(0, 243, 255, 0.3)',
                    color: '#00f3ff',
                    fontWeight: 'bold',
                    boxShadow: '0 0 5px rgba(0, 243, 255, 0.2)',
                }
            }
        }
    },
});

export default theme;
