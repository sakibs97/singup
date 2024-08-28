import Container from "./Container";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Forget = () => {
    const auth = getAuth();
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        if (!validateEmail(newEmail)) {
            setEmailError("Please enter a valid email address.");
            setErrorMessage("");
            setSuccessMessage("");
        } else {
            setEmailError("");
        }
    };

    const handleSend = () => {
        if (!emailError && email) {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    setTimeout(() => {
                        setSuccessMessage("Password reset email sent! Please check your inbox.");
                        setErrorMessage("");
                        navigate("/login");
                    }, 2000);
                })
                .catch((error) => {
                    setErrorMessage("Failed to send password reset email. Please try again.");
                    setSuccessMessage("");
                });
        }
    };

    return (
        <section className="bg-[url('/src/assets/back.jpg')] bg-cover bg-center min-h-screen">
            <Container className="text-center p-10 w-full lg:w-[30%] mx-auto">
                <div className="relative">
                    <input
                        type="email"
                        placeholder=" "
                        aria-label="Email"
                        className="peer w-full my-3 p-2 text-[#000] font-inter font-normal text-[14px] focus:outline-[blue] focus:outline-[1px] border-[#1a1919] border-[1px] rounded-md"
                        onChange={handleEmailChange}
                        value={email}
                    />
                    <label
                        className="absolute left-[15px] top-[2px] font-inter font-normal text-[12px] text-[#fff] transition-all duration-300 transform origin-[0] peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-placeholder-shown:left-[10px] peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[12px] peer-placeholder-shown:text-[#000] peer-placeholder-shown:bg-[#fff] peer-placeholder-shown:px-0 pointer-events-none bg-[#1b1b2f] px-2 rounded-b-md"
                    >
                        Enter your E-mail
                    </label>
                </div>
                {emailError && <p className="text-red-500">{emailError}</p>}
                {successMessage && <p className="text-green-500">{successMessage}</p>}
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <button
                    onClick={handleSend}
                    className={`text-[#fff] font-inter font-bold text-[16px] bg-[#0b57d0] rounded-full py-3 px-8 mt-5 ${emailError || !email ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={emailError || !email}
                >
                    Send
                </button>
            </Container>
        </section>
    );
};

export default Forget;
