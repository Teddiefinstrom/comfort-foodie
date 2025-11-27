import { useEffect } from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { useLocation } from "react-router";

type AuthModalProps = {
        activeModal: "login" | "register" | null;
        setActiveModal: (modal: "login" | "register" | null) => void;
    
};

const AuthModalSwitch = ({ activeModal, setActiveModal }: AuthModalProps) => {
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

        </>
    );

};

export default AuthModalSwitch;