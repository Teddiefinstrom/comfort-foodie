import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router";
import { type SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

type LoginFormType = {
  email: string;
  password: string;
};

type LoginModalProps = {
    show: boolean;
    onClose: () => void;
    switchToRegister: () => void;
}

const LoginModal = ({ show, onClose, switchToRegister }: LoginModalProps) => {

  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginUser: SubmitHandler<LoginFormType> = async (data) => {
    try {
        await login(data.email, data.password);
        toast.success("Logged in! 🎉");
        onClose();
        navigate("/profile");
    } catch (error) {
        toast.error("Login failed. Check your credentials.");
    }
  };

  return (
    <>
        <Modal show={show} onHide={onClose} dialogClassName="auth-modal">
          <Modal.Header closeButton>
            <Modal.Title>Login to your account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit(loginUser)}>
              <Form.Group className="mb-3" controlId="loginEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                type="email" 
                placeholder="name@example.com" 
                {...register("email", { required: "Incorrect Email or Password"})}
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="loginPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                type="password" 
                placeholder="Password"
                {...register("password", { required: "Incorrect Email or Password" })}
                />
              </Form.Group>
              <Form.Text>Forgot Password</Form.Text>
            
         
          <Modal.Footer>
            <Form.Text>
              Dont have an account?{" "}
              <strong 
              className="switch-link" 
              onClick={switchToRegister}
              >
                Sign up here!
              </strong>
            </Form.Text>
            <div className="modal-btn-footer">
              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </div>
          </Modal.Footer>
          </Form>
          </Modal.Body>
        </Modal>
   
    </>
  );
};

export default LoginModal;
