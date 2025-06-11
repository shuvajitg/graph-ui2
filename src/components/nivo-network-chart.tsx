/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponsiveNetwork } from "@nivo/network"

interface NivoNetworkChartProps {
    data: any[]
    xKey: string
    yKey: string
}

export function NivoNetworkChart({ data }: NivoNetworkChartProps) {
    if (!data || data.length === 0) {
        return <div className="flex items-center justify-center h-full text-gray-500">No data available</div>
    }

    try {
        // Create network data
        const validData = data.filter((item) => item && item.category && item.region)

        if (validData.length === 0) {
            return (
                <div className="flex items-center justify-center h-full text-gray-500">No valid data for network chart</div>
            )
        }

        const categories = [...new Set(validData.map((item) => item.category))]
        const regions = [...new Set(validData.map((item) => item.region))]

        const nodes = [...categories, ...regions].map((id) => ({
            id,
            height: 1,
            size: Math.random() * 20 + 10,
            color: `hsl(${Math.random() * 360}, 70%, 50%)`,
        }))

        const links = validData.map((item) => ({
            source: item.category,
            target: item.region,
            distance: Math.random() * 80 + 20,
        }))

        const networkData = { nodes, links }

        if (!networkData.nodes || networkData.nodes.length === 0 || !networkData.links || networkData.links.length === 0) {
            return <div className="flex items-center justify-center h-full text-gray-500">Insufficient network data</div>
        }

        return (
            <ResponsiveNetwork
                data={networkData}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                linkDistance={(e) => e.distance}
                centeringStrength={0.3}
                repulsivity={6}
                nodeSize={(n) => n.size}
                activeNodeSize={(n) => 1.5 * n.size}
                nodeColor={(e) => e.color}
                nodeBorderWidth={1}
                nodeBorderColor={{
                    from: "color",
                    modifiers: [["darker", 0.8]],
                }}
                linkThickness={(n) => 2 + 2 * n.target.data.height}
                linkBlendMode="multiply"
                motionConfig="wobbly"
            />
        )
    } catch {
        return <div className="flex items-center justify-center h-full text-red-500">Error rendering network chart</div>
    }
}
