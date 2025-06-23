import { useState, useEffect } from "react"
import CreateWorkspace from "./CreateWorkspace"
import { Input } from "./ui/input"
import WorkspaceTable from "./WorkspaceTable"

function Overview() {
    const [workspaces, setWorkspaces] = useState<{ id: string, name: string, uploadeFile: boolean }[]>([])
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("workspaces") || "[]")
        setWorkspaces(data)
    }, [])
    const refreshWorkspaces = () => {
        const data = JSON.parse(localStorage.getItem("workspaces") || "[]")
        setWorkspaces(data)
    }

    return (
        <div className='h-full w-screen'>
            <div className="flex flex-col items-center justify-center gap-5">
                <div className="flex items-center gap-3">
                    <label htmlFor="">Workspaces</label>
                    <div className="h-[1.1px] w-96 bg-slate-400"></div>
                    <Input type="text" placeholder="Search workspaces" className="w-72" />
                    <CreateWorkspace onCreate={refreshWorkspaces} />
                </div>
                <div className="w-[992.5px]">
                    <div className="flex flex-row justify-between w-full">
                        <WorkspaceTable workspaces={workspaces} refreshWorkspaces={refreshWorkspaces} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Overview