import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()
  
  return (
    <div className='h-screen bg-cyan-50 overflow-hidden relative'>
      <div className=''>
        <div className=''>
          <div>
            <h4 className=''>Capture Your <br /> Journeys</h4>
            <p className=''>
              Record your travel experiences and memories in your personal travel journal.
            </p>
          </div>
          <div className=''>
            <form onSubmit={() => {}}>
              <h4 className='text-2xl font-semibold mb-7'>Login</h4>

              <input type="text" placeholder='john@gmail.com' className='input-box' />

              <button type='submit' className='btn-auto'>
                Login
              </button>

              <p className=''>Or</p>

              <button type='submit' className='' onClick={() => {navigate("/register")}}>
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Login