import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router";
import { type SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { doc, setDoc } from "firebase/firestore";
import { userCol } from "../../service/firebase";

type SignupFormType = {
  email: string;
  password: string;
  passwordConfirm: string;
};

type RegisterModalProps = {
  show: boolean;
  onClose: () => void;
  switchToLogin: () => void;
};

const RegisterModal = ({
  show,
  onClose,
  switchToLogin,
}: RegisterModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<SignupFormType>({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const signupNewUser: SubmitHandler<SignupFormType> = async (data) => {
    setIsSubmitting(true);
    try {
      const newUser = await signup(data.email, data.password);
      const uid = newUser.user.uid;

      await setDoc(doc(userCol, uid), {
        id: uid,
        //name: data.email,
        email: data.email,
        photo: null,
      })
      reset();
      navigate("/profile");

      toast.success("Your account has been created! 🎉");
    } catch (error) {
      console.error(error);
      if (
        error instanceof Error &&
        error.message.includes("auth/email-already-in-use")
      ) {
        toast.error("This email is already in use, please choose another one.");
      } else {
        toast.error("Could not create account, please try again 💔");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} dialogClassName="auth-modal">
        <Modal.Header closeButton>
          <Modal.Title>Create an new account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(signupNewUser)}>
            <Form.Group className="mb-3" controlId="signupEmail">
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
            <Form.Group className="mb-3" controlId="signupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                isInvalid={!!errors.password}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="signupConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                isInvalid={!!errors.passwordConfirm}
                {...register("passwordConfirm", {
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.passwordConfirm?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Modal.Footer>
              <Form.Text>
                Already have an account?{" "}
                <strong className="switch-link" onClick={switchToLogin}>
                  Login here
                </strong>
              </Form.Text>
              <div className="modal-btn-footer">
                <Button variant="secondary" onClick={onClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating account.." : "Signup"}
                </Button>
              </div>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RegisterModal;
