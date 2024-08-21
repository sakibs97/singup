import { useState } from "react";
import { getDatabase, ref, get, child } from "firebase/database";
import Container from "./Container"
const Dashboard = () => {
    let [data, setData] = useState([]);


    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                setData(Object.values(snapshot.val()));
            } else {
                alert("No data available");
            }
        })
        .catch((error) => {
            alert(error.message);
        });


    return (
        <section className='bg-black py-10'>
            <Container>
                <div className=" text-[#fff]">
                    <ul>
                        {data.map((item, index) => (
                            <>
                                <li key={index} className="text-[#fff]">
                                    Name: {item.username}
                                </li>
                                <li className="text-[#fff]">
                                    Email: {item.email}
                                </li>
                            </>
                        ))}
                    </ul>
                </div>
            </Container>
        </section>
    );
};

export default Dashboard;
