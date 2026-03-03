import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authAPI, userAPI, propertyAPI, matchAPI, groupAPI, applicationAPI, messageAPI } from '@/services/api';

// Types
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'landlord' | 'agent' | 'admin';
  avatar?: string;
  isVerified: boolean;
  studentType?: string;
  university?: string;
  budgetMin?: number;
  budgetMax?: number;
  preferredLocation?: string;
  moveInDate?: string;
  quizAnswers?: Record<string, string>;
  bio?: string;
  contractInfo?: Record<string, any>;
  companyName?: string;
  phone?: string;
  subscriptionStatus?: string;
}

interface Property {
  id: string;
  title: string;
  description: string;
  address: string;
  city: string;
  postcode: string;
  location?: { coordinates: [number, number] };
  type: string;
  price: number;
  deposit: number;
  bedrooms: number;
  bathrooms: number;
  availableFrom: string;
  availableUntil?: string;
  minTerm: number;
  maxTerm?: number;
  billsIncluded: boolean;
  furnished: boolean;
  amenities: string[];
  images: { url: string; key: string; isPrimary: boolean }[];
  primaryImage?: string;
  transportLinks?: any[];
  nearbyUniversities?: string[];
  landlord?: any;
  landlordId?: string;
  status: string;
  viewCount: number;
  likeCount: number;
  stackCount: number;
  createdAt?: string;
  updatedAt?: string;
}

interface Housemate {
  id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  university?: string;
  budgetMax?: number;
  quizAnswers?: Record<string, string>;
  bio?: string;
  preferredLocation?: string;
  moveInDate?: string;
}

interface Group {
  id: string;
  name: string;
  members: any[];
  sharedProperties: any[];
  shortlistedProperties: any[];
  votes: any[];
  applications: any[];
  messages: any[];
  memberCount: number;
  isAdmin: boolean;
  createdAt: string;
}

interface Application {
  id: string;
  type: 'individual' | 'group';
  property: any;
  landlord: any;
  applicant?: any;
  group?: any;
  status: string;
  message?: string;
  preferredViewingDate?: string;
  arrangedViewingDate?: string;
  contractDetails?: any;
  groupConfirmations?: any[];
  landlordResponse?: string;
  createdAt: string;
}

interface Conversation {
  id: string;
  type: string;
  title?: string;
  participants: any[];
  property?: any;
  propertyId?: string;
  group?: any;
  lastMessage?: any;
  unreadCount: number;
  updatedAt: string;
}

interface Message {
  id: string;
  senderId: string;
  conversationId: string;
  content: string;
  type: string;
  propertyId?: string;
  createdAt: string;
}

interface AppState {
  // Auth
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Data
  properties: Property[];
  myProperties: Property[];
  housemates: Housemate[];
  savedProperties: string[];
  likedProperties: string[];
  mutualMatches: { properties: string[]; housemates: string[] };
  groups: Group[];
  applications: Application[];
  conversations: Conversation[];
  messages: Message[];
  activeConversation: string | null;
  unreadCount: number;
  
  // UI State
  activeTab: 'properties' | 'housemates';
  currentCardIndex: number;
  
  // Onboarding State (backward compatibility)
  step: number;
  studentType: string;
  budgetMin: number;
  budgetMax: number;
  moveInDate: string;
  moveOutDate: string;
  quizAnswers: Record<string, string>;
  
  // Stats (for landlord dashboard)
  stats: {
    totalProperties: number;
    pendingApplications: number;
    monthlyRevenue: number;
    occupancyRate: number;
  };
  
  // Auth Actions
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
  updateUser: (data: any) => void;
  
  // Property Actions
  fetchHousemates: (params?: any) => Promise<void>;
  fetchProperties: (params?: any) => Promise<void>;
  fetchMyProperties: () => Promise<void>;
  createProperty: (data: any) => Promise<any>;
  updateProperty: (id: string, data: any) => Promise<any>;
  deleteProperty: (id: string) => Promise<void>;
  
  // Match Actions
  likeProperty: (propertyId: string) => Promise<void>;
  likeHousemate: (userId: string) => Promise<void>;
  saveProperty: (propertyId: string) => void;
  skipProperty: (propertyId: string) => Promise<void>;
  skipHousemate: (userId: string) => Promise<void>;
  fetchStack: () => Promise<void>;
  fetchMutualMatches: () => Promise<void>;
  
  // Group Actions
  fetchGroups: () => Promise<void>;
  createGroup: (name: string) => Promise<any>;
  leaveGroup: (groupId: string) => Promise<void>;
  voteOnProperty: (groupId: string, propertyId: string, vote: string) => Promise<void>;
  shareProperty: (groupId: string, propertyId: string) => Promise<void>;
  addMember: (groupId: string, userId: string) => Promise<void>;
  
  // Application Actions
  fetchApplications: () => Promise<void>;
  fetchLandlordApplications: () => Promise<void>;
  submitApplication: (data: any) => Promise<any>;
  
  // Message Actions
  fetchConversations: () => Promise<void>;
  fetchUnreadCount: () => Promise<void>;
  sendMessage: (conversationId: string, content: string) => Promise<void>;
  setActiveConversation: (id: string | null) => void;
  
  // UI Actions
  setActiveTab: (tab: 'properties' | 'housemates') => void;
  setCurrentCardIndex: (index: number) => void;
  clearError: () => void;
  
  // Onboarding Actions (backward compatibility)
  setStep: (step: number) => void;
  setStudentType: (type: string) => void;
  setBudget: (min: number, max: number) => void;
  setMoveInDate: (date: string) => void;
  setMoveOutDate: (date: string) => void;
  setQuizAnswer: (key: string, value: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      properties: [],
      myProperties: [],
      housemates: [],
      savedProperties: [],
      likedProperties: [],
      mutualMatches: { properties: [], housemates: [] },
      groups: [],
      applications: [],
      conversations: [],
      messages: [],
      activeConversation: null,
      unreadCount: 0,
      
      activeTab: 'properties',
      currentCardIndex: 0,
      
      // Onboarding defaults
      step: 1,
      studentType: 'full',
      budgetMin: 400,
      budgetMax: 800,
      moveInDate: '',
      moveOutDate: '',
      quizAnswers: {},
      
      // Stats defaults
      stats: {
        totalProperties: 0,
        pendingApplications: 0,
        monthlyRevenue: 0,
        occupancyRate: 0,
      },
      
      // Auth Actions
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authAPI.login({ email, password });
          const { token, user } = response.data;
          
          localStorage.setItem('hausta_token', token);
          set({ 
            user, 
            token, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (error: any) {
          set({ 
            error: error.response?.data?.message || 'Login failed', 
            isLoading: false 
          });
          throw error;
        }
      },
      
      register: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authAPI.register(data);
          const { token, user } = response.data;
          
          localStorage.setItem('hausta_token', token);
          set({ 
            user, 
            token, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (error: any) {
          set({ 
            error: error.response?.data?.message || 'Registration failed', 
            isLoading: false 
          });
          throw error;
        }
      },
      
      logout: () => {
        localStorage.removeItem('hausta_token');
        localStorage.removeItem('hausta_user');
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          properties: [],
          myProperties: [],
          housemates: [],
          savedProperties: [],
          likedProperties: [],
          mutualMatches: { properties: [], housemates: [] },
          groups: [],
          applications: [],
          conversations: [],
          messages: [],
        });
      },
      
      fetchUser: async () => {
        try {
          const response = await authAPI.getMe();
          set({ user: response.data.user });
        } catch (error) {
          get().logout();
        }
      },
      
      updateProfile: async (data) => {
        set({ isLoading: true });
        try {
          const response = await userAPI.updateProfile(data);
          set({ user: { ...get().user, ...response.data.user }, isLoading: false });
        } catch (error: any) {
          set({ error: error.response?.data?.message, isLoading: false });
          throw error;
        }
      },
      
      updateUser: (data) => {
        set({ user: { ...get().user, ...data } });
      },
      
      // Property Actions
      fetchProperties: async (params = {}) => {
        set({ isLoading: true });
        try {
          const response = await propertyAPI.getAll(params);
          set({ properties: response.data.properties, isLoading: false });
        } catch (error: any) {
          set({ error: error.response?.data?.message, isLoading: false });
        }
      },
      
      fetchMyProperties: async () => {
        set({ isLoading: true });
        try {
          const response = await propertyAPI.getMyProperties();
          set({ 
            myProperties: response.data.properties,
            stats: {
              ...get().stats,
              totalProperties: response.data.properties.length,
            },
            isLoading: false 
          });
        } catch (error: any) {
          set({ error: error.response?.data?.message, isLoading: false });
        }
      },
      
      createProperty: async (data) => {
        set({ isLoading: true });
        try {
          const response = await propertyAPI.create(data);
          set({ 
            myProperties: [...get().myProperties, response.data.property],
            isLoading: false 
          });
          return response.data.property;
        } catch (error: any) {
          set({ error: error.response?.data?.message, isLoading: false });
          throw error;
        }
      },
      
      updateProperty: async (id, data) => {
        set({ isLoading: true });
        try {
          const response = await propertyAPI.update(id, data);
          set({
            myProperties: get().myProperties.map(p => 
              p.id === id ? response.data.property : p
            ),
            isLoading: false
          });
          return response.data.property;
        } catch (error: any) {
          set({ error: error.response?.data?.message, isLoading: false });
          throw error;
        }
      },
      
      deleteProperty: async (id) => {
        set({ isLoading: true });
        try {
          await propertyAPI.delete(id);
          set({
            myProperties: get().myProperties.filter(p => p.id !== id),
            isLoading: false
          });
        } catch (error: any) {
          set({ error: error.response?.data?.message, isLoading: false });
          throw error;
        }
      },
      
      // Housemate Actions
      fetchHousemates: async (params = {}) => {
        set({ isLoading: true });
        try {
          const response = await userAPI.getStudents(params);
          set({ housemates: response.data.users, isLoading: false });
        } catch (error: any) {
          set({ error: error.response?.data?.message, isLoading: false });
        }
      },
      
      // Match Actions
      likeProperty: async (propertyId) => {
        try {
          await matchAPI.like(propertyId, 'property');
          set({
            likedProperties: [...get().likedProperties, propertyId],
          });
        } catch (error) {
          console.error('Error liking property:', error);
        }
      },
      
      likeHousemate: async (userId) => {
        try {
          await matchAPI.like(userId, 'user');
        } catch (error) {
          console.error('Error liking housemate:', error);
        }
      },
      
      saveProperty: (propertyId) => {
        set({
          savedProperties: [...get().savedProperties, propertyId],
        });
        // Also call API
        matchAPI.stack(propertyId).catch(console.error);
      },
      
      skipProperty: async (propertyId) => {
        try {
          await matchAPI.pass(propertyId, 'property');
        } catch (error) {
          console.error('Error skipping property:', error);
        }
      },
      
      skipHousemate: async (userId) => {
        try {
          await matchAPI.pass(userId, 'user');
        } catch (error) {
          console.error('Error skipping housemate:', error);
        }
      },
      
      fetchStack: async () => {
        try {
          const response = await matchAPI.getStack();
          const savedIds = response.data.stack.map((s: any) => s.property?.id || s.targetId);
          set({ savedProperties: savedIds });
        } catch (error) {
          console.error('Error fetching stack:', error);
        }
      },
      
      fetchMutualMatches: async () => {
        try {
          const propertiesRes = await matchAPI.getMutual({ targetType: 'property' });
          const housematesRes = await matchAPI.getMutual({ targetType: 'user' });
          
          set({ 
            mutualMatches: {
              properties: propertiesRes.data.mutuals.map((m: any) => m.targetId?.id || m.targetId),
              housemates: housematesRes.data.mutuals.map((m: any) => m.targetId?.id || m.targetId),
            }
          });
        } catch (error) {
          console.error('Error fetching mutual matches:', error);
        }
      },
      
      // Group Actions
      fetchGroups: async () => {
        try {
          const response = await groupAPI.getAll();
          set({ groups: response.data.groups });
        } catch (error) {
          console.error('Error fetching groups:', error);
        }
      },
      
      createGroup: async (name) => {
        try {
          const response = await groupAPI.create(name);
          set({ groups: [...get().groups, response.data.group] });
          return response.data.group;
        } catch (error) {
          console.error('Error creating group:', error);
          throw error;
        }
      },
      
      leaveGroup: async (groupId) => {
        try {
          await groupAPI.delete(groupId);
          set({ groups: get().groups.filter(g => g.id !== groupId) });
        } catch (error) {
          console.error('Error leaving group:', error);
          throw error;
        }
      },
      
      voteOnProperty: async (groupId, propertyId, vote) => {
        try {
          await groupAPI.vote(groupId, propertyId, vote as 'yes' | 'no' | 'maybe');
        } catch (error) {
          console.error('Error voting:', error);
          throw error;
        }
      },
      
      shareProperty: async (groupId, propertyId) => {
        try {
          await groupAPI.addProperty(groupId, propertyId);
        } catch (error) {
          console.error('Error sharing property:', error);
          throw error;
        }
      },
      
      addMember: async (groupId, userId) => {
        try {
          await groupAPI.addMember(groupId, userId);
        } catch (error) {
          console.error('Error adding member:', error);
          throw error;
        }
      },
      
      // Application Actions
      fetchApplications: async () => {
        try {
          const response = await applicationAPI.getMyApplications();
          set({ applications: response.data.applications });
        } catch (error) {
          console.error('Error fetching applications:', error);
        }
      },
      
      fetchLandlordApplications: async () => {
        try {
          const response = await applicationAPI.getLandlordApplications();
          set({ 
            applications: response.data.applications,
            stats: {
              ...get().stats,
              pendingApplications: response.data.applications.filter((a: any) => a.status === 'pending').length,
            }
          });
        } catch (error) {
          console.error('Error fetching landlord applications:', error);
        }
      },
      
      submitApplication: async (data) => {
        try {
          const response = await applicationAPI.create(data);
          return response.data.application;
        } catch (error) {
          console.error('Error submitting application:', error);
          throw error;
        }
      },
      
      // Message Actions
      fetchConversations: async () => {
        try {
          const response = await messageAPI.getConversations();
          set({ conversations: response.data.conversations });
        } catch (error) {
          console.error('Error fetching conversations:', error);
        }
      },
      
      fetchUnreadCount: async () => {
        try {
          const response = await messageAPI.getUnreadCount();
          set({ unreadCount: response.data.unreadCount });
        } catch (error) {
          console.error('Error fetching unread count:', error);
        }
      },
      
      sendMessage: async (conversationId, content) => {
        try {
          await messageAPI.sendMessage(conversationId, content);
        } catch (error) {
          console.error('Error sending message:', error);
          throw error;
        }
      },
      
      setActiveConversation: (id) => {
        set({ activeConversation: id });
      },
      
      // UI Actions
      setActiveTab: (tab) => set({ activeTab: tab }),
      setCurrentCardIndex: (index) => set({ currentCardIndex: index }),
      clearError: () => set({ error: null }),
      
      // Onboarding Actions
      setStep: (step) => set({ step }),
      setStudentType: (type) => set({ studentType: type }),
      setBudget: (min, max) => set({ budgetMin: min, budgetMax: max }),
      setMoveInDate: (date) => set({ moveInDate: date }),
      setMoveOutDate: (date) => set({ moveOutDate: date }),
      setQuizAnswer: (key, value) => set({ 
        quizAnswers: { ...get().quizAnswers, [key]: value } 
      }),
    }),
    {
      name: 'hausta-store',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token, 
        isAuthenticated: state.isAuthenticated,
        step: state.step,
        studentType: state.studentType,
        budgetMin: state.budgetMin,
        budgetMax: state.budgetMax,
        moveInDate: state.moveInDate,
        moveOutDate: state.moveOutDate,
        quizAnswers: state.quizAnswers,
      }),
    }
  )
);

export default useStore;
