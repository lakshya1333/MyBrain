import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Brain } from "../icons/Brain";
export function SignUp(){
    const usernameRef = useRef<HTMLInputElement | null>(null)
    const passwordRef = useRef<HTMLInputElement | null>(null)
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
        <div className="w-screen h-screen bg-gray-50 flex justify-center items-center">
            <div className="bg-white rounded-2xl shadow-elegant-lg flex flex-col items-center p-10 max-w-lg w-full mx-4">
                <div className="flex items-center gap-3 mb-8">
                    <Brain />
                    <h1 className="text-3xl font-semibold text-gray-900">My Brain</h1>
                </div>
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-8 w-full">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Sign Up</h2>
                    <div className="space-y-4">
                        <Input ref={usernameRef} placeholder="Username" />
                        <Input ref={passwordRef} placeholder="Password" />
                    </div>
                    <div className="flex justify-end mt-4 text-sm">
                        <span className="text-gray-600">Already a user? </span>
                        <a className="text-gray-900 hover:underline ml-1 font-medium" href="/signin">Sign In</a>
                    </div>
                    {errorMessage && (
                        <p className="text-red-600 text-sm mt-4 text-center bg-red-50 py-2 px-3 rounded-lg">{errorMessage}</p>
                    )}
                    <div className="flex justify-center pt-6">
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