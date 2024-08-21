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
    let handleSignIn = () => {
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
        <section className="">
            <Container>
                <div className="p-10 border-[#f8b5393b] border-[2px] shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]  w-[30%] mx-auto bg-orange-400 rounded-lg">
                    <h2 className="font-inter font-bold text-[35px] text-[#fff] mb-5">Sign in</h2>
                    <div className="relative">
                        <input
                            onChange={handleEmail}
                            type="email"
                            placeholder=" "
                            aria-label="Email"
                            className="peer w-full my-3 p-2 text-[#000] font-inter font-normal text-[14px]  focus:outline-[blue] focus:outline-[1px] border-[#1a1919] border-[1px] rounded-md"

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

                        />
                        <label
                            className="absolute left-[15px] top-[2px] font-inter font-normal text-[12px] text-[#fff] transition-all duration-300 transform origin-[0] peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-placeholder-shown:left-[10px] peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[12px] peer-placeholder-shown:text-[#000] peer-placeholder-shown:bg-[#fff] peer-placeholder-shown:px-0 pointer-events-none bg-orange-400 px-2 rounded-b-md"
                        >
                            Enter your password
                        </label>
                    </div>
                    <button
                        onClick={handleSignIn}
                        className="text-[#fff] font-inter font-bold text-[16px] bg-[#0b57d0] rounded-full py-2 px-5 mt-10"
                    >
                        Sign in
                    </button>
                </div>
            </Container>
        </section>
    )
}

export default Login