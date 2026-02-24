// User Types
export type UserRole = 'student' | 'landlord' | 'agent';
export type StudentType = 'full' | 'housing-only' | 'housemates-only' | 'takeover';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StudentProfile extends User {
  role: 'student';
  studentType: StudentType;
  university?: string;
  budgetMin: number;
  budgetMax: number;
  preferredLocation: string;
  moveInDate: Date;
  moveOutDate?: Date;
  quizAnswers: QuizAnswers;
  bio?: string;
  isVerified: boolean;
}

export interface LandlordProfile extends User {
  role: 'landlord' | 'agent';
  companyName?: string;
  phone?: string;
  properties: string[];
  isVerified: boolean;
  subscriptionStatus: 'active' | 'inactive' | 'trial';
}

// Quiz Types
export interface QuizAnswers {
  sleepSchedule: 'early' | 'late' | 'flexible';
  cleanliness: 'very-clean' | 'clean' | 'relaxed' | 'messy';
  socialLevel: 'very-social' | 'social' | 'moderate' | 'quiet';
  noiseTolerance: 'high' | 'medium' | 'low';
  guestFrequency: 'often' | 'sometimes' | 'rarely' | 'never';
  workStyle: 'office' | 'hybrid' | 'remote' | 'student';
  lifestyle: 'active' | 'balanced' | 'relaxed' | 'homebody';
  dietary: 'no-preference' | 'vegetarian' | 'vegan' | 'halal' | 'kosher' | 'other';
}

// Property Types
export type PropertyType = 'house' | 'apartment' | 'studio' | 'ensuite';
export type PropertyStatus = 'available' | 'occupied' | 'pending';

export interface Property {
  id: string;
  title: string;
  description: string;
  address: string;
  city: string;
  postcode: string;
  type: PropertyType;
  price: number;
  deposit: number;
  bedrooms: number;
  bathrooms: number;
  availableFrom: Date;
  minTerm: number;
  maxTerm?: number;
  billsIncluded: boolean;
  furnished: boolean;
  images: string[];
  amenities: string[];
  transportLinks: TransportLink[];
  nearbyUniversities: string[];
  distanceToUniversity?: number;
  landlordId: string;
  status: PropertyStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface TransportLink {
  type: 'tram' | 'bus' | 'train' | 'walk';
  name: string;
  distance: number;
  time: number;
}

// Match Types
export type MatchStatus = 'liked' | 'saved' | 'skipped' | 'matched';

export interface PropertyMatch {
  id: string;
  userId: string;
  propertyId: string;
  status: MatchStatus;
  createdAt: Date;
}

export interface HousemateMatch {
  id: string;
  userId: string;
  matchedUserId: string;
  status: MatchStatus;
  compatibilityScore: number;
  isMutual: boolean;
  createdAt: Date;
}

// Group Types
export interface Group {
  id: string;
  name: string;
  members: GroupMember[];
  sharedProperties: string[];
  shortlistedProperties?: string[];
  votes: GroupVote[];
  createdBy?: string;
  createdAt: string;
  updatedAt?: Date;
}

export interface GroupMember {
  userId: string;
  role: 'admin' | 'member';
  joinedAt?: Date;
}

export interface GroupVote {
  propertyId: string;
  votes: { userId: string; vote: 'yes' | 'no' | 'maybe' }[];
}

// Message Types
export interface Conversation {
  id: string;
  participants: string[];
  propertyId?: string;
  groupId?: string;
  type: 'property' | 'landlord' | 'housemate' | 'group';
  lastMessage?: Message;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  type: 'text' | 'image' | 'property';
  propertyId?: string;
  createdAt: Date;
  readBy: string[];
}

// Application Types
export interface PropertyApplication {
  id: string;
  propertyId: string;
  applicantId: string;
  groupId?: string;
  status: 'pending' | 'viewing-arranged' | 'accepted' | 'rejected';
  message?: string;
  preferredViewingDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Dashboard Types
export interface DashboardStats {
  totalMatches: number;
  newMatches: number;
  savedProperties: number;
  messagesUnread: number;
}

export interface LandlordStats {
  totalProperties: number;
  occupiedProperties: number;
  pendingApplications: number;
  totalRevenue: number;
  monthlyRevenue: number;
}

// UI Types
export interface SwipeCardData {
  id: string;
  type: 'property' | 'housemate';
  data: Property | StudentProfile;
  compatibilityScore?: number;
}

export interface FilterOptions {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  propertyType?: PropertyType[];
  bedrooms?: number;
  billsIncluded?: boolean;
  furnished?: boolean;
  transportType?: ('tram' | 'bus' | 'train')[];
  maxDistance?: number;
}
