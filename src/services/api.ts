import axios, { AxiosError, type AxiosResponse } from 'axios';

// API base URL - change this to your backend URL
const API_BASE_URL = 'https://hausta-api.onrender.com/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
});

// Request interceptor - add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('hausta_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('hausta_token');
      localStorage.removeItem('hausta_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data: RegisterData) => api.post('/auth/register', data),
  login: (data: LoginData) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  verifyEmail: (token: string) => api.post('/auth/verify-email', { token }),
  forgotPassword: (email: string) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token: string, password: string) => 
    api.post('/auth/reset-password', { token, password }),
  changePassword: (currentPassword: string, newPassword: string) => 
    api.post('/auth/change-password', { currentPassword, newPassword }),
  logout: () => api.post('/auth/logout'),
};

// User API
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data: Partial<UserProfile>) => api.put('/users/profile', data),
  uploadAvatar: (formData: FormData) => 
    api.post('/users/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  deleteAvatar: () => api.delete('/users/avatar'),
  getStudents: (params?: StudentFilterParams) => api.get('/users/students', { params }),
  getUserById: (id: string) => api.get(`/users/${id}`),
};

// Property API
export const propertyAPI = {
  getAll: (params?: PropertyFilterParams) => api.get('/properties', { params }),
  getById: (id: string) => api.get(`/properties/${id}`),
  getMyProperties: (params?: { status?: string; page?: number; limit?: number }) => 
    api.get('/properties/my-properties', { params }),
  create: (data: CreatePropertyData) => api.post('/properties', data),
  update: (id: string, data: Partial<CreatePropertyData>) => api.put(`/properties/${id}`, data),
  delete: (id: string) => api.delete(`/properties/${id}`),
  uploadImages: (id: string, formData: FormData) => 
    api.post(`/properties/${id}/images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  deleteImage: (propertyId: string, imageId: string) => 
    api.delete(`/properties/${propertyId}/images/${imageId}`),
  setPrimaryImage: (propertyId: string, imageId: string) => 
    api.put(`/properties/${propertyId}/images/${imageId}/primary`),
};

// Match API
export const matchAPI = {
  like: (targetId: string, targetType: 'property' | 'user') => 
    api.post('/matches/like', { targetId, targetType }),
  stack: (propertyId: string) => api.post('/matches/stack', { propertyId }),
  pass: (targetId: string, targetType: 'property' | 'user') => 
    api.post('/matches/pass', { targetId, targetType }),
  getMyMatches: (params?: { action?: string; targetType?: string; page?: number; limit?: number }) => 
    api.get('/matches/my-matches', { params }),
  getStack: () => api.get('/matches/stack'),
  getMutual: (params?: { targetType?: string }) => api.get('/matches/mutual', { params }),
  getFeed: (params?: { type?: string; city?: string; university?: string; page?: number; limit?: number }) => 
    api.get('/matches/feed', { params }),
  removeMatch: (id: string) => api.delete(`/matches/${id}`),
};

// Group API
export const groupAPI = {
  getAll: () => api.get('/groups'),
  getById: (id: string) => api.get(`/groups/${id}`),
  create: (name: string) => api.post('/groups', { name }),
  update: (id: string, name: string) => api.put(`/groups/${id}`, { name }),
  delete: (id: string) => api.delete(`/groups/${id}`),
  addMember: (groupId: string, userId: string) => 
    api.post(`/groups/${groupId}/members`, { userId }),
  removeMember: (groupId: string, userId: string) => 
    api.delete(`/groups/${groupId}/members/${userId}`),
  addProperty: (groupId: string, propertyId: string) => 
    api.post(`/groups/${groupId}/properties`, { propertyId }),
  removeProperty: (groupId: string, propertyId: string) => 
    api.delete(`/groups/${groupId}/properties/${propertyId}`),
  vote: (groupId: string, propertyId: string, vote: 'yes' | 'no' | 'maybe') => 
    api.post(`/groups/${groupId}/vote`, { propertyId, vote }),
  apply: (groupId: string, propertyId: string, message?: string, preferredViewingDate?: string) => 
    api.post(`/groups/${groupId}/apply`, { propertyId, message, preferredViewingDate }),
  sendMessage: (groupId: string, content: string, type?: string, propertyId?: string) => 
    api.post(`/groups/${groupId}/messages`, { content, type, propertyId }),
};

// Application API
export const applicationAPI = {
  getMyApplications: (params?: { status?: string; page?: number; limit?: number }) => 
    api.get('/applications', { params }),
  getLandlordApplications: (params?: { status?: string; type?: string; page?: number; limit?: number }) => 
    api.get('/applications/landlord', { params }),
  getById: (id: string) => api.get(`/applications/${id}`),
  create: (data: CreateApplicationData) => api.post('/applications', data),
  updateStatus: (id: string, status: string, response?: string, rejectionReason?: string, arrangedViewingDate?: string) => 
    api.put(`/applications/${id}/status`, { status, response, rejectionReason, arrangedViewingDate }),
  withdraw: (id: string) => api.put(`/applications/${id}/withdraw`),
  getStats: () => api.get('/applications/stats/overview'),
};

// Message API
export const messageAPI = {
  getConversations: (params?: { type?: string; page?: number; limit?: number }) => 
    api.get('/messages/conversations', { params }),
  createConversation: (data: CreateConversationData) => api.post('/messages/conversations', data),
  getConversation: (id: string, params?: { page?: number; limit?: number }) => 
    api.get(`/messages/conversations/${id}`, { params }),
  sendMessage: (conversationId: string, content: string, type?: string, propertyId?: string) => 
    api.post(`/messages/conversations/${conversationId}/messages`, { content, type, propertyId }),
  sendDirectMessage: (recipientId: string, content: string, propertyId?: string) => 
    api.post('/messages/direct', { recipientId, content, propertyId }),
  markAsRead: (conversationId: string) => api.put(`/messages/conversations/${conversationId}/read`),
  getUnreadCount: () => api.get('/messages/unread-count'),
};

// Health check
export const healthCheck = () => api.get('/health');

// Type definitions
interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'landlord' | 'agent';
  studentType?: string;
  university?: string;
  companyName?: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  university?: string;
  budgetMin?: number;
  budgetMax?: number;
  preferredLocation?: string;
  moveInDate?: string;
  moveOutDate?: string;
  quizAnswers?: Record<string, string>;
  bio?: string;
  contractInfo?: Record<string, any>;
  companyName?: string;
  phone?: string;
}

interface StudentFilterParams {
  university?: string;
  budgetMin?: number;
  budgetMax?: number;
  page?: number;
  limit?: number;
}

interface PropertyFilterParams {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  type?: string;
  billsIncluded?: boolean;
  furnished?: boolean;
  amenities?: string;
  availableFrom?: string;
  university?: string;
  lat?: number;
  lng?: number;
  radius?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

interface CreatePropertyData {
  title: string;
  description: string;
  address: string;
  city: string;
  postcode: string;
  type: string;
  price: number;
  deposit: number;
  bedrooms: number;
  bathrooms: number;
  availableFrom: string;
  availableUntil?: string;
  minTerm: number;
  maxTerm?: number;
  billsIncluded?: boolean;
  furnished?: boolean;
  amenities?: string[];
  transportLinks?: any[];
  nearbyUniversities?: string[];
  viewingSlots?: any[];
}

interface CreateApplicationData {
  propertyId: string;
  message?: string;
  preferredViewingDate?: string;
  contractDetails?: Record<string, any>;
}

interface CreateConversationData {
  type: 'direct' | 'property' | 'group';
  participantIds: string[];
  propertyId?: string;
  title?: string;
}

export default api;
