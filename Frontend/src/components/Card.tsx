
import { Take } from "../icons/Take";

interface cardProps{
    link: string,
    title: string,
    type: "twitter" | "youtube"
}

export function Card(props: cardProps){
    return(
        <div className="animate-fadeIn">
        <div className="p-6 bg-white rounded-xl shadow-elegant border border-gray-200 max-w-80 min-h-52 min-w-80 card-hover">
            <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
                <h3 className="text-gray-800 font-medium text-sm line-clamp-2">{props.title}</h3>
            </div>
            <div className="flex items-center ml-2">
                <a 
                    href={props.link} 
                    target="_blank"
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Open content"
                >
                    <Take/>
                </a>
            </div>
            </div>
            <div className="pt-2">
                {props.type === "youtube" && (
                    <iframe 
                        className="w-full rounded-lg" 
                        src={props.link.replace("watch","embed").replace("?v=","/")} 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerPolicy="strict-origin-when-cross-origin" 
                        allowFullScreen
                    />
                )}

                {props.type === "twitter" && (
                    <blockquote className="twitter-tweet">
                        <a href={props.link.replace("x.com","twitter.com")}></a> 
                    </blockquote>
                )}
            </div>
        </div>
        </div>
    )
}
