import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import './Profile.css';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  
  const { user, updateProfile, isLoading, error } = useAuthStore(state => ({
    user: state.user,
    updateProfile: state.updateProfile,
    isLoading: state.isLoading,
    error: state.error
  }));

  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    avatar: user?.avatar || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await updateProfile(formData);
    if (success) {
      setIsEditing(false);
    }
  };

  // Smart username suggestion based on email
  function suggestUsernames(email) {
    if (!email) return [];
    const base = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');
    return [
      base,
      base + Math.floor(Math.random() * 1000),
      base + '_user',
      base + '_cv',
      base + (new Date().getFullYear())
    ];
  }

  const needsProfileCompletion = !user.username || !user.firstName || !user.lastName;
  const [showSuggestions, setShowSuggestions] = useState(false);
  const usernameSuggestions = suggestUsernames(user.email);

  // Hide banner if editing or profile is complete
  const showProfileCompletionBanner = needsProfileCompletion && !isEditing;

  if (!user) {
    return (
      <div className="profile-container">
        <div className="profile-error">
          Please log in to view your profile.
        </div>
      </div>
    );
  }

  return (
  <div className="profile-container">
      {showProfileCompletionBanner && (
        <div className="profile-completion-banner">
          <strong>Complete your profile!</strong> For a better experience, please add a username, first name, and last name.
          <button className="edit-button" onClick={() => setIsEditing(true)} style={{marginLeft: 16}}>Complete Now</button>
        </div>
      )}
      <div className="profile-header">
        <div className="profile-avatar">
          <img src={user.avatar} alt={user.username} />
        </div>
        <div className="profile-info">
          <h1>{user.username}</h1>
          <p className="join-date">Member since {new Date(user.joinDate).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-item">
          <span className="stat-value">12</span>
          <span className="stat-label">Orders</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">8</span>
          <span className="stat-label">Reviews</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">15</span>
          <span className="stat-label">Wishlist</span>
        </div>
      </div>

      <div className="profile-tabs">
        <button
          className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button
          className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
        <button
          className={`tab-button ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          Security
        </button>
      </div>

      <div className="profile-content">
        {activeTab === 'profile' && (
          <div className="profile-section">
            <div className="section-header">
              <h2>Profile Information</h2>
              <button
                className="edit-button"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            {error && (
              <div className="profile-error">
                {error}
              </div>
            )}

            {isEditing ? (
              <form onSubmit={handleSubmit} className="profile-form" autoComplete="off">
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="form-input"
                    onFocus={() => setShowSuggestions(true)}
                  />
                  {(!formData.username || formData.username !== user.username) && showSuggestions && usernameSuggestions.length > 0 && (
                    <div className="username-suggestions">
                      <span>Suggestions: </span>
                      {usernameSuggestions.map(s => (
                        <button type="button" key={s} className="suggestion-btn" onClick={() => setFormData(f => ({...f, username: s}))}>{s}</button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName || ''}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName || ''}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="avatar">Profile Picture URL</label>
                  <input
                    type="url"
                    id="avatar"
                    name="avatar"
                    value={formData.avatar}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <button
                  type="submit"
                  className="save-button"
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            ) : (
              <div className="profile-details">
                <div className="detail-item">
                  <span className="detail-label">Username</span>
                  <span className="detail-value">{user.username}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Email</span>
                  <span className="detail-value">{user.email}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="profile-section">
            <h2>Account Settings</h2>
            <div className="settings-list">
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Email Notifications</h3>
                  <p>Receive updates about your orders and account activity</p>
                </div>
                <label className="toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Marketing Emails</h3>
                  <p>Receive updates about new products and promotions</p>
                </div>
                <label className="toggle">
                  <input type="checkbox" />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="profile-section">
            <h2>Security Settings</h2>
            <div className="security-options">
              <button className="security-button">
                Change Password
              </button>
              <button className="security-button">
                Enable Two-Factor Authentication
              </button>
              <button className="security-button danger">
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>
  </div>
);
};

export default Profile; 