import { useState, useEffect } from 'react';
import { CardContent, Card } from '../ui/Card';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { useLogin, useSignup } from '../../libs/builder/user/mutations';
import { useNavigate } from 'react-router-dom';

function NewLogin() {
  const [selectedTab, setSelectedTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [username, setUsername] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);

  const navigate = useNavigate();
  const { mutate: signIn } = useLogin();
  const { mutate: signup } = useSignup();

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setFocusedInput(e.target.id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn({ email, password });
      console.log(response?.data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signup({
        email: signUpEmail,
        password: signUpPassword,
        username,
      });
      // console.log(response?.data);
      setSelectedTab('login');
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  useEffect(() => {
    if (focusedInput) {
      const inputElement = document.getElementById(focusedInput);
      if (inputElement) {
        inputElement.focus();
      }
    }
  }, [email, password, signUpEmail, signUpPassword, username, focusedInput]);

  useEffect(() => {
    // Set initial focus when tab changes
    const initialFocusId = selectedTab === 'login' ? 'email' : 'name';
    setFocusedInput(initialFocusId);
  }, [selectedTab]);

  const LoginForm = () => (
    <form className='space-y-4' onSubmit={handleSubmit}>
      <div className='space-y-2'>
        <Label htmlFor='email'>Email</Label>
        <Input
          id='email'
          type='email'
          placeholder='Enter your email'
          value={email}
          onChange={handleInputChange(setEmail)}
          required
        />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='password'>Password</Label>
        <Input
          id='password'
          type='password'
          placeholder='Enter your password'
          value={password}
          onChange={handleInputChange(setPassword)}
          required
        />
      </div>
      <Button type='submit' className='w-full bg-[#008080]'>
        Login
      </Button>
    </form>
  );

  const SignupForm = () => (
    <form className='space-y-4' onSubmit={handleSignupSubmit}>
      <div className='space-y-2'>
        <Label htmlFor='name'>Full Name</Label>
        <Input
          id='name'
          type='text'
          placeholder='Enter your full name'
          value={username}
          onChange={handleInputChange(setUsername)}
          required
        />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='signUpEmail'>Email</Label>
        <Input
          id='signUpEmail'
          type='email'
          placeholder='Enter your email'
          value={signUpEmail}
          onChange={handleInputChange(setSignUpEmail)}
          required
        />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='signUpPassword'>Password</Label>
        <Input
          id='signUpPassword'
          type='password'
          placeholder='Create a password'
          value={signUpPassword}
          onChange={handleInputChange(setSignUpPassword)}
          required
        />
      </div>
      <Button type='submit' className='w-full bg-[#008080]'>
        Sign Up
      </Button>
    </form>
  );

  return (
    <div className='flex min-h-screen w-full'>
      <div className='w-full md:w-1/2 bg-gray-100 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24'>
        <div className='w-full max-w-sm mx-auto'>
          <div className='text-center mb-8'>
            <h1 className='text-5xl font-bold text-[#008080]'>
              Chatta<span className='text-[#E6E21A] text-5xl'>Trader</span>
            </h1>
          </div>
          <Card>
            <CardContent className='pt-6'>
              <h2 className='text-4xl font-bold text-center text-gray-900 mb-2'>
                Welcome Back
              </h2>
              <p className='text-sm text-center text-gray-600 mb-6'>
                Please enter your details
              </p>
              <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab}>
                <TabsList className='grid w-full grid-cols-2 mb-6'>
                  <TabsTrigger value='login'>Login</TabsTrigger>
                  <TabsTrigger value='signup'>Signup</TabsTrigger>
                </TabsList>
                <TabsContent value='login'>
                  <LoginForm />
                </TabsContent>
                <TabsContent value='signup'>
                  <SignupForm />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className='w-1/2 hidden md:flex'>
        <img
          className='h-full w-full object-cover'
          src='/Frame481.png'
          alt='ChattaTrader background'
        />
      </div>
    </div>
  );
}

export default NewLogin;
