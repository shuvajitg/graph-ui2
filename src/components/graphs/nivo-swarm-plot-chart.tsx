import { ResponsiveSwarmPlot } from "@nivo/swarmplot"

interface RadarChartDataItem {
    category: string
    sales?: number
    profit?: number
    value?: number
    performance?: number
    [key: string]: string | number | undefined
}

interface NivoSwarmPlotChartProps {
    data: RadarChartDataItem[]
    xKey: string
    yKey: string
}

export function NivoSwarmPlotChart({ data, xKey, yKey }: NivoSwarmPlotChartProps) {
    if (!data || data.length === 0 || !xKey || !yKey) {
        return (
            <div className="flex items-center justify-center h-full text-gray-500">No data available or missing axes</div>
        )
    }

    try {
        // Transform data for swarm plot
        const validData = data.filter((item) => item && item[xKey] && typeof item[yKey] === "number")

        if (validData.length === 0) {
            return <div className="flex items-center justify-center h-full text-gray-500">No valid data for swarm plot</div>
        }

        const transformedData = validData.map((item, index) => ({
            id: `point-${index}`,
            group: item[xKey] || "Unknown",
            value: typeof item[yKey] === "number" ? item[yKey] : 0,
            volume: Math.random() * 20 + 5,
        }))

        const groups = [...new Set(transformedData.map((d) => d.group))].filter(Boolean).map(String)

        if (groups.length === 0) {
            return <div className="flex items-center justify-center h-full text-gray-500">No valid groups for swarm plot</div>
        }

        return (
            <ResponsiveSwarmPlot
                data={transformedData}
                groups={groups}
                value="value"
                valueFormat="$.2f"
                valueScale={{ type: "linear", min: "auto", max: "auto", reverse: false }}
                size={{
                    key: "volume",
                    values: [4, 20],
                    sizes: [6, 20],
                }}
                forceStrength={4}
                simulationIterations={100}
                borderColor={{
                    from: "color",
                    modifiers: [
                        ["darker", 0.6],
                        ["opacity", 0.5],
                    ],
                }}
                margin={{ top: 80, right: 100, bottom: 80, left: 100 }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 10,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: xKey,
                    legendPosition: "middle",
                    legendOffset: 46,
                }}
                axisLeft={{
                    tickSize: 10,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: yKey,
                    legendPosition: "middle",
                    legendOffset: -76,
                }}
                colors={{ scheme: "nivo" }}
            />
        )
    } catch {
        return <div className="flex items-center justify-center h-full text-red-500">Error rendering swarm plot</div>
    }
}
