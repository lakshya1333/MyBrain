import { useState, useEffect } from "react";
import { SideBar } from "../components/SideBar";
import { Card } from "../components/Card";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function ShareDashboard() {
  const { shareLink } = useParams();
  const [contents, setContents] = useState([]);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    if (shareLink) {
      axios
        .get(`${BACKEND_URL}/api/v1/brain/${shareLink}`, {
          headers: {
            token: localStorage.getItem("token") || "",
          },
        })
        .then((response) => {
          setContents(response.data.content);
          setUsername(response.data.username);
        })
        .catch((error) => {
          console.error("Error fetching shared dashboard:", error);
        });
    }
  }, [shareLink]);

  return (
    <div className="flex flex-col sm:flex-row">
      {/* Sidebar */}
      <SideBar />

      <div className="flex-1 p-4 bg-slate-400 border-2 sm:ml-72 mt-[4rem] sm:mt-0 min-h-screen">

        <h1 className="text-xl font-bold mb-4">Shared by: {username}</h1>

        <div className="flex gap-4 flex-wrap">
          {contents.map(({ type, link, title }) => (
            <Card key={link} type={type} link={link} title={title} />
          ))}
        </div>
      </div>
    </div>
  );
}
