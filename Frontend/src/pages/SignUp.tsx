import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Brain } from "../icons/Brain";
export function SignUp(){
    const usernameRef = useRef<HTMLInputElement>()
    const passwordRef = useRef<HTMLInputElement>()
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState<string>("");

    async function signup(){
        const username = usernameRef.current?.value
        const password = passwordRef.current?.value
        if (!username || !password) {
            alert("Please fill in both username and password.");
            return;
        }

        try {
            await axios.post(BACKEND_URL + "/api/v1/signup", {
                username,
                password
            });
            navigate("/signin")
        } catch (error: any) {
            console.error("Sign-up error:", error);
            setErrorMessage(
                error.response?.data?.message || "An error occurred while signing up."
            );
        }
    }

    return(
        <div className="w-screen h-screen bg-gray-400 flex justify-center items-center">
    <div className="bg-gray-100 p-8 rounded-xl shadow-lg flex flex-col items-center">
    <h1 className="text-4xl font-extrabold text-gray-800 mb-6 flex items-center">
    Welcome to <span className="mx-2"><Brain /></span> My Brain
</h1>

        <div className="bg-white rounded-xl border border-gray-300 p-6 w-full max-w-md">
            <h2 className="text-3xl font-extrabold text-center text-gray-700 mb-4">
                Sign Up
            </h2>
            <Input ref={usernameRef} placeholder="Username" className="mb-4" />
            <Input ref={passwordRef} placeholder="Password" className="mb-4" />
            <h3 className="text-sm text-gray-600 text-right mb-4">
                Already a user? <a className="text-blue-500 hover:underline" href="/signin">Sign In</a>
            </h3>
            {errorMessage && (
                        <p className="text-red-500 text-sm mt-2 text-center">{errorMessage}</p>
                    )}
            <div className="flex justify-center">
                <Button
                    onClick={signup}
                    variant="Primary"
                    text="Sign Up"
                    fullWidth={true}
                    loading={false}
                />
            </div>
        </div>
    </div>
</div>


    )
}