import { useNavigate } from "react-router-dom";
import Container from "./Container"
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Login = () => {
    const auth = getAuth();
    let navigate = useNavigate()


    let handleEmail = (e) => {
        console.log(e.target.value);

    }
    let handlePassword = (e) => {
        console.log(e.target.value);

    }
    let handleSignup = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setTimeout(() => {
                    navigate("/dash")
                }, 2000)

            } else {
                // User is signed out
                // ...
            }
        });

    }

    return (
        <section className="bg-black py-10">
            <Container>
                <div className="w-[50%]">
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
            </Container>
        </section>
    )
}

export default Login