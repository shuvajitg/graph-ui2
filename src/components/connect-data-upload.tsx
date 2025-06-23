import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, File, Check } from "lucide-react"

export interface UploadedFile {
    id: string
    name: string
    size: number
    type: string
}

interface ConnectDataUploadProps {
    workspaceId: string,
    connectFile: () => void,
}

export default function ConnectDataUpload({ workspaceId, connectFile }: ConnectDataUploadProps) {
    const [files, setFiles] = useState<UploadedFile[]>([])
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes"
        const k = 1024
        const sizes = ["Bytes", "KB", "MB", "GB"]
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    }

    const handleConnect = () => {
        interface Workspace {
            id: string;
            [key: string]: unknown;
        }
        const workspaces: Workspace[] = JSON.parse(localStorage.getItem("workspaces") || "[]")
        const updated = workspaces.map((ws: Workspace) =>
            ws.id === workspaceId ? { ...ws, uploadeFile: true } : ws
        )
        localStorage.setItem("workspaces", JSON.stringify(updated))
        setFiles([])
        connectFile()
    }

    const handleFileSelect = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files
        if (!selectedFiles || selectedFiles.length === 0) return

        setIsUploading(true)

        // Simulate upload delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const newFiles: UploadedFile[] = Array.from(selectedFiles).map((file) => ({
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            size: file.size,
            type: file.type,
        }))

        setFiles((prev) => [...prev, ...newFiles])
        setIsUploading(false)

        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const removeFile = (id: string) => {
        setFiles((prev) => prev.filter((file) => file.id !== id))
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="space-y-4">
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".csv,.xlsx,.xls,.json,.txt"
                />

                <Button
                    variant="outline"
                    onClick={handleFileSelect}
                    disabled={isUploading}
                    className="px-2 border py-1.5 bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-700 font-normal rounded-md"
                >
                    {isUploading ? "Uploading..." : "Connect data"}
                </Button>

                {files.length > 0 && (
                    <Card className="border border-gray-200">
                        <CardContent className="p-4 space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium text-gray-900">Connected Files ({files.length})</h3>
                                <Badge variant="secondary" className="text-xs">
                                    <Check className="w-3 h-3 mr-1" />
                                    Ready
                                </Badge>
                            </div>

                            <div className="space-y-2">
                                {files.map((file) => (
                                    <div key={file.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                                        <div className="flex items-center space-x-2 min-w-0 flex-1">
                                            <File className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                                                <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeFile(file.id)}
                                            className="text-gray-400 hover:text-gray-600 p-1 h-auto"
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {files.length > 0 && (
                    <div className="flex space-x-2">
                        <Button
                            variant="outline"
                            onClick={handleFileSelect}
                            className="flex-1 text-gray-600 border-gray-200 hover:bg-gray-50"
                        >
                            Add More
                        </Button>
                        <Button
                            onClick={() => setFiles([])}
                            variant="outline"
                            className="text-gray-50 border bg-red-700 hover:bg-red-6000"
                        >
                            Clear All
                        </Button>
                        <Button
                            onClick={handleConnect}
                            variant="outline"
                            className="text-gray-600 border-gray-200 hover:bg-gray-50"
                        >
                            Connect
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
