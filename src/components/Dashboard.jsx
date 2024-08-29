import { useState, useEffect } from "react";
import { getDatabase, ref, get, child } from "firebase/database";
import { getAuth, signOut } from "firebase/auth";
import Container from "./Container";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [data, setData] = useState(null);
    const auth = getAuth();
    let navigate = useNavigate()
    const user = auth.currentUser;

    useEffect(() => {
        if (user) {
            const dbRef = ref(getDatabase());
            get(child(dbRef, `users/${user.uid}`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        setData(snapshot.val());
                    } else {
                        alert("No data available");
                    }
                })
                .catch((error) => {
                    alert(error.message);
                });
        } else {
            alert("User not logged in");
        }
    }, [user]);

    let handleSignOut = () => {
        signOut(auth).then(() => {
            toast.success("Signed Out successfully!");
            setTimeout(() => {
                navigate("/");
            }, 2000);
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <section className="bg-[url('/src/assets/back.jpg')] bg-cover bg-center min-h-screen py-10">
            <Container>
                <div className="p-10 w-full lg:w-[30%] mx-auto rounded-lg font-inter font-normal text-[#fff] text-[17px]">
                    {data ? (
                        <ul>
                            <li className="font-inter font-bold text-[15px] text-white py-2">First Name: {data.firstName}</li>
                            <li className="font-inter font-bold text-[15px] text-white py-2">Last Name: {data.lastName}</li>
                            <li className="font-inter font-bold text-[15px] text-white py-2">Address: {data.address}</li>
                            <li className="font-inter font-bold text-[15px] text-white py-2">City: {data.city}</li>
                            <li className="font-inter font-bold text-[15px] text-white py-2">Postal Code: {data.postalCode}</li>
                            <li className="font-inter font-bold text-[15px] text-white py-2">Division: {data.division}</li>
                            <li className="font-inter font-bold text-[15px] text-white py-2">District: {data.district}</li>
                            <li className="font-inter font-bold text-[15px] text-white py-2">Email: {data.email}</li>
                            <li className="font-inter font-bold text-[15px] text-white py-2">Phone Number: {data.phoneNumber}</li>
                        </ul>
                    ) : (
                        <p>Loading...</p>
                    )}
                    <div className="my-5 text-end">
                        <button onClick={handleSignOut} className="text-[#fff] font-inter font-bold text-[20px]">Sign out</button>
                    </div>
                </div>
            </Container>
            <ToastContainer />
        </section>
    );
};

export default Dashboard;
