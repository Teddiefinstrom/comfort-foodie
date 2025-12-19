import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";

interface SaveOptionsModalProps {
    show: boolean;
    onClose: () => void;
    onSaveOnly: () => void;
    onAddToCollage: () => void;
}

const SaveOptionsModal = ({show, onClose, onSaveOnly, onAddToCollage}: SaveOptionsModalProps) => {


    return (
        <>
        <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Save Recipe</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>How would you like to save this recipe?</p>
      </Modal.Body>

      <Modal.Footer>

        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>

        <Button variant="warning" onClick={onSaveOnly}>
          Save only
        </Button>

        <Button variant="primary" onClick={onAddToCollage}>
          Add to collage
        </Button>

      </Modal.Footer>
    </Modal>
        </>
    )
}

export default SaveOptionsModal;