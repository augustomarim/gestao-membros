import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { MembersPage } from './pages/MembersPage';

const theme = createTheme({
  palette: {
    primary: { main: '#1565C0', dark: '#0D47A1', light: '#1976D2' },
    secondary: { main: '#0288D1' },
    background: { default: '#EEF2F7', paper: '#FFFFFF' },
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", sans-serif',
    h5: { fontWeight: 700, letterSpacing: '-0.5px' },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600, borderRadius: 8, padding: '8px 20px' },
        contained: {
          background: 'linear-gradient(135deg, #1565C0 0%, #0288D1 100%)',
          boxShadow: '0 4px 12px rgba(21,101,192,0.3)',
          '&:hover': { boxShadow: '0 6px 16px rgba(21,101,192,0.4)' },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 12 },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderColor: '#E3EAF3' },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MembersPage />
    </ThemeProvider>
  );
}

export default App;