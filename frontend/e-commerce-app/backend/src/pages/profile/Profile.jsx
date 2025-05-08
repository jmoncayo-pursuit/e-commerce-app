import React, { useEffect } from 'react';
import useAuthStore from '../../stores/authStore';

const Profile = () => {
  const { user, getCurrentUser, isAuthenticated, loading, error } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated && !user) {
      getCurrentUser();
    }
  }, [isAuthenticated, user, getCurrentUser]);

  if (!isAuthenticated) {
    return (
      <div className="profile-page">
        <div className="container">
          <h2>Please log in to view your profile</h2>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <section className="page-placeholder">
      <h2>Profile Page</h2>
      {user ? (
        <div className="profile-info">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {user.firstName && <p><strong>First Name:</strong> {user.firstName}</p>}
          {user.lastName && <p><strong>Last Name:</strong> {user.lastName}</p>}
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </section>
  );
};

export default Profile; 