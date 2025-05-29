import React, { useState, useEffect } from 'react';
import { TeamMemberCreate, TeamMemberList } from '@/app/services/team-realms';
import { useParams } from 'next/navigation';

const TeamTab: React.FC = () => {
  const params = useParams();
  const teamId = params?.teamId as string | undefined;

  const [members, setMembers] = useState<any[]>([]);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Admin');
  const [inviteName, setInviteName] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [fetching, setFetching] = useState(true);
  const [fetchError, setFetchError] = useState('');

  // Fetch team members from backend
  const fetchMembers = async () => {
    if (!teamId) {
      setFetchError('No team selected.');
      setFetching(false);
      return;
    }
    setFetching(true);
    setFetchError('');
    try {
      const res = await TeamMemberList(teamId);
      if (res?.stat && Array.isArray(res.data?.list)) {
        setMembers(res.data.list.map((m: any) => ({
          name: m.meta?.name || '',
          email: m.meta?.mail || '',
          role: m.feat?.role || 'Member',
          status: m.actv ? 'active' : 'invited',
        })));
      } else {
        setMembers([]);
        setFetchError(res?.memo || 'Failed to fetch team members');
      }
    } catch (err) {
      setMembers([]);
      setFetchError('Server error. Please try again.');
    }
    setFetching(false);
  };

  useEffect(() => {
    fetchMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamId]);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamId) {
      setFeedback('No team selected.');
      return;
    }
    setLoading(true);
    setFeedback('');
    try {
      const res = await TeamMemberCreate({
        team: teamId,
        user: {
          name: inviteName,
          mail: inviteEmail,
          mobile: '', // Optionally add mobile
        },
        role: inviteRole.toLowerCase(),
      });
      if (res.stat) {
        setFeedback('Invitation sent!');
        await fetchMembers(); // Refresh list
        setInviteEmail('');
        setInviteName('');
        setInviteRole('Admin');
      } else {
        setFeedback(res.memo || 'Failed to invite member');
      }
    } catch (err) {
      setFeedback('Server error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      {/* Team Members List */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg text-gray-900 font-semibold mb-2">Team Members</h2>
        <p className="text-gray-500 text-sm mb-4">Manage who has access to your account</p>
        {fetching ? (
          <div className="text-primary">Loading team members...</div>
        ) : fetchError ? (
          <div className="text-red-500">{fetchError}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="py-2">Name</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Role</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="py-2 text-gray-900 font-medium">{member.name}</td>
                    <td className="py-2 text-gray-900">{member.email}</td>
                    <td className="py-2 text-gray-900">{member.role}</td>
                    <td className="py-2">
                      {member.status === 'active' ? (
                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">active</span>
                      ) : (
                        <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs">invited</span>
                      )}
                    </td>
                    <td className="py-2 space-x-2">
                      <button className="text-primary text-gray-900 font-medium">Actions</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      {/* Add New Team Member */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg text-gray-900 font-semibold mb-2">Add New Team Member</h2>
        <p className="text-gray-500 text-sm mb-4">Invite colleagues to collaborate</p>
        <form className="flex flex-col gap-4" onSubmit={handleInvite}>
          <div>
            <label className="block text-sm text-gray-900 font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Colleague Name"
              className="w-full border border-gray-300 text-gray-900 rounded px-3 py-2"
              value={inviteName}
              onChange={e => setInviteName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-900 font-medium mb-1">Email Address</label>
            <input
              type="email"
              placeholder="colleague@example.com"
              className="w-full border border-gray-300 text-gray-900 rounded px-3 py-2"
              value={inviteEmail}
              onChange={e => setInviteEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-900 font-medium mb-1">Role</label>
            <select
              className="w-full border border-gray-300 text-gray-900 rounded px-3 py-2"
              value={inviteRole}
              onChange={e => setInviteRole(e.target.value)}
            >
              <option>Admin</option>
              <option>Viewer</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white px-4 py-2 rounded font-medium"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Invitation'}
          </button>
        </form>
        {feedback && <p className={`mt-2 text-sm ${feedback.includes('sent') ? 'text-green-600' : 'text-red-600'}`}>{feedback}</p>}
      </section>
    </div>
  );
};

export default TeamTab; 