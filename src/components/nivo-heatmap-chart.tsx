import { ResponsiveHeatMap } from "@nivo/heatmap"
interface RadarChartDataItem {
    category: string
    sales?: number
    profit?: number
    value?: number
    performance?: number
    [key: string]: string | number | undefined
}

interface NivoHeatMapChartProps {
    data: RadarChartDataItem[]
    xKey: string
    yKey: string
}

export function NivoHeatMapChart({ data, xKey, yKey }: NivoHeatMapChartProps) {
    if (!data || data.length === 0 || !xKey || !yKey) {
        return (
            <div className="flex items-center justify-center h-full text-gray-500">No data available or missing axes</div>
        )
    }

    // Transform data for heatmap
    const xValues = [...new Set(data.map((item) => String(item[xKey])))]
    const yValues = [...new Set(data.map((item) => String(item[yKey])))]

    // Nivo expects: [{ id: xVal, data: [{ x: yVal, y: value }, ...] }, ...]
    const heatmapData = xValues.map((xVal) => {
        const rowData = yValues.map((yVal) => {
            const matchingItems = data.filter((item) => String(item[xKey]) === xVal && String(item[yKey]) === yVal)
            const value =
                matchingItems.length > 0
                    ? matchingItems.reduce((sum, item) => sum + (item.sales || 0), 0) / matchingItems.length
                    : 0
            return { x: yVal, y: value }
        })
        return { id: xVal, data: rowData }
    })

    return (
        <ResponsiveHeatMap
            data={heatmapData}
            key={yValues.join(",")}
            margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
            borderColor={{ from: "color", modifiers: [["darker", 0.8]] }}
            labelTextColor={{ from: "color", modifiers: [["darker", 1.8]] }}
            colors={{
                type: "diverging",
                scheme: "red_yellow_blue",
                divergeAt: 0.5,
                minValue: 0,
                maxValue: 20000,
            }}
            axisTop={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -90,
                legend: "",
                legendOffset: 36,
            }}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -90,
                legend: xKey,
                legendPosition: "middle",
                legendOffset: 36,
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: yKey,
                legendPosition: "middle",
                legendOffset: -40,
            }}
        />
    )
}
