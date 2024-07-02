import React from 'react'
import Navbar from '../layouts/Navbar'
import AllMessages from './mobileChat/AllMessages'
import Appbar from '../layouts/Appbar'

const MobileUser = () => {
  return (
    <>
      <div className="relative-body ">
        <Navbar />
        <div className="row m-0">
          <div className="col-12 user-list-parent px-0">
            <div className="chat-headers msg-header msg-header-res">MESSAGES</div>
            <div className="scr-msg">
              <AllMessages />
            </div>
          </div>
        </div>
        <Appbar />
      </div>
    </>
  )
}

export default MobileUser
