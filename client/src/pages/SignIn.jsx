import React, { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    //sending data back to database 
    e.preventDefault();
    try {
      setLoading(true)
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      setLoading(false)
      if (data.success === false) {
        setError(true)
        return;
      }
      navigate('/')
    } catch (error) {
      setLoading(false)
      setLoading(true)
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form action="" className='flex flex-col gap-4' onSubmit={handleSubmit}>
        {/* <input type="text" placeholder='Username' id='username' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange} /> */}
        <input type="text" placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange} />
        <input type="password" placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange} />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Sign In</button>
      </form>
      <div className='flex gap-1 mt-5'>
        <p>Dont have an account?</p>
        <Link to="/sign-up">
          <span className='text-blue-500'>Register</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
    </div>
  )
}

export default SignIn