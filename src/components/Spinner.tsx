import spinner from "../styling/images/cooking-spinner.gif";

const Spinner = () => {
  return (
    <>
      <img
        src={spinner}
        alt="cooking-spinner"
        style={{ borderRadius: 500, width: 200 }}
      />
    </>
  );
};

export default Spinner;
