import { useState } from 'react';
import { loginImg } from '../../assets';

import { useSignup } from '../../libs/builder/user/mutations';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { mutate: signup } = useSignup();
    const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signup({
        email,
        password,
        username,
      });
      console.log(response?.data);
       navigate('/signup');
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
      <div className='hidden sm:block'>
        <img className='w-full h-full object-cover' src={loginImg} alt='' />
      </div>

      <div className='bg-gray-800 flex flex-col justify-center p-4'>
        <form className='max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8'>
          <h2 className='text-4xl dark:text-white font-bold text-center'>
            SIGN UP
          </h2>
          <div className='flex flex-col text-gray-400 py-2'>
            <label>Username</label>
            <input
              className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className='flex flex-col text-gray-400 py-2'>
            <label>Email</label>
            <input
              className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='flex flex-col text-gray-400 py-2'>
            <label>Password</label>
            <input
              className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'
            onClick={handleSubmit}
          >
            SIGNUP
          </button>
        </form>
      </div>
    </div>
  );
}
