function ProfileSettings() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="px-8 py-6 border-b bg-gray-50">
        <h2 className="text-2xl font-bold">Account Settings</h2>
      </div>

      <div className="p-8 space-y-8">
        <div className="border-b pb-8">
          <h3 className="text-xl font-medium mb-6">Change Password</h3>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition"
              />
            </div>
            <button className="px-8 py-3 bg-red-500 text-white font-medium rounded-full hover:bg-red-600 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Update Password
            </button>
          </form>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-6 text-red-500">Danger Zone</h3>
          <p className="text-gray-600 mb-6">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <button className="px-8 py-3 bg-white border-2 border-red-500 text-red-500 font-medium rounded-full hover:bg-red-50 transition">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;
