import React, { useState } from 'react';
import { ProfileCard } from '../components/profile/ProfileCard';
import { SettingsCard } from '../components/profile/SettingsCard';
import { EditProfileModal } from '../components/profile/EditProfileModal';

export const Profile = () => {
  const [editProfileOpen, setEditProfileOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProfileCard onEditProfile={() => setEditProfileOpen(true)} />
        <SettingsCard />
      </div>

      <EditProfileModal
        isOpen={editProfileOpen}
        onClose={() => setEditProfileOpen(false)}
      />
    </div>
  );
};
