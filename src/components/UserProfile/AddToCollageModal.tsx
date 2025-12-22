import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import type { Collage, RecipeLikeData } from "../../types/recipe";
import {
  addRecipeToCollage,
  getCollages,
} from "../../service/collages.service";
import toast from "react-hot-toast";
import Modal from "react-bootstrap/esm/Modal";
import Button from "react-bootstrap/esm/Button";
import ListGroup from "react-bootstrap/esm/ListGroup";
import CreateCollageModal from "../CreateCollageModal";

interface AddToCollageProps {
  show: boolean;
  onClose: () => void;
  recipe: RecipeLikeData | null;
}

const AddToCollageModal = ({ show, onClose, recipe }: AddToCollageProps) => {
  const { currentUser } = useAuth();
  const [collages, setCollages] = useState<Collage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    if (!currentUser || !show) return;

    const loadCollages = async () => {
      setLoading(true);
      const data = await getCollages(currentUser.uid);
      setCollages(data);
      setLoading(false);
    };
    loadCollages();
  }, [currentUser, show]);

  const handleAdd = async (collageId: string) => {
    if (!currentUser || !recipe) return;

    await addRecipeToCollage(currentUser.uid, collageId, recipe);
    toast.success(
      `Added to "${collages.find((c) => c.id === collageId)?.title}"`
    );
    onClose();
  };

  return (
    <>
      <Modal show={show} onHide={onClose} centered className="auth-modal add-to-collage-modal">
        <Modal.Header closeButton>
          <Modal.Title>Add to collage</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {loading ? (
            <p>Loading collages...</p>
          ) : collages.length === 0 ? (
            <p>You have no collages yet.</p>
          ) : (
            <ListGroup>
              {collages.map((c) => (
                <ListGroup.Item
                  key={c.id}
                  action
                  onClick={() => handleAdd(c.id)}
                >
                  {c.title}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>

          <Button variant="warning" onClick={() => setShowCreateModal(true)}>
            Create new Collage
          </Button>
        </Modal.Footer>
      </Modal>

      <CreateCollageModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreated={async () => {
          if (!currentUser) return;
          const data = await getCollages(currentUser.uid);
          setCollages(data);
        }}
      />
    </>
  );
};

export default AddToCollageModal;
