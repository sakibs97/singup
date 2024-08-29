import { useState } from "react";
import Container from "./Container";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

const Signup = () => {
    const db = getDatabase();
    const auth = getAuth();
    let navigate = useNavigate();

    // State variables for form inputs
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [phoneNumber, setPhoneNumber] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [address, setAddress] = useState("");
    let [city, setCity] = useState("");
    let [postalCode, setPostalCode] = useState("");
    let [division, setDivision] = useState("");
    let [district, setDistrict] = useState("");

    // State variables for error messages
    let [nameError, setNameError] = useState("");
    let [emailError, setEmailError] = useState("");
    let [passwordError, setPasswordError] = useState("");

    // Validation functions
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

    // Handlers for form input changes
    let handleFirstName = (e) => {
        const newName = e.target.value;
        setFirstName(newName);

        if (!validateName(newName)) {
            setNameError("Name must be at least 3 characters long.");
        } else {
            setNameError("");
        }
    };

    let handleLastName = (e) => {
        setLastName(e.target.value);
    };
    let handleAddress = (e) => {
        setAddress(e.target.value)
    };
    let handleCity = (e) => {
        setCity(e.target.value)
    };
    let handlePostalCode = (e) => {
        setPostalCode(e.target.value)
    };
    let handleDivision = (e) => {
        setDivision(e.target.value)
    };
    let handleDistrict = (e) => {
        setDistrict(e.target.value)
    };

    let handlePhoneNumber = (e) => {
        setPhoneNumber(e.target.value);
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
            setPasswordError("Password must be at least 8 characters long, include at least one number (0-9) and one special character.");
        } else {
            setPasswordError("");
        }
    };

    // Signup handler
    let handleSignup = () => {

        if (!firstName || !lastName || !address || !city || !postalCode || !division || !district || !phoneNumber || !email || !password) {
            toast.error("Please fill out all fields before signing up.");
            return;
        }

        if (passwordError || nameError || emailError) {
            toast.error("Please fix the errors before proceeding.");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                updateProfile(auth.currentUser, {
                    displayName: `${firstName} ${lastName}`,
                })
                    .then(() => {
                        // Store user information in Realtime Database
                        set(ref(db, 'users/' + user.uid), {
                            firstName: firstName,
                            lastName: lastName,
                            address: address,
                            city: city,
                            postalCode: postalCode,
                            division: division,
                            phoneNumber: phoneNumber,
                            email: email,
                            district: district,
                        });

                        toast.success("Sign up Successfully. Go to Log in Page");
                        setTimeout(() => {
                            navigate("/login");
                        }, 2000);
                    })
                    .catch((error) => {
                        toast.error("Error during profile update: " + error.message);
                    });
            })
            .catch((error) => {
                toast.error("Signup failed: " + error.message);
            });
    };

    return (
        <section className="bg-[url('/src/assets/back.jpg')] bg-cover bg-center min-h-screen">
            <Container>
                <div className="text-center p-10 w-full lg:w-[30%] mx-auto rounded-lg">
                    <h2 className="font-inter font-bold text-[35px] text-[#fff] mb-5">Sign Up</h2>
                    <div className=" mx-auto">
                        <div className="">
                            <div className="relative">
                                <input
                                    onChange={handleFirstName}
                                    type="text"
                                    placeholder="First Name"
                                    aria-label="First Name"
                                    className="peer w-full my-3 p-2 text-[#000] placeholder:text-[#000] placeholder:text-[14px] placeholder:font-inter placeholder:font-normal font-inter font-normal text-[14px] rounded-md"
                                    value={firstName}
                                />
                                <label
                                    className="absolute left-[15px] top-[-2px] font-inter font-normal text-[14px] text-[#fff] transition-all duration-300 transform origin-[0] peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-placeholder-shown:left-[10px] peer-placeholder-shown:scale-100 peer-placeholder-shown:px-0 peer-placeholder-shown:opacity-0 pointer-events-none bg-[#1b1b2f] px-2 rounded-b-md opacity-100"
                                >
                                    First Name
                                </label>
                            </div>
                            {nameError && <p className="text-[red] font-inter font-normal text-sm mt-0 pb-3">{nameError}</p>}
                        </div>
                        <div className="relative">
                            <input
                                onChange={handleLastName}
                                type="text"
                                placeholder="Last Name"
                                aria-label="Last Name"
                                className="peer w-full my-3 p-2 text-[#000] placeholder:text-[#000] placeholder:text-[14px] placeholder:font-inter placeholder:font-normal font-inter font-normal text-[14px] rounded-md"
                                value={lastName}
                            />
                            <label
                                className="absolute left-[15px] top-[-2px] font-inter font-normal text-[14px] text-[#fff] transition-all duration-300 transform origin-[0] peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-placeholder-shown:left-[10px] peer-placeholder-shown:scale-100 peer-placeholder-shown:px-0 peer-placeholder-shown:opacity-0 pointer-events-none bg-[#1b1b2f] px-2 rounded-b-md opacity-100"
                            >
                                Last Name
                            </label>
                        </div>
                        <div className="">
                            <div className="relative">
                                <input type="text"
                                    onChange={handleAddress}
                                    placeholder="Address"
                                    aria-label="Address"
                                    className="peer w-full my-3 p-2 text-[#000] placeholder:text-[#000] placeholder:text-[14px] placeholder:font-inter placeholder:font-normal font-inter font-normal text-[14px] rounded-md"
                                    value={address}
                                />
                                <label
                                    className="absolute left-[15px] top-[-2px] font-inter font-normal text-[14px] text-[#fff] transition-all duration-300 transform origin-[0] peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-placeholder-shown:left-[10px] peer-placeholder-shown:scale-100 peer-placeholder-shown:px-0 peer-placeholder-shown:opacity-0 pointer-events-none bg-[#1b1b2f] px-2 rounded-b-md opacity-100">
                                    Address
                                </label>
                            </div>
                        </div>
                        <div className="">
                            <div className="relative">
                                <input type="text"
                                    onChange={handleCity}
                                    placeholder="City"
                                    aria-label="City"
                                    className="peer w-full my-3 p-2 text-[#000] placeholder:text-[#000] placeholder:text-[14px] placeholder:font-inter placeholder:font-normal font-inter font-normal text-[14px] rounded-md"
                                    value={city}
                                />
                                <label
                                    className="absolute left-[15px] top-[-2px] font-inter font-normal text-[14px] text-[#fff] transition-all duration-300 transform origin-[0] peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-placeholder-shown:left-[10px] peer-placeholder-shown:scale-100 peer-placeholder-shown:px-0 peer-placeholder-shown:opacity-0 pointer-events-none bg-[#1b1b2f] px-2 rounded-b-md opacity-100">
                                    City
                                </label>
                            </div>
                        </div>
                        <div className="">
                            <div className="relative">
                                <input type="text"
                                    onChange={handlePostalCode}
                                    placeholder="Postal Code"
                                    aria-label="Postal Code"
                                    className="peer w-full my-3 p-2 text-[#000] placeholder:text-[#000] placeholder:text-[14px] placeholder:font-inter placeholder:font-normal font-inter font-normal text-[14px] rounded-md"
                                    value={postalCode}
                                />
                                <label
                                    className="absolute left-[15px] top-[-2px] font-inter font-normal text-[14px] text-[#fff] transition-all duration-300 transform origin-[0] peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-placeholder-shown:left-[10px] peer-placeholder-shown:scale-100 peer-placeholder-shown:px-0 peer-placeholder-shown:opacity-0 pointer-events-none bg-[#1b1b2f] px-2 rounded-b-md opacity-100">
                                    Postal Code
                                </label>
                            </div>
                        </div>
                        <div className="">
                            <div className="relative">
                                <form
                                    onChange={handleDivision}
                                    value={division}
                                    className="max-w-sm mx-auto">
                                    <select id="Division" className="bg-[#fff] w-full my-3 px-2 pt-3 py-2 text-[#000] font-inter font-normal text-[14px] rounded-md">
                                        <option selected>Please select</option>
                                        <option value="Barisal"><p >Barisal</p></option>
                                        <option value="Chittagong">Chittagong</option>
                                        <option value="Dhaka">Dhaka</option>
                                        <option value="Khulna">Khulna</option>
                                        <option value="Mymensingh">Mymensingh</option>
                                        <option value="Rajshahi">Rajshahi</option>
                                        <option value="Rangpur">Rangpur</option>
                                        <option value="Sylhet">Sylhet</option>
                                    </select>
                                </form>
                                <label
                                    className="absolute left-[15px] top-[-2px] font-inter font-normal text-[14px] text-[#fff] transition-all duration-300 transform origin-[0] peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-placeholder-shown:left-[10px] peer-placeholder-shown:scale-100 peer-placeholder-shown:px-0 peer-placeholder-shown:opacity-0 pointer-events-none bg-[#1b1b2f] px-2 rounded-b-md opacity-100">
                                    Division
                                </label>
                            </div>
                        </div>
                        <div className="">
                            <div className="relative">
                                <form
                                    onChange={handleDistrict}
                                    value={district}
                                    className="max-w-sm mx-auto">
                                    <select id="District" className="bg-[#fff] peer w-full my-3 px-2 pt-3 py-2 text-[#000] font-inter font-normal text-[14px] rounded-md">
                                        <option selected>Please select</option>
                                        <option value="Barisal"><p >Barisal</p></option>
                                        <option value="Chittagong">Chittagong</option>
                                        <option value="Dhaka">Dhaka</option>
                                        <option value="Khulna">Khulna</option>
                                        <option value="Mymensingh">Mymensingh</option>
                                        <option value="Rajshahi">Rajshahi</option>
                                        <option value="Rangpur">Rangpur</option>
                                        <option value="Sylhet">Sylhet</option>
                                    </select>
                                </form>
                                <label
                                    className="absolute left-[15px] top-[-2px] font-inter font-normal text-[14px] text-[#fff] transition-all duration-300 transform origin-[0] peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-placeholder-shown:left-[10px] peer-placeholder-shown:scale-100 peer-placeholder-shown:px-0 peer-placeholder-shown:opacity-0 pointer-events-none bg-[#1b1b2f] px-2 rounded-b-md opacity-100">
                                    District
                                </label>
                            </div>
                        </div>
                        <div className="relative">
                            <input
                                onChange={handlePhoneNumber}
                                type="text"
                                placeholder="Enter your Phone number"
                                aria-label="Phone Number"
                                className="peer w-full my-3 p-2 text-[#000] placeholder:text-[#000] placeholder:text-[14px] placeholder:font-inter placeholder:font-normal font-inter font-normal text-[14px] rounded-md"
                                value={phoneNumber}
                            />
                            <label
                                className="absolute left-[15px] top-[-2px] font-inter font-normal text-[14px] text-[#fff] transition-all duration-300 transform origin-[0] peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-placeholder-shown:left-[10px] peer-placeholder-shown:scale-100 peer-placeholder-shown:px-0 peer-placeholder-shown:opacity-0 pointer-events-none bg-[#1b1b2f] px-2 rounded-b-md opacity-100"
                            >
                                Phone number
                            </label>
                        </div>

                        <div className="">
                            <div className="relative">
                                <input
                                    onChange={handleEmail}
                                    type="email"
                                    placeholder="Enter your E-mail"
                                    aria-label="Email"
                                    className="peer w-full my-3 p-2 text-[#000] placeholder:text-[#000] placeholder:text-[14px] placeholder:font-inter placeholder:font-normal font-inter font-normal text-[14px] rounded-md"
                                    value={email}
                                />
                                <label
                                    className="absolute left-[15px] top-[-2px] font-inter font-normal text-[14px] text-[#fff] transition-all duration-300 transform origin-[0] peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-placeholder-shown:left-[10px] peer-placeholder-shown:scale-100 peer-placeholder-shown:px-0 peer-placeholder-shown:opacity-0 pointer-events-none bg-[#1b1b2f] px-2 rounded-b-md opacity-100"
                                >
                                    E-mail
                                </label>
                            </div>
                            {emailError && <p className="text-[red] font-inter font-normal text-sm mt-0 pb-3">{emailError}</p>}
                        </div>


                        <div className="">
                            <div className="relative">
                                <input
                                    onChange={handlePassword}
                                    type="password"
                                    placeholder="Enter your password"
                                    aria-label="Password"
                                    className="peer w-full my-3 p-2 text-[#000] placeholder:text-[#000] placeholder:text-[14px] placeholder:font-inter placeholder:font-normal font-inter font-normal text-[14px] rounded-md"
                                    value={password}
                                />
                                <label
                                    className="absolute left-[15px] top-[-2px] font-inter font-normal text-[14px] text-[#fff] transition-all duration-300 transform origin-[0] peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-placeholder-shown:left-[10px] peer-placeholder-shown:scale-100 peer-placeholder-shown:px-0 peer-placeholder-shown:opacity-0 pointer-events-none bg-[#1b1b2f] px-2 rounded-b-md opacity-100"
                                >
                                    Password
                                </label>
                            </div>
                            {passwordError && <p className="text-[red] font-inter font-normal text-sm mt-1">{passwordError}</p>}
                        </div>

                        <button
                            onClick={handleSignup}
                            className="text-[#fff] font-inter font-bold text-[16px] bg-[#0b57d0] rounded-full py-2 px-5 mt-5"
                        >
                            Sign Up
                        </button>
                        <p className="font-inter font-normal text-[17px] text-[#fff] mt-3">Already have an Account?<Link to="/login" className="hover:text-[#FB2E86] pl-1">Login</Link></p>
                    </div>
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
                theme="colored"
                limit={1}
                transition:flip
                draggablePercent={60}
            />
        </section>
    );
};

export default Signup;
