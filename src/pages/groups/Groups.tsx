import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Users, 
  User, 
  Plus,
  MessageCircle,
  X,
  Layers,
  Search,
  Send,
  LogOut,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useStore } from '@/store/useStore';
import { mockGroups, mockStudents, mockProperties } from '@/data/mockData';
import BottomNav from '@/components/BottomNav';

// Group Card Component
function GroupCard({ group, onClick }: { group: typeof mockGroups[0]; onClick: () => void }) {
  const members = group.members.map(m => 
    mockStudents.find(s => s.id === m.userId)
  ).filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className="bg-white rounded-2xl p-5 shadow-soft cursor-pointer hover:shadow-hover transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-heading font-semibold text-hausta-dark">{group.name}</h3>
          <p className="text-sm text-gray-500">{members.length} members</p>
        </div>
        <div className="w-10 h-10 bg-hausta-accent/30 rounded-full flex items-center justify-center">
          <Users className="w-5 h-5 text-hausta-dark" />
        </div>
      </div>

      {/* Member Avatars */}
      <div className="flex items-center mb-4">
        <div className="flex -space-x-2">
          {members.slice(0, 4).map((member, idx) => (
            <div
              key={idx}
              className="w-10 h-10 rounded-full border-2 border-white bg-hausta-accent/30 flex items-center justify-center overflow-hidden"
            >
              {(member as any)?.avatar ? (
                <img src={(member as any).avatar} alt="" className="w-full h-full object-cover" />
              ) : (
                <User className="w-5 h-5 text-hausta-dark" />
              )}
            </div>
          ))}
        </div>
        {members.length > 4 && (
          <span className="ml-2 text-sm text-gray-500">+{members.length - 4} more</span>
        )}
      </div>

      {/* Shortlisted Stack Count */}
      {group.shortlistedProperties && group.shortlistedProperties.length > 0 && (
        <div className="bg-hausta-accent/10 rounded-xl p-3">
          <p className="text-sm text-gray-600 mb-2">
            <Layers className="w-4 h-4 inline mr-1" />
            {group.shortlistedProperties.length} properties in SHORTLISTED STACK
          </p>
        </div>
      )}
    </motion.div>
  );
}

// Group Detail View
function GroupDetail({ 
  group, 
  onBack,
  onOpenChat,
  onLeaveGroup
}: { 
  group: typeof mockGroups[0]; 
  onBack: () => void;
  onOpenChat: () => void;
  onLeaveGroup: () => void;
}) {
  const { user } = useStore();
  const [showAddMember, setShowAddMember] = useState(false);
  const [showShareProperty, setShowShareProperty] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'combined' | 'shortlisted'>('combined');
  const [appliedProperties, setAppliedProperties] = useState<Record<string, string[]>>({});
  
  const members = group.members.map(m => 
    mockStudents.find(s => s.id === m.userId)
  ).filter(Boolean);
  
  const sharedPropertyDetails = group.sharedProperties.map(id => 
    mockProperties.find(p => p.id === id)
  ).filter(Boolean);

  const shortlistedPropertyDetails = (group.shortlistedProperties || []).map(id =>
    mockProperties.find(p => p.id === id)
  ).filter(Boolean);

  // Mock available members to add
  const availableMembers = mockStudents.filter(s => 
    !group.members.some(m => m.userId === s.id)
  );

  const handleAddMember = (_memberId: string) => {
    setShowAddMember(false);
  };

  const handleShareProperty = (_propertyId: string) => {
    setShowShareProperty(false);
  };

  const handleApply = (propertyId: string) => {
    const currentUserId = user?.id || '';
    setAppliedProperties(prev => {
      const current = prev[propertyId] || [];
      if (current.includes(currentUserId)) {
        return prev; // Already applied
      }
      const updated = { ...prev, [propertyId]: [...current, currentUserId] };
      
      // Check if all members have applied
      const appliedCount = updated[propertyId].length;
      if (appliedCount === members.length) {
        // All members applied - send group application to lister
        alert(`Group application sent for property! All ${members.length} members have applied.`);
      }
      return updated;
    });
  };

  const hasUserApplied = (propertyId: string) => {
    return (appliedProperties[propertyId] || []).includes(user?.id || '');
  };

  const getApplyCount = (propertyId: string) => {
    return (appliedProperties[propertyId] || []).length;
  };

  return (
    <div className="min-h-screen bg-hausta-light flex flex-col pb-20">
      {/* Header */}
      <header className="bg-hausta-dark text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-heading font-bold">{group.name}</h1>
              <p className="text-sm text-white/70">Group chat & combined STACK</p>
            </div>
          </div>
          <button 
            onClick={onOpenChat}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
          {/* Members Section */}
          <div className="bg-white rounded-2xl p-5 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold text-hausta-dark">Members ({members.length})</h3>
              <button 
                onClick={() => setShowAddMember(true)}
                className="flex items-center gap-1 px-3 py-1.5 bg-hausta-dark text-white text-sm rounded-lg hover:bg-hausta-green transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Member
              </button>
            </div>
            <div className="space-y-3">
              {members.map((member, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-hausta-accent/30 flex items-center justify-center overflow-hidden">
                    {(member as any)?.avatar ? (
                      <img src={(member as any).avatar} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-6 h-6 text-hausta-dark" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-hausta-dark">
                      {(member as any)?.firstName} {(member as any)?.lastName?.[0]}.
                    </p>
                    <p className="text-xs text-gray-500">{(member as any)?.university}</p>
                  </div>
                  {idx === 0 && (
                    <span className="text-xs px-2 py-1 bg-hausta-dark text-white rounded">Admin</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tabs for Combined STACK vs SHORTLISTED */}
          <div className="bg-white rounded-2xl p-1 shadow-soft">
            <div className="flex">
              <button
                onClick={() => setActiveTab('combined')}
                className={`flex-1 py-3 text-sm font-medium rounded-xl transition-colors ${
                  activeTab === 'combined'
                    ? 'bg-hausta-dark text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Layers className="w-4 h-4 inline mr-1" />
                Combined STACK
              </button>
              <button
                onClick={() => setActiveTab('shortlisted')}
                className={`flex-1 py-3 text-sm font-medium rounded-xl transition-colors ${
                  activeTab === 'shortlisted'
                    ? 'bg-hausta-dark text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Check className="w-4 h-4 inline mr-1" />
                SHORTLISTED STACK
              </button>
            </div>
          </div>

          {/* Combined STACK View */}
          {activeTab === 'combined' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-semibold text-hausta-dark">Combined STACK</h3>
                <p className="text-sm text-gray-500">Everyone swipes on the same properties</p>
              </div>

              {sharedPropertyDetails.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 text-center shadow-soft">
                  <div className="w-16 h-16 bg-hausta-accent/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Layers className="w-8 h-8 text-hausta-dark" />
                  </div>
                  <p className="text-gray-600 mb-2">No properties in combined STACK yet</p>
                  <p className="text-sm text-gray-400 mb-4">Members can add properties from their individual STACKs</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {sharedPropertyDetails.map((property) => {
                    const applyCount = getApplyCount(property?.id || '');
                    const allApplied = applyCount === members.length;
                    const userApplied = hasUserApplied(property?.id || '');

                    return (
                      <motion.div
                        key={property?.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl overflow-hidden shadow-soft"
                      >
                        <div className="flex flex-col sm:flex-row">
                          <img
                            src={property?.images[0]}
                            alt={property?.title}
                            className="w-full sm:w-32 h-48 sm:h-32 object-cover"
                          />
                          <div className="flex-1 p-4">
                            <h4 className="font-heading font-semibold text-hausta-dark">{property?.title}</h4>
                            <p className="text-sm text-gray-500">{property?.address}</p>
                            <p className="text-hausta-green font-bold mt-1">£{property?.price}/month</p>
                            
                            {/* Apply Progress */}
                            <div className="mt-3 flex items-center gap-3">
                              <div className="flex-1 bg-gray-100 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full transition-all ${
                                    allApplied ? 'bg-green-500' : 'bg-hausta-green'
                                  }`}
                                  style={{ width: `${(applyCount / members.length) * 100}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-600">
                                {applyCount}/{members.length} applied
                              </span>
                            </div>
                            
                            {/* APPLY Button */}
                            <div className="flex gap-2 mt-3">
                              {allApplied ? (
                                <button 
                                  disabled
                                  className="flex-1 py-2 bg-green-500 text-white text-sm rounded-lg flex items-center justify-center gap-1"
                                >
                                  <Check className="w-4 h-4" />
                                  Application Sent!
                                </button>
                              ) : (
                                <button 
                                  onClick={() => handleApply(property?.id || '')}
                                  disabled={userApplied}
                                  className={`flex-1 py-2 text-sm rounded-lg flex items-center justify-center gap-1 transition-colors ${
                                    userApplied
                                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                      : 'bg-hausta-green text-white hover:bg-green-600'
                                  }`}
                                >
                                  {userApplied ? (
                                    <>
                                      <Check className="w-4 h-4" />
                                      You Applied
                                    </>
                                  ) : (
                                    'APPLY'
                                  )}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* SHORTLISTED STACK View */}
          {activeTab === 'shortlisted' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-semibold text-hausta-dark">SHORTLISTED STACK</h3>
                <p className="text-sm text-gray-500">Properties everyone mutually liked</p>
              </div>

              {shortlistedPropertyDetails.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 text-center shadow-soft">
                  <div className="w-16 h-16 bg-hausta-accent/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-hausta-dark" />
                  </div>
                  <p className="text-gray-600 mb-2">No shortlisted properties yet</p>
                  <p className="text-sm text-gray-400 mb-4">Properties that all members like will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {shortlistedPropertyDetails.map((property) => {
                    const applyCount = getApplyCount(property?.id || '');
                    const allApplied = applyCount === members.length;
                    const userApplied = hasUserApplied(property?.id || '');

                    return (
                      <motion.div
                        key={property?.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl overflow-hidden shadow-soft border-2 border-hausta-green/30"
                      >
                        <div className="flex flex-col sm:flex-row">
                          <img
                            src={property?.images[0]}
                            alt={property?.title}
                            className="w-full sm:w-32 h-48 sm:h-32 object-cover"
                          />
                          <div className="flex-1 p-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-heading font-semibold text-hausta-dark">{property?.title}</h4>
                                <p className="text-sm text-gray-500">{property?.address}</p>
                              </div>
                              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                                Shortlisted
                              </span>
                            </div>
                            <p className="text-hausta-green font-bold mt-1">£{property?.price}/month</p>
                            
                            {/* Apply Progress */}
                            <div className="mt-3 flex items-center gap-3">
                              <div className="flex-1 bg-gray-100 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full transition-all ${
                                    allApplied ? 'bg-green-500' : 'bg-hausta-green'
                                  }`}
                                  style={{ width: `${(applyCount / members.length) * 100}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-600">
                                {applyCount}/{members.length} applied
                              </span>
                            </div>
                            
                            {/* APPLY Button */}
                            <div className="flex gap-2 mt-3">
                              {allApplied ? (
                                <button 
                                  disabled
                                  className="flex-1 py-2 bg-green-500 text-white text-sm rounded-lg flex items-center justify-center gap-1"
                                >
                                  <Check className="w-4 h-4" />
                                  Application Sent!
                                </button>
                              ) : (
                                <button 
                                  onClick={() => handleApply(property?.id || '')}
                                  disabled={userApplied}
                                  className={`flex-1 py-2 text-sm rounded-lg flex items-center justify-center gap-1 transition-colors ${
                                    userApplied
                                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                      : 'bg-hausta-green text-white hover:bg-green-600'
                                  }`}
                                >
                                  {userApplied ? (
                                    <>
                                      <Check className="w-4 h-4" />
                                      You Applied
                                    </>
                                  ) : (
                                    'APPLY'
                                  )}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Group Actions */}
          <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
            <button 
              onClick={onOpenChat}
              className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
            >
              <MessageCircle className="w-5 h-5 text-hausta-dark" />
              <span className="text-hausta-dark">Open Group Chat</span>
            </button>
            <div className="border-t border-gray-100" />
            <button 
              onClick={() => setShowShareProperty(true)}
              className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
            >
              <Layers className="w-5 h-5 text-hausta-dark" />
              <span className="text-hausta-dark">Add to Combined STACK</span>
            </button>
            <div className="border-t border-gray-100" />
            <button 
              onClick={onLeaveGroup}
              className="w-full p-4 flex items-center gap-3 hover:bg-red-50 transition-colors text-left text-red-600"
            >
              <LogOut className="w-5 h-5" />
              <span>Leave Group</span>
            </button>
          </div>
        </div>
      </div>

      {/* Add Member Modal */}
      <AnimatePresence>
        {showAddMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={() => setShowAddMember(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-heading font-bold text-hausta-dark">Add Member</h2>
                  <button onClick={() => setShowAddMember(false)}>
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>
                <div className="relative mt-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search by name or university..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-11 border-gray-200 rounded-xl"
                  />
                </div>
              </div>
              <div className="overflow-y-auto max-h-[50vh] p-4">
                <p className="text-sm text-gray-500 mb-3">Suggested Members</p>
                <div className="space-y-3">
                  {availableMembers.slice(0, 5).map((member) => (
                    <div key={member.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-12 h-12 rounded-full bg-hausta-accent/30 flex items-center justify-center overflow-hidden">
                        {member.avatar ? (
                          <img src={member.avatar} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-6 h-6 text-hausta-dark" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-hausta-dark">{member.firstName} {member.lastName}</p>
                        <p className="text-xs text-gray-500">{member.university}</p>
                      </div>
                      <button 
                        onClick={() => handleAddMember(member.id)}
                        className="px-4 py-2 bg-hausta-dark text-white text-sm rounded-lg hover:bg-hausta-green transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Property Modal */}
      <AnimatePresence>
        {showShareProperty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={() => setShowShareProperty(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-heading font-bold text-hausta-dark">Add to Combined STACK</h2>
                  <button onClick={() => setShowShareProperty(false)}>
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>
                <div className="relative mt-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search properties..."
                    className="pl-10 h-11 border-gray-200 rounded-xl"
                  />
                </div>
              </div>
              <div className="overflow-y-auto max-h-[50vh] p-4">
                <p className="text-sm text-gray-500 mb-3">Your STACK</p>
                <div className="space-y-3">
                  {mockProperties.slice(0, 3).map((property) => (
                    <div key={property.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <img 
                        src={property.images[0]} 
                        alt="" 
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-hausta-dark text-sm">{property.title}</p>
                        <p className="text-xs text-gray-500">{property.address}</p>
                        <p className="text-hausta-green font-bold text-sm">£{property.price}/mo</p>
                      </div>
                      <button 
                        onClick={() => handleShareProperty(property.id)}
                        className="px-4 py-2 bg-hausta-dark text-white text-sm rounded-lg hover:bg-hausta-green transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

// Group Chat Component
function GroupChat({ group, onBack }: { group: typeof mockGroups[0]; onBack: () => void }) {
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', sender: 'Emma', content: 'Hey everyone! What do you think of that property on Oxford Road?', time: '2:30 PM' },
    { id: '2', sender: 'James', content: 'Looks great! The location is perfect for uni.', time: '2:32 PM' },
    { id: '3', sender: 'You', content: 'I agree! Should we arrange a viewing?', time: '2:35 PM', isOwn: true },
  ]);

  const handleSend = () => {
    if (messageInput.trim()) {
      setMessages([...messages, {
        id: Date.now().toString(),
        sender: 'You',
        content: messageInput,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      }]);
      setMessageInput('');
    }
  };

  return (
    <div className="min-h-screen bg-hausta-light flex flex-col pb-20">
      {/* Header */}
      <header className="bg-hausta-dark text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-heading font-bold">{group.name}</h1>
              <p className="text-sm text-white/70">{group.members.length} members</p>
            </div>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-7xl mx-auto w-full">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] px-4 py-3 rounded-2xl ${
              msg.isOwn 
                ? 'bg-hausta-dark text-white rounded-br-md' 
                : 'bg-white text-gray-800 rounded-bl-md shadow-sm'
            }`}>
              {!msg.isOwn && <p className="text-xs text-hausta-green font-medium mb-1">{msg.sender}</p>}
              <p className="text-sm">{msg.content}</p>
              <span className={`text-xs mt-1 block ${msg.isOwn ? 'text-white/60' : 'text-gray-400'}`}>
                {msg.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-100 p-4">
        <div className="flex items-center gap-2 max-w-7xl mx-auto">
          <Input
            placeholder="Type a message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 h-12 border-gray-200 rounded-xl"
          />
          <Button
            onClick={handleSend}
            disabled={!messageInput.trim()}
            className="w-12 h-12 bg-hausta-dark hover:bg-hausta-green text-white p-0 rounded-full"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

// Main Groups Page
export default function Groups() {
  const navigate = useNavigate();
  const { user, leaveGroup } = useStore();
  const [selectedGroup, setSelectedGroup] = useState<typeof mockGroups[0] | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [localGroups, setLocalGroups] = useState(mockGroups);

  const handleCreateGroup = () => {
    if (newGroupName.trim()) {
      const newGroup = {
        id: `group-${Date.now()}`,
        name: newGroupName.trim(),
        members: [{ userId: user?.id || '', role: 'admin' as const }],
        sharedProperties: [],
        shortlistedProperties: [],
        votes: [],
        createdAt: new Date().toISOString(),
      };
      setLocalGroups([...localGroups, newGroup]);
      setShowCreateModal(false);
      setNewGroupName('');
    }
  };

  const handleLeaveGroup = (groupId: string) => {
    setLocalGroups(localGroups.filter(g => g.id !== groupId));
    setSelectedGroup(null);
    leaveGroup(groupId);
  };

  const handleOpenChat = (group: typeof mockGroups[0]) => {
    setSelectedGroup(group);
    setShowChat(true);
  };

  if (showChat && selectedGroup) {
    return <GroupChat group={selectedGroup} onBack={() => setShowChat(false)} />;
  }

  if (selectedGroup) {
    return (
      <GroupDetail 
        group={selectedGroup} 
        onBack={() => setSelectedGroup(null)}
        onOpenChat={() => handleOpenChat(selectedGroup)}
        onLeaveGroup={() => handleLeaveGroup(selectedGroup.id)}
      />
    );
  }

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
            <h1 className="text-xl font-heading font-bold">My Groups</h1>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {localGroups.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-hausta-accent/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-12 h-12 text-hausta-dark" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-hausta-dark mb-3">
                No groups yet
              </h2>
              <p className="text-gray-600 mb-6 max-w-xs mx-auto">
                Create a group with your matched housemates to share and vote on properties together.
              </p>
              <Button 
                onClick={() => setShowCreateModal(true)}
                className="bg-hausta-dark text-white"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Group
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {localGroups.map((group) => (
                <GroupCard
                  key={group.id}
                  group={group}
                  onClick={() => setSelectedGroup(group)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Group Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-heading font-bold text-hausta-dark">
                  Create New Group
                </h2>
                <button onClick={() => setShowCreateModal(false)}>
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>
              <p className="text-gray-600 mb-6">
                Create a group to share properties and apply with your housemates.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Group Name</label>
                  <Input
                    type="text"
                    placeholder="e.g., The Fallowfield Crew"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    className="h-12 border-gray-200 rounded-xl"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 py-3 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateGroup}
                    disabled={!newGroupName.trim()}
                    className="flex-1 py-3 bg-hausta-dark text-white rounded-xl hover:bg-hausta-green disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Create Group
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
