import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

// Pages
import LandingPage from '@/pages/LandingPage';
import Login from '@/pages/auth/Login';
import Signup from '@/pages/auth/Signup';
import Onboarding from '@/pages/onboarding/Onboarding';
import StudentDashboard from '@/pages/dashboard/StudentDashboard';
import LandlordDashboard from '@/pages/dashboard/LandlordDashboard';
import Messages from '@/pages/messages/Messages';
import Profile from '@/pages/profile/Profile';
import Matches from '@/pages/matches/Matches';
import Groups from '@/pages/groups/Groups';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) => {
  const { isAuthenticated, user } = useStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

// Role-based Dashboard Redirect
const DashboardRedirect = () => {
  const { user } = useStore();
  
  if (!user) return <Navigate to="/login" replace />;
  
  if (user.role === 'student') {
    return <Navigate to="/dashboard/student" replace />;
  } else {
    return <Navigate to="/dashboard/landlord" replace />;
  }
};

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Onboarding */}
          <Route 
            path="/onboarding" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <Onboarding />
              </ProtectedRoute>
            } 
          />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardRedirect />} />
          <Route 
            path="/dashboard/student" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/landlord" 
            element={
              <ProtectedRoute allowedRoles={['landlord', 'agent']}>
                <LandlordDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Other Protected Routes */}
          <Route 
            path="/messages" 
            element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/matches" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <Matches />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/groups" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <Groups />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
