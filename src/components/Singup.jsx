import { useState } from "react";
import Container from "./Container";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";

const Signup = () => {
    const db = getDatabase();
    const auth = getAuth();
    let navigate = useNavigate()
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");


    let handleName = (e) => {
        setName(e.target.value);
    };

    let handleEmail = (e) => {
        setEmail(e.target.value);
    };

    let handlePassword = (e) => {
        setPassword(e.target.value);
    };

    let handleSignup = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((user) => {
                updateProfile(auth.currentUser, {
                    displayName: name,
                }).then(() => {
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
                        // An error occurred
                        // ...
                    });
            })
            .catch((error) => {
                console.error("Error during signup:", error.message);
            });
    };
    // bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500
    // dark:bg-gray-800 rounded-lg shadow-md
    return (
        <section className="">
            <Container className="">
                <div className="p-10 border-[#f8b5393b] border-[2px] shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] w-full lg:w-[30%] mx-auto bg-orange-400 rounded-lg">
                    <h2 className="font-inter font-bold text-[35px] text-[#fff] mb-5">Sign Up</h2>
                    <div className=" mx-auto">
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
                        <button
                            onClick={handleSignup}
                            className="text-[#fff] font-inter font-bold text-[16px] bg-[#0b57d0] rounded-full py-2 px-5 mt-10"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </Container>
        </section >
    );
};

export default Signup;
