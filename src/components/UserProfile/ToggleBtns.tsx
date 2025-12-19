import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import Nav from "react-bootstrap/esm/Nav";

type ToggleBtnProps = {
  view: string;
  setView: (val: string) => void;
};

const ToggleBtns = ({ view, setView }: ToggleBtnProps) => {
  return (
    <>
      <Nav
      variant="underline"
      activeKey={view}
      onSelect={(selectedKey) => setView(selectedKey!)}
      className="justify-content-center mb-3 toggle-tabs"
    >
      <Nav.Item>
        <Nav.Link eventKey="recipes">Saved Recipes</Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link eventKey="collages">My Collages</Nav.Link>
      </Nav.Item>
    </Nav>
    </>
  );
};

export default ToggleBtns;
