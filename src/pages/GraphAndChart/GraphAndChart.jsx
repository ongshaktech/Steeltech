import React from 'react'
import ProductionDetails from './components/ProductionDetails'
import ProducttypeAndThikness from './components/ProducttypeAndThikness'
import DowntimeTracking from './components/DowntimeTracking'
import MachineEfficiencyGraph from './components/MachineEfficiencyGraph'

export default function GraphAndChart() {
  return (
    <div>
        <ProductionDetails />
        <ProducttypeAndThikness />
        <MachineEfficiencyGraph />
        <DowntimeTracking />
    </div>
  )
}