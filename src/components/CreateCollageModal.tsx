import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { createCollage } from "../service/collages.service";

type CreateCollageForm = {
  title: string;
};

type CreateCollageModalProp = {
  show: boolean;
  onClose: () => void;
  onCreated?: () => void;
};

const CreateCollageModal = ({
  show,
  onClose,
  onCreated,
}: CreateCollageModalProp) => {
  const { currentUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCollageForm>({
    defaultValues: {
      title: "",
    },
  });

  const submit: SubmitHandler<CreateCollageForm> = async ({ title }) => {
    if (!currentUser) {
      toast.error("You must be logged in.");
      return;
    }

    setIsSubmitting(true);

    try {
      await createCollage(currentUser.uid, title.trim());
      toast.success("Collage created! 🎉");

      onClose();
      onCreated?.();
      reset();
    } catch (error) {
      console.error(error);
      toast.error("something went wrong, please try again later");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="auth-modal">
      <Modal.Header closeButton>
        <Modal.Title>Create a new collage</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(submit)}>
          <Form.Group className="mb-3" controlId="collageTitle">
            <Form.Label>Collage Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. Greek dishes, Desserts, Snacks..."
              isInvalid={!!errors.title}
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 2,
                  message: "Title must be at least 2 characters",
                },
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Modal.Footer>
            <div className="modal-btn-footer">
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>

              <Button variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Collage"}
              </Button>
            </div>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateCollageModal;
