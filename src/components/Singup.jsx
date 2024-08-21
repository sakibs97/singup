import { useState } from "react";
import Container from "./Container";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const db = getDatabase();
    const auth = getAuth();
    let navigate = useNavigate()
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [nameError, setNameError] = useState("");
    let [emailError, setEmailError] = useState("");
    let [passwordError, setPasswordError] = useState("");

    const validateName = (name) => {
        const regex = /^[A-Z]+[a-z]{2,}$/;
        return regex.test(name);
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return regex.test(password);
    };

    let handleName = (e) => {
        const newName = e.target.value;
        setName(newName);

        if (!validateName(newName)) {
            setNameError("Name must be at least 3 characters long and contain only letters.");
        } else {
            setNameError("");
        }
    };

    let handleEmail = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        if (!validateEmail(newEmail)) {
            setEmailError("Please enter a valid email address.");
        } else {
            setEmailError("");
        }
    };

    let handlePassword = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        if (!validatePassword(newPassword)) {
            setPasswordError("Password must be at least 8 characters long, include at least one number (0-9) and one special character (@$!%*#?&).");
        } else {
            setPasswordError("");
        }
    };

    let handleSignup = () => {
        if (passwordError) {
            toast.error("");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((user) => {
                updateProfile(auth.currentUser, {
                    displayName: name,
                }).then(() => {
                    toast.success("Sign up Successfully. Go to Log in Page")
                    setTimeout(() => {
                        navigate("/login")
                    }, 2000)
                }).then(() => {
                    set(ref(db, 'users/' + user.user.uid), {
                        username: name,
                        email: email,
                    });
                })
                    .catch((error) => {
                        console.error("Error during signup:", error.message);
                    });
            })
            .catch((error) => {
                error.toast("Signup failed. Please try again.");
            });
    };

    return (
        <section className="">
            <Container className="">
                <div className="p-10 border-[#f8b5393b] border-[2px] shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] w-full lg:w-[30%] mx-auto bg-orange-400 rounded-lg">
                    <h2 className="font-inter font-bold text-[35px] text-[#fff] mb-5">Sign Up</h2>
                    <div className=" mx-auto">
                        <div className="">
                            <div className="relative">
                                <input
                                    onChange={handleName}
                                    type="text"
                                    placeholder=" "
                                    aria-label="Name"
                                    className="peer w-full my-3 p-2 text-[#000] font-inter font-normal text-[14px]  focus:outline-[blue] border-[#1a1919] border-[1px] rounded-md"
                                    value={name}
                                />
                                <label
                                    className="absolute left-[15px] top-[2px] font-inter font-normal text-[12px] text-[#fff] transition-all duration-300 transform origin-[0] peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-placeholder-shown:left-[10px] peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[12px] peer-placeholder-shown:text-[#000] peer-placeholder-shown:bg-[#fff] peer-placeholder-shown:px-0 pointer-events-none bg-orange-400 px-2 rounded-b-md"
                                >
                                    Name
                                </label>
                            </div>
                            {nameError && <p className="text-[#fff] font-inter font-normal text-sm mt-0 pb-3">{nameError}</p>}
                        </div>

                        <div className="">
                            <div className="relative">
                                <input
                                    onChange={handleEmail}
                                    type="email"
                                    placeholder=" "
                                    aria-label="Email"
                                    className="peer w-full my-3 p-2 text-[#000] font-inter font-normal text-[14px]  focus:outline-[blue] focus:outline-[1px] border-[#1a1919] border-[1px] rounded-md"
                                    value={email}
                                />
                                <label
                                    className="absolute left-[15px] top-[2px] font-inter font-normal text-[12px] text-[#fff] transition-all duration-300 transform origin-[0] peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-placeholder-shown:left-[10px] peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[12px] peer-placeholder-shown:text-[#000] peer-placeholder-shown:bg-[#fff] peer-placeholder-shown:px-0 pointer-events-none bg-orange-400 px-2 rounded-b-md"
                                >
                                    Enter your E-mail
                                </label>
                            </div>
                            {emailError && <p className="text-[#fff] font-inter font-normal text-sm mt-0 pb-3">{emailError}</p>}
                        </div>


                        <div className="">
                            <div className="relative">
                                <input
                                    onChange={handlePassword}
                                    type="password"
                                    placeholder=" "
                                    aria-label="Password"
                                    className="peer w-full my-3 p-2 text-[#000] font-inter font-normal text-[14px]  focus:outline-[blue] focus:outline-[1px] border-[#1a1919] border-[1px] rounded-md"
                                    value={password}
                                />
                                <label
                                    className="absolute left-[15px] top-[2px] font-inter font-normal text-[12px] text-[#fff] transition-all duration-300 transform origin-[0] peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-placeholder-shown:left-[10px] peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[12px] peer-placeholder-shown:text-[#000] peer-placeholder-shown:bg-[#fff] peer-placeholder-shown:px-0 pointer-events-none bg-orange-400 px-2 rounded-b-md"
                                >
                                    Enter your password
                                </label>
                            </div>
                            {passwordError && <p className="text-[#fff] font-inter font-normal text-sm mt-1">{passwordError}</p>}
                        </div>

                        <button
                            onClick={handleSignup}
                            className="text-[#fff] font-inter font-bold text-[16px] bg-[#0b57d0] rounded-full py-2 px-5 mt-10"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </Container>
            <ToastContainer />
        </section>
    );
};

export default Signup;
