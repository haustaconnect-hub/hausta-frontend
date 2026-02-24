import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Heart, Users, MessageSquare, User } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useStore();
  
  const isStudent = user?.role === 'student';
  const currentPath = location.pathname;

  const navItems = isStudent ? [
    { path: '/dashboard/student', label: 'Home', icon: Home },
    { path: '/matches', label: 'Matches', icon: Heart },
    { path: '/groups', label: 'Groups', icon: Users },
    { path: '/messages', label: 'Messages', icon: MessageSquare },
    { path: '/profile', label: 'Profile', icon: User },
  ] : [
    { path: '/dashboard/landlord', label: 'Home', icon: Home },
    { path: '/messages', label: 'Messages', icon: MessageSquare },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard/student' || path === '/dashboard/landlord') {
      return currentPath === path || currentPath === '/dashboard';
    }
    return currentPath.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 safe-area-bottom">
      <div className="max-w-lg mx-auto px-2">
        <div className="flex justify-around">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-0.5 py-2 px-3 min-w-[60px] transition-colors ${
                  active ? 'text-hausta-dark' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <item.icon className={`w-6 h-6 ${active ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                <span className={`text-[10px] ${active ? 'font-medium' : ''}`}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      {/* Safe area for iOS */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
