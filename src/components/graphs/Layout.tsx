import React from "react"

import { useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    BarChart3,
    PieChart,
    LineChart,
    AreaChart,
    ScatterChart,
    TrendingUp,
    Calendar,
    GitBranch,
    Circle,
    Thermometer,
    Network,
    Zap,
    Layers,
    TreePine,
    Grid3X3,
    Hexagon,
    Radar,
} from "lucide-react"
import { NivoBarChart } from "./nivo-bar-chart"
import { NivoPieChart } from "./nivo-pie-chart"
import { NivoLineChart } from "./nivo-line-chart"
import { NivoAreaChart } from "./nivo-area-chart"
import { NivoScatterChart } from "./nivo-scatter-chart"
import { NivoCalendarChart } from "./nivo-calendar-chart"
import { NivoChordChart } from "./nivo-chord-chart"
import { NivoCirclePackingChart } from "./nivo-circle-packing-chart"
import { NivoHeatMapChart } from "./nivo-heatmap-chart"
import { NivoNetworkChart } from "./nivo-network-chart"
import { NivoParallelCoordinatesChart } from "./nivo-parallel-coordinates-chart"
import { NivoSwarmPlotChart } from "./nivo-swarm-plot-chart"
import { NivoTreeChart } from "./nivo-tree-chart"
import { NivoTreeMapChart } from "./nivo-treemap-chart"
import { NivoWaffleChart } from "./nivo-waffle-chart"
import { NivoRadarChart } from "./nivo-radar-chart"
import GraphList from "./GraphList"

// Enhanced sample data with more variety
const sampleData = [
    {
        id: 1,
        category: "Electronics",
        sales: 12000,
        profit: 3000,
        month: "Jan",
        region: "North",
        date: "2024-01-15",
        value: 85,
        performance: 92,
    },
    {
        id: 2,
        category: "Clothing",
        sales: 8000,
        profit: 2000,
        month: "Jan",
        region: "South",
        date: "2024-01-20",
        value: 65,
        performance: 78,
    },
    {
        id: 3,
        category: "Books",
        sales: 5000,
        profit: 1500,
        month: "Jan",
        region: "East",
        date: "2024-01-25",
        value: 45,
        performance: 65,
    },
    {
        id: 4,
        category: "Electronics",
        sales: 15000,
        profit: 4000,
        month: "Feb",
        region: "North",
        date: "2024-02-15",
        value: 95,
        performance: 88,
    },
    {
        id: 5,
        category: "Clothing",
        sales: 9000,
        profit: 2500,
        month: "Feb",
        region: "South",
        date: "2024-02-20",
        value: 70,
        performance: 82,
    },
    {
        id: 6,
        category: "Books",
        sales: 5500,
        profit: 1800,
        month: "Feb",
        region: "East",
        date: "2024-02-25",
        value: 50,
        performance: 70,
    },
    {
        id: 7,
        category: "Electronics",
        sales: 18000,
        profit: 5000,
        month: "Mar",
        region: "North",
        date: "2024-03-15",
        value: 100,
        performance: 95,
    },
    {
        id: 8,
        category: "Clothing",
        sales: 11000,
        profit: 3000,
        month: "Mar",
        region: "South",
        date: "2024-03-20",
        value: 80,
        performance: 85,
    },
    {
        id: 9,
        category: "Books",
        sales: 6000,
        profit: 2000,
        month: "Mar",
        region: "East",
        date: "2024-03-25",
        value: 55,
        performance: 75,
    },
    {
        id: 10,
        category: "Home",
        sales: 7500,
        profit: 2200,
        month: "Jan",
        region: "West",
        date: "2024-01-30",
        value: 60,
        performance: 72,
    },
    {
        id: 11,
        category: "Home",
        sales: 8200,
        profit: 2400,
        month: "Feb",
        region: "West",
        date: "2024-02-28",
        value: 65,
        performance: 76,
    },
    {
        id: 12,
        category: "Home",
        sales: 9100,
        profit: 2700,
        month: "Mar",
        region: "West",
        date: "2024-03-30",
        value: 72,
        performance: 80,
    },
]

export type ChartType =
    | "bar"
    | "pie"
    | "line"
    | "area"
    | "scatter"
    | "calendar"
    | "chord"
    | "circle-packing"
    | "heatmap"
    | "network"
    | "parallel-coordinates"
    | "swarm-plot"
    | "tree"
    | "treemap"
    | "waffle"
    | "radar"

const chartTypes = [
    { id: "bar", name: "Bar Chart", icon: BarChart3 },
    { id: "pie", name: "Pie Chart", icon: PieChart },
    { id: "line", name: "Line Chart", icon: LineChart },
    { id: "area", name: "Area Chart", icon: AreaChart },
    { id: "scatter", name: "Scatter Plot", icon: ScatterChart },
    { id: "calendar", name: "Calendar", icon: Calendar },
    { id: "chord", name: "Chord Diagram", icon: GitBranch },
    { id: "circle-packing", name: "Circle Packing", icon: Circle },
    { id: "heatmap", name: "Heat Map", icon: Thermometer },
    { id: "network", name: "Network", icon: Network },
    { id: "parallel-coordinates", name: "Parallel Coordinates", icon: Zap },
    { id: "swarm-plot", name: "Swarm Plot", icon: Layers },
    { id: "tree", name: "Tree", icon: TreePine },
    { id: "treemap", name: "Tree Map", icon: Grid3X3 },
    { id: "waffle", name: "Waffle Chart", icon: Hexagon },
    { id: "radar", name: "Radar Chart", icon: Radar },
]


export default function DataVisualizationDashboard() {
    const [selectedChartType, setSelectedChartType] = useState<ChartType>("bar")
    const [xAxis, setXAxis] = useState<string>("")
    const [yAxis, setYAxis] = useState<string>("")
    const [draggedColumn, setDraggedColumn] = useState<string>("")

    // Get column names from the data with safety checks
    const columns = React.useMemo(() => {
        try {
            if (!sampleData || sampleData.length === 0 || !sampleData[0]) {
                return []
            }
            return Object.keys(sampleData[0]).filter((key) => key !== "id")
        } catch (error) {
            console.error("Error getting columns:", error)
            return []
        }
    }, [])

    const handleDragStart = (column: string) => {
        setDraggedColumn(column)
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
    }

    const handleDropOnXAxis = (e: React.DragEvent) => {
        e.preventDefault()
        if (draggedColumn) {
            setXAxis(draggedColumn)
            setDraggedColumn("")
        }
    }

    const handleDropOnYAxis = (e: React.DragEvent) => {
        e.preventDefault()
        if (draggedColumn) {
            setYAxis(draggedColumn)
            setDraggedColumn("")
        }
    }

    // Some charts don't require both X and Y axes
    const chartsRequiringBothAxes = [
        "bar",
        "line",
        "area",
        "scatter",
        "heatmap",
        "parallel-coordinates",
        "swarm-plot",
        "pie"
    ]
    const chartsRequiringOneAxis = ["treemap", "waffle", "calendar"]
    const chartsRequiringNoAxes = ["chord", "circle-packing", "network", "tree", "radar"]

    const renderChart = () => {
        try {

            if (chartsRequiringBothAxes.includes(selectedChartType) && (!xAxis || !yAxis)) {
                return (
                    <div className="flex items-center justify-center h-96 text-muted-foreground">
                        <div className="text-center">
                            <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>Drag columns to X and Y axes to generate a chart</p>
                        </div>
                    </div>
                )
            }

            if (chartsRequiringOneAxis.includes(selectedChartType) && !xAxis && !yAxis) {
                return (
                    <div className="flex items-center justify-center h-96 text-muted-foreground">
                        <div className="text-center">
                            <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>Drag at least one column to an axis to generate a chart</p>
                        </div>
                    </div>
                )
            }
            const chartProps = {
                data: sampleData || [],
                xKey: xAxis || "",
                yKey: yAxis || "",
            }

            switch (selectedChartType) {
                case "bar":
                    return <NivoBarChart {...chartProps} />
                case "pie":
                    return <NivoPieChart {...chartProps} />
                case "line":
                    return <NivoLineChart {...chartProps} />
                case "area":
                    return <NivoAreaChart {...chartProps} />
                case "scatter":
                    return <NivoScatterChart {...chartProps} />
                case "calendar":
                    return <NivoCalendarChart {...chartProps} />
                case "chord":
                    return <NivoChordChart {...chartProps} />
                case "circle-packing":
                    return <NivoCirclePackingChart {...chartProps} />
                case "heatmap":
                    return <NivoHeatMapChart {...chartProps} />
                case "network":
                    return <NivoNetworkChart {...chartProps} />
                case "parallel-coordinates":
                    return <NivoParallelCoordinatesChart {...chartProps} />
                case "swarm-plot":
                    return <NivoSwarmPlotChart {...chartProps} />
                case "tree":
                    return <NivoTreeChart {...chartProps} />
                case "treemap":
                    return <NivoTreeMapChart {...chartProps} />
                case "waffle":
                    return <NivoWaffleChart {...chartProps} />
                case "radar":
                    return <NivoRadarChart {...chartProps} />
                default:
                    return (
                        <div className="flex items-center justify-center h-96 text-muted-foreground">
                            <p>Chart type not supported</p>
                        </div>
                    )
            }
        } catch (error) {
            console.error("Error rendering chart:", error)
            return (
                <div className="flex items-center justify-center h-96 text-red-500">
                    <p>Error rendering chart. Please try a different configuration.</p>
                </div>
            )
        }
    }

    if (!sampleData || sampleData.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">No Data Available</h1>
                    <p className="text-gray-600">Please ensure sample data is loaded correctly.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="h-screen w-screen bg-gray-50 overflow-x-hidden">
            <div className="w-full h-full mx-auto space-y-6">
                <div className="flex gap-6 w-full h-full">
                    {/* Data Columns */}
                    <Card className="w-96">
                        <CardHeader>
                            <CardTitle className="text-lg">Data Columns</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-2">
                                {columns && columns.length > 0 ? (
                                    columns.map((column) => (
                                        <div
                                            key={column}
                                            draggable
                                            onDragStart={() => handleDragStart(column)}
                                            className="p-3 bg-blue-50 border border-blue-200 rounded-sm cursor-move hover:bg-blue-100 transition-colors flex items-center justify-center"
                                        >
                                            <span className="font-medium text-blue-800">{column}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-gray-500 text-sm">No columns available</div>
                                )}
                            </div>

                            <GraphList
                                chartTypes={chartTypes}
                                selectedChartType={selectedChartType}
                                setSelectedChartType={setSelectedChartType}
                                chartsRequiringNoAxes={chartsRequiringNoAxes}
                                chartsRequiringOneAxis={chartsRequiringOneAxis}
                                chartsRequiringBothAxes={chartsRequiringBothAxes} />

                        </CardContent>
                    </Card>

                    <div className="w-full flex flex-col gap-3">
                        <div className="flex w-full flex-row items-center gap-4">
                            <div className="flex items-center w-[50%]">
                                {/* <label className="text-sm font-medium text-gray-700 mb-2 block w-20">X-Axis</label> */}
                                <div
                                    onDragOver={handleDragOver}
                                    onDrop={handleDropOnXAxis}
                                    className={`p-4 w-full border-2 border-dashed rounded-lg h-15 flex items-center justify-center transition-colors ${xAxis ? "border-green-300 bg-green-50" : "border-gray-300 bg-gray-50 hover:border-gray-400"
                                        }`}
                                >
                                    {xAxis ? (
                                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                                            {xAxis}
                                        </Badge>
                                    ) : (
                                        <>
                                            <div className="flex flex-col items-center">
                                                <span>X-Axis</span>
                                                <span className="text-gray-500 text-sm">Drop column here</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Y-Axis Drop Zone */}
                            <div className="flex items-center w-[50%]">
                                {/* <label className="text-sm font-medium text-gray-700 mb-2 block w-20">Y-Axis</label> */}
                                <div
                                    onDragOver={handleDragOver}
                                    onDrop={handleDropOnYAxis}
                                    className={`p-4 w-full border-2 border-dashed rounded-lg h-15 flex items-center justify-center transition-colors ${yAxis ? "border-green-300 bg-green-50" : "border-gray-300 bg-gray-50 hover:border-gray-400"
                                        }`}
                                >
                                    {yAxis ? (
                                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                                            {yAxis}
                                        </Badge>
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <span>Y-Axis</span>
                                            <span className="text-gray-500 text-sm">Drop column here</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="justify-end flex gap-6">
                                <Button
                                    onClick={() => {
                                        setXAxis("")
                                        setYAxis("")
                                    }}
                                    variant="outline"
                                    className="h-12"
                                >
                                    Clear Selection
                                </Button>
                            </div>
                        </div>

                        {/* </CardContent>
            </Card> */}
                        {/* Chart Display */}
                        <Card className="w-full h-full">
                            <CardHeader>
                                <CardTitle className="text-xl">
                                    {selectedChartType.charAt(0).toUpperCase() + selectedChartType.slice(1).replace("-", " ")} Chart
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[630px]">{renderChart()}</div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
