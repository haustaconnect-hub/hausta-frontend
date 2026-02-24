import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  Users, 
  MessageCircle, 
  Shield, 
  ArrowRight, 
  Star,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Home,
    title: 'Verified Listings',
    description: 'Every property is verified by our team to ensure quality and accuracy.',
  },
  {
    icon: Users,
    title: 'Compatible Matches',
    description: 'Our algorithm finds housemates who share your lifestyle and preferences.',
  },
  {
    icon: MessageCircle,
    title: 'Easy Messaging',
    description: 'Connect directly with potential housemates and landlords.',
  },
  {
    icon: Shield,
    title: 'Secure & Safe',
    description: 'Verified users and secure communication for peace of mind.',
  },
];

const testimonials = [
  {
    name: 'Emma T.',
    university: 'University of Manchester',
    text: 'Found my perfect housemates within a week! The compatibility quiz really works.',
    rating: 5,
  },
  {
    name: 'James W.',
    university: 'University of Leeds',
    text: 'So much easier than traditional house hunting. Love the swipe interface!',
    rating: 5,
  },
  {
    name: 'Sophie C.',
    university: 'MMU',
    text: 'Finally found a clean, quiet place with like-minded housemates.',
    rating: 5,
  },
];

const universities = [
  'University of Manchester',
  'University of Leeds',
  'University of Birmingham',
  'University of Liverpool',
  'University of Sheffield',
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-hausta-light">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/90 backdrop-blur-xl shadow-soft' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <motion.div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.02 }}
            >
              <img 
                src="/hausta-logo-colored.png" 
                alt="hausta" 
                className="h-8 w-auto"
              />
            </motion.div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-hausta-dark transition-colors">
                How it Works
              </a>
              <a href="#features" className="text-sm font-medium text-gray-600 hover:text-hausta-dark transition-colors">
                Features
              </a>
              <a href="#testimonials" className="text-sm font-medium text-gray-600 hover:text-hausta-dark transition-colors">
                Reviews
              </a>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={() => navigate('/login')}
                className="text-hausta-dark"
              >
                Log In
              </Button>
              <Button
                onClick={() => navigate('/signup')}
                className="bg-hausta-dark hover:bg-hausta-green text-white"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-hausta-accent/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-hausta-green/20 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-hausta-accent/30 rounded-full">
                <Star className="w-4 h-4 text-hausta-dark fill-hausta-dark" />
                <span className="text-sm font-medium text-hausta-dark">Trusted by 10,000+ students</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-hausta-dark leading-[1.1]">
                Find your people.
                <br />
                <span className="text-hausta-green">Find your home.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 max-w-lg">
                The UK's first swipe-based platform for student housing and housemate matching. 
                Compatible housemates. Verified properties. Zero stress.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate('/signup')}
                  className="bg-hausta-dark hover:bg-hausta-green text-white text-lg px-8 py-6 h-auto"
                >
                  Start Your Search
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/login')}
                  className="border-hausta-dark text-hausta-dark hover:bg-hausta-dark hover:text-white text-lg px-8 py-6 h-auto"
                >
                  I Have a Property
                </Button>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-hausta-green to-hausta-dark"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">4.9/5 from 2,000+ reviews</p>
                </div>
              </div>
            </motion.div>
            
            {/* Right Content - Hero Images */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative hidden lg:block"
            >
              <div className="relative h-[600px]">
                {/* Main Image */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-0 right-0 w-80 h-96 rounded-3xl overflow-hidden shadow-hover"
                >
                  <img
                    src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600"
                    alt="Students having fun"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                {/* Secondary Image */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute top-32 left-0 w-72 h-80 rounded-3xl overflow-hidden shadow-hover"
                >
                  <img
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600"
                    alt="Students collaborating"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                {/* Tertiary Image */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute bottom-0 right-20 w-64 h-72 rounded-3xl overflow-hidden shadow-hover"
                >
                  <img
                    src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600"
                    alt="Student lifestyle"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                {/* Floating Stats Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute bottom-20 left-10 glass rounded-2xl p-4 shadow-soft"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-hausta-accent/50 rounded-xl flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-hausta-dark" />
                    </div>
                    <div>
                      <p className="text-2xl font-heading font-bold text-hausta-dark">94%</p>
                      <p className="text-sm text-gray-500">Match Success</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* University Marquee */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <p className="text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
            Trusted by students at
          </p>
        </div>
        <div className="relative overflow-hidden">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="flex gap-16 items-center whitespace-nowrap"
          >
            {[...universities, ...universities, ...universities].map((uni, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-5 h-5" />
                <span className="text-lg font-medium">{uni}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-hausta-dark mb-4">
              How hausta. works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Finding your perfect student home has never been easier. Three simple steps to your new place.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Create Your Profile',
                description: 'Tell us about yourself, your lifestyle, and what you\'re looking for in a home and housemate.',
              },
              {
                step: '02',
                title: 'Get Matched',
                description: 'Our smart algorithm finds compatible housemates and suitable properties based on your preferences.',
              },
              {
                step: '03',
                title: 'Move In',
                description: 'Connect with your matches, arrange viewings, and find your perfect student home.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white rounded-3xl p-8 shadow-soft hover:shadow-hover transition-shadow duration-300 h-full">
                  <span className="text-6xl font-heading font-bold text-hausta-accent/30">{item.step}</span>
                  <h3 className="text-xl font-heading font-semibold text-hausta-dark mt-4 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-hausta-green" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-hausta-dark mb-4">
              Why students love hausta.
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We've built everything you need to find your perfect student home.
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-hausta-light rounded-2xl p-6 hover:bg-hausta-accent/20 transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-hausta-dark rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-hausta-dark mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-hausta-dark mb-4">
              What students say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of happy students who found their home with hausta.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-soft"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-hausta-dark">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.university}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-hausta-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
              Ready to find your perfect home?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of students already using hausta. to find compatible housemates and verified properties.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate('/signup')}
                className="bg-white text-hausta-dark hover:bg-hausta-accent text-lg px-8 py-6 h-auto"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/login')}
                className="border-white text-white hover:bg-white hover:text-hausta-dark text-lg px-8 py-6 h-auto"
              >
                Sign In
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-hausta-light border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img 
                  src="/hausta-logo-colored.png" 
                  alt="hausta" 
                  className="h-8 w-auto"
                />
              </div>
              <p className="text-sm text-gray-600">
                The UK's first swipe-based platform for student housing and housemate matching.
              </p>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold text-hausta-dark mb-4">For Students</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-hausta-dark transition-colors">Find a Home</a></li>
                <li><a href="#" className="hover:text-hausta-dark transition-colors">Find Housemates</a></li>
                <li><a href="#" className="hover:text-hausta-dark transition-colors">How it Works</a></li>
                <li><a href="#" className="hover:text-hausta-dark transition-colors">Safety</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold text-hausta-dark mb-4">For Landlords</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-hausta-dark transition-colors">List a Property</a></li>
                <li><a href="#" className="hover:text-hausta-dark transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-hausta-dark transition-colors">Landlord Portal</a></li>
                <li><a href="#" className="hover:text-hausta-dark transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold text-hausta-dark mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-hausta-dark transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-hausta-dark transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-hausta-dark transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-hausta-dark transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2026 hausta. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-gray-500 hover:text-hausta-dark transition-colors">Terms</a>
              <a href="#" className="text-sm text-gray-500 hover:text-hausta-dark transition-colors">Privacy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-hausta-dark transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
