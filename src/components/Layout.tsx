
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import Sidebar from './Sidebar';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Redirect to /auth if not logged in
  React.useEffect(() => {
    if (!loading && !user) {
      navigate('/auth', { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-lg font-semibold">Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} user={user} />
      
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="bg-card shadow-sm border-b h-16 flex items-center px-4 lg:px-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="lg:hidden mr-4"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-foreground">CookMate Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <ThemeToggle />
          </div>
        </header>
        
        {/* Main Content */}
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
