import { ResponsiveCirclePacking } from "@nivo/circle-packing"

interface RadarChartDataItem {
    category: string
    sales?: number
    profit?: number
    value?: number
    performance?: number
    [key: string]: string | number | undefined
}

interface NivoCirclePackingChartProps {
    data: RadarChartDataItem[]
    xKey: string
    yKey: string
}

export function NivoCirclePackingChart({ data, yKey }: NivoCirclePackingChartProps) {
    if (!data || data.length === 0) {
        return <div className="flex items-center justify-center h-full text-gray-500">No data available</div>
    }

    try {
        // Transform data for circle packing
        const validData = data.filter((item) => item && (item.category || item.region || item.month))

        if (validData.length === 0) {
            return (
                <div className="flex items-center justify-center h-full text-gray-500">No valid data for circle packing</div>
            )
        }

        const transformedData = {
            name: "root",
            children: validData.reduce(
                (
                    acc: { name: string; children: { name: string; value: number }[] }[],
                    item
                ) => {
                    const category = item.category || "Unknown"
                    let categoryGroup = acc.find((group) => group && group.name === category)

                    if (!categoryGroup) {
                        categoryGroup = { name: category, children: [] }
                        acc.push(categoryGroup)
                    }

                    if (categoryGroup.children) {
                        categoryGroup.children.push({
                            name: `${item.region || "Unknown"}-${item.month || "Unknown"}`,
                            value:
                                typeof item[yKey || "sales"] === "number"
                                    ? (item[yKey || "sales"] as number)
                                    : Number(item[yKey || "sales"]) || Math.random() * 1000,
                        })
                    }

                    return acc
                },
                []
            ),
        }

        if (!transformedData.children || transformedData.children.length === 0) {
            return <div className="flex items-center justify-center h-full text-gray-500">No valid hierarchical data</div>
        }

        return (
            <ResponsiveCirclePacking
                data={transformedData}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                id="name"
                value="value"
                colors={{ scheme: "nivo" }}
                padding={4}
                enableLabels={true}
                labelsFilter={(n) => 2 === n.node.depth}
                labelsSkipRadius={10}
                labelTextColor={{
                    from: "color",
                    modifiers: [["darker", 2]],
                }}
                borderWidth={1}
                borderColor={{
                    from: "color",
                    modifiers: [["darker", 0.5]],
                }}
            />
        )
    } catch {
        return (
            <div className="flex items-center justify-center h-full text-red-500">Error rendering circle packing chart</div>
        )
    }
}
