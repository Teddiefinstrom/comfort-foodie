import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

type ToggleBtnProps = {
  view: string;
  setView: (val: string) => void;
};

const ToggleBtns = ({ view, setView }: ToggleBtnProps) => {
  return (
    <>
      <ToggleButtonGroup
        type="radio"
        name="toggle-btns"
        value={view}
        onChange={(val) => setView(val)}
        className="mb-3"
      >
        <ToggleButton id="tbg-recept" value="recipes" variant="outline-warning">
          Saved Recipes
        </ToggleButton>

        <ToggleButton
          id="tbg-collages"
          value="collages"
          variant="outline-warning"
        >
          My Collages
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
};

export default ToggleBtns;
