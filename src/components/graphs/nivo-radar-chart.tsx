import { ResponsiveRadar } from "@nivo/radar"

interface RadarChartDataItem {
    category: string
    sales?: number
    profit?: number
    value?: number
    performance?: number
    [key: string]: string | number | undefined
}

interface NivoRadarChartProps {
    data: RadarChartDataItem[]
    xKey: string
    yKey: string
}

export function NivoRadarChart({ data }: NivoRadarChartProps) {
    if (!data || data.length === 0) {
        return <div className="flex items-center justify-center h-full text-gray-500">No data available</div>
    }

    try {
        // Transform data for radar chart
        const validData = data.filter((item) => item && item.category)
        const categories = [...new Set(validData.map((item) => item.category))]
        const metrics = ["sales", "profit", "value", "performance"].filter((metric) =>
            validData.some((item) => typeof item[metric] === "number"),
        )

        if (categories.length === 0 || metrics.length === 0) {
            return (
                <div className="flex items-center justify-center h-full text-gray-500">Insufficient data for radar chart</div>
            )
        }

        const radarData = metrics.map((metric) => {
            const dataPoint: Record<string, number | string> = { metric }
            categories.forEach((category) => {
                const categoryItems = validData.filter((item) => item.category === category)
                const avgValue =
                    categoryItems.length > 0
                        ? categoryItems.reduce((sum, item) => {
                            const value = typeof item[metric] === "number" ? item[metric] : 0
                            return sum + value
                        }, 0) / categoryItems.length
                        : 0
                dataPoint[category] = avgValue
            })
            return dataPoint
        })

        if (radarData.length === 0) {
            return <div className="flex items-center justify-center h-full text-gray-500">No valid radar data</div>
        }

        return (
            <ResponsiveRadar
                data={radarData}
                keys={categories}
                indexBy="metric"
                valueFormat=">-.2f"
                margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
                borderColor={{ from: "color" }}
                gridLabelOffset={36}
                dotSize={10}
                dotColor={{ theme: "background" }}
                dotBorderWidth={2}
                colors={{ scheme: "nivo" }}
                blendMode="multiply"
                motionConfig="wobbly"
                legends={[
                    {
                        anchor: "top-left",
                        direction: "column",
                        translateX: -50,
                        translateY: -40,
                        itemWidth: 80,
                        itemHeight: 20,
                        itemTextColor: "#999",
                        symbolSize: 12,
                        symbolShape: "circle",
                        effects: [
                            {
                                on: "hover",
                                style: {
                                    itemTextColor: "#000",
                                },
                            },
                        ],
                    },
                ]}
            />
        )
    } catch {
        return <div className="flex items-center justify-center h-full text-red-500">Error rendering radar chart</div>
    }
}
