import LoginPage from '../../component/LoginPage/LoginPage';
import NewLogin from '../../component/NewLogin/NewLogin';
import Login from './login';

function Auth() {
  return (
    <div>
      <div className='flex flex-col items-center justify-center h-screen w-screen bg-white'>
        {/* <LoginPage /> */}
        <NewLogin/>
      </div>
    </div>
  );
}

export default Auth;
