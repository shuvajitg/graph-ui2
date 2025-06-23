/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponsiveTree } from "@nivo/tree"

interface RadarChartDataItem {
    category: string
    sales?: number
    profit?: number
    value?: number
    performance?: number
    [key: string]: string | number | undefined
}

interface NivoTreeChartProps {
    data: RadarChartDataItem[]
    xKey: string
    yKey: string
}

export function NivoTreeChart({ data, yKey }: NivoTreeChartProps) {
    if (!data || data.length === 0) {
        return <div className="flex items-center justify-center h-full text-gray-500">No data available</div>
    }

    try {
        // Create hierarchical tree data
        const validData = data.filter((item) => item && (item.category || item.region || item.month))

        if (validData.length === 0) {
            return <div className="flex items-center justify-center h-full text-gray-500">No valid data for tree chart</div>
        }

        const treeData = {
            name: "Root",
            children: validData.reduce((acc: any[], item) => {
                const category = item.category || "Unknown"
                let categoryNode = acc.find((node) => node && node.name === category)

                if (!categoryNode) {
                    categoryNode = { name: category, children: [] }
                    acc.push(categoryNode)
                }

                if (categoryNode.children) {
                    categoryNode.children.push({
                        name: `${item.region || "Unknown"} - ${item.month || "Unknown"}`,
                        value: typeof item[yKey || "sales"] === "number" ? item[yKey || "sales"] : Math.random() * 1000,
                    })
                }

                return acc
            }, []),
        }

        if (!treeData.children || treeData.children.length === 0) {
            return <div className="flex items-center justify-center h-full text-gray-500">No valid tree data</div>
        }

        return (
            <ResponsiveTree
                data={treeData}
                identity="name"
                activeNodeSize={24}
                inactiveNodeSize={12}
                nodeColor={{ scheme: "category10" }}
                fixNodeColorAtDepth={1}
                linkThickness={2}
                activeLinkThickness={8}
                inactiveLinkThickness={2}
                linkColor={{
                    from: "target.color",
                    modifiers: [["opacity", 0.4]],
                }}
                margin={{ top: 90, right: 90, bottom: 90, left: 90 }}
                motionConfig="stiff"
            />
        )
    } catch {
        return <div className="flex items-center justify-center h-full text-red-500">Error rendering tree chart</div>
    }
}
