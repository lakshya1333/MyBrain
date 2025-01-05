
type SideBarItemProps = {
    text: string;
    icon: JSX.Element;
    onClick: () => void;
    isActive: boolean;
};


export function SideBarItem({ text, icon, onClick, isActive }: SideBarItemProps) {
    return (
        <div
            onClick={onClick}
            className={`flex items-center p-3 cursor-pointer ${
                isActive ? "bg-gray-200 text-purple-600 font-bold" : "text-gray-700"
            } hover:bg-gray-100`}
        >
            <div className="pr-2">{icon}</div>
            {text}
        </div>
    );
}
