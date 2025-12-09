import LoadingGif from "../../styling/images/cooking-spinner.gif";

const Loader = () => {

    return (
        <>
        <div className="loading-spinner">
        <img src={LoadingGif} alt="Loading" />
        <p>Loading...</p>
        </div>
        </>
    )
}

export default Loader;