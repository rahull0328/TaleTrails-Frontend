import { getInitials } from '@/utils/helper'
import React from 'react'

const ProfileInfo = ({userInfo, logout}) => {
  return (
    userInfo && (<div className='flex items-center gap-3'>
        <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>
            {getInitials(userInfo ? userInfo?.fullName : "")}
        </div>

        <div>
            <p className='text-sm font-medium'>{userInfo?.fullName || ""}</p>
            <button className='text-sm text-slate-700 underline cursor-pointer' onClick={logout}>
                Logout
            </button>
        </div>

    </div>)
  )
}

export default ProfileInfo