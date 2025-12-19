import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import profilePic from "../../styling/images/cf-default-profile.png";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";

const ProfileCard = () => {
  const { currentUser } = useAuth();
  const username = currentUser?.email?.split("@")[0];
  const navigate = useNavigate();

  return (
    <>
      <div className="profile-card">
        <Card style={{ width: "18rem" }}>
          <img 
          //roundedCircle
            src={currentUser?.photoURL || profilePic}
            alt="profile"
            className="avatar-pic"
          />
          <Card.Body>
            <Card.Title>
              {currentUser?.displayName
                ? `${currentUser?.displayName}`
                : `${username}`}
            </Card.Title>
            <Card.Text>{currentUser?.email}</Card.Text>
            <Button
              variant="primary"
              className="btn-login"
              onClick={() => navigate("/profile/edit")}
            >
              Edit Profile
            </Button>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default ProfileCard;
