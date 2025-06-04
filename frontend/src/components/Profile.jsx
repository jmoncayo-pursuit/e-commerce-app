import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { toast } from 'react-hot-toast';

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, updateProfile } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    bio: ''
  });
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    type: 'SHIPPING',
    isDefault: false
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [location]);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        bio: user.bio || ''
      });
    }
  }, [user]);

  useEffect(() => {
    if (activeTab === 'addresses') {
      fetchAddresses();
    }
  }, [activeTab]);

  const fetchAddresses = async () => {
    try {
      const [shippingResponse, billingResponse] = await Promise.all([
        fetch('http://localhost:8080/api/checkout/addresses?type=SHIPPING', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }),
        fetch('http://localhost:8080/api/checkout/addresses?type=BILLING', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
      ]);

      if (shippingResponse.ok && billingResponse.ok) {
        const shippingData = await shippingResponse.json();
        const billingData = await billingResponse.json();
        setAddresses([...shippingData, ...billingData]);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
      toast.error('Failed to load addresses');
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateProfile(formData);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/checkout/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newAddress)
      });

      if (response.ok) {
        toast.success('Address added successfully');
        setNewAddress({
          street: '',
          city: '',
          state: '',
          country: '',
          zipCode: '',
          type: 'SHIPPING',
          isDefault: false
        });
        fetchAddresses();
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to add address');
      }
    } catch (error) {
      console.error('Error adding address:', error);
      toast.error('Failed to add address');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetDefaultAddress = async (addressId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/checkout/addresses/${addressId}/default`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        toast.success('Default address updated');
        fetchAddresses();
      } else {
        toast.error('Failed to update default address');
      }
    } catch (error) {
      console.error('Error updating default address:', error);
      toast.error('Failed to update default address');
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex space-x-4 mb-8">
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'profile'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'addresses'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
            onClick={() => setActiveTab('addresses')}
          >
            Addresses
          </button>
        </div>

        {activeTab === 'profile' ? (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
            <form onSubmit={handleProfileUpdate}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Username</label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium mb-2">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows="4"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Add New Address Form */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-6">Add New Address</h2>
              <form onSubmit={handleAddressSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Street</label>
                    <input
                      type="text"
                      value={newAddress.street}
                      onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">City</label>
                    <input
                      type="text"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">State</label>
                    <input
                      type="text"
                      value={newAddress.state}
                      onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Country</label>
                    <input
                      type="text"
                      value={newAddress.country}
                      onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">ZIP Code</label>
                    <input
                      type="text"
                      value={newAddress.zipCode}
                      onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Address Type</label>
                    <select
                      value={newAddress.type}
                      onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option value="SHIPPING">Shipping</option>
                      <option value="BILLING">Billing</option>
                    </select>
                  </div>
                </div>
                <div className="mt-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newAddress.isDefault}
                      onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm">Set as default address</span>
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                >
                  {isLoading ? 'Adding...' : 'Add Address'}
                </button>
              </form>
            </div>

            {/* Address List */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-6">Your Addresses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addresses.map(address => (
                  <div
                    key={address.id}
                    className={`p-4 border rounded-lg ${
                      address.isDefault ? 'border-blue-500 bg-blue-50 dark:bg-blue-900' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="px-2 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-700">
                        {address.type}
                      </span>
                      {!address.isDefault && (
                        <button
                          onClick={() => handleSetDefaultAddress(address.id)}
                          className="text-blue-500 hover:text-blue-600 text-sm"
                        >
                          Set as Default
                        </button>
                      )}
                    </div>
                    <p className="font-medium">{address.street}</p>
                    <p>{address.city}, {address.state} {address.zipCode}</p>
                    <p>{address.country}</p>
                    {address.isDefault && (
                      <p className="text-sm text-blue-500 mt-2">Default Address</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile; 