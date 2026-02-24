import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Users, 
  User, 
  Building,
  MoreVertical,
  CheckCircle,
  Clock,
  Eye,
  Edit,
  Trash2,
  MessageSquare,
  X,
  Briefcase,
  GraduationCap,
  Mail,
  Phone,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';
import BottomNav from '@/components/BottomNav';

// Stats Card Component
function StatCard({ 
  title, 
  value, 
  change, 
  icon: Icon,
  color 
}: { 
  title: string; 
  value: string; 
  change?: string; 
  icon: any;
  color: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-soft">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-500 mb-1">{title}</p>
          <p className="text-xl font-heading font-bold text-hausta-dark">{value}</p>
          {change && (
            <p className="text-xs text-green-500 mt-1">{change}</p>
          )}
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );
}

// Property Card Component
function PropertyCard({ 
  property, 
  onView, 
  onEdit, 
  onDelete 
}: { 
  property: any; 
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [showMenu, setShowMenu] = useState(false);

  const statusColors = {
    available: 'bg-green-100 text-green-700',
    occupied: 'bg-blue-100 text-blue-700',
    pending: 'bg-yellow-100 text-yellow-700',
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-hover transition-shadow">
      <div className="relative h-40 sm:h-48">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${(statusColors as any)[property.status] || 'bg-gray-100 text-gray-700'}`}>
            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white"
          >
            <MoreVertical className="w-4 h-4 text-gray-600" />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-10 bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[140px] z-10">
              <button
                onClick={() => { onView(); setShowMenu(false); }}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View
              </button>
              <button
                onClick={() => { onEdit(); setShowMenu(false); }}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => { onDelete(); setShowMenu(false); }}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-heading font-semibold text-hausta-dark mb-1">{property.title}</h3>
        <p className="text-sm text-gray-500 mb-3">{property.address}, {property.city}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-hausta-green">£{property.price}</span>
            <span className="text-xs text-gray-400">/month</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>{property.bedrooms} bed</span>
            <span>{property.bathrooms} bath</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Individual Applicant Profile Modal
function ApplicantProfileModal({ 
  application, 
  onClose, 
  onAccept, 
  onDecline 
}: { 
  application: any;
  onClose: () => void;
  onAccept: () => void;
  onDecline: () => void;
}) {
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
        className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative">
          <div className="h-32 bg-gradient-to-br from-hausta-dark to-hausta-green" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div className="absolute -bottom-12 left-6">
            <div className="w-24 h-24 bg-hausta-accent/30 rounded-full flex items-center justify-center border-4 border-white">
              <User className="w-12 h-12 text-hausta-dark" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-14 px-6 pb-6">
          {/* Basic Info */}
          <div className="mb-6">
            <h2 className="text-2xl font-heading font-bold text-hausta-dark">{application.applicantName}</h2>
            <p className="text-gray-500 flex items-center gap-2 mt-1">
              <GraduationCap className="w-4 h-4" />
              Student at {application.university || 'University of Manchester'}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-3 py-1 bg-hausta-accent/20 rounded-full text-sm text-hausta-dark">
                {application.compatibilityScore}% match
              </span>
              <span className="text-sm text-gray-400">Applied {application.date}</span>
            </div>
          </div>

          {/* Contract Info */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h3 className="font-heading font-semibold text-hausta-dark mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Contract Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Monthly Income</span>
                <span className="font-medium text-hausta-dark">£{application.monthlyIncome || '1,200'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Income Source</span>
                <span className="font-medium text-hausta-dark">{application.incomeSource || 'Student Loan & Part-time Job'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Guarantor Available</span>
                <span className="font-medium text-green-600 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Yes
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Preferred Move-in</span>
                <span className="font-medium text-hausta-dark">{application.moveInDate || '01/09/2026'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Tenancy Length</span>
                <span className="font-medium text-hausta-dark">{application.tenancyLength || '12 months'}</span>
              </div>
            </div>
          </div>

          {/* Property Applied For */}
          <div className="bg-hausta-accent/10 rounded-xl p-4 mb-6">
            <h3 className="font-heading font-semibold text-hausta-dark mb-2">Applied For</h3>
            <p className="text-hausta-dark font-medium">{application.propertyTitle}</p>
            <p className="text-sm text-gray-500">{application.propertyAddress || '123 Student Street, Manchester'}</p>
          </div>

          {/* Contact */}
          <div className="flex gap-3 mb-6">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-hausta-dark text-white rounded-xl hover:bg-hausta-green transition-colors">
              <Mail className="w-4 h-4" />
              Email
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 text-hausta-dark rounded-xl hover:bg-gray-50 transition-colors">
              <Phone className="w-4 h-4" />
              Call
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button 
              onClick={onDecline}
              className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Decline
            </button>
            <button 
              onClick={onAccept}
              className="flex-1 py-3 bg-hausta-dark text-white rounded-xl hover:bg-hausta-green transition-colors"
            >
              Accept Application
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Group Profile Slideshow Modal
function GroupProfileModal({ 
  application, 
  onClose, 
  onAccept, 
  onDecline 
}: { 
  application: any;
  onClose: () => void;
  onAccept: () => void;
  onDecline: () => void;
}) {
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);
  
  // Mock group members data
  const groupMembers = application.groupMembers || [
    {
      id: 'member-1',
      name: 'Sarah Johnson',
      university: 'University of Manchester',
      course: 'Psychology | 3rd Year',
      age: 21,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      monthlyIncome: '1,200',
      incomeSource: 'Student Loan & Part-time Job',
      guarantor: true,
      moveInDate: '01/09/2026',
      tenancyLength: '12 months',
      bio: 'Hi! I\'m Sarah, looking for a great place to live with friendly housemates.',
    },
    {
      id: 'member-2',
      name: 'Tom Williams',
      university: 'University of Manchester',
      course: 'Computer Science | 2nd Year',
      age: 20,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      monthlyIncome: '1,100',
      incomeSource: 'Student Loan',
      guarantor: true,
      moveInDate: '01/09/2026',
      tenancyLength: '12 months',
      bio: 'Hey, I\'m Tom! I enjoy coding and gaming in my free time.',
    },
    {
      id: 'member-3',
      name: 'Lisa Chen',
      university: 'University of Manchester',
      course: 'Business | 3rd Year',
      age: 22,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      monthlyIncome: '1,300',
      incomeSource: 'Student Loan & Scholarship',
      guarantor: true,
      moveInDate: '01/09/2026',
      tenancyLength: '12 months',
      bio: 'Hi! I\'m Lisa, organized and looking for a clean place to live.',
    },
    {
      id: 'member-4',
      name: 'Mike Brown',
      university: 'University of Manchester',
      course: 'Engineering | 2nd Year',
      age: 21,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      monthlyIncome: '1,150',
      incomeSource: 'Student Loan',
      guarantor: true,
      moveInDate: '01/09/2026',
      tenancyLength: '12 months',
      bio: 'I\'m Mike, easy-going and always up for a chat!',
    },
  ];

  const currentMember = groupMembers[currentMemberIndex];

  const nextMember = () => {
    setCurrentMemberIndex((prev) => (prev < groupMembers.length - 1 ? prev + 1 : 0));
  };

  const prevMember = () => {
    setCurrentMemberIndex((prev) => (prev > 0 ? prev - 1 : groupMembers.length - 1));
  };

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
        className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative">
          <div className="h-32 bg-gradient-to-br from-hausta-dark to-hausta-green" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
            <div className="w-24 h-24 bg-hausta-accent/30 rounded-full flex items-center justify-center border-4 border-white overflow-hidden">
              {currentMember.avatar ? (
                <img src={currentMember.avatar} alt="" className="w-full h-full object-cover" />
              ) : (
                <User className="w-12 h-12 text-hausta-dark" />
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-14 px-6 pb-6">
          {/* Group Info */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-heading font-bold text-hausta-dark">Group Application</h2>
            <p className="text-gray-500 text-sm">{groupMembers.length} members applying together</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="px-3 py-1 bg-hausta-accent/20 rounded-full text-sm text-hausta-dark">
                {application.compatibilityScore}% match
              </span>
              <span className="text-sm text-gray-400">Applied {application.date}</span>
            </div>
          </div>

          {/* Member Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={prevMember}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-hausta-dark" />
            </button>
            <div className="text-center">
              <p className="text-sm font-medium text-hausta-dark">
                Member {currentMemberIndex + 1} of {groupMembers.length}
              </p>
              <p className="text-xs text-gray-500">Swipe to view profiles</p>
            </div>
            <button
              onClick={nextMember}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-hausta-dark" />
            </button>
          </div>

          {/* Member Dots */}
          <div className="flex justify-center gap-2 mb-6">
            {groupMembers.map((_member: typeof groupMembers[0], idx: number) => (
              <button
                key={idx}
                onClick={() => setCurrentMemberIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentMemberIndex ? 'bg-hausta-dark w-4' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Current Member Profile */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMember.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Member Basic Info */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-heading font-bold text-hausta-dark">{currentMember.name}, {currentMember.age}</h3>
                <p className="text-gray-500 flex items-center justify-center gap-2 mt-1">
                  <GraduationCap className="w-4 h-4" />
                  {currentMember.university}
                </p>
                <p className="text-sm text-gray-400 mt-1">{currentMember.course}</p>
              </div>

              {/* Contract Info */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h3 className="font-heading font-semibold text-hausta-dark mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Contract Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Monthly Income</span>
                    <span className="font-medium text-hausta-dark">£{currentMember.monthlyIncome}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Income Source</span>
                    <span className="font-medium text-hausta-dark">{currentMember.incomeSource}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Guarantor Available</span>
                    <span className="font-medium text-green-600 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Yes
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Preferred Move-in</span>
                    <span className="font-medium text-hausta-dark">{currentMember.moveInDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Tenancy Length</span>
                    <span className="font-medium text-hausta-dark">{currentMember.tenancyLength}</span>
                  </div>
                </div>
              </div>

              {/* About */}
              <div className="bg-hausta-accent/10 rounded-xl p-4 mb-6">
                <h3 className="font-heading font-semibold text-hausta-dark mb-2">About</h3>
                <p className="text-sm text-gray-600">{currentMember.bio}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Property Applied For */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h3 className="font-heading font-semibold text-hausta-dark mb-2">Applied For</h3>
            <p className="text-hausta-dark font-medium">{application.propertyTitle}</p>
            <p className="text-sm text-gray-500">{application.propertyAddress || '123 Student Street, Manchester'}</p>
          </div>

          {/* Combined Income */}
          <div className="bg-hausta-green/10 rounded-xl p-4 mb-6">
            <h3 className="font-heading font-semibold text-hausta-dark mb-2">Combined Monthly Income</h3>
            <p className="text-2xl font-bold text-hausta-green">
              £{groupMembers.reduce((sum: number, m: typeof groupMembers[0]) => sum + parseInt(m.monthlyIncome.replace(',', '')), 0).toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">From {groupMembers.length} applicants</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button 
              onClick={onDecline}
              className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Decline Group
            </button>
            <button 
              onClick={onAccept}
              className="flex-1 py-3 bg-hausta-dark text-white rounded-xl hover:bg-hausta-green transition-colors"
            >
              Accept Group
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Application Card Component
function ApplicationCard({ application, onClick }: { application: any; onClick: () => void }) {
  const isGroup = application.type === 'group';

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl p-4 shadow-soft flex flex-col sm:flex-row sm:items-center gap-4 cursor-pointer hover:shadow-hover transition-shadow"
    >
      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${isGroup ? 'bg-purple-100' : 'bg-hausta-accent/30'}`}>
        {isGroup ? (
          <Users className="w-6 h-6 text-purple-600" />
        ) : (
          <User className="w-6 h-6 text-hausta-dark" />
        )}
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-hausta-dark">{application.applicantName}</h4>
        <p className="text-sm text-gray-500">Applied for {application.propertyTitle}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs px-2 py-0.5 bg-hausta-accent/20 rounded text-hausta-dark">
            {application.compatibilityScore}% match
          </span>
          <span className="text-xs text-gray-400">{application.date}</span>
          {isGroup && (
            <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded">
              Group of {application.memberCount || 4}
            </span>
          )}
        </div>
      </div>
      <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
        <button 
          onClick={(e) => { e.stopPropagation(); }}
          className="px-4 py-2 bg-hausta-dark text-white text-sm rounded-lg hover:bg-hausta-green transition-colors"
        >
          Accept
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); }}
          className="px-4 py-2 border border-gray-200 text-gray-600 text-sm rounded-lg hover:bg-gray-50 transition-colors"
        >
          Decline
        </button>
      </div>
    </div>
  );
}

// Add Property Modal
function AddPropertyModal({ onClose }: { onClose: () => void }) {
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
        className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-heading font-bold text-hausta-dark">Add New Property</h2>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Title</label>
              <input 
                type="text" 
                placeholder="e.g. Modern 4-Bed Student House"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-hausta-green focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input 
                type="text" 
                placeholder="Street address"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-hausta-green focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input 
                  type="text" 
                  placeholder="e.g. Manchester"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-hausta-green focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Postcode</label>
                <input 
                  type="text" 
                  placeholder="e.g. M1 1AA"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-hausta-green focus:outline-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                <input 
                  type="number" 
                  placeholder="4"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-hausta-green focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                <input 
                  type="number" 
                  placeholder="2"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-hausta-green focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (£/mo)</label>
                <input 
                  type="number" 
                  placeholder="650"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-hausta-green focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                rows={3}
                placeholder="Describe your property..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-hausta-green focus:outline-none resize-none"
              />
            </div>
            <button 
              onClick={onClose}
              className="w-full py-3 bg-hausta-dark text-white rounded-xl hover:bg-hausta-green transition-colors font-medium"
            >
              Add Property
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function LandlordDashboard() {
  const navigate = useNavigate();
  const { user, stats, properties } = useStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'applications'>('overview');
  const [applicationType, setApplicationType] = useState<'individual' | 'group'>('individual');
  const [selectedApplicant, setSelectedApplicant] = useState<any>(null);
  const [showAddProperty, setShowAddProperty] = useState(false);

  // Mock applications data
  const individualApplications = [
    {
      id: 'app-1',
      type: 'individual',
      applicantName: 'Emma Thompson',
      propertyTitle: 'Modern 4-Bed Student House',
      compatibilityScore: 92,
      date: '2 hours ago',
      university: 'University of Manchester',
      monthlyIncome: '1,200',
      incomeSource: 'Student Loan & Part-time Job',
      moveInDate: '01/09/2026',
      tenancyLength: '12 months',
      propertyAddress: '123 Student Street, Manchester',
    },
    {
      id: 'app-2',
      type: 'individual',
      applicantName: 'James Wilson',
      propertyTitle: 'Stylish City Centre Apartment',
      compatibilityScore: 87,
      date: '5 hours ago',
      university: 'University of Leeds',
      monthlyIncome: '1,100',
      incomeSource: 'Student Loan',
      moveInDate: '15/09/2026',
      tenancyLength: '12 months',
      propertyAddress: '45 City Centre, Leeds',
    },
    {
      id: 'app-3',
      type: 'individual',
      applicantName: 'Sophie Chen',
      propertyTitle: 'Modern 4-Bed Student House',
      compatibilityScore: 95,
      date: '1 day ago',
      university: 'MMU',
      monthlyIncome: '1,300',
      incomeSource: 'Student Loan & Scholarship',
      moveInDate: '01/09/2026',
      tenancyLength: '12 months',
      propertyAddress: '123 Student Street, Manchester',
    },
  ];

  const groupApplications = [
    {
      id: 'group-1',
      type: 'group',
      applicantName: 'Group: Sarah, Tom, Lisa & Mike',
      propertyTitle: 'Modern 4-Bed Student House',
      compatibilityScore: 89,
      date: '3 hours ago',
      university: 'University of Manchester',
      monthlyIncome: '4,800',
      incomeSource: 'Combined Student Loans',
      moveInDate: '01/09/2026',
      tenancyLength: '12 months',
      propertyAddress: '123 Student Street, Manchester',
      memberCount: 4,
    },
    {
      id: 'group-2',
      type: 'group',
      applicantName: 'Group: Alex, Jordan & Casey',
      propertyTitle: 'Spacious 3-Bed Flat',
      compatibilityScore: 94,
      date: '1 day ago',
      university: 'University of Leeds',
      monthlyIncome: '3,600',
      incomeSource: 'Combined Student Loans',
      moveInDate: '01/10/2026',
      tenancyLength: '12 months',
      propertyAddress: '78 Leeds Road, Leeds',
      memberCount: 3,
    },
  ];

  const applications = applicationType === 'individual' ? individualApplications : groupApplications;

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Stats Grid - Simplified */}
            <div className="grid grid-cols-2 gap-4">
              <StatCard
                title="Total Properties"
                value={stats.totalProperties.toString()}
                change="+2 this month"
                icon={Building}
                color="bg-hausta-dark"
              />
              <StatCard
                title="Pending Applications"
                value={stats.pendingApplications.toString()}
                icon={Clock}
                color="bg-orange-500"
              />
            </div>

            {/* Recent Applications */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-heading font-semibold text-hausta-dark">Recent Applications</h3>
                <button 
                  onClick={() => setActiveTab('applications')}
                  className="text-sm text-hausta-green hover:text-hausta-dark"
                >
                  View all
                </button>
              </div>
              <div className="space-y-3">
                {individualApplications.slice(0, 2).map((app) => (
                  <ApplicationCard 
                    key={app.id} 
                    application={app} 
                    onClick={() => setSelectedApplicant(app)}
                  />
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-lg font-heading font-semibold text-hausta-dark mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setShowAddProperty(true)}
                  className="p-4 bg-white rounded-xl shadow-soft hover:shadow-hover transition-shadow text-left"
                >
                  <div className="w-10 h-10 bg-hausta-accent/30 rounded-lg flex items-center justify-center mb-3">
                    <Plus className="w-5 h-5 text-hausta-dark" />
                  </div>
                  <p className="font-medium text-hausta-dark">Add Property</p>
                  <p className="text-sm text-gray-500">List a new property</p>
                </button>
                <button 
                  onClick={() => navigate('/messages')}
                  className="p-4 bg-white rounded-xl shadow-soft hover:shadow-hover transition-shadow text-left"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                    <MessageSquare className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="font-medium text-hausta-dark">Messages</p>
                  <p className="text-sm text-gray-500">Chat with applicants</p>
                </button>
                <button 
                  onClick={() => navigate('/profile')}
                  className="p-4 bg-white rounded-xl shadow-soft hover:shadow-hover transition-shadow text-left"
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                    <User className="w-5 h-5 text-purple-600" />
                  </div>
                  <p className="font-medium text-hausta-dark">Profile</p>
                  <p className="text-sm text-gray-500">Manage account</p>
                </button>
              </div>
            </div>
          </div>
        );

      case 'properties':
        return (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-lg font-heading font-semibold text-hausta-dark">Your Properties</h3>
              <Button 
                onClick={() => setShowAddProperty(true)}
                className="bg-hausta-dark hover:bg-hausta-green text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Property
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onView={() => {}}
                  onEdit={() => {}}
                  onDelete={() => {}}
                />
              ))}
            </div>
          </div>
        );

      case 'applications':
        return (
          <div className="space-y-4">
            {/* Application Type Tabs */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setApplicationType('individual')}
                className={`flex-1 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                  applicationType === 'individual'
                    ? 'bg-hausta-dark text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Individual ({individualApplications.length})
              </button>
              <button
                onClick={() => setApplicationType('group')}
                className={`flex-1 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                  applicationType === 'group'
                    ? 'bg-hausta-dark text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Group ({groupApplications.length})
              </button>
            </div>

            <h3 className="text-lg font-heading font-semibold text-hausta-dark">
              {applicationType === 'individual' ? 'Individual Applications' : 'Group Applications'}
            </h3>
            <div className="space-y-3">
              {applications.map((app) => (
                <ApplicationCard 
                  key={app.id} 
                  application={app} 
                  onClick={() => setSelectedApplicant(app)}
                />
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-hausta-light flex flex-col pb-20">
      {/* Header - Simplified */}
      <header className="bg-hausta-dark text-white">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img 
                src="/hausta-h-icon-white.png" 
                alt="hausta" 
                className="h-6 w-auto"
              />
              <span className="text-base font-heading font-bold">Welcome, {user?.firstName || 'Lister'}!</span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => navigate('/messages')}
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors relative"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                  3
                </span>
              </button>
              <button 
                onClick={() => navigate('/profile')}
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <User className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'border-hausta-dark text-hausta-dark'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('properties')}
              className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'properties'
                  ? 'border-hausta-dark text-hausta-dark'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Properties
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'applications'
                  ? 'border-hausta-dark text-hausta-dark'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Applications
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {renderContent()}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Modals */}
      <AnimatePresence>
        {selectedApplicant && selectedApplicant.type === 'group' && (
          <GroupProfileModal
            application={selectedApplicant}
            onClose={() => setSelectedApplicant(null)}
            onAccept={() => setSelectedApplicant(null)}
            onDecline={() => setSelectedApplicant(null)}
          />
        )}
        {selectedApplicant && selectedApplicant.type === 'individual' && (
          <ApplicantProfileModal
            application={selectedApplicant}
            onClose={() => setSelectedApplicant(null)}
            onAccept={() => setSelectedApplicant(null)}
            onDecline={() => setSelectedApplicant(null)}
          />
        )}
        {showAddProperty && (
          <AddPropertyModal onClose={() => setShowAddProperty(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
