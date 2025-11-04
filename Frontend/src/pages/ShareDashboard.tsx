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
    <div className="flex flex-col sm:flex-row bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <SideBar />

      <div className="flex-1 p-8 sm:ml-72 mt-[4rem] sm:mt-0">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Shared Brain</h1>
          <p className="text-gray-600">Shared by: <span className="font-medium text-gray-900">{username}</span></p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contents.map(({ type, link, title }) => (
            <Card key={link} type={type} link={link} title={title} />
          ))}
        </div>

        {/* Empty State */}
        {contents.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
            <p className="text-lg">No shared content available</p>
          </div>
        )}
      </div>
    </div>
  );
}
