import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Home, ArrowLeft, Loader2, Check, GraduationCap, Briefcase, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useStore } from '@/store/useStore';
import { sortedUKUniversities } from '@/data/ukUniversities';

type UserRole = 'student' | 'lister';

export default function Signup() {
  const navigate = useNavigate();
  const { register } = useStore();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<UserRole | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    phone: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [universitySearch, setUniversitySearch] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [showUniversityDropdown, setShowUniversityDropdown] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError('');
    if (field === 'email') {
      setEmailVerified(false);
      setVerificationSent(false);
    }
  };

  const validateEmail = () => {
    const email = formData.email.toLowerCase();
    if (role === 'student') {
      if (!email.endsWith('.ac.uk')) {
        setError('Please use your university email address (.ac.uk)');
        return false;
      }
    } else {
      const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'aol.com', 'live.com', 'msn.com'];
      const domain = email.split('@')[1];
      if (!domain || personalDomains.includes(domain)) {
        setError('Please use your work email address');
        return false;
      }
    }
    return true;
  };

  const sendVerificationEmail = () => {
    if (!validateEmail()) return;
    setVerificationSent(true);
    setTimeout(() => {
      setEmailVerified(true);
    }, 2000);
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName) {
      setError('Please enter your full name');
      return false;
    }
    if (!formData.email || !formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!validateEmail()) return false;
    if (!emailVerified) {
      setError('Please verify your email address first');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (role === 'student' && !selectedUniversity) {
      setError('Please select your university');
      return false;
    }
    if (role === 'lister' && !formData.companyName) {
      setError('Please enter your company or agency name');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setError('');
    try {
      const signupRole = role === 'student' ? 'student' : 'agent';
      await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: signupRole,
        university: selectedUniversity,
        companyName: formData.companyName,
      } as any);
      if (role === 'student') {
        navigate('/onboarding');
      } else {
        navigate('/dashboard/landlord');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredUniversities = universitySearch
    ? sortedUKUniversities.filter(u => u.toLowerCase().includes(universitySearch.toLowerCase()))
    : sortedUKUniversities;

  return (
    <div className="min-h-screen bg-hausta-light flex">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 xl:px-12 py-12"
      >
        <div className="max-w-md w-full mx-auto">
          <button
            onClick={() => step === 1 ? navigate('/') : setStep(1)}
            className="flex items-center gap-2 text-gray-500 hover:text-hausta-dark transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {step === 1 ? 'Back to home' : 'Back'}
          </button>

          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-hausta-dark rounded-xl flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-heading font-bold text-hausta-dark">hausta.</span>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <h1 className="text-3xl font-heading font-bold text-hausta-dark mb-2">Join hausta.</h1>
                  <p className="text-gray-600">What brings you here today?</p>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => handleRoleSelect('student')}
                    className={`w-full p-6 rounded-2xl border-2 text-left transition-all duration-300 ${
                      role === 'student'
                        ? 'border-hausta-dark bg-hausta-dark/5'
                        : 'border-gray-200 hover:border-hausta-green hover:bg-hausta-accent/10'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                        role === 'student' ? 'bg-hausta-dark' : 'bg-hausta-accent/30'
                      }`}>
                        <GraduationCap className={`w-7 h-7 ${role === 'student' ? 'text-white' : 'text-hausta-dark'}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-heading font-semibold text-hausta-dark mb-1">I'm a Student Looking to Rent</h3>
                        <p className="text-sm text-gray-600">Find properties and compatible housemates near your university.</p>
                        <p className="text-xs text-hausta-green mt-2">Requires .ac.uk email verification</p>
                      </div>
                      {role === 'student' && (
                        <div className="w-6 h-6 bg-hausta-dark rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </button>

                  <button
                    onClick={() => handleRoleSelect('lister')}
                    className={`w-full p-6 rounded-2xl border-2 text-left transition-all duration-300 ${
                      role === 'lister'
                        ? 'border-hausta-dark bg-hausta-dark/5'
                        : 'border-gray-200 hover:border-hausta-green hover:bg-hausta-accent/10'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                        role === 'lister' ? 'bg-hausta-dark' : 'bg-hausta-accent/30'
                      }`}>
                        <Briefcase className={`w-7 h-7 ${role === 'lister' ? 'text-white' : 'text-hausta-dark'}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-heading font-semibold text-hausta-dark mb-1">I'm a Professional Looking to List</h3>
                        <p className="text-sm text-gray-600">Manage multiple properties as a landlord or letting agency.</p>
                        <p className="text-xs text-hausta-green mt-2">Requires work email verification</p>
                      </div>
                      {role === 'lister' && (
                        <div className="w-6 h-6 bg-hausta-dark rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </button>
                </div>

                <p className="mt-6 text-center text-gray-600">
                  Already have an account?{' '}
                  <button onClick={() => navigate('/login')} className="text-hausta-green hover:text-hausta-dark font-medium transition-colors">Sign in</button>
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <h1 className="text-3xl font-heading font-bold text-hausta-dark mb-2">
                    {role === 'student' ? 'Create your student profile' : 'Create your lister account'}
                  </h1>
                  <p className="text-gray-600">Fill in your details to get started.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-hausta-dark">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="h-12 border-gray-200 focus:border-hausta-green focus:ring-hausta-green"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-hausta-dark">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="h-12 border-gray-200 focus:border-hausta-green focus:ring-hausta-green"
                        required
                      />
                    </div>
                  </div>

                  {role === 'student' && (
                    <div className="space-y-2 relative">
                      <Label className="text-hausta-dark">University</Label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search for your university..."
                          value={universitySearch || selectedUniversity}
                          onChange={(e) => {
                            setUniversitySearch(e.target.value);
                            setShowUniversityDropdown(true);
                            setSelectedUniversity('');
                          }}
                          onFocus={() => setShowUniversityDropdown(true)}
                          className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-hausta-green"
                        />
                        {showUniversityDropdown && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {filteredUniversities.slice(0, 10).map((uni) => (
                              <button
                                key={uni}
                                type="button"
                                onClick={() => {
                                  setSelectedUniversity(uni);
                                  setUniversitySearch(uni);
                                  setShowUniversityDropdown(false);
                                }}
                                className="w-full px-4 py-3 text-left hover:bg-gray-50 text-sm"
                              >
                                {uni}
                              </button>
                            ))}
                            {filteredUniversities.length === 0 && (
                              <div className="px-4 py-3 text-gray-500 text-sm">No universities found</div>
                            )}
                          </div>
                        )}
                      </div>
                      {selectedUniversity && (
                        <p className="text-xs text-hausta-green flex items-center gap-1">
                          <Check className="w-3 h-3" /> {selectedUniversity}
                        </p>
                      )}
                    </div>
                  )}

                  {role === 'lister' && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="companyName" className="text-hausta-dark">Company / Agency Name</Label>
                        <Input
                          id="companyName"
                          placeholder="Your company or agency name"
                          value={formData.companyName}
                          onChange={(e) => handleInputChange('companyName', e.target.value)}
                          className="h-12 border-gray-200 focus:border-hausta-green focus:ring-hausta-green"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-hausta-dark">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+44 123 456 7890"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="h-12 border-gray-200 focus:border-hausta-green focus:ring-hausta-green"
                        />
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-hausta-dark">Email</Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        placeholder={role === 'student' ? 'you@university.ac.uk' : 'you@company.com'}
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="h-12 border-gray-200 focus:border-hausta-green focus:ring-hausta-green pr-24"
                        required
                      />
                      {!emailVerified ? (
                        <button
                          type="button"
                          onClick={sendVerificationEmail}
                          disabled={verificationSent}
                          className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-hausta-dark text-white text-xs rounded-md hover:bg-hausta-green transition-colors disabled:opacity-50"
                        >
                          {verificationSent ? 'Sent!' : 'Verify'}
                        </button>
                      ) : (
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-hausta-green">
                          <Check className="w-5 h-5" />
                        </span>
                      )}
                    </div>
                    {role === 'student' && (
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Must be a .ac.uk email address
                      </p>
                    )}
                    {verificationSent && !emailVerified && (
                      <p className="text-xs text-hausta-green">Verification email sent! Check your inbox.</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-hausta-dark">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a password (min 8 characters)"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
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

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-hausta-dark">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="h-12 border-gray-200 focus:border-hausta-green focus:ring-hausta-green"
                      required
                    />
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

                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="terms"
                      className="mt-1 rounded border-gray-300 text-hausta-dark focus:ring-hausta-green"
                      required
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      I agree to the <a href="#" className="text-hausta-green hover:text-hausta-dark">Terms of Service</a> and <a href="#" className="text-hausta-green hover:text-hausta-dark">Privacy Policy</a>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-hausta-dark hover:bg-hausta-green text-white text-lg"
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
                  </Button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="hidden lg:block flex-1 relative"
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200"
            alt="Students"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-hausta-light/50 to-transparent" />
        </div>
      </motion.div>
    </div>
  );
}
