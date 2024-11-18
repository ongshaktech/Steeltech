import React from 'react'
import OverViewHeading from './components/OverViewHeading'
import MachineOverview from './components/MachineOverview'
import RealtimeMachineData from './components/RealtimeMachineData'
import MachineAnalytics from './components/MachineAnalytics'

export default function Overview() {
  return (
    <div>
        <OverViewHeading />
        <MachineOverview />
        <RealtimeMachineData />
        <MachineAnalytics />
    </div>
  )
}
