import { useEffect, useState } from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router";

const AuthModalSwitch = () => {
    const [activeModal, setActiveModal] = useState<"login" | "register" | null>(null);
    const location = useLocation();

    useEffect(() => {
        if (location.state?.openLogin) {
            setActiveModal("login");
        }
    }, [location.state]);

    return (

        <>
        <LoginModal 
        show={activeModal === "login"}
        onClose={() => setActiveModal(null)}
        switchToRegister={() => setActiveModal("register")}
        />

        < RegisterModal 
               show={activeModal === "register"}
               onClose={() => setActiveModal(null)}
               switchToLogin={() => setActiveModal("login")}
        />

        <Button className="btn-login" onClick={() => setActiveModal("login")}>
            Login
        </Button>


        </>
    );

};

export default AuthModalSwitch;