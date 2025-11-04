import { ReactElement } from "react"

interface ButtonProps{
    variant: "Primary"|"Secondary",
    text: String
    startIcon?: ReactElement,
    onClick?: ()=>void,
    fullWidth?: boolean,
    loading?: boolean
}

const variantClasses = {
    "Primary": "bg-gray-900 text-white hover:bg-gray-800 shadow-elegant",
    "Secondary": "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
}

const defaultstyles = "px-6 py-2.5 rounded-lg flex items-center font-medium text-sm btn-hover"

export function Button(props: ButtonProps){

    return(<button onClick={props.onClick} className={variantClasses[props.variant] + ' ' + defaultstyles + ' '+`${props.fullWidth?" w-full flex justify-center items-center":""} 
    ${props.loading? "opacity-50 cursor-not-allowed":""}`}
    disabled={props.loading}>
        <div className="p-2">
        {props.startIcon}
        </div>
        {props.text}
    </button>
    )
}