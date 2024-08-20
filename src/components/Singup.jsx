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

    return (
        <section className="bg-black">
            <Container className="py-10 bg-black">
                <div>
                    <h2 className="font-inter font-bold text-[35px] text-[#fff]">Sign Up</h2>
                    <div className="w-[50%]">
                        <input
                            onChange={handleName}
                            type="text"
                            placeholder="First Name"
                            aria-label="First Name"
                            className="w-full my-3 border-[#000]"
                        />
                        <input
                            onChange={handleEmail}
                            type="email"
                            placeholder="Enter your E-mail"
                            aria-label="Email"
                            className="w-full my-3 border-[#000]"
                        />
                        <input
                            onChange={handlePassword}
                            type="password"
                            placeholder="Enter your password"
                            aria-label="Password"
                            className="w-full my-3 border-[#000]"
                        />
                        <button
                            onClick={handleSignup}
                            className="text-[#fff] bg-[red] py-2 px-4 my-10"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Signup;
