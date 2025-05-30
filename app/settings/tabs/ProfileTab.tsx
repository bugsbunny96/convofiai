import React, { useEffect, useState } from 'react';
// import UserProfileCard from '../../components/conversations/ConversationDetails/UserProfileCard';
// import Dialog from '../../components/ui/Dialog';

const ProfileTab: React.FC = () => {

const [profile, setProile] = useState()
const [loading, setLoading] = useState(true)

useEffect(()=>{
  setLoading(true)
  var selectedAccount = localStorage.getItem("convofyai_selected_account")

  setProile(JSON.parse(selectedAccount))
  // console.log(selectedAccount)
  setLoading(false)

},[])


if (loading) return (
  <div className='p-2 border rounded flex items-center gap-2'>
    <p className='text-sm text-gray-600'>Please Wait...</p>
    <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
  </div>
);



  return (
    <div className="space-y-8">
      {/* Profile Information */}
      <section className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg text-gray-900 font-semibold">Profile Information</h2>
            <p className="text-gray-500 text-sm">Update your account details</p>
          </div>
          <button className="px-4 py-2 border rounded text-gray-900 text-sm font-medium bg-white hover:bg-gray-50">Edit Profile</button>
        </div>
        {/* <UserProfileCard ... /> */}
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center" 
          style={{
            backgroundImage: `url(${profile?.avatar?.link})`, 
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            }}>
            <span className="text-2xl font-medium text-blue-600"></span>
          </div>
          <div>
            <div className="font-medium text-gray-900">{ profile?.name || 'Jane Doe'}</div>
            <div className="text-gray-500 text-sm">{profile?.mail || 'jane@example.com'}</div>
            <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded bg-green-100 text-green-700">Owner</span>
          </div>
        </div>
      </section>
      {/* Security */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-2">Security</h2>
        <p className="text-gray-500 text-sm mb-4">Update your password and security settings</p>
        <form className="space-y-4">
          <input type="password" placeholder="Current Password" className="w-full border rounded px-3 py-2" />
          <input type="password" placeholder="New Password" className="w-full border rounded px-3 py-2" />
          <input type="password" placeholder="Confirm New Password" className="w-full border rounded px-3 py-2" />
          <button type="submit" className="w-full bg-primary text-white rounded px-4 py-2 font-medium">Update Password</button>
        </form>
      </section>
      {/* Danger Zone */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-red-600 mb-2">Danger Zone</h2>
        <p className="text-gray-500 text-sm mb-4">Irreversible account actions</p>
        <div className="flex items-center justify-between bg-red-50 border border-red-200 rounded p-4">
          <div>
            <div className="font-medium text-red-700">Delete Account</div>
            <div className="text-gray-500 text-xs">This will permanently delete your account and all associated data</div>
          </div>
          <button className="bg-red-600 text-white px-4 py-2 rounded flex items-center font-medium">
            <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            Delete
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProfileTab; 