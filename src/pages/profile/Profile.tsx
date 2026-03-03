import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Heart, 
  Users, 
  MessageSquare, 
  User, 
  Edit2,
  Camera,
  MapPin,
  PoundSterling,
  Calendar,
  GraduationCap,
  LogOut,
  ChevronRight,
  Settings,
  Shield,
  Bell,
  HelpCircle,
  Plus,
  Building2,
  FileText,
  Phone,
  UserCheck,
  Check,
  X,
  Briefcase
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useStore } from '@/store/useStore';
import BottomNav from '@/components/BottomNav';

// Contract Info Form Component
function ContractInfoForm({ onSave }: { onSave: () => void }) {
  const { user } = useStore();
  const [formData, setFormData] = useState({
    phone: '',
    emergencyContact: '',
    emergencyPhone: '',
    guarantorName: '',
    guarantorEmail: '',
    guarantorPhone: '',
    guarantorAddress: '',
    annualIncome: '',
    previousAddress: '',
    idType: '',
    idNumber: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Contact Information */}
      <div className="bg-white rounded-2xl p-5 shadow-soft">
        <h3 className="font-heading font-semibold text-hausta-dark mb-4 flex items-center gap-2">
          <Phone className="w-5 h-5" />
          Contact Information
        </h3>
        <div className="space-y-4">
          <div>
            <Label className="text-sm text-gray-600">Phone Number</Label>
            <Input
              placeholder="+44 123 456 7890"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="h-11 mt-1"
            />
          </div>
          <div>
            <Label className="text-sm text-gray-600">Emergency Contact Name</Label>
            <Input
              placeholder="Parent or guardian name"
              value={formData.emergencyContact}
              onChange={(e) => handleChange('emergencyContact', e.target.value)}
              className="h-11 mt-1"
            />
          </div>
          <div>
            <Label className="text-sm text-gray-600">Emergency Contact Phone</Label>
            <Input
              placeholder="+44 123 456 7890"
              value={formData.emergencyPhone}
              onChange={(e) => handleChange('emergencyPhone', e.target.value)}
              className="h-11 mt-1"
            />
          </div>
        </div>
      </div>

      {/* Occupation - Fixed as Student */}
      <div className="bg-white rounded-2xl p-5 shadow-soft">
        <h3 className="font-heading font-semibold text-hausta-dark mb-4 flex items-center gap-2">
          <Briefcase className="w-5 h-5" />
          Occupation
        </h3>
        <div className="p-4 bg-hausta-accent/10 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-hausta-dark rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-hausta-dark">Student</p>
              <p className="text-sm text-gray-500">{(user as any)?.university || 'University not set'}</p>
            </div>
            <Check className="w-5 h-5 text-hausta-green ml-auto" />
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Occupation is fixed as "Student" for all student renters. This helps landlords verify your status.
        </p>
      </div>

      {/* Guarantor Information */}
      <div className="bg-white rounded-2xl p-5 shadow-soft">
        <h3 className="font-heading font-semibold text-hausta-dark mb-4 flex items-center gap-2">
          <UserCheck className="w-5 h-5" />
          Guarantor Information
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Required by most landlords for student rentals
        </p>
        <div className="space-y-4">
          <div>
            <Label className="text-sm text-gray-600">Guarantor Full Name</Label>
            <Input
              placeholder="e.g., John Smith"
              value={formData.guarantorName}
              onChange={(e) => handleChange('guarantorName', e.target.value)}
              className="h-11 mt-1"
            />
          </div>
          <div>
            <Label className="text-sm text-gray-600">Guarantor Email</Label>
            <Input
              type="email"
              placeholder="guarantor@email.com"
              value={formData.guarantorEmail}
              onChange={(e) => handleChange('guarantorEmail', e.target.value)}
              className="h-11 mt-1"
            />
          </div>
          <div>
            <Label className="text-sm text-gray-600">Guarantor Phone</Label>
            <Input
              placeholder="+44 123 456 7890"
              value={formData.guarantorPhone}
              onChange={(e) => handleChange('guarantorPhone', e.target.value)}
              className="h-11 mt-1"
            />
          </div>
          <div>
            <Label className="text-sm text-gray-600">Guarantor Address</Label>
            <Input
              placeholder="Full address"
              value={formData.guarantorAddress}
              onChange={(e) => handleChange('guarantorAddress', e.target.value)}
              className="h-11 mt-1"
            />
          </div>
        </div>
      </div>

      {/* Income Information */}
      <div className="bg-white rounded-2xl p-5 shadow-soft">
        <h3 className="font-heading font-semibold text-hausta-dark mb-4 flex items-center gap-2">
          <PoundSterling className="w-5 h-5" />
          Income / Maintenance
        </h3>
        <div>
          <Label className="text-sm text-gray-600">Annual Income or Maintenance Amount</Label>
          <Input
            placeholder="£"
            value={formData.annualIncome}
            onChange={(e) => handleChange('annualIncome', e.target.value)}
            className="h-11 mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">
            This helps landlords assess your ability to pay rent
          </p>
        </div>
      </div>

      {/* Previous Address */}
      <div className="bg-white rounded-2xl p-5 shadow-soft">
        <h3 className="font-heading font-semibold text-hausta-dark mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Previous Address
        </h3>
        <div>
          <Label className="text-sm text-gray-600">Most Recent Address</Label>
          <Input
            placeholder="Full address"
            value={formData.previousAddress}
            onChange={(e) => handleChange('previousAddress', e.target.value)}
            className="h-11 mt-1"
          />
        </div>
      </div>

      {/* ID Verification */}
      <div className="bg-white rounded-2xl p-5 shadow-soft">
        <h3 className="font-heading font-semibold text-hausta-dark mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          ID Verification
        </h3>
        <div className="space-y-4">
          <div>
            <Label className="text-sm text-gray-600">ID Type</Label>
            <select 
              className="w-full h-11 mt-1 px-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-hausta-green"
              value={formData.idType}
              onChange={(e) => handleChange('idType', e.target.value)}
            >
              <option value="">Select ID type</option>
              <option value="passport">Passport</option>
              <option value="driving">Driving License</option>
              <option value="brp">Biometric Residence Permit</option>
            </select>
          </div>
          <div>
            <Label className="text-sm text-gray-600">ID Number</Label>
            <Input
              placeholder="ID document number"
              value={formData.idNumber}
              onChange={(e) => handleChange('idNumber', e.target.value)}
              className="h-11 mt-1"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <Button 
        onClick={onSave}
        className="w-full h-12 bg-hausta-dark hover:bg-hausta-green text-white"
      >
        <Check className="w-5 h-5 mr-2" />
        Save Contract Information
      </Button>
    </div>
  );
}

// List Property Modal for Students
function ListPropertyModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [propertyData, setPropertyData] = useState({
    title: '',
    address: '',
    type: 'room',
    price: '',
    availableFrom: '',
    minTerm: '6',
    description: '',
    billsIncluded: false,
    furnished: true,
  });

  const handleChange = (field: string, value: any) => {
    setPropertyData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // In real app, this would submit the property
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-heading font-bold text-hausta-dark">List Your Room</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Progress */}
        <div className="px-4 py-3 bg-gray-50">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 1 ? 'bg-hausta-dark text-white' : 'bg-gray-200 text-gray-500'
            }`}>1</div>
            <div className={`flex-1 h-1 rounded-full ${step >= 2 ? 'bg-hausta-dark' : 'bg-gray-200'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 2 ? 'bg-hausta-dark text-white' : 'bg-gray-200 text-gray-500'
            }`}>2</div>
            <div className={`flex-1 h-1 rounded-full ${step >= 3 ? 'bg-hausta-dark' : 'bg-gray-200'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 3 ? 'bg-hausta-dark text-white' : 'bg-gray-200 text-gray-500'
            }`}>3</div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[60vh] p-4">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label className="text-sm text-gray-600">Listing Title</Label>
                <Input
                  placeholder="e.g., Double Room in Student House Share"
                  value={propertyData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="h-11 mt-1"
                />
              </div>
              <div>
                <Label className="text-sm text-gray-600">Address</Label>
                <Input
                  placeholder="Full address"
                  value={propertyData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="h-11 mt-1"
                />
              </div>
              <div>
                <Label className="text-sm text-gray-600">Room Type</Label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {['room', 'studio', 'apartment'].map((type) => (
                    <button
                      key={type}
                      onClick={() => handleChange('type', type)}
                      className={`py-2 px-3 rounded-lg text-sm capitalize transition-colors ${
                        propertyData.type === type
                          ? 'bg-hausta-dark text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Monthly Rent (£)</Label>
                <Input
                  type="number"
                  placeholder="e.g., 550"
                  value={propertyData.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                  className="h-11 mt-1"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label className="text-sm text-gray-600">Available From</Label>
                <Input
                  type="date"
                  value={propertyData.availableFrom}
                  onChange={(e) => handleChange('availableFrom', e.target.value)}
                  className="h-11 mt-1"
                />
              </div>
              <div>
                <Label className="text-sm text-gray-600">Minimum Term (months)</Label>
                <Input
                  type="number"
                  value={propertyData.minTerm}
                  onChange={(e) => handleChange('minTerm', e.target.value)}
                  className="h-11 mt-1"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={propertyData.billsIncluded}
                    onChange={(e) => handleChange('billsIncluded', e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-hausta-dark focus:ring-hausta-green"
                  />
                  <span className="text-sm text-gray-600">Bills included</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={propertyData.furnished}
                    onChange={(e) => handleChange('furnished', e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-hausta-dark focus:ring-hausta-green"
                  />
                  <span className="text-sm text-gray-600">Furnished</span>
                </label>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <Label className="text-sm text-gray-600">Description</Label>
                <textarea
                  placeholder="Describe your room, the house, and what you're looking for in a housemate..."
                  value={propertyData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="w-full h-32 mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-hausta-green resize-none"
                />
              </div>
              <div>
                <Label className="text-sm text-gray-600">Photos</Label>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  <button className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200">
                    <Plus className="w-6 h-6 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 flex gap-3">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 py-3 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50"
            >
              Back
            </button>
          )}
          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex-1 py-3 bg-hausta-dark text-white rounded-xl hover:bg-hausta-green"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 py-3 bg-hausta-dark text-white rounded-xl hover:bg-hausta-green"
            >
              List Property
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout, quizAnswers, updateProfile, updateUser } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState<'profile' | 'contract' | 'preferences' | 'settings'>('profile');
  const [showListProperty, setShowListProperty] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isStudent = user?.role === 'student';

    // Edit Profile Form Component
  function EditProfileForm({ onCancel }: { onCancel: () => void }) {
    const [formData, setFormData] = useState({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phone: (user as any)?.phone || '',
      bio: (user as any)?.bio || '',
      university: (user as any)?.university || '',
      preferredLocation: (user as any)?.preferredLocation || '',
      budgetMin: (user as any)?.budgetMin || 400,
      budgetMax: (user as any)?.budgetMax || 800,
      companyName: (user as any)?.companyName || '',
    });
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (field: string, value: any) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
      setIsSaving(true);
      try {
        await updateProfile(formData);
        updateUser(formData);
        onCancel();
      } catch (error) {
        console.error('Error updating profile:', error);
      } finally {
        setIsSaving(false);
      }
    };

    return (
      <div className="bg-white rounded-2xl p-6 shadow-soft space-y-4">
        <h3 className="text-lg font-heading font-semibold text-hausta-dark mb-4">Edit Profile</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">First Name</label>
            <input type="text" value={formData.firstName} onChange={(e) => handleChange('firstName', e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-hausta-green focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Last Name</label>
            <input type="text" value={formData.lastName} onChange={(e) => handleChange('lastName', e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-hausta-green focus:outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Phone</label>
          <input type="tel" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} placeholder="+44 123 456 7890" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-hausta-green focus:outline-none" />
        </div>

        {isStudent ? (
          <>
            <div>
              <label className="block text-sm text-gray-600 mb-1">University</label>
              <input type="text" value={formData.university} onChange={(e) => handleChange('university', e.target.value)} placeholder="e.g. University of Manchester" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-hausta-green focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Preferred Location</label>
              <input type="text" value={formData.preferredLocation} onChange={(e) => handleChange('preferredLocation', e.target.value)} placeholder="e.g. City Centre" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-hausta-green focus:outline-none" />
            </div>
          </>
        ) : (
          <div>
            <label className="block text-sm text-gray-600 mb-1">Company Name</label>
            <input type="text" value={formData.companyName} onChange={(e) => handleChange('companyName', e.target.value)} placeholder="Your company name" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-hausta-green focus:outline-none" />
          </div>
        )}

        <div>
          <label className="block text-sm text-gray-600 mb-1">Bio</label>
          <textarea value={formData.bio} onChange={(e) => handleChange('bio', e.target.value)} placeholder="Tell others about yourself..." rows={3} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-hausta-green focus:outline-none resize-none" />
        </div>

        <div className="flex gap-3 pt-2">
          <button onClick={onCancel} className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50">Cancel</button>
          <button onClick={handleSave} disabled={isSaving} className="flex-1 py-3 bg-hausta-dark text-white rounded-xl hover:bg-hausta-green disabled:opacity-50">{isSaving ? 'Saving...' : 'Save Changes'}</button>
        </div>
      </div>
    );
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      const { userAPI } = await import('@/services/api');
      const response = await userAPI.uploadAvatar(formData);
      updateUser({ avatar: response.data.avatarUrl });
    } catch (error) {
      console.error('Error uploading avatar:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const renderProfileContent = () => (
    <div className="space-y-6">
      {isEditing ? (
        <EditProfileForm onCancel={() => setIsEditing(false)} />
      ) : (
        <div className="bg-white rounded-2xl p-6 shadow-soft">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-hausta-accent/30 flex items-center justify-center overflow-hidden">
                {(user as any)?.avatar ? (
                  <img src={(user as any).avatar} alt="" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-12 h-12 text-hausta-dark" />
                )}
              </div>
              <button onClick={handleAvatarClick} disabled={isUploading} className="absolute bottom-0 right-0 w-8 h-8 bg-hausta-dark rounded-full flex items-center justify-center hover:bg-hausta-green disabled:opacity-50">
                {isUploading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Camera className="w-4 h-4 text-white" />}
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-heading font-bold text-hausta-dark">{user?.firstName} {user?.lastName}</h2>
              <p className="text-gray-500">{user?.email}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-hausta-accent/30 rounded-full text-xs font-medium text-hausta-dark capitalize">{user?.role === 'student' ? 'Student Renter' : 'Property Lister'}</span>
            </div>
            <button onClick={() => setIsEditing(true)} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
              <Edit2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      )}
  
      {/* Student-specific info */}
      {isStudent && (
        <>
          {/* List a Property Option */}
          <div className="bg-gradient-to-r from-hausta-dark to-hausta-green rounded-2xl p-5 shadow-soft text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-semibold text-lg">Have a room to rent?</h3>
                <p className="text-white/80 text-sm mt-1">
                  List your spare room or sublet easily
                </p>
              </div>
              <button 
                onClick={() => setShowListProperty(true)}
                className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* University & Location */}
          <div className="bg-white rounded-2xl p-5 shadow-soft">
            <h3 className="text-lg font-heading font-semibold text-hausta-dark mb-4">Study Details</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-hausta-accent/30 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-hausta-dark" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">University</p>
                  <p className="font-medium text-hausta-dark">{(user as any).university || 'Not set'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-hausta-accent/30 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-hausta-dark" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Preferred Location</p>
                  <p className="font-medium text-hausta-dark">{(user as any).preferredLocation || 'Not set'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-hausta-accent/30 rounded-lg flex items-center justify-center">
                  <PoundSterling className="w-5 h-5 text-hausta-dark" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Budget Range</p>
                  <p className="font-medium text-hausta-dark">
                    £{(user as any).budgetMin || 400} - £{(user as any).budgetMax || 800} / month
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-hausta-accent/30 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-hausta-dark" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Move-in Date</p>
                  <p className="font-medium text-hausta-dark">
                    {(user as any).moveInDate 
                      ? new Date((user as any).moveInDate).toLocaleDateString() 
                      : 'Not set'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-white rounded-2xl p-5 shadow-soft">
            <h3 className="text-lg font-heading font-semibold text-hausta-dark mb-4">About Me</h3>
            <p className="text-gray-600">
              {(user as any).bio || 'No bio yet. Tell potential housemates about yourself!'}
            </p>
          </div>
        </>
      )}

      {/* Landlord/Agent info */}
      {!isStudent && (
        <div className="bg-white rounded-2xl p-5 shadow-soft">
          <h3 className="text-lg font-heading font-semibold text-hausta-dark mb-4">Company Details</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-hausta-accent/30 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-hausta-dark" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Company Name</p>
                <p className="font-medium text-hausta-dark">{(user as any).companyName || 'Not set'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-hausta-accent/30 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-hausta-dark" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-hausta-dark">{(user as any).phone || 'Not set'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-hausta-accent/30 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-hausta-dark" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Subscription</p>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium capitalize">
                  {(user as any).subscriptionStatus || 'Active'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
        <button 
          onClick={() => navigate(isStudent ? '/matches' : '/dashboard/landlord')}
          className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            {isStudent ? (
              <>
                <Heart className="w-5 h-5 text-hausta-dark" />
                <span className="text-hausta-dark">My Matches</span>
              </>
            ) : (
              <>
                <Building2 className="w-5 h-5 text-hausta-dark" />
                <span className="text-hausta-dark">My Properties</span>
              </>
            )}
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
        <div className="border-t border-gray-100" />
        <button 
          onClick={() => navigate('/messages')}
          className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-hausta-dark" />
            <span className="text-hausta-dark">Messages</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
        {isStudent && (
          <>
            <div className="border-t border-gray-100" />
            <button 
              onClick={() => navigate('/groups')}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-hausta-dark" />
                <span className="text-hausta-dark">My Groups</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </>
        )}
      </div>
    </div>
  );

  const renderContractContent = () => (
    <ContractInfoForm onSave={() => setActiveSection('profile')} />
  );

  const renderPreferencesContent = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-5 shadow-soft">
        <h3 className="text-lg font-heading font-semibold text-hausta-dark mb-4">Lifestyle Preferences</h3>
        <div className="space-y-3">
          {quizAnswers && Object.entries(quizAnswers).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
              <span className="font-medium text-hausta-dark capitalize">{value as string}</span>
            </div>
          ))}
        </div>
        <Button 
          variant="outline" 
          className="w-full mt-4 border-hausta-dark text-hausta-dark"
          onClick={() => navigate('/onboarding')}
        >
          Retake Quiz
        </Button>
      </div>
    </div>
  );

  const renderSettingsContent = () => (
    <div className="space-y-6">
      {/* Account Settings */}
      <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-heading font-semibold text-hausta-dark">Account Settings</h3>
        </div>
        <button className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors">
          <Settings className="w-5 h-5 text-gray-600" />
          <span className="text-hausta-dark">Edit Profile</span>
        </button>
        <div className="border-t border-gray-100" />
        <button className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors">
          <Shield className="w-5 h-5 text-gray-600" />
          <span className="text-hausta-dark">Privacy & Security</span>
        </button>
        <div className="border-t border-gray-100" />
        <button className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="text-hausta-dark">Notifications</span>
        </button>
      </div>

      {/* Support */}
      <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-heading font-semibold text-hausta-dark">Support</h3>
        </div>
        <button className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors">
          <HelpCircle className="w-5 h-5 text-gray-600" />
          <span className="text-hausta-dark">Help Center</span>
        </button>
        <div className="border-t border-gray-100" />
        <button className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors">
          <MessageSquare className="w-5 h-5 text-gray-600" />
          <span className="text-hausta-dark">Contact Support</span>
        </button>
      </div>

      {/* Logout */}
      <Button
        onClick={handleLogout}
        variant="outline"
        className="w-full border-red-200 text-red-600 hover:bg-red-50"
      >
        <LogOut className="w-5 h-5 mr-2" />
        Log Out
      </Button>
    </div>
  );

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
            <h1 className="text-xl font-heading font-bold">Profile</h1>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto hide-scrollbar">
            <button
              onClick={() => setActiveSection('profile')}
              className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeSection === 'profile'
                  ? 'border-hausta-dark text-hausta-dark'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Profile
            </button>
            {isStudent && (
              <button
                onClick={() => setActiveSection('contract')}
                className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeSection === 'contract'
                    ? 'border-hausta-dark text-hausta-dark'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Contract Info
              </button>
            )}
            {isStudent && (
              <button
                onClick={() => setActiveSection('preferences')}
                className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeSection === 'preferences'
                    ? 'border-hausta-dark text-hausta-dark'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Preferences
              </button>
            )}
            <button
              onClick={() => setActiveSection('settings')}
              className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeSection === 'settings'
                  ? 'border-hausta-dark text-hausta-dark'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Settings
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {activeSection === 'profile' && renderProfileContent()}
          {activeSection === 'contract' && renderContractContent()}
          {activeSection === 'preferences' && renderPreferencesContent()}
          {activeSection === 'settings' && renderSettingsContent()}
        </div>
      </div>

      {/* List Property Modal */}
      {showListProperty && (
        <ListPropertyModal onClose={() => setShowListProperty(false)} />
      )}

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
