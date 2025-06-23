

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Input } from "./ui/input"
import { useState } from "react"
import { v4 as uuid } from 'uuid';


function CreateWorkspace({ onCreate }: { onCreate: () => void }) {
    const [name, setName] = useState("")

    const handleCreate = () => {
        if (name) {
            const existing = JSON.parse(localStorage.getItem("workspaces") || "[]")
            const updated = [...existing, { id: uuid(), name, uploadeFile: false }]
            localStorage.setItem("workspaces", JSON.stringify(updated))
            onCreate() // Notify parent to refresh
        }
        setName("")
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline"><Plus />Create New Workspace</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Create New Workspace</AlertDialogTitle>
                    <AlertDialogDescription>
                        <Input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Workspace name" />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleCreate}>Create</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default CreateWorkspace