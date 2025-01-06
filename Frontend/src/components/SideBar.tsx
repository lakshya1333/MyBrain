import { useState } from "react";
import { Brain } from "../icons/Brain";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YouIcon";
import { SideBarItem } from "./SideBarItems";

export function SideBar({ onSelectContent }: { onSelectContent: (type: string) => void }) {
    const [activeItem, setActiveItem] = useState("");
  
    const handleItemClick = (item: string) => {
      setActiveItem(item);
      onSelectContent(item.toLowerCase());
    };
  
    return (
      <div className="fixed top-0 left-0 w-full sm:w-72 bg-white border-r h-16 sm:h-screen flex sm:flex-col items-center sm:items-start justify-between sm:justify-start p-4 z-50">
        <div className="flex items-center text-2xl font-extrabold text-purple-600">
          <Brain /> My Brain
        </div>
        <div className="flex sm:flex-col gap-4 mt-4 sm:mt-8">
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
  


