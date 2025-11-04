import { useState } from "react";
import { Brain } from "../icons/Brain";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YouIcon";
import { SideBarItem } from "./SideBarItems";

type SideBarProps = {
  onSelectContent?: (type: string) => void; // Mark as optional
};

export function SideBar({ onSelectContent }: SideBarProps) {
    const [activeItem, setActiveItem] = useState("");
  
    const handleItemClick = (item: string) => {
      setActiveItem(item);
      //@ts-ignore
      onSelectContent(item.toLowerCase());
    };
  
    return (
      <div className="fixed top-0 left-0 w-full sm:w-72 bg-white border-r border-gray-200 h-16 sm:h-screen flex sm:flex-col items-center sm:items-start justify-between sm:justify-start p-6 z-50 shadow-elegant">
        <div className="flex items-center text-2xl font-semibold text-gray-900 gap-2">
          <Brain /> 
          <span>My Brain</span>
        </div>
        <div className="flex sm:flex-col gap-2 mt-0 sm:mt-8 w-full sm:w-auto">
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
    );
  }
  


