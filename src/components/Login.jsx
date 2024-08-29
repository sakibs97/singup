import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "./Container";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

const Login = () => {
    const auth = getAuth();
    let navigate = useNavigate();
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [emailError, setEmailError] = useState("");
    let [passwordError, setPasswordError] = useState("");

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 8;
    };

    let handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        if (!validateEmail(newEmail)) {
            setEmailError("Please enter a valid email address.");
        } else {
            setEmailError("");
        }
    };

    let handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        if (!validatePassword(newPassword)) {
            setPasswordError("Password must be at least 8 characters long.");
        } else {
            setPasswordError("");
        }
    };

    let handleSignIn = () => {
        if (emailError || passwordError) {
            toast.error("Please fix the errors before submitting.");
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                toast.success("Signed in successfully!");
                setTimeout(() => {
                    navigate("/dash");
                }, 2000);

            })
            .catch((error) => {
                toast.error("Sign-in failed. Please check your email and password.");
            });
    };

    // 97834261S%

    return (
        <section className="bg-[url('/src/assets/back.jpg')] bg-cover bg-center min-h-screen">
            <Container>
                <div className="text-center p-10 w-full lg:w-[30%] mx-auto">
                    <div className="">
                        <h2 className="font-inter font-bold text-[35px] text-[#fff] text-center">Login</h2>
                        <p className="font-inter font-normal text-[17px] text-[#fff] text-center mb-5">Please login using account detail bellow.</p>
                    </div>
                    <div className="">
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
                        {emailError && <p className="text-[#fff] font-inter font-normal text-sm mt-0 pb-3">{emailError}</p>}
                    </div>
                    <div className="">
                        <div className="">
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder=" "
                                    aria-label="Password"
                                    className="peer w-full my-3 p-2 text-[#000] font-inter font-normal text-[14px] focus:outline-[blue] focus:outline-[1px] border-[#1a1919] border-[1px] rounded-md"
                                    onChange={handlePasswordChange}
                                    value={password}
                                />
                                <label
                                    className="absolute left-[15px] top-[2px] font-inter font-normal text-[12px] text-[#fff] transition-all duration-300 transform origin-[0] peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-placeholder-shown:left-[10px] peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[12px] peer-placeholder-shown:text-[#000] peer-placeholder-shown:bg-[#fff] peer-placeholder-shown:px-0 pointer-events-none bg-[#1b1b2f] px-2 rounded-b-md"
                                >
                                    Enter your password
                                </label>
                            </div>
                        </div>
                        {passwordError && <p className="text-[#fff] font-inter font-normal text-sm mt-0 pb-3">{passwordError}</p>}
                    </div>
                    <div className="items-end text-end">
                        <Link to="/forget" className="text-[#fff]  font-inter font-bold text-[15px]">Forgot password?</Link>
                    </div>
                    <button
                        onClick={handleSignIn}
                        className="text-[#fff] font-inter font-bold text-[16px] bg-[#0b57d0] rounded-full py-3 px-8 mt-5"
                    >
                        Sign in
                    </button>
                    <p className="font-inter font-normal text-[17px] text-[#fff] mt-5">Don’t have an Account?<Link to="/" className="hover:text-[#FB2E86] pl-1">Create account</Link></p>
                </div>
            </Container>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                limit={1}
                transition:flip
            />
        </section>
    );
}

export default Login;
