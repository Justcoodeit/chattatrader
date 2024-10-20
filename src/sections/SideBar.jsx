import { useState, useEffect } from 'react';
import { Sidebar, SidebarBody, SidebarLink } from '../component/ui/sidebar';
import {
  IconArrowLeft,
  IconBrandTabler,
  IconMessagePlus,
  IconSettings,
  IconUserBolt,
  IconHistory,
  IconWallet,
  IconBellRinging,
} from '@tabler/icons-react';

import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../libs/utils';
import { Link } from 'react-router-dom';

import Chat from './Chat';
import Wallet from './Wallet';
import History from './History';
import { user } from '../assets';
import {
  useGetProfileInformation,
  useGetUserInfo,
  useGetUserSingleChatWithID,
} from '../libs/builder/user/queries';
import Navbar from '../component/Navbar';
import GreetUser from '../component/GreetUser';
import {
  CryptoChart,
  PocketWallet,
  ProfitAnalysis,
  SelectedWallet,
} from '../data/Icons';
import ChatHistorySection from '../component/ui/ChatHistorySection';
import Discovery from './Discovery/Discovery';

const Notification = () => <div>Notification Component</div>;
const Settings = () => <div>Settings Component</div>;

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

  const links = [
    {
      label: 'Discovery',
      //   href: '/notification',
      icon: (
        <IconBellRinging
        // className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0'
        />
      ),
      component: Discovery,
    },
    {
      label: 'Chat',
      //   href: '/chat',
      icon: (
        <ProfitAnalysis />
        // <IconMessagePlus className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
      ),
      component: Chat,
    },
    {
      label: 'Wallet',
      //   href: '/wallet',
      icon: (
        <PocketWallet />

        // <IconWallet className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
      ),
      component: Wallet,
    },
    {
      label: 'History',
      //   href: '/history',
      icon: <CryptoChart />,
      component: History,
    },
    // {
    //   label: 'Notification',
    //   //   href: '/notification',
    //   icon: (
    //     <IconBellRinging className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
    //   ),
    //   component: Notification,
    // },
    // {
    //   label: 'Settings',
    // //   href: '/settings',
    //   icon: (
    //     <IconSettings className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
    //   ),
    //   component: Settings,
    // },
    {
      label: 'Logout',
      href: '#',
      icon: (
        <IconArrowLeft className='text-neutral-700 h-7 w-7 flex-shrink-0' />
      ),
    },
  ];

  const dummyData = [
    {
      title: 'Today',
      chats: [
        { id: '1', title: 'New chat', date: new Date() },
        { id: '2', title: 'React Component Optimization', date: new Date() },
        { id: '3', title: 'API Integration Guide', date: new Date() },
      ],
    },
    {
      title: 'Yesterday',
      chats: [
        {
          id: '4',
          title: 'Database Management Tools JSON',
          date: new Date(Date.now() - 86400000),
        },
        {
          id: '5',
          title: 'UI/UX Design Principles',
          date: new Date(Date.now() - 86400000),
        },
      ],
    },
    {
      title: 'Previous 7 Days',
      chats: [
        {
          id: '6',
          title: 'JavaScript ES6 Features',
          date: new Date(Date.now() - 3 * 86400000),
        },
        {
          id: '7',
          title: 'Git Workflow Best Practices',
          date: new Date(Date.now() - 5 * 86400000),
        },
        {
          id: '8',
          title: 'CSS Grid Layout Tutorial',
          date: new Date(Date.now() - 6 * 86400000),
        },
      ],
    },
    {
      title: 'Previous 30 Days',
      chats: [
        {
          id: '9',
          title: 'Node.js Performance Tuning',
          date: new Date(Date.now() - 15 * 86400000),
        },
        {
          id: '10',
          title: 'GraphQL vs REST API Comparison',
          date: new Date(Date.now() - 20 * 86400000),
        },
        {
          id: '11',
          title: 'Docker Container Management',
          date: new Date(Date.now() - 25 * 86400000),
        },
      ],
    },
    {
      title: 'September',
      chats: [
        {
          id: '12',
          title: 'Machine Learning Basics',
          date: new Date('2023-09-15'),
        },
        {
          id: '13',
          title: 'Responsive Web Design Techniques',
          date: new Date('2023-09-10'),
        },
        {
          id: '14',
          title: 'TypeScript Advanced Topics',
          date: new Date('2023-09-05'),
        },
      ],
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
          <div className='flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
            {open ? <Logo /> : <LogoIcon />}
            <div className='mt-8 flex flex-col gap-2'>
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  active={activeTab === link.label.toLowerCase()}
                  onClick={() => handleTabClick(link.label.toLowerCase())}
                />
              ))}
            </div>
          </div>
          <AnimatePresence>
            {chatHistory && (
              <motion.div
                className='flex-1 overflow-y-auto mt-4'
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
      <img src='/logo.png' alt='Chattatrader Logo' className='h-5 w-auto' />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className=' font-black text-3xl  whitespace-pre'
      >
        <div className='flex justify-center items-center leading-6'>
          <h1 className='text-3xl'>
            <span className='text-[#008080] font-bold'>Chatter</span>
            <span className=' text-[#E6E21A] font-bold'>Trade</span>
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
      <img src='/logo.png' alt='Chattatrader Logo' className='h-5 w-auto' />
    </Link>
  );
};

const Dashboard = ({ activeTab, links, searchQuery, setSearchQuery }) => {
  const { data: userInfo, isLoading: UserInfoLoading } = useGetUserInfo();

  return (
    <div className='flex flex-1 flex-col overflow-hidden'>
      {/* activeTab !== 'history' && */}
      {activeTab !== 'chat' && (
        <GreetUser userInfo={userInfo} />

        // <div className='p-4 bg-white shadow-sm flex items-center justify-between overflow-y-auto '>
        //   <div className='flex-1 mr-4'>
        //     <input
        //       type='text'
        //       placeholder='Search by Address / txn hash / block / token'
        //       value={searchQuery}
        //       onChange={(e) => setSearchQuery(e.target.value)}
        //       className='w-full px-4 py-2 border bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        //     />
        //   </div>
        //   <button className='bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>
        //     Connect
        //   </button>
        // </div>
      )}
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
