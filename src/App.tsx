import DataVisualizationDashboard from './components/graphs/Layout'
import { Link, BrowserRouter, Routes, Route } from "react-router-dom"
import Overview from './components/Overview'


function App() {
  return (
    <div className=''>
      <BrowserRouter>
        <div className="h-12 mb-6 w-screen bg-black">
          <div className="flex flex-row h-full items-center gap-3 mx-5">
            <Link to={"/"} className="text-white list-none">Workspace</Link>
            <Link to={"/analyze"} className="text-white list-none">Analyze</Link>
          </div>
        </div>

        <Routes>
          <Route index element={<Overview />} />
          <Route path="/analyze" element={<DataVisualizationDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
