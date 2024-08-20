import { useState } from "react";
import { getDatabase, ref, get, child } from "firebase/database";
import Container from "./Container"
const Dashboard = () => {
    let [data, setData] = useState([]);

    let handleData = () => {
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
    };

    return (
        <section className='bg-black py-10'>
            <Container>
                <div className=" text-[#fff]">
                    <button onClick={handleData} className="bg-[#fff] text-black py-2 px-4 my-5">
                        Display Data
                    </button>

                    <ul>
                        {data.map((item, index) => (
                            <>
                                <li key={index} className="text-[#fff]">
                                    {item.email}
                                </li>
                                <li className="text-[#fff]">
                                    {item.username}
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
