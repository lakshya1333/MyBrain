import { useState } from "react"
import { SideBar } from "../components/SideBar"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { CreateContent } from "../components/CreateContent"
import { ShareIcon } from "../icons/ShareIcon"
import { Plus } from "../icons/PlusIcon"
import { useContent } from "../hooks/useContent"
import { useEffect } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"
export function Dashboard() {
  const [model, setModel] = useState(false);
  const { contents, refresh } = useContent();

  const [selectedType, setSelectedType] = useState<string>("");

  const handleSelectContent = (type: string) => {
    setSelectedType(type);
    refresh(type);
  };

  useEffect(() => {
    refresh(selectedType);
  }, [selectedType, refresh]);

  return (
    <div className="flex flex-col sm:flex-row bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <SideBar onSelectContent={handleSelectContent} />

      {/* Main Content */}
      <div className="flex-1 p-8 sm:ml-72 mt-[4rem] sm:mt-0">
        <CreateContent
          open={model}
          onClose={() => {
            setModel(false);
          }}
        />

        {/* Header with Buttons */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">My Content</h1>
          <div className="flex gap-3">
            <Button
              variant="Secondary"
              text={"Add Content"}
              startIcon={<Plus />}
              onClick={() => {
                setModel(true);
              }}
            />
            <Button
              onClick={async () => {
                const response = await axios.post(
                  `${BACKEND_URL}/api/v1/brain/share`,
                  { share: true },
                  {
                    headers: {
                      token: localStorage.getItem("token"),
                    },
                  }
                );
                const url = `https://mybrain-backend.onrender.com/${response.data.hash}`;
                alert(url);
              }}
              variant="Primary"
              text={"Share Brain"}
              startIcon={<ShareIcon />}
            />
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contents.map(({ type, link, title }) => (
            <Card key={link} type={type} link={link} title={title} />
          ))}
        </div>

        {/* Empty State */}
        {contents.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
            <p className="text-lg mb-2">No content yet</p>
            <p className="text-sm">Add your first piece of content to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}
