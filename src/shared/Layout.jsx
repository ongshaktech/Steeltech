import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function Layout() {
  return (
    <div className='flex gap-6'>
        <Sidebar />
        <div className='container mx-auto w-full p-4'>
            <Outlet />
        </div>
    </div>
  )
}
