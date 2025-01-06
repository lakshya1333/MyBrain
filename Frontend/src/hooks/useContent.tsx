import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export function useContent(type?: string) {
    const [contents, setContents] = useState([]);

    function refresh(customType?: string) {
        const contentType = customType || type || ""; 
        const endpoint = contentType
            ? `${BACKEND_URL}/api/v1/content/${contentType}`
            : `${BACKEND_URL}/api/v1/content`;

        axios
            .get(endpoint, {
                headers: {
                    token: localStorage.getItem("token") || "",
                },
            })
            .then((response) => {
                setContents(response.data.content);
            })
            .catch((error) => {
                console.error("Error fetching content:", error);
            });
    }

    useEffect(() => {
        refresh(); 

        const interval = setInterval(() => {
            refresh();
        }, 10 * 1000);

        return () => {
            clearInterval(interval);
        };
    }, [type]);

    return { contents, refresh };
}
