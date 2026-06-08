import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                
                if (token) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    const response = await axios.get('http://localhost:5000/api/auth/profile');
                    if (response.data.success) {
                        setUser(response.data.data);
                    }
                }
            } catch (error) {
                console.error("Auth fetch error:", error);
                localStorage.removeItem('token');
                delete axios.defaults.headers.common['Authorization'];
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = async (email, password) => {
        const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        if (response.data.success) {
            localStorage.setItem('token', response.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            setUser(response.data.user);
            return true;
        }
        return false;
    };

    const googleLogin = async (credential) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/google-login', { credential });
            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                setUser(response.data.user);
                return true;
            }
        } catch (error) {
            console.error("Google login failed:", error);
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
    };

    const isAdmin = () => user && user.role === 'admin';

    return (
        <AuthContext.Provider value={{ user, loading, login, googleLogin, logout, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};
