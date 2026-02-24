import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Home, ArrowLeft, Loader2, GraduationCap, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useStore } from '@/store/useStore';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      const { user } = useStore.getState();
      if (user?.role === 'student') {
        navigate('/dashboard/student');
      } else {
        navigate('/dashboard/landlord');
      }
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillTestCredentials = (type: 'student' | 'lister') => {
    const credentials = {
      student: 'test@hausta.co.uk',
      lister: 'landlord@hausta.co.uk',
    };
    setEmail(credentials[type]);
    setPassword('password');
  };

  return (
    <div className="min-h-screen bg-hausta-light flex">
      {/* Left Side - Form */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 xl:px-12 py-12"
      >
        <div className="max-w-md w-full mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-500 hover:text-hausta-dark transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-hausta-dark rounded-xl flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-heading font-bold text-hausta-dark">hausta.</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-hausta-dark mb-2">
              Welcome back
            </h1>
            <p className="text-gray-600">
              Sign in to continue your search for the perfect home.
            </p>
          </div>

          {/* Test Credentials */}
          <div className="bg-hausta-accent/20 rounded-xl p-4 mb-6">
            <p className="text-sm font-medium text-hausta-dark mb-2">Quick test login:</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => fillTestCredentials('student')}
                className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg text-hausta-dark hover:bg-hausta-dark hover:text-white transition-colors text-sm"
              >
                <GraduationCap className="w-4 h-4" />
                Student
              </button>
              <button
                type="button"
                onClick={() => fillTestCredentials('lister')}
                className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg text-hausta-dark hover:bg-hausta-dark hover:text-white transition-colors text-sm"
              >
                <Briefcase className="w-4 h-4" />
                Lister
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-hausta-dark">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 border-gray-200 focus:border-hausta-green focus:ring-hausta-green"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-hausta-dark">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 border-gray-200 focus:border-hausta-green focus:ring-hausta-green pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600"
              >
                {error}
              </motion.div>
            )}

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300 text-hausta-dark focus:ring-hausta-green" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-hausta-green hover:text-hausta-dark transition-colors">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-hausta-dark hover:bg-hausta-green text-white text-lg"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{' '}
            <button onClick={() => navigate('/signup')} className="text-hausta-green hover:text-hausta-dark font-medium transition-colors">
              Sign up
            </button>
          </p>
        </div>
      </motion.div>

      {/* Right Side - Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="hidden lg:block flex-1 relative"
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200"
            alt="Students"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-hausta-light/50 to-transparent" />
        </div>
        
        {/* Floating Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="absolute bottom-12 left-12 right-12 glass rounded-2xl p-6"
        >
          <p className="text-hausta-dark font-medium mb-2">
            "I found my perfect housemates within a week of using hausta. The compatibility quiz really works!"
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-hausta-green flex items-center justify-center text-white font-semibold">
              ET
            </div>
            <div>
              <p className="text-sm font-medium text-hausta-dark">Emma Thompson</p>
              <p className="text-xs text-gray-500">University of Manchester</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
