import useAuth from "../hooks/useAuth";
import ProfileCard from "../components/ProfileCard";

const ProfilePage = () => {
    const { currentUser } = useAuth();


    return (
        <>
        <h1>{currentUser?.displayName ? `Welcome ${currentUser?.displayName}!` : `Welcome chef!`}</h1>
        <ProfileCard />
        </>
    )
}

export default ProfilePage;

