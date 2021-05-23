import React from 'react'
import '../styles/components/sidebar.css'
import appLogo from '../images/app-logo.jpg'

const Sidebar = () => {
  return (
    <aside>
      <div id="app-logo">
        <img src={appLogo} alt="App logo" />
      </div>
    </aside>
  )
}

export default Sidebar