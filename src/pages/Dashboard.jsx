import React from 'react'
import TopNavbar from '../components/TopNavBar'
import Overview from '../components/Overview'
import DetailedReport from '../components/DetailedReport'

function Dashboard() {
  return (
    <div>
      <TopNavbar />
      <Overview />
      <DetailedReport />
    </div>
  )
}

export default Dashboard
