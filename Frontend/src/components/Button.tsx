import { ReactElement } from "react"

interface ButtonProps{
    variant: "Primary"|"Secondary",
    text: String
    startIcon: ReactElement,
    onClick?: ()=>void,
    fullWidth?: Boolean,
    loading?: Boolean
}

const variantClasses = {
    "Primary": "bg-purple-600 text-white font-bold",
    "Secondary": "bg-purple-200 text-purple font-bold"
}

const defaultstyles = "px-4 py-2 rounded-lg flex items-center"

export function Button(props: ButtonProps){

    return(<button onClick={props.onClick} className={variantClasses[props.variant] + ' ' + defaultstyles + ' '+`${props.fullWidth?" w-full flex justify-center items-center":""} 
    ${props.loading? "opacity-25":""}`}
    disabled={props.loading}>
        <div className="p-2">
        {props.startIcon}
        </div>
        {props.text}
    </button>
    )
}