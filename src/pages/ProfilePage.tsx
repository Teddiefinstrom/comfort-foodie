import useAuth from "../hooks/useAuth";
import ProfileCard from "../components/UserProfile/ProfileCard";

const ProfilePage = () => {
  const { currentUser } = useAuth();

  return (
    <>
    <div className="profile-page">
      <h1>
        {currentUser?.displayName
          ? `Welcome ${currentUser?.displayName}!`
          : `Welcome chef!`}
      </h1>
      <ProfileCard />
      </div>

    </>
  );
};

export default ProfilePage;
