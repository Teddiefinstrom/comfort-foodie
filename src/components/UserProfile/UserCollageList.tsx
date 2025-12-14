import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import type { Collage } from "../../types/recipe";
import { getCollages } from "../../service/collages.service";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router";
import CreateCollageModal from "../CreateCollageModal";

const UserCollageList = () => {
  const { currentUser } = useAuth();
  const [collages, setCollages] = useState<Collage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    const fetchData = async () => {
      const result = await getCollages(currentUser.uid);
      setCollages(result);
      setLoading(false);
    };
    fetchData();
  }, [currentUser]);

  if (!currentUser) return <p>You must be logged in.</p>;

  if (loading) return <p>Loading Collages...</p>;

  return (
    <>
      <div className="collage-list">
        <div className="collage-header">
          <h2>Collages</h2>

          <Button variant="warning" onClick={() => setShowModal(true)}>
            Create new Collage
          </Button>
        </div>

        <CreateCollageModal 
        show={showModal} 
        onClose={() => setShowModal(false)}
        onCreated={() => {
            getCollages(currentUser.uid).then(setCollages);
        }}
        />

        {collages.length === 0 ? (
          <p>You haven't created any collages yet.</p>
        ) : (
          <div className="collage-grid">
            {collages.map((c) => (
              <Link
                key={c.id}
                to={`/collages/${c.id}`}
                className="collage-card"
              >
                <h4>{c.title}</h4>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default UserCollageList;
