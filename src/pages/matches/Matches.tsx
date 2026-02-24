import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  Users,
  Layers,
  MapPin,
  MessageCircle,
  Check,
  Send,
  GraduationCap,
  X,
  Home,
  Bed,
  Bath,
  Calendar,
  Clock,
  Sofa
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';
import { mockProperties, mockStudents } from '@/data/mockData';
import BottomNav from '@/components/BottomNav';
import type { Property, StudentProfile } from '@/types';

// Detail View Modal for Saved Items
function DetailView({ 
  data, 
  type, 
  onClose,
  onMessage,
  showMessageButton
}: { 
  data: Property | StudentProfile; 
  type: 'property' | 'housemate';
  onClose: () => void;
  onMessage: () => void;
  showMessageButton: boolean;
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
        {/* Horizontal Image Gallery */}
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
                  {housemate?.bio || `Hi there! I'm ${housemate?.firstName}, looking for a great place to live with compatible housemates.`}
                </p>
              </div>
            </>
          )}

          {/* Action Buttons - Only show Message on Mutual */}
          <div className="flex gap-3">
            {showMessageButton && (
              <button
                onClick={() => { onMessage(); onClose(); }}
                className="flex-1 py-3 bg-hausta-dark text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-hausta-green transition-colors"
              >
                <Send className="w-5 h-5" />
                Message
              </button>
            )}
            <button
              onClick={onClose}
              className={`py-3 border-2 border-hausta-dark text-hausta-dark rounded-xl font-medium hover:bg-hausta-dark hover:text-white transition-colors ${showMessageButton ? 'flex-1' : 'w-full'}`}
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Matches() {
  const navigate = useNavigate();
  const { 
    savedProperties, 
    mutualMatches 
  } = useStore();
  
  const [activeTab, setActiveTab] = useState<'stack' | 'mutual'>('stack');
  const [subTab, setSubTab] = useState<'properties' | 'housemates'>('properties');
  const [selectedItem, setSelectedItem] = useState<{ data: Property | StudentProfile; type: 'property' | 'housemate' } | null>(null);

  const savedPropertyDetails = mockProperties.filter(p => savedProperties.includes(p.id));

  const handleMessage = () => {
    navigate('/messages');
  };

  const renderContent = () => {
    if (activeTab === 'stack') {
      // STACK only shows properties (not housemates)
      const items = savedPropertyDetails;
      
      if (items.length === 0) {
        return (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Layers className="w-10 h-10 text-gray-300" />
            </div>
            <p className="text-gray-500">Your STACK is empty</p>
            <p className="text-sm text-gray-400 mt-1">Properties you STACK will appear here</p>
            <Button 
              onClick={() => navigate('/dashboard/student')}
              className="mt-4 bg-hausta-dark text-white"
            >
              Start Swiping
            </Button>
          </div>
        );
      }

      return (
        <div className="space-y-4">
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl overflow-hidden shadow-soft cursor-pointer hover:shadow-hover transition-shadow"
              onClick={() => setSelectedItem({ data: item, type: 'property' })}
            >
              <div className="flex">
                <img
                  src={(item as any).images[0]}
                  alt={(item as any).title}
                  className="w-28 h-28 object-cover"
                />
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-heading font-semibold text-hausta-dark">{(item as any).title}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {(item as any).address}
                      </p>
                    </div>
                    <Layers className="w-5 h-5 text-hausta-dark" />
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-hausta-green font-bold">£{(item as any).price}</span>
                    <span className="text-sm text-gray-500">{(item as any).bedrooms} bed</span>
                  </div>
                  {/* STACK items only show tick/cross buttons, no message */}
                  <div className="flex gap-2 mt-3">
                    <button 
                      onClick={(e) => { e.stopPropagation(); /* Remove from stack */ }}
                      className="flex-1 py-2 bg-hausta-dark text-white text-sm rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-1"
                    >
                      <X className="w-4 h-4" />
                      Remove
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); /* Like action */ }}
                      className="flex-1 py-2 bg-hausta-green text-white text-sm rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-1"
                    >
                      <Check className="w-4 h-4" />
                      Like
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      );
    }

    if (activeTab === 'mutual') {
      const mutualProperties = mockProperties.filter(p => mutualMatches.properties.includes(p.id));
      const mutualHousemates = mockStudents.filter(s => mutualMatches.housemates.includes(s.id));
      const items = subTab === 'properties' ? mutualProperties : mutualHousemates;

      if (items.length === 0) {
        return (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-hausta-accent/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-10 h-10 text-hausta-dark" />
            </div>
            <p className="text-gray-500">No mutual matches yet</p>
            <p className="text-sm text-gray-400 mt-1">
              When someone you liked also likes you back, they'll appear here!
            </p>
          </div>
        );
      }

      return (
        <div className="space-y-4">
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl overflow-hidden shadow-soft cursor-pointer hover:shadow-hover transition-shadow"
              onClick={() => setSelectedItem({ data: item, type: subTab === 'properties' ? 'property' : 'housemate' })}
            >
              {subTab === 'properties' ? (
                <div className="flex">
                  <img
                    src={(item as any).images[0]}
                    alt={(item as any).title}
                    className="w-28 h-28 object-cover"
                  />
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-heading font-semibold text-hausta-dark">{(item as any).title}</h3>
                        <p className="text-sm text-gray-500">{(item as any).address}</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                        Mutual Match
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-hausta-green font-bold">£{(item as any).price}</span>
                      <span className="text-sm text-gray-500">{(item as any).bedrooms} bed</span>
                    </div>
                    {/* Mutual matches show message button */}
                    <div className="flex gap-2 mt-3">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setSelectedItem({ data: item, type: 'property' }); }}
                        className="flex-1 py-2 bg-hausta-dark text-white text-sm rounded-lg hover:bg-hausta-green transition-colors"
                      >
                        View
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleMessage(); }}
                        className="flex-1 py-2 border border-hausta-dark text-hausta-dark text-sm rounded-lg hover:bg-hausta-dark hover:text-white transition-colors flex items-center justify-center gap-1"
                      >
                        <Send className="w-4 h-4" />
                        Message
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center p-4">
                  <div className="w-16 h-16 rounded-full bg-hausta-accent/30 flex items-center justify-center overflow-hidden">
                    {(item as any).avatar ? (
                      <img src={(item as any).avatar} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-8 h-8 text-hausta-dark" />
                    )}
                  </div>
                  <div className="flex-1 ml-4">
                    <h3 className="font-heading font-semibold text-hausta-dark">
                      {(item as any).firstName} {(item as any).lastName?.[0]}.
                    </h3>
                    <p className="text-sm text-gray-500">{(item as any).university}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                      Mutual Match
                    </span>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleMessage(); }}
                    className="w-10 h-10 rounded-full bg-hausta-dark flex items-center justify-center hover:bg-hausta-green transition-colors"
                  >
                    <MessageCircle className="w-5 h-5 text-white" />
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-hausta-light flex flex-col pb-20">
      {/* Header */}
      <header className="bg-hausta-dark text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-heading font-bold">My Matches</h1>
          </div>
        </div>
      </header>

      {/* Main Tabs - Only STACK and Mutual */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex">
            <button
              onClick={() => setActiveTab('stack')}
              className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'stack'
                  ? 'border-hausta-dark text-hausta-dark'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <Layers className="w-4 h-4" />
                STACK
              </span>
            </button>
            <button
              onClick={() => setActiveTab('mutual')}
              className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'mutual'
                  ? 'border-hausta-dark text-hausta-dark'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Mutual
            </button>
          </div>
        </div>
      </div>

      {/* Sub Tabs - Only show for Mutual tab */}
      {activeTab === 'mutual' && (
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex gap-4 py-3">
              <button
                onClick={() => setSubTab('properties')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  subTab === 'properties'
                    ? 'bg-hausta-dark text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Properties
              </button>
              <button
                onClick={() => setSubTab('housemates')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  subTab === 'housemates'
                    ? 'bg-hausta-dark text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Housemates
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {renderContent()}
        </div>
      </div>

      {/* Detail View Modal */}
      <AnimatePresence>
        {selectedItem && (
          <DetailView
            data={selectedItem.data}
            type={selectedItem.type}
            onClose={() => setSelectedItem(null)}
            onMessage={handleMessage}
            showMessageButton={activeTab === 'mutual'}
          />
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
