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
export function Dashboard(){
    const [model,setmodel] = useState(false)
    const {contents, refresh} = useContent();

    const [selectedType, setSelectedType] = useState<string>("");

    const handleSelectContent = (type: string) => {
        setSelectedType(type);
        refresh(type); 
    };

    useEffect(() => {
        refresh(selectedType);
    }, [selectedType, refresh]);

  return (<div>
    <SideBar onSelectContent={handleSelectContent} />
    <div className='p-4 ml-72 min-h-screen bg-slate-400 border-2'>
      <CreateContent open={model} onClose={()=>{
        setmodel(false)
      }}/>
      <div className='flex justify-end gap-4'>
      <Button variant='Primary' text={"Add Content"} startIcon={<Plus/>} onClick={()=>{
        setmodel(true)
      }}/>
      <Button onClick={async()=>{
        const response = await axios.post(BACKEND_URL + "/api/v1/brain/share",{
          share: true
        },{
          headers:{
              "token": localStorage.getItem("token")
          }
      })
        const url = 'http://localhost:5173/share/'+response.data.hash
        alert(url)
      }} variant='Secondary' text={"Share Brain"} startIcon={<ShareIcon/>}/>
      </div>

      <div className='flex gap-4 flex-wrap'>
          {contents.map(({type, link, title}) => (
            <Card 
                type={type} 
                link={link} 
                title={title} 
            />
          ))}
      </div>
    </div>
    </div>
  )
}