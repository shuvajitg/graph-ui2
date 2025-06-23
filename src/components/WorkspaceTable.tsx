import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import More from "./More"
import ConnectDataUpload from "./connect-data-upload"


export type Workspace = { id: string, name: string, uploadeFile: boolean }

function WorkspaceTable({ workspaces, refreshWorkspaces }: { workspaces: Workspace[], refreshWorkspaces: () => void }) {
    const connectFile = (id: string) => {
        const workspaces = JSON.parse(localStorage.getItem("workspaces") || "[]")
        const updated = workspaces.map((ws: Workspace) =>
            ws.id === id ? { ...ws, uploadeFile: true } : ws
        )
        localStorage.setItem("workspaces", JSON.stringify(updated))
        refreshWorkspaces()
    }

    const handleDelite = (id: string) => {
        const workspaces = JSON.parse(localStorage.getItem("workspaces") || "[]")
        const updated = workspaces.filter((ws: Workspace) => ws.id !== id)
        localStorage.setItem("workspaces", JSON.stringify(updated))
        refreshWorkspaces()
    }

    return (
        <Table className="w-full">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    workspaces?.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell>Credit Card</TableCell>
                            <TableCell className="text-right flex items-center justify-end gap-3">
                                {
                                    item.uploadeFile ? "" : <ConnectDataUpload connectFile={() => connectFile(item.id)} workspaceId={item.id} />
                                }
                                <More handleDelite={() => handleDelite(item.id)} />
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}

export default WorkspaceTable