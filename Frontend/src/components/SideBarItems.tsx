
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
            className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all ${
                isActive 
                    ? "bg-gray-900 text-white shadow-elegant" 
                    : "text-gray-600 hover:bg-gray-100"
            }`}
        >
            <div className="w-5 h-5">{icon}</div>
            <span className="font-medium text-sm">{text}</span>
        </div>
    );
}
