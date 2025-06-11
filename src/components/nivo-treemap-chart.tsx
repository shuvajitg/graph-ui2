/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponsiveTreeMap } from "@nivo/treemap"

interface RadarChartDataItem {
    category: string
    sales?: number
    profit?: number
    value?: number
    performance?: number
    [key: string]: string | number | undefined
}

interface NivoTreeMapChartProps {
    data: RadarChartDataItem[]
    xKey: string
    yKey: string
}

export function NivoTreeMapChart({ data, xKey, yKey }: NivoTreeMapChartProps) {
    if (!data || data.length === 0) {
        return <div className="flex items-center justify-center h-full text-gray-500">No data available</div>
    }

    try {
        // Transform data for treemap
        const validData = data.filter((item) => item && (item.category || item.region))

        if (validData.length === 0) {
            return <div className="flex items-center justify-center h-full text-gray-500">No valid data for treemap</div>
        }

        const transformedData = {
            name: "root",
            children: validData.reduce((acc: any[], item) => {
                const category = item.category || "Unknown"
                let categoryGroup = acc.find((group) => group && group.name === category)

                if (!categoryGroup) {
                    categoryGroup = { name: category, children: [] }
                    acc.push(categoryGroup)
                }

                if (categoryGroup.children) {
                    categoryGroup.children.push({
                        name: `${item.region || "Unknown"}`,
                        value:
                            typeof item[yKey || xKey || "sales"] === "number" ? item[yKey || xKey || "sales"] : Math.random() * 1000,
                    })
                }

                return acc
            }, []),
        }

        if (!transformedData.children || transformedData.children.length === 0) {
            return <div className="flex items-center justify-center h-full text-gray-500">No valid treemap data</div>
        }

        return (
            <ResponsiveTreeMap
                data={transformedData}
                identity="name"
                value="value"
                valueFormat=".02s"
                margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                labelSkipSize={12}
                labelTextColor={{
                    from: "color",
                    modifiers: [["darker", 1.2]],
                }}
                parentLabelPosition="left"
                parentLabelTextColor={{
                    from: "color",
                    modifiers: [["darker", 2]],
                }}
                borderColor={{
                    from: "color",
                    modifiers: [["darker", 0.1]],
                }}
                colors={{ scheme: "nivo" }}
            />
        )
    } catch {
        return <div className="flex items-center justify-center h-full text-red-500">Error rendering treemap chart</div>
    }
}
