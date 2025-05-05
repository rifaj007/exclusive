import { ProfileForm } from "@/components";
import { getUserById } from "@/libs/actions/auth/get-update-user";

const ProfilePage = async () => {
  const user = await getUserById();
  return (
    <div>
      {/* user form */}
      {user ? (
        <ProfileForm user={user} />
      ) : (
        <p className="text-red-500">User not found or not logged in.</p>
      )}
    </div>
  );
};

export default ProfilePage;
