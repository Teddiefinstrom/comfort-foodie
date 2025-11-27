import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router";
import { type SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { useState } from "react";

type LoginFormType = {
  email: string;
  password: string;
};

type LoginModalProps = {
  show: boolean;
  onClose: () => void;
  switchToRegister: () => void;
};

const LoginModal = ({ show, onClose, switchToRegister }: LoginModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, forgotPassword } = useAuth();
  const navigate = useNavigate();

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginUser: SubmitHandler<LoginFormType> = async (data) => {
    setIsSubmitting(true);
    try {
      await login(data.email, data.password);
      toast.success("Login Successfully! 🎉");
      onClose();
      navigate("/profile");
    } catch (error) {
      console.error("Login failed. Check your credentials.");
      toast.error("Incorrect email or password, access denied");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetPassword = async () => {
    const emailValue = control._formValues.email;

    if (!emailValue) {
      return toast.error("Please enter your email address to reset password.");
    }

    try {
      await forgotPassword(emailValue);
      toast.success("Password reset, check your inbox for instructions to reset your password.");
    } catch (error) {
      toast.error("Something went wrong, please try again later");
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} dialogClassName="auth-modal">
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
                isInvalid={!!errors.email}
                {...register("email", { required: "Email is required" })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-2" controlId="loginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                isInvalid={!!errors.password}
                {...register("password", { required: "Password is required" })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Text className="switch-link" onClick={resetPassword}>
              Forgot Password
            </Form.Text>
            <Modal.Footer>
              <Form.Text>
                Dont have an account?{" "}
                <strong className="switch-link" onClick={switchToRegister}>
                  Sign up here!
                </strong>
              </Form.Text>
              <div className="modal-btn-footer">
                <Button variant="secondary" onClick={onClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Loggin in.." : "Login"}
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
