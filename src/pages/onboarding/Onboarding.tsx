import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  Users, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Calendar,
  PoundSterling,
  Loader2,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useStore } from '@/store/useStore';

const studentTypes = [
  {
    id: 'full',
    title: 'Find Housemates & Home',
    description: 'I want to find both compatible housemates and a property together.',
    icon: Users,
  },
  {
    id: 'housing-only',
    title: 'Housing Only',
    description: 'I already have housemates, just need to find a property.',
    icon: Home,
  },
  {
    id: 'housemates-only',
    title: 'Housemates Only',
    description: 'I already have a place, looking for people to join me.',
    icon: Users,
  },
  {
    id: 'takeover',
    title: 'Room Takeover',
    description: 'Looking for a short-term sublet or room takeover.',
    icon: Calendar,
  },
];

const quizQuestions = [
  {
    id: 'sleepSchedule',
    question: 'What\'s your sleep schedule like?',
    options: [
      { id: 'early', label: 'Early Bird', description: 'In bed by 10pm, up at 6am' },
      { id: 'late', label: 'Night Owl', description: 'Up until 2am, sleep in when possible' },
      { id: 'flexible', label: 'Flexible', description: 'It varies depending on my schedule' },
    ],
  },
  {
    id: 'cleanliness',
    question: 'How important is cleanliness to you?',
    options: [
      { id: 'very-clean', label: 'Very Important', description: 'I like everything spotless and organized' },
      { id: 'clean', label: 'Important', description: 'I keep things tidy but not obsessive' },
      { id: 'relaxed', label: 'Relaxed', description: 'A bit of mess is fine, I clean when needed' },
      { id: 'messy', label: 'Very Relaxed', description: 'I\'m not bothered by clutter' },
    ],
  },
  {
    id: 'socialLevel',
    question: 'How social are you?',
    options: [
      { id: 'very-social', label: 'Very Social', description: 'Love having people over, always up for plans' },
      { id: 'social', label: 'Social', description: 'Enjoy company but also need alone time' },
      { id: 'moderate', label: 'Moderate', description: 'Prefer quiet evenings, occasional socializing' },
      { id: 'quiet', label: 'Quiet', description: 'Prefer my own space, keep to myself' },
    ],
  },
  {
    id: 'noiseTolerance',
    question: 'How much noise can you tolerate?',
    options: [
      { id: 'high', label: 'High', description: 'Music, parties, loud conversations - no problem' },
      { id: 'medium', label: 'Medium', description: 'Some noise is fine during the day' },
      { id: 'low', label: 'Low', description: 'I need a quiet environment to focus and relax' },
    ],
  },
  {
    id: 'guestFrequency',
    question: 'How often do you have guests over?',
    options: [
      { id: 'often', label: 'Often', description: 'Multiple times a week' },
      { id: 'sometimes', label: 'Sometimes', description: 'Once or twice a week' },
      { id: 'rarely', label: 'Rarely', description: 'Once a month or less' },
      { id: 'never', label: 'Never', description: 'I prefer not to have guests' },
    ],
  },
  {
    id: 'workStyle',
    question: 'What\'s your work/study style?',
    options: [
      { id: 'office', label: 'On Campus/Office', description: 'I go to campus or office every day' },
      { id: 'hybrid', label: 'Hybrid', description: 'Mix of home and on-site' },
      { id: 'remote', label: 'Remote', description: 'I work/study from home most days' },
      { id: 'student', label: 'Student', description: 'Varies with lectures and study schedule' },
    ],
  },
  {
    id: 'lifestyle',
    question: 'How would you describe your lifestyle?',
    options: [
      { id: 'active', label: 'Active', description: 'Gym, sports, always on the go' },
      { id: 'balanced', label: 'Balanced', description: 'Mix of activity and relaxation' },
      { id: 'relaxed', label: 'Relaxed', description: 'Prefer chilling at home' },
      { id: 'homebody', label: 'Homebody', description: 'Love being at home, cozy vibes' },
    ],
  },
  {
    id: 'dietary',
    question: 'Any dietary preferences?',
    options: [
      { id: 'no-preference', label: 'No Preference', description: 'I eat anything' },
      { id: 'vegetarian', label: 'Vegetarian', description: 'No meat or fish' },
      { id: 'vegan', label: 'Vegan', description: 'No animal products' },
      { id: 'halal', label: 'Halal', description: 'Halal diet' },
      { id: 'kosher', label: 'Kosher', description: 'Kosher diet' },
      { id: 'other', label: 'Other', description: 'Other specific requirements' },
    ],
  },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const { 
    step, 
    setStep, 
    studentType, 
    setStudentType,
    budgetMin,
    budgetMax,
    setBudget,

    moveInDate,
    setMoveInDate,
    moveOutDate,
    setMoveOutDate,
    quizAnswers,
    setQuizAnswer,
    updateUser
  } = useStore();

  const [locationData, setLocationData] = useState({
    city: '',
    postcode: '',
    radius: 5
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update user profile
    updateUser({
      budgetMin,
      budgetMax,
      preferredLocation: locationData,
      moveInDate,
      moveOutDate,
      quizAnswers,
    } as any);
    
    navigate('/dashboard/student');
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-hausta-dark mb-3">
                What are you looking for?
              </h2>
              <p className="text-gray-600">
                This helps us show you the most relevant options.
              </p>
            </div>

            <div className="grid gap-4">
              {studentTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setStudentType(type.id as any)}
                  className={`p-5 rounded-2xl border-2 text-left transition-all duration-300 ${
                    studentType === type.id
                      ? 'border-hausta-dark bg-hausta-dark/5'
                      : 'border-gray-200 hover:border-hausta-green hover:bg-hausta-accent/10'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      studentType === type.id ? 'bg-hausta-dark' : 'bg-hausta-accent/30'
                    }`}>
                      <type.icon className={`w-6 h-6 ${studentType === type.id ? 'text-white' : 'text-hausta-dark'}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-heading font-semibold text-hausta-dark mb-1">
                        {type.title}
                      </h3>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </div>
                    {studentType === type.id && (
                      <div className="w-6 h-6 bg-hausta-dark rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-hausta-dark mb-3">
                What's your budget?
              </h2>
              <p className="text-gray-600">
                Set your monthly rent range (per person).
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-hausta-accent/20 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <PoundSterling className="w-5 h-5 text-hausta-dark" />
                    <span className="text-2xl font-heading font-bold text-hausta-dark">{budgetMin}</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <span className="text-gray-400">to</span>
                  <div className="flex items-center gap-2">
                    <PoundSterling className="w-5 h-5 text-hausta-dark" />
                    <span className="text-2xl font-heading font-bold text-hausta-dark">{budgetMax}</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm text-gray-600 mb-2 block">Minimum</Label>
                    <input
                      type="range"
                      min="300"
                      max="1000"
                      step="25"
                      value={budgetMin}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (val < budgetMax) setBudget(val, budgetMax);
                      }}
                      className="w-full accent-hausta-dark"
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600 mb-2 block">Maximum</Label>
                    <input
                      type="range"
                      min="400"
                      max="1200"
                      step="25"
                      value={budgetMax}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (val > budgetMin) setBudget(budgetMin, val);
                      }}
                      className="w-full accent-hausta-dark"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-hausta-dark flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Preferred location
                </Label>
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm text-gray-600 mb-1 block">City</Label>
                    <Input
                      type="text"
                      placeholder="e.g. Manchester"
                      value={locationData.city}
                      onChange={(e) => setLocationData({...locationData, city: e.target.value})}
                      className="h-12 border-gray-200 focus:border-hausta-green"
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600 mb-1 block">Postcode area (optional)</Label>
                    <Input
                      type="text"
                      placeholder="e.g. M1"
                      value={locationData.postcode}
                      onChange={(e) => setLocationData({...locationData, postcode: e.target.value})}
                      className="h-12 border-gray-200 focus:border-hausta-green"
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600 mb-1 block">Search radius: {locationData.radius} miles</Label>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      step="1"
                      value={locationData.radius}
                      onChange={(e) => setLocationData({...locationData, radius: parseInt(e.target.value)})}
                      className="w-full accent-hausta-dark"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>1 mile</span>
                      <span>20 miles</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-hausta-dark">Move-in date</Label>
                <Input
                  type="date"
                  value={moveInDate || ''}
                  onChange={(e) => setMoveInDate(e.target.value)}
                  className="h-12 border-gray-200 focus:border-hausta-green"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-hausta-dark">Move-out date (optional)</Label>
                <Input
                  type="date"
                  value={moveOutDate || ''}
                  onChange={(e) => setMoveOutDate(e.target.value)}
                  className="h-12 border-gray-200 focus:border-hausta-green"
                />
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="flex justify-center gap-1 mb-4">
                {quizQuestions.slice(0, 4).map((_, qIdx) => (
                  <div
                    key={qIdx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      qIdx === 0 ? 'w-8 bg-hausta-dark' : 'w-4 bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-hausta-dark mb-3">
                Let's get to know you
              </h2>
              <p className="text-gray-600">
                Answer a few questions to help us find your perfect matches.
              </p>
            </div>

            <div className="space-y-4">
              {quizQuestions.slice(0, 4).map((q) => (
                <div key={q.id} className="space-y-3">
                  <Label className="text-hausta-dark font-medium">{q.question}</Label>
                  <div className="grid gap-2">
                    {q.options.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setQuizAnswer(q.id as any, option.id)}
                        className={`p-3 rounded-xl border-2 text-left transition-all duration-300 ${
                          quizAnswers[q.id as keyof typeof quizAnswers] === option.id
                            ? 'border-hausta-dark bg-hausta-dark/5'
                            : 'border-gray-200 hover:border-hausta-green hover:bg-hausta-accent/10'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium text-hausta-dark">{option.label}</span>
                            <p className="text-sm text-gray-500">{option.description}</p>
                          </div>
                          {quizAnswers[q.id as keyof typeof quizAnswers] === option.id && (
                            <Check className="w-5 h-5 text-hausta-dark" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="flex justify-center gap-1 mb-4">
                {quizQuestions.slice(4).map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === 0 ? 'w-8 bg-hausta-dark' : 'w-4 bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-hausta-dark mb-3">
                A few more details
              </h2>
              <p className="text-gray-600">
                Almost there! Just a couple more questions.
              </p>
            </div>

            <div className="space-y-4">
              {quizQuestions.slice(4).map((q) => (
                <div key={q.id} className="space-y-3">
                  <Label className="text-hausta-dark font-medium">{q.question}</Label>
                  <div className="grid gap-2">
                    {q.options.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setQuizAnswer(q.id as any, option.id)}
                        className={`p-3 rounded-xl border-2 text-left transition-all duration-300 ${
                          quizAnswers[q.id as keyof typeof quizAnswers] === option.id
                            ? 'border-hausta-dark bg-hausta-dark/5'
                            : 'border-gray-200 hover:border-hausta-green hover:bg-hausta-accent/10'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium text-hausta-dark">{option.label}</span>
                            <p className="text-sm text-gray-500">{option.description}</p>
                          </div>
                          {quizAnswers[q.id as keyof typeof quizAnswers] === option.id && (
                            <Check className="w-5 h-5 text-hausta-dark" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-hausta-accent/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-12 h-12 text-hausta-dark" />
            </div>
            <h2 className="text-3xl font-heading font-bold text-hausta-dark mb-4">
              You're all set!
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              We've created your profile and found some great matches for you. Let's start exploring!
            </p>
            <div className="flex flex-col gap-3">
              <div className="bg-hausta-accent/20 rounded-xl p-4 max-w-sm mx-auto">
                <p className="text-sm text-gray-600">Your profile is</p>
                <p className="text-2xl font-heading font-bold text-hausta-dark">85% Complete</p>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (step) {
      case 0:
        return !!studentType;
      case 1:
        return !!moveInDate && locationData.city.trim().length > 0;
      case 2:
        return quizQuestions.slice(0, 4).every(q => quizAnswers[q.id as keyof typeof quizAnswers]);
      case 3:
        return quizQuestions.slice(4).every(q => quizAnswers[q.id as keyof typeof quizAnswers]);
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-hausta-light flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={step === 0}
            className={`flex items-center gap-2 text-gray-500 hover:text-hausta-dark transition-colors ${
              step === 0 ? 'opacity-0 pointer-events-none' : ''
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="flex items-center gap-2">
            <img 
              src="/hausta-logo-colored.png" 
              alt="hausta" 
              className="h-8 w-auto"
            />
          </div>
          <div className="w-16" />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto">
          <div className="h-1 bg-gray-100">
            <motion.div
              className="h-full bg-hausta-dark"
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / 5) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <Button
            onClick={handleNext}
            disabled={!canProceed() || isSubmitting}
            className="w-full h-12 bg-hausta-dark hover:bg-hausta-green text-white text-lg"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : step === 4 ? (
              'Go to Dashboard'
            ) : (
              <>
                Continue
                <ArrowRight className="ml-2 w-5 h-5" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
