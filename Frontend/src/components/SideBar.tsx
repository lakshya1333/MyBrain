import { useState } from "react";
import { Brain } from "../icons/Brain";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YouIcon";
import { SideBarItem } from "./SideBarItems";


export function SideBar({ onSelectContent }: { onSelectContent: (type: string) => void }){
    const [activeItem,setActiveItem] = useState("")

    const handleItemClick = (item: string) => {
        setActiveItem(item);
        onSelectContent(item.toLowerCase());
    };
    
    
    return <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-4">
        <div className="flex text-2xl pt-4 items-center font-extrabold">
            <div className="pr-2 text-purple-600">
            {<Brain/>}
            </div>
            My Brain
        </div>
        <div className="pt-4">
        <div className="pt-4">
        <SideBarItem
        text="Twitter"
        icon={<TwitterIcon />}
        onClick={() => handleItemClick("Twitter")}
        isActive={activeItem === "Twitter"}
        />
        <SideBarItem
        text="YouTube"
        icon={<YoutubeIcon />}
        onClick={() => handleItemClick("YouTube")}
        isActive={activeItem === "YouTube"}
        />
        </div>
        </div>
    </div>
}

