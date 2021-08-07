import React, {
  ReactElement,
  useContext,
  createContext,
  useState,
  useEffect,
} from 'react';
import { Nullable, User, Children } from '../utils/types';

//TODO: remove unnecsary imports everywhere
import { get, post } from '../utils/requests';
import { useHistory, useLocation } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import jwt from 'jwt-decode';

// import { useToasts } from 'react-toast-notifications';

type Value = {
  user: Nullable<User>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (
    name: string,
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  loading: Boolean;
  updateUser: (userData: any) => void;
};

const AuthContext = createContext<Nullable<Value>>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthProvider({ children }: Children): ReactElement {
  const [user, setUser] = useState<Nullable<User>>(null);
  const [loading, setLoading] = useState<Boolean>(true);

  const history = useHistory();

  const { addToast } = useToasts();

  useEffect(() => {
    const token = localStorage.getItem('test-token');
    if (token) {
      const user = jwt(token);
      setUser(user);
    }
    setLoading(false);
  });

  const login = async (email: string, password: string) => {
    // setLoading(true);
    try {
      const res = await post('/auth/login', {
        email: email.trim(),
        password,
      });

      const user = jwt(res.token);
      setUser(user);
      localStorage.setItem('test-token', res.token);

      history.push('/');
    } catch (err) {
      throw err;
    }
  };

  const register = async (
    name: string,
    username: string,
    email: string,
    password: string
  ) => {
    try {
      await post('/auth/register', {
        name,
        username,
        email: email.trim().toLowerCase(),
        password,
      });

      history.push('/login');
      addToast('Verification Mail Sent', { appearance: 'info' });
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      history.push('/');
      localStorage.removeItem('test-token');
    } catch (err) {
      throw err;
    }
  };

  //   const forgotPassword = async (email: string) => {
  //     try {
  //       await post('/forgotpassword', { email: email.trim().toLowerCase() });
  //       addToast('Mail Sent!', { appearance: 'success' });
  //     } catch (err) {
  //       addToast('Something Went Wrong', { appearance: 'error' });
  //     }
  //   };

  //   const resetPassword = async (password: string, token: string) => {
  //     try {
  //       await put(`/resetpassword/${token}`, { password });
  //       history.push('/login');
  //       addToast('Password Changed!', { appearance: 'success' });
  //     } catch (err) {
  //       addToast('Something Went Wrong', { appearance: 'error' });
  //     }
  //   };

  //   const isAdmin = () => user?.role === 1;

  const updateUser = (userData: User) => {
    setUser(userData);
  };

  //   const check = async () => {
  //     try {
  //       const res = await get('/me');
  //       if (!res) {
  //         // logout();
  //         history.push('/');
  //         addToast('Something Went wrong', { appearance: 'error' });
  //         return;
  //       }
  //       // else if (res.isBanned){

  //       // }
  //       setUser(res);
  //       history.push('/');
  //       addToast('Something Went Wrong', { appearance: 'error' });
  //     } catch (err) {
  //       history.push('/');
  //       addToast('Something Went wrong', { appearance: 'error' });
  //     }
  //   };

  const value = {
    user,
    login,
    logout,
    register,
    loading,
    updateUser,
  };

  // {children}
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
