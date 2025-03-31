
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

type AdminContextType = {
  isAdmin: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check for existing admin session on mount
  useEffect(() => {
    const storedIsAdmin = localStorage.getItem('isAdmin');
    if (storedIsAdmin === 'true') {
      setIsAdmin(true);
    }
  }, []);

  // Hard-coded credentials for demo purposes
  // In a real application, this would use a secure authentication system
  const login = (username: string, password: string): boolean => {
    if (username === 'admin' && password === 'admin123') {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      toast({
        title: "Login successful",
        description: "Welcome to the admin panel",
      });
      return true;
    } else {
      toast({
        title: "Login failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
    toast({
      title: "Logged out",
      description: "You have been logged out of the admin panel",
    });
    navigate('/');
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
