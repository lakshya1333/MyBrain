import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useRef } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Brain } from "../icons/Brain";
export function SignIn(){
    const usernameRef = useRef<HTMLInputElement>()
    const passwordRef = useRef<HTMLInputElement>()    
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState<string>("");

    async function signin(){
        const username = usernameRef.current?.value
        const password = passwordRef.current?.value
        if (!username || !password) {
            alert("Please fill in both username and password.");
            return;
        }

        try {
            const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
                username,
                password
            });
            const jwt = response.data.token
            localStorage.setItem("token",jwt)
            navigate("/dashboard")
        } catch (error: any) {
            console.error("Sign-in error:", error);
            setErrorMessage(
                error.response?.data?.message || "An error occurred while signing in."
            );
        }
    }


    return(
        <div className="w-screen h-screen bg-gray-400 flex justify-center items-center">
          <div className="bg-gray-100 rounded-xl shadow-lg flex flex-col items-center p-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6 flex items-center">
    Welcome to <span className="mx-2"><Brain /></span> My Brain
</h1>
            <div className="bg-white rounded-xl border border-gray-300 p-6 w-full max-w-md">
                <h1 className="flex justify-center text-3xl font-extrabold">Sign In</h1>
                <Input ref={usernameRef} placeholder="Username"/>
                <Input ref={passwordRef} placeholder="Password"/>
                <h2 className="flex justify-end">New user? <a className="text-blue-700 hover:underline" href="/signup">Sign Up</a></h2>
                {errorMessage && (
                        <p className="text-red-500 text-sm mt-2 text-center">{errorMessage}</p>
                    )}
                <div className="flex justify-center pt-4">
                <Button onClick={signin} variant="Primary" text="SignIn" fullWidth={true} loading={false}/>
                </div>
            </div>
            </div>
        </div>
    )
}