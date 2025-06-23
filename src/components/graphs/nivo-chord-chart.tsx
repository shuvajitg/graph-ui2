import { ResponsiveChord } from "@nivo/chord"

interface RadarChartDataItem {
    category: string
    sales?: number
    profit?: number
    value?: number
    performance?: number
    [key: string]: string | number | undefined
}

interface NivoChordChartProps {
    data: RadarChartDataItem[]
    xKey: string
    yKey: string
}

export function NivoChordChart({ data, yKey }: NivoChordChartProps) {
    if (!data || data.length === 0) {
        return <div className="flex items-center justify-center h-full text-gray-500">No data available</div>
    }

    try {
        // Create a matrix for chord diagram
        const categories = [...new Set(data.filter((item) => item && item.category).map((item) => item.category))]
        const regions = [...new Set(data.filter((item) => item && item.region).map((item) => item.region))]

        if (categories.length === 0 || regions.length === 0) {
            return (
                <div className="flex items-center justify-center h-full text-gray-500">Insufficient data for chord diagram</div>
            )
        }

        const matrix = categories.map((cat) =>
            regions.map((reg) => {
                const items = data.filter((item) => item && item.category === cat && item.region === reg)
                return (
                    items.reduce((sum, item) => {
                        const value = item && typeof item[yKey || "sales"] === "number" ? item[yKey || "sales"] : 0
                        return sum + (typeof value === "number" ? value : Number(value) || 0)
                    }, 0) / 1000
                )
            }),
        )

        return (
            <ResponsiveChord
                data={matrix}
                keys={categories}
                margin={{ top: 60, right: 60, bottom: 60, left: 60 }}
                valueFormat=".2f"
                padAngle={0.02}
                innerRadiusRatio={0.96}
                innerRadiusOffset={0.02}
                arcOpacity={1}
                arcBorderWidth={1}
                arcBorderColor={{
                    from: "color",
                    modifiers: [["darker", 0.4]],
                }}
                ribbonOpacity={0.5}
                ribbonBorderWidth={1}
                ribbonBorderColor={{
                    from: "color",
                    modifiers: [["darker", 0.4]],
                }}
                enableLabel={true}
                label="id"
                labelOffset={12}
                labelRotation={-90}
                labelTextColor={{
                    from: "color",
                    modifiers: [["darker", 1]],
                }}
                colors={{ scheme: "nivo" }}
                isInteractive={true}
            // arcHoverOpacity={1}
            // arcHoverOthersOpacity={0.25}
            // ribbonHoverOpacity={0.75}
            // ribbonHoverOthersOpacity={0.25}
            />
        )
    } catch {
        return <div className="flex items-center justify-center h-full text-red-500">Error rendering chord chart</div>
    }
}
