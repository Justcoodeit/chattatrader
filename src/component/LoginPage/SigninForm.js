import { useState } from 'react';
import { useLogin } from '../../libs/builder/user/mutations';

const SigninForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { mutate: signIn } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn({ email, password });
      console.log(response?.data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className='selection:bg-indigo-500 selection:text-white'>
      <div className='flex justify-center items-center'>
        <div className='p-8 flex-1'>
          <div className='mx-auto overflow-hidden'>
            <div className='p-8'>
              <h1 className='text-5xl font-bold text-[#008080]'>
                Welcome back!
              </h1>

              <form className='mt-12' action='' method='POST'>
                <div className='relative'>
                  <input
                    id='signin-email'
                    name='email'
                    type='text'
                    className='peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-[#008080]'
                    placeholder='john@doe.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label
                    htmlFor='email'
                    className='absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'
                  >
                    Email address
                  </label>
                </div>
                <div className='mt-10 relative'>
                  <input
                    id='signin-password'
                    type='password'
                    name='password'
                    className='peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-[#008080]'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label
                    htmlFor='password'
                    className='absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'
                  >
                    Password
                  </label>
                </div>

                <input
                  onClick={handleSubmit}
                  type='submit'
                  value='Sign in'
                  className='mt-20 px-8 py-4 uppercase rounded-full bg-[#008080] hover:bg-[#008080] text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-[#008080] focus:ring-opacity-80 cursor-pointer'
                />
              </form>
              <a
                href='#'
                className='mt-4 block text-sm text-center font-medium text-[#008080] hover:underline focus:outline-none focus:ring-2 focus:ring-[#008080]'
              >
                {' '}
                Forgot your password?{' '}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;
