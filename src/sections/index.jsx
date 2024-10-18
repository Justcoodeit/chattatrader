import { useState, useEffect } from 'react';
import {
  FaUser,
  FaWallet,
  FaExchangeAlt,
  FaHistory,
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from 'react-icons/fa';

import Chat from './Chat';
import BuyAndSell from './BuyAndSell';
import History from './History';
import Wallet from './Wallet';
// import { ChatHistorySidebar } from '../component/ui/ChatHistorySection';

const Notification = () => <div>Notification Component</div>;
const Settings = () => <div>Settings Component</div>;

const SideBarIndex = () => {
  const [activeTab, setActiveTab] = useState('chatbot');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


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
      setIsMenuOpen(false);
    }
  };

  const sidebarItems = [
    { icon: FaUser, label: 'Chat Bot', component: Chat },
    { icon: FaWallet, label: 'Wallet', component: Wallet },
    // { icon: FaExchangeAlt, label: 'Buy/Sell', component: BuyAndSell },
    { icon: FaHistory, label: 'History', component: History },
  ];
  const sidebarItems2 = [
    { icon: FaBell, label: 'Notification', component: Notification },
    { icon: FaCog, label: 'Settings', component: Settings },
  ];

  const renderSidebar = () => (
    <div
      className={`${
        isMobile
          ? 'fixed inset-y-0 left-0 z-50 w-64 transition-transform duration-300 ease-in-out transform ' +
            (isMenuOpen ? 'translate-x-0' : '-translate-x-full')
          : 'w-64'
      } border-r bg-white px-4 py-6`}
    >
      <div className=' flex justify-center items-center mb-2'>
        <img src='/logo.jpeg' className=' h-20 w-20 rounded-full' />
      </div>
      {isMobile && (
        <button
          className='absolute right-0 top-[0px] text-gray-500 hover:text-gray-700 border-none'
          onClick={() => setIsMenuOpen(false)}
        >
          <FaTimes className='w-6 h-6' />
        </button>
      )}
      {/* <div className='text-center mb-6'>
        <button className='bg-[#0487E2] w-full text-white font-semibold py-2 rounded'>
          Connect Wallet
        </button>
      </div> */}
      <div className='space-y-2 flex flex-col justify-between gap-56'>
        <div>
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              className={`flex items-center space-x-3 w-full p-2 rounded-md transition-colors ${
                activeTab === item.label.toLowerCase().replace(' ', '')
                  ? 'bg-blue-100 text-blue-600'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() =>
                handleTabClick(item.label.toLowerCase().replace(' ', ''))
              }
            >
              <item.icon className='w-5 h-5' />
              <span className='font-medium'>{item.label}</span>
            </button>
          ))}
        </div>

        <div className='flex-1 overflow-y-auto '>
          <div className='h-[450px] w-full max-w-xs rounded-lg border border-gray-200 bg-white shadow-md'>
            {/* <ChatHistorySidebar sections={dummyData} /> */}
          </div>
        </div>

        {/* <div>
          {sidebarItems2.map((item, index) => (
            <button
              key={index}
              className={`flex items-center space-x-3 w-full p-2 rounded-md transition-colors ${
                activeTab === item.label.toLowerCase().replace(' ', '')
                  ? 'bg-blue-100 text-blue-600'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() =>
                handleTabClick(item.label.toLowerCase().replace(' ', ''))
              }
            >
              <item.icon className='w-5 h-5' />
              <span className='font-medium'>{item.label}</span>
            </button>
          ))}

          <button className='flex items-center space-x-3 w-full p-2 rounded-md hover:bg-gray-100 mt-6 text-red-500'>
            <FaSignOutAlt className='w-5 h-5' />
            <span className='font-medium'>Log Out</span>
          </button>
        </div> */}
      </div>
    </div>
  );

  return (
    <div className='h-screen flex flex-col md:flex-row'>
      {isMobile && (
        <div className='bg-white p-4 flex justify-between items-center md:hidden'>
          <button
            className='text-gray-500 hover:text-gray-700'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FaBars className='w-6 h-6' />
          </button>
          <span className='font-semibold text-lg'>Dashboard</span>
        </div>
      )}
      {renderSidebar()}

      {/* Content area */}
      <div className='flex-1 bg-gray-50 overflow-y-auto'>
        {activeTab !== 'chatbot' && activeTab !== 'history' && (
          <div className='p-4 bg-white shadow-sm flex items-center justify-between'>
            <div className='flex-1 mr-4'>
              <input
                type='text'
                placeholder='Search by Address / txn hash / block / token'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full px-4 py-2 border bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <button className='bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>
              Connect
            </button>
          </div>
        )}
        {sidebarItems.map(
          (item) =>
            activeTab === item.label.toLowerCase().replace(' ', '') && (
              <item.component key={item.label} />
            )
        )}
        {sidebarItems2.map(
          (item) =>
            activeTab === item.label.toLowerCase().replace(' ', '') && (
              <item.component key={item.label} />
            )
        )}
      </div>
    </div>
  );
};

export default SideBarIndex;
