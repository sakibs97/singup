import React, { useState } from 'react';
import Container from './Container';
import { getAuth, verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import { useSearchParams, useNavigate } from 'react-router-dom';

const NewPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const auth = getAuth();

    const oobCode = searchParams.get('oobCode'); // Get the reset code from the URL

    const handlePasswordChange = () => {
        if (!newPassword) {
            setError("Please enter a new password.");
            return;
        }

        // Verify the reset code
        verifyPasswordResetCode(auth, oobCode)
            .then(() => {
                // Code is valid, proceed to update the password
                return confirmPasswordReset(auth, oobCode, newPassword);
            })
            .then(() => {
                setSuccess(true);
                navigate('/login'); // Redirect to login after successful password reset
            })
            .catch((error) => {
                setError("Failed to reset password. Please try again.");
                console.error("Error resetting password:", error);
            });
    };

    return (
        <section className="bg-[url('/src/assets/back.jpg')] bg-cover bg-center min-h-screen">
            <Container className='p-10 w-full lg:w-[30%] mx-auto'>
                <div className="">
                    <div className="relative">
                        <input
                            type="password"
                            placeholder=" "
                            aria-label="Password"
                            className="peer w-full my-3 p-2 text-[#000] font-inter font-normal text-[14px] focus:outline-[blue] focus:outline-[1px] border-[#1a1919] border-[1px] rounded-md"
                            onChange={(e) => setNewPassword(e.target.value)}
                            value={newPassword}
                        />
                        <label
                            className="absolute left-[15px] top-[2px] font-inter font-normal text-[12px] text-[#fff] transition-all duration-300 transform origin-[0] peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-placeholder-shown:left-[10px] peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[12px] peer-placeholder-shown:text-[#000] peer-placeholder-shown:bg-[#fff] peer-placeholder-shown:px-0 pointer-events-none bg-[#1b1b2f] px-2 rounded-b-md"
                        >
                            Enter your New password
                        </label>
                    </div>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button
                    onClick={handlePasswordChange}
                    className="text-[#fff] font-inter font-bold text-[16px] bg-[#0b57d0] rounded-full py-3 px-8 mt-5"
                >
                    Update Password
                </button>
                {success && <p className="text-green-500 mt-3">Password updated successfully! Redirecting...</p>}
            </Container>
        </section>
    );
};

export default NewPassword;
