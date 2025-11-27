import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import profilePic from "../styling/images/hjb.jpg";
import useAuth from "../hooks/useAuth";

const ProfileCard = () => {
    const { currentUser } = useAuth();
    const username = currentUser?.email?.split("@")[0];

  return (
    <>
    <div className="profile-card">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={profilePic} className="rounded-circle" />
        <Card.Body>
            <Card.Title>{currentUser?.displayName ? `Welcome ${currentUser?.displayName}!`: `${username}`}</Card.Title>
          <Card.Text>
            {currentUser?.email}
          </Card.Text>
          <Button variant="primary" className="btn-login">Edit Profile</Button>
        </Card.Body>
      </Card>
      </div>
    </>
  );
};

export default ProfileCard;
