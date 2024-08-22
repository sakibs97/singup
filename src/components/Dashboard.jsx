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
            toast.success("Signed in successfully!");
            setTimeout(() => {
                navigate("/");
            }, 2000);
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <section className="bg-[#413f3f] py-10">
            <Container>
                <div className="p-10 border-[#f8b5393b] border-[2px] shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]  w-full lg:w-[30%] mx-auto bg-orange-400 rounded-lg font-inter font-normal text-[#fff] text-[17px]">
                    {data ? (
                        <ul>
                            <li className="">Name: {data.username}</li>
                            <li className="">Email: {data.email}</li>
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
