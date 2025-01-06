
import { Take } from "../icons/Take";

interface cardProps{
    link: string,
    title: string,
    type: "twitter" | "youtube"
}

export function Card(props: cardProps){
    return(
        <div>
        <div className="p-4 bg-white rounded-md shadow-md outline-slate-200 max-w-72 border border-gray-200 min-h-48 min-w-72">
            <div className="flex justify-between">
            <div className="flex items-center">
                
                {props.title}
            </div>
            <div className="flex items-center">
                <div className="pr-2">
                    <a href={props.link} target="_blank">
                    <Take/>
                   </a>
                </div>
            </div>
            </div>
            <div className="pt-4">
                {props.type === "youtube" && <iframe className="w-full" src={props.link.replace("watch","embed").replace("?v=","/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

                {props.type === "twitter" && <blockquote className="twitter-tweet">
               <a href={props.link.replace("x.com","twitter.com")}></a> 
                </blockquote>}
            </div>
        </div>
        </div>
    )
}