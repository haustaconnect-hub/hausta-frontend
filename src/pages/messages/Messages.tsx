import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Send,
  Search,
  Phone,
  Info,
  Image as ImageIcon,
  Home,
  Users,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useStore } from '@/store/useStore';
import { mockStudents, mockProperties, mockLandlords } from '@/data/mockData';
import BottomNav from '@/components/BottomNav';

// Conversation List Item
function ConversationItem({ 
  conversation, 
  isActive, 
  onClick 
}: { 
  conversation: any; 
  isActive: boolean; 
  onClick: () => void;
}) {
  const { user } = useStore();
  const otherParticipantId = conversation.participants.find((id: string) => id !== user?.id);
  
  // Find participant details
  const participant = 
    mockStudents.find(s => s.id === otherParticipantId) ||
    mockLandlords.find(l => l.id === otherParticipantId);
  
  const property = conversation.propertyId 
    ? mockProperties.find(p => p.id === conversation.propertyId)
    : null;

  return (
    <button
      onClick={onClick}
      className={`w-full p-4 flex items-center gap-3 transition-colors ${
        isActive ? 'bg-hausta-accent/20' : 'hover:bg-gray-50'
      }`}
    >
      <div className="relative">
        <div className="w-14 h-14 rounded-full bg-hausta-accent/30 flex items-center justify-center overflow-hidden">
          {participant?.avatar ? (
            <img src={participant.avatar} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-hausta-dark flex items-center justify-center text-white text-lg font-semibold">
              {participant?.firstName?.[0]}{participant?.lastName?.[0]}
            </div>
          )}
        </div>
        {conversation.unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
            {conversation.unreadCount}
          </span>
        )}
      </div>
      <div className="flex-1 text-left">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-hausta-dark">
            {participant?.firstName} {participant?.lastName?.[0]}.
          </p>
          <span className="text-xs text-gray-400">
            {conversation.lastMessage && new Date(conversation.lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        {property && (
          <p className="text-xs text-hausta-green flex items-center gap-1">
            <Home className="w-3 h-3" />
            {property.title}
          </p>
        )}
        <p className="text-sm text-gray-500 truncate mt-0.5">
          {conversation.lastMessage?.content || 'No messages yet'}
        </p>
      </div>
    </button>
  );
}

// Message Bubble
function MessageBubble({ message, isOwn }: { message: any; isOwn: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl ${
          isOwn
            ? 'bg-hausta-dark text-white rounded-br-md'
            : 'bg-gray-100 text-gray-800 rounded-bl-md'
        }`}
      >
        <p className="text-sm">{message.content}</p>
        <span className={`text-xs mt-1 block ${isOwn ? 'text-white/60' : 'text-gray-400'}`}>
          {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </motion.div>
  );
}

export default function Messages() {
  const navigate = useNavigate();
  const { user, conversations, messages, sendMessage, setActiveConversation, activeConversation } = useStore();
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeColumn, setActiveColumn] = useState<'housemates' | 'housing' | 'matches' | 'chats'>('housemates');

  const currentConversation = conversations.find(c => c.id === activeConversation);
  
  const conversationMessages = activeConversation
    ? messages.filter(m => m.conversationId === activeConversation)
    : [];

  // Filter conversations by type - different for students vs listers
  const isLister = user?.role === 'landlord' || user?.role === 'agent';
  
  const housemateConversations = conversations.filter(c => c.type === 'housemate');
  const housingConversations = conversations.filter(c => c.type === 'property' || c.type === 'landlord');
  // For listers, we'll use the same conversation types but display them differently
  const listerConversations = conversations.filter(c => c.type === 'property' || c.type === 'landlord' || c.type === 'housemate');

  const displayedConversations = isLister 
    ? listerConversations
    : (activeColumn === 'housemates' ? housemateConversations : housingConversations);

  const handleSendMessage = () => {
    if (messageInput.trim() && activeConversation) {
      sendMessage(activeConversation, messageInput.trim());
      setMessageInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Get other participant details
  const otherParticipantId = currentConversation?.participants.find(id => id !== user?.id);
  const otherParticipant = 
    mockStudents.find(s => s.id === otherParticipantId) ||
    mockLandlords.find(l => l.id === otherParticipantId);
  
  const relatedProperty = currentConversation?.propertyId
    ? mockProperties.find(p => p.id === currentConversation.propertyId)
    : null;

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
            <h1 className="text-xl font-heading font-bold">Messages</h1>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full">
        {/* Conversations Sidebar */}
        <div className={`${activeConversation ? 'hidden lg:flex' : 'flex'} flex-col w-full lg:w-96 bg-white border-r border-gray-100`}>
          {/* Column Tabs - Different for listers vs students */}
          <div className="flex border-b border-gray-100">
            {isLister ? (
              <>
                <button
                  onClick={() => setActiveColumn('matches')}
                  className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-2 ${
                    activeColumn === 'matches'
                      ? 'border-hausta-dark text-hausta-dark'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  Matches
                </button>
                <button
                  onClick={() => setActiveColumn('chats')}
                  className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-2 ${
                    activeColumn === 'chats'
                      ? 'border-hausta-dark text-hausta-dark'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  Chats
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setActiveColumn('housemates')}
                  className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-2 ${
                    activeColumn === 'housemates'
                      ? 'border-hausta-dark text-hausta-dark'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  Housemates
                </button>
                <button
                  onClick={() => setActiveColumn('housing')}
                  className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-2 ${
                    activeColumn === 'housing'
                      ? 'border-hausta-dark text-hausta-dark'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  Housing
                </button>
              </>
            )}
          </div>

          {/* Search */}
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder={`Search ${isLister ? (activeColumn === 'matches' ? 'matches' : 'chats') : activeColumn}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 border-gray-200 rounded-xl"
              />
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            {displayedConversations.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {activeColumn === 'housemates' || activeColumn === 'matches' ? (
                    <Users className="w-8 h-8 text-gray-400" />
                  ) : (
                    <Home className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <p className="text-gray-500">No {isLister ? (activeColumn === 'matches' ? 'matches' : 'chats') : activeColumn} messages yet</p>
                <p className="text-sm text-gray-400 mt-1">
                  Start swiping to match with {isLister ? (activeColumn === 'matches' ? 'potential tenants' : 'applicants') : activeColumn}!
                </p>
              </div>
            ) : (
              displayedConversations.map((conversation) => (
                <ConversationItem
                  key={conversation.id}
                  conversation={conversation}
                  isActive={activeConversation === conversation.id}
                  onClick={() => setActiveConversation(conversation.id)}
                />
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`${activeConversation ? 'flex' : 'hidden lg:flex'} flex-1 flex-col bg-hausta-light`}>
          {activeConversation && currentConversation ? (
            <>
              {/* Chat Header */}
              <div className="bg-white border-b border-gray-100 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setActiveConversation(null)}
                      className="lg:hidden w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
                    >
                      <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <div className="w-12 h-12 rounded-full bg-hausta-accent/30 flex items-center justify-center overflow-hidden">
                      {otherParticipant?.avatar ? (
                        <img src={otherParticipant.avatar} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-hausta-dark flex items-center justify-center text-white font-semibold">
                          {otherParticipant?.firstName?.[0]}{otherParticipant?.lastName?.[0]}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-hausta-dark">
                        {otherParticipant?.firstName} {otherParticipant?.lastName?.[0]}.
                      </p>
                      {relatedProperty && (
                        <p className="text-xs text-hausta-green flex items-center gap-1">
                          <Home className="w-3 h-3" />
                          {relatedProperty.title}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
                      <Phone className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
                      <Info className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Property Context (if applicable) */}
              {relatedProperty && (
                <div className="bg-white border-b border-gray-100 p-3">
                  <div className="flex items-center gap-3 bg-hausta-accent/10 rounded-xl p-3">
                    <img
                      src={relatedProperty.images[0]}
                      alt=""
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-hausta-dark text-sm">{relatedProperty.title}</p>
                      <p className="text-xs text-gray-500">{relatedProperty.address}</p>
                      <p className="text-sm font-bold text-hausta-green">£{relatedProperty.price}/month</p>
                    </div>
                    <button className="px-3 py-1.5 bg-hausta-dark text-white text-xs rounded-lg">
                      View
                    </button>
                  </div>
                </div>
              )}

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {conversationMessages.map((message) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    isOwn={message.senderId === user?.id}
                  />
                ))}
              </div>

              {/* Input Area */}
              <div className="bg-white border-t border-gray-100 p-4">
                <div className="flex items-center gap-2">
                  <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
                    <ImageIcon className="w-5 h-5 text-gray-600" />
                  </button>
                  <Input
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 h-12 border-gray-200 rounded-xl"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    className="w-12 h-12 bg-hausta-dark hover:bg-hausta-green text-white p-0 rounded-full"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-hausta-accent/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="w-12 h-12 text-hausta-dark" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-hausta-dark mb-3">
                  Your Messages
                </h2>
                <p className="text-gray-600 max-w-xs mx-auto">
                  Select a conversation from the sidebar to start chatting with housemates and landlords.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
