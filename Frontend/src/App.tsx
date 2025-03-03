import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { Landing } from './pages/Landing/Landing';
import { Login } from './pages/Login/Login';
import { EmployeeList } from './pages/Employees/EmployeeList';
import { EmployeeForm } from './pages/Employees/EmployeeForm';
import { UserForm } from './pages/Users/UserForm';
import { UserList } from './pages/Users/UserList';
import { useAuthStore } from './store/authStore';

function App() {
    const user = useAuthStore((state) => state.user);

    return (
        <>
            {user && <Navbar />}
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />

                {/* Rutas protegidas para Admin/Owner */}
                <Route
                    element={
                        <ProtectedRoute allowedRoles={['Admin', 'Owner']} />
                    }
                >
                    <Route path="/employees" element={<EmployeeList />} />
                    <Route path="/employees/new" element={<EmployeeForm />} />
                    <Route
                        path="/employees/edit/:id"
                        element={<EmployeeForm />}
                    />

                    <Route path="/users" element={<UserList />} />
                    <Route path="/users/new" element={<UserForm />} />
                    <Route path="/users/edit/:id" element={<UserForm />} />
                </Route>

                {/* Ruta por defecto */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </>
    );
}

export default App;
