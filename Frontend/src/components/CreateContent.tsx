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
export function CreateContent({open,onClose}){
    const titleRef = useRef<HTMLInputElement>()
    const linkRef = useRef<HTMLInputElement>()
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
        {open && <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center">
            <div className="flex flex-col justify-center">
            <span className="bg-emerald-200 opacity-100 p-4 rounded">
                <div className="flex justify-end">
                    <div onClick={onClose} className="cursor-pointer">
                    <CrossIcon/>
                    </div>
                </div>
                <div>
                    <Input ref={titleRef} placeholder={"Title"}/>
                    <Input ref={linkRef} placeholder={"Link"}/>
                </div>
                <div className="flex">
                    <Button text="Youtube" onClick={()=>{
                        settype(ContentType.Youtube)
                    }} variant={type === ContentType.Youtube ? "Primary":"Secondary"}/>
                    <Button text="Twitter" onClick={()=>{
                        settype(ContentType.Twitter)
                    }}  variant={type === ContentType.Twitter ? "Primary":"Secondary"}/>
                </div>
                <div className="flex justify-center">
                <Button onClick={addcontent} variant="Primary" text="Submit"/>
                </div>
            </span>
            </div>
        </div>}
    </div>
}
