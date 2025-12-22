import { useForm, type SubmitHandler } from "react-hook-form";
import Button from "react-bootstrap/Button";
import profilePic from "../styling/images/cf-default-profile.png";
import useAuth from "../hooks/useAuth";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router";
import { userCol } from "../service/firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import {
  updatePassword,
  updateProfile,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import toast from "react-hot-toast";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../service/firebase";

type EditProfileForm = {
  displayName: string;
  password: string;
  currentPassword: string;
  profilePic: FileList;
};

const EditProfilePage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const username = currentUser?.email?.split("@")[0];

  const {
    register,
    handleSubmit,
  } = useForm<EditProfileForm>({
    defaultValues: {
      displayName: currentUser?.displayName || username,
      password: "",
    },
  });

  const reauthenticate = async (password: string) => {
    if (!currentUser || !currentUser.email) return;

    const credential = EmailAuthProvider.credential(
      currentUser.email,
      password
    );

    await reauthenticateWithCredential(currentUser, credential);
    await currentUser.reload();
  };

  const onSubmit: SubmitHandler<EditProfileForm> = async (data) => {
    if (!currentUser) return;

    try {
      const passwordChanged = data.password.trim().length > 0;

      if (passwordChanged) {
        if (!data.currentPassword) {
          toast.error("You must enter your current password");
          return;
        }
        await reauthenticate(data.currentPassword);
      }

      const file = data.profilePic?.[0];
      let photoURL = currentUser.photoURL || null;

      if (file) {
        const imageRef = ref(storage, `profilePictures/${currentUser.uid}`);
        await uploadBytes(imageRef, file);
        photoURL = await getDownloadURL(imageRef);
        await updateProfile(currentUser, { photoURL });
      }

      if (data.displayName !== currentUser.displayName) {
        await updateProfile(currentUser, { displayName: data.displayName });
      }

      if (passwordChanged) {
        await updatePassword(currentUser, data.password);
      }

      const userRef = doc(userCol, currentUser.uid);
      await updateDoc(userRef, {
        displayName: data.displayName,
        photoURL: photoURL,
        updatedAt: new Date(),
      });
      toast.success("Profile updated!");
      navigate("/profile");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleDeleteAccount = async () => {
    if (!currentUser) return;

    try {
      const password = prompt("Enter your current password to delete account");

      if (!password) {
        toast.error("You must enter your password to delete account");
        return;
      }

      const credential = EmailAuthProvider.credential(
        currentUser.email!,
        password
      );

      await reauthenticateWithCredential(currentUser, credential);

      const userRef = doc(userCol, currentUser.uid);
      await deleteDoc(userRef);

      await deleteUser(currentUser);

      toast.success("YOur account has been deleted");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Could not delete account");
    }
  };

  return (
    <>
      <div className="edit-profile">
        <div className="profile-header">
          <img
            src={currentUser?.photoURL || profilePic}
            alt="Profile"
            className="profile-avatar"
          />
        </div>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              {...register("profilePic")}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="displayName">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Your name"
              {...register("displayName")}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              Current Password (required for password change)
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter current password"
              {...register("currentPassword")}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="New Password"
              {...register("password")}
            />
          </Form.Group>

          <Button type="submit" className="btn-login">
            Save Changes
          </Button>
          <Button
            variant="danger"
            className="btn-delete"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </Button>
        </Form>
      </div>
    </>
  );
};

export default EditProfilePage;
