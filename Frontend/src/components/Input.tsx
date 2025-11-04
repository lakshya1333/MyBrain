



import { forwardRef } from "react";

export const Input = forwardRef<HTMLInputElement, { placeholder: string }>(
  ({ placeholder }, ref) => {
    return (<div>
        <input 
            ref={ref} 
            placeholder={placeholder} 
            type="text" 
            className="px-4 py-3 border border-gray-300 rounded-lg m-2 w-full bg-white text-gray-800 placeholder-gray-400 focus:border-gray-500 focus:ring-gray-300 transition-all"
        />
    </div>
    );
  }
);