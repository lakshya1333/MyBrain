import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}
// Controled Component
export function CreateContent({ open, onClose }: { open: boolean; onClose: () => void }){
    const titleRef = useRef<HTMLInputElement | null>(null)
    const linkRef = useRef<HTMLInputElement | null>(null)
    const [type,settype] = useState(ContentType.Youtube)

    async function addcontent(){
        const title = titleRef.current?.value
        const link = linkRef.current?.value

        try{
            await axios.post(BACKEND_URL + "/api/v1/content", {
                link,
                type,
                title,
            },{
                headers:{
                    "token": localStorage.getItem("token")
                }
            });
        }catch(error: any){
            console.error("Adding content error:", error);
            alert(error.response?.data?.message || "An error occurred while adding.");
        }
        onClose()
    }
    return <div>
        {open && <div className="w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 flex justify-center items-center backdrop-blur-sm z-50">
            <div className="flex flex-col justify-center items-center">
            <div className="bg-white rounded-2xl shadow-elegant-lg p-8 w-full max-w-md animate-fadeIn">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900">Add Content</h2>
                    <button 
                        onClick={onClose} 
                        className="cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Close"
                    >
                        <CrossIcon/>
                    </button>
                </div>
                <div className="space-y-4">
                    <Input ref={titleRef} placeholder={"Title"}/>
                    <Input ref={linkRef} placeholder={"Link"}/>
                </div>
                <div className="flex gap-3 mt-6">
                    <Button text="Youtube" onClick={()=>{
                        settype(ContentType.Youtube)
                    }} variant={type === ContentType.Youtube ? "Primary":"Secondary"}/>
                    <Button text="Twitter" onClick={()=>{
                        settype(ContentType.Twitter)
                    }}  variant={type === ContentType.Twitter ? "Primary":"Secondary"}/>
                </div>
                <div className="flex justify-center mt-6">
                    <Button onClick={addcontent} variant="Primary" text="Submit" fullWidth={true}/>
                </div>
            </div>
            </div>
        </div>}
    </div>
}
