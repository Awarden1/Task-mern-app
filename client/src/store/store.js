import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'
import axios from 'axios';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async() => {
          try {
            const result =  await localStorage.getItem("token");

            if (!result) {
              setUser(null)
              return
            }

            const config = {
              headers: {
                'Content-Type': 'application/json',
                'token': result
              }
            };


            const res = await axios.get('http://localhost:3001/api/auth/', config);

            setUser(res.data.user);
          } catch (err) {
            setUser(null)
          }
        })();
      }, []);

    const logout = async () => {
        setLoading(true);
        try {
            await localStorage.removeItem('token');
            setUser(null)
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    };

    const changeLogin = (val) => {
        setUser(val)
    }

    const memoedValue = useMemo(() => ({
        user,
        loading,
        changeLogin,
        error,
        logout
    }), [user, loading, error]);

    return (
        <AuthContext.Provider
            value={memoedValue}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext);
}
