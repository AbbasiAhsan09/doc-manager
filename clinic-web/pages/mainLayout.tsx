import SideNav from '@/components/navgiations/sideNav'
import React, { useState } from 'react'


const MainLayout = ({children}:{children : React.ReactNode}) => {
 
  const [navExpanded, setNavExpanded] = useState(false);

  return (
    <div id='main-layout'>
      <div className='side-nav-wrapper' onMouseOver={() => setNavExpanded(!navExpanded)} 
        onMouseLeave={() => setNavExpanded(!navExpanded)}
        >
        <SideNav expanded={navExpanded}/>
      </div>
      <div className="content-wrapper">
      {children}
      </div>
    </div>
  )
}

export default MainLayout