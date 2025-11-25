import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import Button from "react-bootstrap/Button";

const ProfilePage = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    return (
        <>
        <h2>Welcome {currentUser?.email}</h2>

        <Button className="btn-login" onClick={handleLogout}>
            Logout
        </Button>
        </>
    )
}

export default ProfilePage;