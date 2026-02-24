import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Home,
  Users, 
  User, 
  MapPin, 
  Bed,
  Bath,
  X,
  Layers,
  Check,
  ChevronLeft,
  ChevronRight,
  Info,
  Calendar,
  Car,
  Sofa,
  Banknote,
  GraduationCap,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';
import { mockProperties, mockStudents } from '@/data/mockData';
import BottomNav from '@/components/BottomNav';
import type { Property, StudentProfile } from '@/types';

// Swipe Card Component
interface SwipeCardProps {
  data: Property | StudentProfile;
  type: 'property' | 'housemate';
  onSwipe: (direction: 'left' | 'right' | 'up') => void;
  onClick: () => void;
}

function SwipeCard({ data, type, onSwipe, onClick }: SwipeCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const isProperty = type === 'property';
  const property = isProperty ? data as Property : null;
  const housemate = !isProperty ? data as StudentProfile : null;

  const images = isProperty 
    ? property?.images || ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800']
    : [housemate?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'];

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  return (
    <motion.div
      className="bg-white rounded-3xl overflow-hidden shadow-lg cursor-pointer"
      onClick={onClick}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={(_, info) => {
        if (info.offset.x > 100) onSwipe('right');
        else if (info.offset.x < -100) onSwipe('left');
        else if (info.offset.y < -100) onSwipe('up');
      }}
    >
      {/* Image Carousel */}
      <div className="relative h-[400px] lg:h-[500px]">
        <img
          src={images[currentImageIndex]}
          alt={isProperty ? property?.title : housemate?.firstName}
          className="w-full h-full object-cover"
        />
        
        {/* Image Indicators */}
        {images.length > 1 && (
          <div className="absolute top-4 left-4 right-4 flex gap-1">
            {images.map((_, idx) => (
              <div
                key={idx}
                className={`h-1 flex-1 rounded-full transition-all ${
                  idx === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Match Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-4 py-2 bg-hausta-dark/90 text-white rounded-full text-sm font-medium">
            {isProperty ? '78% Match!' : '94% Match!'}
          </span>
        </div>

        {/* Remaining Counter */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 bg-white/90 text-hausta-dark rounded-full text-sm">
            12 Remaining
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {isProperty ? (
          <>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-2xl font-heading font-bold text-hausta-dark">{property?.title}</h3>
                <div className="flex items-center gap-1 text-gray-500 mt-1">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{property?.address}, {property?.city} {property?.postcode}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-hausta-green">£{property?.price.toLocaleString()}</p>
                <p className="text-sm text-gray-500">/mo</p>
              </div>
            </div>

            {/* Property Details Grid */}
            <div className="grid grid-cols-4 gap-3 mb-4 py-4 border-y border-gray-100">
              <div className="text-center">
                <Calendar className="w-5 h-5 mx-auto mb-1 text-gray-400" />
                <p className="text-xs text-gray-500">Available</p>
                <p className="text-sm font-medium text-hausta-dark">
                  {property?.availableFrom ? new Date(property.availableFrom).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) : 'Now'}
                </p>
              </div>
              <div className="text-center">
                <Home className="w-5 h-5 mx-auto mb-1 text-gray-400" />
                <p className="text-xs text-gray-500">Type</p>
                <p className="text-sm font-medium text-hausta-dark capitalize">{property?.type}</p>
              </div>
              <div className="text-center">
                <Bed className="w-5 h-5 mx-auto mb-1 text-gray-400" />
                <p className="text-xs text-gray-500">Bedrooms</p>
                <p className="text-sm font-medium text-hausta-dark">{property?.bedrooms}</p>
              </div>
              <div className="text-center">
                <Bath className="w-5 h-5 mx-auto mb-1 text-gray-400" />
                <p className="text-xs text-gray-500">Bathrooms</p>
                <p className="text-sm font-medium text-hausta-dark">{property?.bathrooms}</p>
              </div>
            </div>

            {/* More Details */}
            <div className="grid grid-cols-4 gap-3 mb-4">
              <div className="text-center">
                <Sofa className="w-5 h-5 mx-auto mb-1 text-gray-400" />
                <p className="text-xs text-gray-500">Furnished</p>
                <p className="text-sm font-medium text-hausta-dark">{property?.furnished ? 'Yes' : 'No'}</p>
              </div>
              <div className="text-center">
                <Car className="w-5 h-5 mx-auto mb-1 text-gray-400" />
                <p className="text-xs text-gray-500">Parking</p>
                <p className="text-sm font-medium text-hausta-dark">
                  {property?.amenities?.includes('Parking') ? 'Yes' : 'No'}
                </p>
              </div>
              <div className="text-center">
                <Banknote className="w-5 h-5 mx-auto mb-1 text-gray-400" />
                <p className="text-xs text-gray-500">Bills</p>
                <p className="text-sm font-medium text-hausta-dark">{property?.billsIncluded ? 'Inc.' : 'Exc.'}</p>
              </div>
              <div className="text-center">
                <Info className="w-5 h-5 mx-auto mb-1 text-gray-400" />
                <p className="text-xs text-gray-500">Deposit</p>
                <p className="text-sm font-medium text-hausta-dark">£{property?.deposit}</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-2xl font-heading font-bold text-hausta-dark">
                  {housemate?.firstName} {housemate?.lastName}, 22
                </h3>
                <div className="flex items-center gap-2 text-gray-500 mt-1">
                  <GraduationCap className="w-4 h-4" />
                  <span className="text-sm">{housemate?.university}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-hausta-green">£{housemate?.budgetMax}</p>
                <p className="text-sm text-gray-500">/mo budget</p>
              </div>
            </div>

            {/* Housemate Details */}
            <div className="grid grid-cols-4 gap-3 mb-4 py-4 border-y border-gray-100">
              <div className="text-center">
                <Clock className="w-5 h-5 mx-auto mb-1 text-gray-400" />
                <p className="text-xs text-gray-500">Move-in</p>
                <p className="text-sm font-medium text-hausta-dark">
                  {housemate?.moveInDate ? new Date(housemate.moveInDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' }) : 'Flexible'}
                </p>
              </div>
              <div className="text-center">
                <Home className="w-5 h-5 mx-auto mb-1 text-gray-400" />
                <p className="text-xs text-gray-500">Looking for</p>
                <p className="text-sm font-medium text-hausta-dark">House Share</p>
              </div>
              <div className="text-center">
                <Users className="w-5 h-5 mx-auto mb-1 text-gray-400" />
                <p className="text-xs text-gray-500">Housemates</p>
                <p className="text-sm font-medium text-hausta-dark">Any</p>
              </div>
              <div className="text-center">
                <MapPin className="w-5 h-5 mx-auto mb-1 text-gray-400" />
                <p className="text-xs text-gray-500">Location</p>
                <p className="text-sm font-medium text-hausta-dark truncate">{housemate?.preferredLocation || 'Any'}</p>
              </div>
            </div>

            {/* Compatibility Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1.5 bg-hausta-accent/20 rounded-full text-sm text-hausta-dark">
                {housemate?.quizAnswers.cleanliness === 'very-clean' ? 'Very Clean' : housemate?.quizAnswers.cleanliness === 'clean' ? 'Clean & Tidy' : 'Relaxed'}
              </span>
              <span className="px-3 py-1.5 bg-hausta-accent/20 rounded-full text-sm text-hausta-dark">
                {housemate?.quizAnswers.socialLevel === 'very-social' ? 'Very Social' : housemate?.quizAnswers.socialLevel === 'social' ? 'Social' : 'Quiet'}
              </span>
              <span className="px-3 py-1.5 bg-hausta-accent/20 rounded-full text-sm text-hausta-dark">
                {housemate?.quizAnswers.sleepSchedule === 'early' ? 'Early Riser' : housemate?.quizAnswers.sleepSchedule === 'late' ? 'Night Owl' : 'Flexible'}
              </span>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}

// Detail View Modal
function DetailView({ 
  data, 
  type, 
  onClose,
  onSwipe
}: { 
  data: Property | StudentProfile; 
  type: 'property' | 'housemate';
  onClose: () => void;
  onSwipe: (direction: 'left' | 'right' | 'up') => void;
}) {
  const isProperty = type === 'property';
  const property = isProperty ? data as Property : null;
  const housemate = !isProperty ? data as StudentProfile : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Horizontal Image Gallery for Laptop */}
        <div className="relative">
          <div className="flex overflow-x-auto lg:h-80 h-64 gap-2 p-2 bg-gray-100">
            {isProperty ? (
              property?.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt=""
                  className="h-full w-auto object-cover rounded-xl flex-shrink-0"
                />
              ))
            ) : (
              <img
                src={housemate?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'}
                alt=""
                className="h-full w-auto object-cover rounded-xl flex-shrink-0 mx-auto"
              />
            )}
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isProperty ? (
            <>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-heading font-bold text-hausta-dark">{property?.title}</h2>
                  <p className="text-gray-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-4 h-4" />
                    {property?.address}, {property?.city}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-hausta-green">£{property?.price.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">/month</p>
                </div>
              </div>

              {/* Agent Info */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Marketed By</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-hausta-accent/30 rounded-lg flex items-center justify-center">
                    <Home className="w-6 h-6 text-hausta-dark" />
                  </div>
                  <div>
                    <p className="font-medium text-hausta-dark">Premium Student Homes</p>
                    <p className="text-sm text-gray-500">More properties from this agent</p>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Calendar className="w-5 h-5 text-hausta-dark" />
                  <div>
                    <p className="text-xs text-gray-500">Let Available Date</p>
                    <p className="font-medium text-hausta-dark">
                      {property?.availableFrom ? new Date(property.availableFrom).toLocaleDateString('en-GB') : 'Now'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Home className="w-5 h-5 text-hausta-dark" />
                  <div>
                    <p className="text-xs text-gray-500">Property Type</p>
                    <p className="font-medium text-hausta-dark capitalize">{property?.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Bed className="w-5 h-5 text-hausta-dark" />
                  <div>
                    <p className="text-xs text-gray-500">Bedrooms</p>
                    <p className="font-medium text-hausta-dark">{property?.bedrooms}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Bath className="w-5 h-5 text-hausta-dark" />
                  <div>
                    <p className="text-xs text-gray-500">Bathrooms</p>
                    <p className="font-medium text-hausta-dark">{property?.bathrooms}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Clock className="w-5 h-5 text-hausta-dark" />
                  <div>
                    <p className="text-xs text-gray-500">Tenancy Term</p>
                    <p className="font-medium text-hausta-dark">{property?.minTerm} months</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Sofa className="w-5 h-5 text-hausta-dark" />
                  <div>
                    <p className="text-xs text-gray-500">Furnish Type</p>
                    <p className="font-medium text-hausta-dark">{property?.furnished ? 'Furnished' : 'Unfurnished'}</p>
                  </div>
                </div>
              </div>

              {/* Key Features */}
              <div className="mb-6">
                <h3 className="font-heading font-semibold text-hausta-dark mb-3">Key Features</h3>
                <div className="grid grid-cols-2 gap-2">
                  {property?.amenities?.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-hausta-green" />
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="font-heading font-semibold text-hausta-dark mb-3">Description</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{property?.description}</p>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-heading font-bold text-hausta-dark">
                    {housemate?.firstName} {housemate?.lastName}, 22
                  </h2>
                  <p className="text-gray-500 flex items-center gap-2 mt-1">
                    <GraduationCap className="w-4 h-4" />
                    {housemate?.university}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Psychology | 3rd Year
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-hausta-green">£{housemate?.budgetMax}</p>
                  <p className="text-sm text-gray-500">/mo budget</p>
                </div>
              </div>

              {/* Compatibility Section */}
              <div className="mb-6">
                <h3 className="font-heading font-semibold text-hausta-dark mb-3">Compatibility</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 border-2 border-hausta-dark rounded-full text-sm text-hausta-dark">
                    {housemate?.quizAnswers.cleanliness === 'very-clean' ? '10/10 Clean & Organised' : '7/10 Clean & Organised'}
                  </span>
                  <span className="px-4 py-2 border-2 border-hausta-dark rounded-full text-sm text-hausta-dark">
                    {housemate?.quizAnswers.socialLevel === 'very-social' ? 'Extrovert' : housemate?.quizAnswers.socialLevel === 'social' ? 'Extrovert/Ambivert' : 'Introvert'}
                  </span>
                  <span className="px-4 py-2 border-2 border-hausta-dark rounded-full text-sm text-hausta-dark">
                    {housemate?.quizAnswers.sleepSchedule === 'early' ? 'Early Riser' : housemate?.quizAnswers.sleepSchedule === 'late' ? 'Night Owl' : 'Flexible Schedule'}
                  </span>
                  <span className="px-4 py-2 border-2 border-hausta-dark rounded-full text-sm text-hausta-dark">
                    {housemate?.quizAnswers.socialLevel === 'very-social' ? 'Very Social' : 'Social'}
                  </span>
                  <span className="px-4 py-2 border-2 border-hausta-dark rounded-full text-sm text-hausta-dark">
                    Stay-at-Home Person
                  </span>
                  <span className="px-4 py-2 border-2 border-hausta-dark rounded-full text-sm text-hausta-dark">
                    Physical Fitness
                  </span>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Calendar className="w-5 h-5 text-hausta-dark" />
                  <div>
                    <p className="text-xs text-gray-500">Ideal Move-in Date</p>
                    <p className="font-medium text-hausta-dark">
                      {housemate?.moveInDate ? new Date(housemate.moveInDate).toLocaleDateString('en-GB') : 'Flexible'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Home className="w-5 h-5 text-hausta-dark" />
                  <div>
                    <p className="text-xs text-gray-500">Ideal Property Type</p>
                    <p className="font-medium text-hausta-dark">House Share</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Users className="w-5 h-5 text-hausta-dark" />
                  <div>
                    <p className="text-xs text-gray-500">Housemates</p>
                    <p className="font-medium text-hausta-dark">Any</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <MapPin className="w-5 h-5 text-hausta-dark" />
                  <div>
                    <p className="text-xs text-gray-500">Ideal Location</p>
                    <p className="font-medium text-hausta-dark">{housemate?.preferredLocation || 'Any'}</p>
                  </div>
                </div>
              </div>

              {/* About Me */}
              <div className="mb-6">
                <h3 className="font-heading font-semibold text-hausta-dark mb-3">About Me</h3>
                <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-4 rounded-xl">
                  {housemate?.bio || `Hi there! I'm ${housemate?.firstName}, looking for a great place to live with compatible housemates. I'm clean, respectful, and enjoy a good balance of social time and personal space. Looking forward to meeting you!`}
                </p>
              </div>
            </>
          )}

          {/* Action Buttons - Tick, STACK (for properties only), Cross */}
          <div className="flex items-center justify-center gap-6 pt-4 border-t border-gray-100">
            <button
              onClick={() => { onSwipe('left'); onClose(); }}
              className="w-16 h-16 rounded-full bg-hausta-dark flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
            >
              <X className="w-8 h-8 text-white" />
            </button>
            {isProperty && (
              <button
                onClick={() => { onSwipe('up'); onClose(); }}
                className="w-14 h-14 rounded-full border-2 border-hausta-dark bg-white flex items-center justify-center hover:bg-hausta-dark hover:text-white transition-all shadow-lg group"
              >
                <Layers className="w-6 h-6 text-hausta-dark group-hover:text-white" />
              </button>
            )}
            <button
              onClick={() => { onSwipe('right'); onClose(); }}
              className="w-16 h-16 rounded-full bg-hausta-dark flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
            >
              <Check className="w-8 h-8 text-white" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Main Dashboard Component
export default function StudentDashboard() {
  const navigate = useNavigate();
  const { 
    user, 
    activeTab, 
    setActiveTab,
    currentCardIndex,
    setCurrentCardIndex,
    likeProperty,
    saveProperty,
    skipProperty,
    likeHousemate,
    skipHousemate,
  } = useStore();

  const [showFilter, setShowFilter] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | 'up' | null>(null);
  const [selectedItem, setSelectedItem] = useState<{ data: Property | StudentProfile; type: 'property' | 'housemate' } | null>(null);

  const properties = mockProperties;
  const housemates = mockStudents.filter(s => s.id !== user?.id);

  const currentItems = activeTab === 'properties' ? properties : housemates;
  const currentItem = currentItems[currentCardIndex];

  const handleSwipe = (direction: 'left' | 'right' | 'up') => {
    setSwipeDirection(direction);
    
    setTimeout(() => {
      if (activeTab === 'properties') {
        if (direction === 'right') likeProperty(currentItem.id);
        else if (direction === 'up') saveProperty(currentItem.id);
        else skipProperty(currentItem.id);
      } else {
        if (direction === 'right') likeHousemate(currentItem.id);
        else skipHousemate(currentItem.id);
      }
      setSwipeDirection(null);
    }, 200);
  };

  const handleAction = (action: 'skip' | 'save' | 'like') => {
    if (action === 'skip') handleSwipe('left');
    else if (action === 'save') handleSwipe('up');
    else handleSwipe('right');
  };

  // Empty state
  if (currentCardIndex >= currentItems.length) {
    return (
      <div className="min-h-screen bg-hausta-light flex flex-col pb-20">
        {/* Header - Simplified */}
        <header className="bg-hausta-dark text-white">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img 
                src="/hausta-h-icon-white.png" 
                alt="hausta" 
                className="h-6 w-auto"
              />
              <span className="text-base font-heading font-bold">Welcome, {user?.firstName || 'Student'}!</span>
            </div>
            <button 
              onClick={() => navigate('/profile')}
              className="w-8 h-8 bg-hausta-accent/30 rounded-full flex items-center justify-center"
            >
              <User className="w-4 h-4 text-white" />
            </button>
          </div>
        </header>

        {/* Tab Switcher */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex gap-2 py-3">
              <button
                onClick={() => setActiveTab('properties')}
                className={`flex-1 py-2.5 text-sm font-medium rounded-xl transition-colors whitespace-nowrap ${
                  activeTab === 'properties'
                    ? 'bg-hausta-dark text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Properties ({properties.length})
              </button>
              <button
                onClick={() => setActiveTab('housemates')}
                className={`flex-1 py-2.5 text-sm font-medium rounded-xl transition-colors whitespace-nowrap ${
                  activeTab === 'housemates'
                    ? 'bg-hausta-dark text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Housemates ({housemates.length})
              </button>
              <button
                onClick={() => navigate('/groups')}
                className={`flex-1 py-2.5 text-sm font-medium rounded-xl transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200 whitespace-nowrap`}
              >
                Groups (2)
              </button>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-hausta-accent/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-12 h-12 text-hausta-dark" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-hausta-dark mb-3">
              You've seen them all!
            </h2>
            <p className="text-gray-600 mb-6 max-w-xs mx-auto">
              Check back later for new {activeTab === 'properties' ? 'listings' : 'housemates'}, or review your matches.
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                onClick={() => navigate('/matches')}
                variant="outline"
                className="border-hausta-dark text-hausta-dark"
              >
                View Matches
              </Button>
              <Button
                onClick={() => setCurrentCardIndex(0)}
                className="bg-hausta-dark text-white"
              >
                Start Over
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hausta-light flex flex-col pb-24">
      {/* Header - Simplified */}
      <header className="bg-hausta-dark text-white">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src="/hausta-h-icon-white.png" 
              alt="hausta" 
              className="h-6 w-auto"
            />
            <span className="text-base font-heading font-bold">Welcome, {user?.firstName || 'Student'}!</span>
          </div>
          <button 
            onClick={() => navigate('/profile')}
            className="w-8 h-8 bg-hausta-accent/30 rounded-full flex items-center justify-center"
          >
            <User className="w-4 h-4 text-white" />
          </button>
        </div>
      </header>

      {/* Tab Switcher */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 py-3">
            <button
              onClick={() => setActiveTab('properties')}
              className={`flex-1 py-2.5 text-sm font-medium rounded-xl transition-colors whitespace-nowrap ${
                activeTab === 'properties'
                  ? 'bg-hausta-dark text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Properties ({properties.length})
            </button>
            <button
              onClick={() => setActiveTab('housemates')}
              className={`flex-1 py-2.5 text-sm font-medium rounded-xl transition-colors whitespace-nowrap ${
                activeTab === 'housemates'
                  ? 'bg-hausta-dark text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Housemates ({housemates.length})
            </button>
            <button
              onClick={() => navigate('/groups')}
              className={`flex-1 py-2.5 text-sm font-medium rounded-xl transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200 whitespace-nowrap`}
            >
              Groups (2)
            </button>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilter && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-hausta-dark">Filters</span>
                <button 
                  onClick={() => setShowFilter(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1.5 bg-hausta-accent/20 rounded-full text-sm text-hausta-dark">
                  Budget: £400-800
                </button>
                <button className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-600">
                  Bills included
                </button>
                <button className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-600">
                  Furnished
                </button>
                <button className="px-3 py-1.5 bg-hausta-dark rounded-full text-sm text-white">
                  + Add filter
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Swipe Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="relative w-full max-w-md lg:max-w-lg">
          <AnimatePresence mode="popLayout">
            {currentItem && (
              <motion.div
                key={currentItem.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  x: swipeDirection === 'left' ? -300 : swipeDirection === 'right' ? 300 : 0,
                  rotate: swipeDirection === 'left' ? -20 : swipeDirection === 'right' ? 20 : 0,
                }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <SwipeCard
                  data={currentItem}
                  type={activeTab === 'properties' ? 'property' : 'housemate'}
                  onSwipe={handleSwipe}
                  onClick={() => setSelectedItem({ data: currentItem, type: activeTab === 'properties' ? 'property' : 'housemate' })}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Swipe Indicators */}
          {swipeDirection && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`absolute top-8 ${
                swipeDirection === 'right' ? 'left-8' : swipeDirection === 'left' ? 'right-8' : 'left-1/2 -translate-x-1/2'
              } z-20`}
            >
              <div className={`px-4 py-2 rounded-full border-4 font-bold text-2xl ${
                swipeDirection === 'right' 
                  ? 'border-green-500 text-green-500' 
                  : swipeDirection === 'left'
                  ? 'border-red-500 text-red-500'
                  : 'border-hausta-dark text-hausta-dark'
              }`}>
                {swipeDirection === 'right' ? 'LIKE' : swipeDirection === 'left' ? 'NOPE' : 'STACK'}
              </div>
            </motion.div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-6 mt-6">
          <button
            onClick={() => handleAction('skip')}
            className="w-16 h-16 rounded-full bg-hausta-dark flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
          >
            <X className="w-8 h-8 text-white" />
          </button>
          {activeTab === 'properties' && (
            <button
              onClick={() => handleAction('save')}
              className="w-14 h-14 rounded-full border-2 border-hausta-dark bg-white flex items-center justify-center hover:bg-hausta-dark hover:text-white transition-all shadow-lg group"
            >
              <Layers className="w-6 h-6 text-hausta-dark group-hover:text-white" />
            </button>
          )}
          <button
            onClick={() => handleAction('like')}
            className="w-16 h-16 rounded-full bg-hausta-dark flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
          >
            <Check className="w-8 h-8 text-white" />
          </button>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          {currentCardIndex + 1} of {currentItems.length}
        </p>
      </div>

      {/* Detail View Modal */}
      <AnimatePresence>
        {selectedItem && (
          <DetailView
            data={selectedItem.data}
            type={selectedItem.type}
            onClose={() => setSelectedItem(null)}
            onSwipe={handleSwipe}
          />
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
