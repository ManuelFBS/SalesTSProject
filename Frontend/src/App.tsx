import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { theme } from './theme';
import { PrivateRoute } from './components/common/PrivateRoute';
import { Login } from './pages/auth/Login';
import { Dashboard } from './pages/dashboard/Dashboard';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <SnackbarProvider maxSnack={3}>
                <Router>
                    <Routes>
                        <Route
                            path="/login"
                            element={<Login />}
                        />
                        <Route
                            path="/*"
                            element={
                                <PrivateRoute>
                                    <Dashboard />
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </Router>
            </SnackbarProvider>
        </ThemeProvider>
    );
}

export default App;
