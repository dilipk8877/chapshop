import React from 'react'
import { Outlet} from 'react-router-dom'
import AdminPage from '../component/AdminPage'


const Dashboard = () => {
  return (
    <>
     <AdminPage>
      <Outlet/>
      </AdminPage>
    </>
  )
}

export default Dashboard