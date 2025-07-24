import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Users, 
  ChefHat, 
  BookOpen, 
  Settings,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { User } from "firebase/auth";
import { auth } from "@/firebase";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  user: User | null;
}

const Sidebar = ({ isOpen, onToggle, user }: SidebarProps) => {
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: ChefHat, label: 'Dashboard', path: '/dashboard' },
    { icon: BookOpen, label: 'Recipes', path: '/recipes' },
    { icon: Users, label: 'Tenants', path: '/tenants' },
    { icon: ChefHat, label: 'Cooks', path: '/cooks' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: BookOpen, label: 'Onboarding Info', path: '/onboarding-info' },
  ];

  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/auth", { replace: true });
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full bg-sidebar shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        w-64 lg:translate-x-0 lg:static lg:shadow-none lg:border-r lg:border-sidebar-border
        flex flex-col
      `}>
        {/* Brand and user info */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-primary">CookMate</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex flex-col items-center gap-2 py-4 rounded-lg bg-sidebar-accent/10 border border-sidebar-border">
            <Avatar className="h-14 w-14 mb-2 shadow">
              {user?.photoURL ? (
                <AvatarImage src={user.photoURL} alt={user.displayName || user.email || "User"} />
              ) : (
                <AvatarFallback>
                  {(user?.displayName
                    ? user.displayName.split(" ").map(n => n[0]).join("")
                    : user?.email
                      ? user.email[0].toUpperCase()
                      : "U"
                  ).slice(0, 2)}
                </AvatarFallback>
              )}
            </Avatar>
            <span className="font-semibold text-sidebar-primary text-base text-center">
              {user?.displayName || user?.email || "User"}
            </span>
            <span className="text-xs text-sidebar-foreground text-center break-all">
              {user?.email || ""}
            </span>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="mb-2 text-xs font-semibold text-sidebar-foreground uppercase tracking-wider">
            Navigation
          </div>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-sidebar-accent text-sidebar-primary font-medium' 
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                    }
                  `}
                  onClick={() => window.innerWidth < 1024 && onToggle()}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        {/* Logout button at the bottom */}
        <div className="p-4 border-t border-sidebar-border">
          <Button variant="outline" className="w-full" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
