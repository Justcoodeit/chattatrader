import { useState, useEffect } from 'react';
import { Sidebar, SidebarBody, SidebarLink } from '../component/ui/sidebar';
import { IconArrowLeft, IconBellRinging } from '@tabler/icons-react';
import Cookies from 'js-cookie';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../libs/utils';
import { Link } from 'react-router-dom';

import Chat from './Chat';
import Wallet from './Wallet';
import History from './History';
import { user } from '../assets';
import {
  useGetUserInfo,
  useGetUserSingleChatWithID,
} from '../libs/builder/user/queries';
import GreetUser from '../component/GreetUser';
import { CryptoChart, PocketWallet, ProfitAnalysis } from '../data/Icons';
import ChatHistorySection from '../component/ui/ChatHistorySection';
import Discovery from './Discovery/Discovery';

export function SidebarDemo() {
  const [activeTab, setActiveTab] = useState('chat');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const { data: userInfo, isLoading: UserInfoLoading } = useGetUserInfo();

  const username = userInfo?.data?.userInfo?.username;

  const savedChatId = localStorage.getItem('currentChatId');
  const { data: getSingleChat } = useGetUserSingleChatWithID(savedChatId);
  const chatHistory = getSingleChat?.data?.data?.caHistory;
  const handleLogout = () => {
    Cookies.remove('authTokenized');
    localStorage.removeItem('currentChatId');
    window.location.href = '/login'; // or use navigate from react-router
  };
  const links = [
    {
      label: 'Discovery',
      icon: <IconBellRinging />,
      component: Discovery,
    },
    {
      label: 'Chat',
      icon: <ProfitAnalysis />,
      component: Chat,
    },
    {
      label: 'Wallet',
      icon: <PocketWallet />,
      component: Wallet,
    },
    {
      label: 'History',
      icon: <CryptoChart />,
      component: History,
    },

    {
      label: 'Logout',
      isLogout: true,
      onClick: handleLogout,
      icon: (
        <IconArrowLeft className='text-neutral-700 h-7 w-7 flex-shrink-0' />
      ),
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (isMobile) {
      setOpen(false);
    }
  };

  return (
    <div
      className={cn(
        'rounded-md flex flex-col md:flex-row bg-gray-100  w-full flex-1 h-screen mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden'
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className='justify-between gap-10'>
          <div className='flex flex-col flex-1 overflow-y-auto overflow-x-hidden  scrollbar-hide'>
            {open ? <Logo /> : <LogoIcon />}
            <div className='mt-8 flex flex-col gap-2'>
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  active={activeTab === link.label.toLowerCase()}
                  onClick={() => {
                    if (link.isLogout || link.onClick) {
                      link.onClick();
                    } else {
                      handleTabClick(link.label.toLowerCase());
                    }
                  }}
                />
              ))}
            </div>
          </div>
          <AnimatePresence>
            {chatHistory && (
              <motion.div
                className='flex-1 overflow-y-auto mt-4 scrollbar-hide'
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className='h-[450px] w-full max-w-xs rounded-lg border border-gray-200 bg-white shadow-md'
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChatHistorySection chatHistory={chatHistory} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          <div>
            <SidebarLink
              link={{
                label: username || 'User',
                href: '#',
                icon: (
                  <img
                    src={user}
                    className='h-7 w-7 flex-shrink-0 rounded-full'
                    width={50}
                    height={50}
                    alt='Avatar'
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard
        activeTab={activeTab}
        links={links}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      to='/'
      className='font-normal flex space-x-2 items-center text-sm text-black hover:text-yellow-100 py-1 relative z-20'
    >
      <img src='/Asset6.svg' alt='ChattaTrader Logo' className='h-5 w-auto' />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className=' font-black text-3xl  whitespace-pre'
      >
        <div className='flex justify-center items-center leading-6'>
          <h1 className='text-3xl'>
            <span className='text-[#008080] font-bold'>Chatta</span>
            <span className=' text-[#E6E21A] font-bold'>Trader</span>{' '}
          </h1>
        </div>
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      to='/'
      className='font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20'
    >
      <img src='/Asset6.svg' alt='ChattaTrader Logo' className='h-5 w-auto' />
    </Link>
  );
};

const Dashboard = ({ activeTab, links, searchQuery, setSearchQuery }) => {
  const { data: userInfo, isLoading: UserInfoLoading } = useGetUserInfo();

  return (
    <div className='flex flex-1 flex-col overflow-hidden'>
      {/* activeTab !== 'history' && */}
      {activeTab !== 'chat' && <GreetUser userInfo={userInfo} />}
      <div className='flex-1 p-2 md:p-10 border border-neutral-200 dark:border-neutral-700 bg-white/5 flex flex-col gap-2 overflow-y-auto'>
        {links.map(
          (link) =>
            activeTab === link.label.toLowerCase() &&
            link.component && (
              <link.component key={link.label} userInfo={userInfo} />
            )
        )}
      </div>
    </div>
  );
};

export default SidebarDemo;
