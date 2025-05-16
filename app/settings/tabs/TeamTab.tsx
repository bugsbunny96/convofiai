import React from 'react';

const TEAM_MEMBERS = [
  { name: 'Jane Doe', email: 'jane@example.com', role: 'Owner', status: 'active' },
  { name: 'John Smith', email: 'jane@example.com', role: 'Admin', status: 'active' },
  { name: 'Alice Wong', email: 'jane@example.com', role: 'Viewer', status: 'invited' },
];

const TeamTab: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Team Members List */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg text-gray-900 font-semibold mb-2">Team Members</h2>
        <p className="text-gray-500 text-sm mb-4">Manage who has access to your account</p>
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
              {TEAM_MEMBERS.map((member, idx) => (
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
      </section>
      {/* Add New Team Member */}
      <section className="bg-white rounded-lg shadow p-6 max-w-lg">
        <h2 className="text-lg text-gray-900 font-semibold mb-2">Add New Team Member</h2>
        <p className="text-gray-500 text-sm mb-4">Invite colleagues to collaborate</p>
        <form className="flex flex-col md:flex-row md:items-end md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex-1">
            <label className="block text-sm text-gray-900 font-medium mb-1">Email Address</label>
            <input type="email" placeholder="colleague@example.com" className="w-full border border-gray-300 text-gray-900 rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-gray-900 font-medium mb-1">Role</label>
            <select className="border border-gray-300 text-gray-900 rounded px-3 py-2">
              <option>Admin</option>
              <option>Viewer</option>
            </select>
          </div>
          <button type="submit" className="bg-primary text-white px-4 py-2 rounded font-medium">Send Invitation</button>
        </form>
      </section>
    </div>
  );
};

export default TeamTab; 