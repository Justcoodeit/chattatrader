// import { IoTrashOutline } from 'react-icons/io5';

// function PreviousChats({ chats, onSelectChat, onDeleteChat }) {
//   return (
//     <div className='space-y-2'>
//       <h2 className='text-lg font-bold mb-4'>Previous Chats</h2>
//       {chats?.map((chat) => (
//         <div
//           key={chat.id}
//           className='flex items-center justify-between bg-white p-2 rounded-lg'
//         >
//           <button
//             onClick={() => onSelectChat(chat.id)}
//             className='flex-1 text-left truncate'
//           >
//             {chat.title || `Chat ${chat.id}`}
//           </button>
//           <button
//             onClick={() => onDeleteChat(chat.id)}
//             className='text-red-500 hover:text-red-700'
//           >
//             <IoTrashOutline />
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }

import { useState } from 'react';
import { IoTrashOutline } from 'react-icons/io5';

const dummyChats = [
  { id: 1, title: 'Chat about React' },
  { id: 2, title: 'JavaScript Discussion' },
  { id: 3, title: 'AI and Machine Learning' },
  { id: 4, title: 'Web Development Tips' },
  { id: 5, title: 'Chat GPT Capabilities' },
];

function PreviousChats({ onSelectChat, onDeleteChat }) {
  const [chats, setChats] = useState(dummyChats);

  const handleDeleteChat = (id) => {
    setChats(chats.filter((chat) => chat.id !== id));
    onDeleteChat(id);
  };

  return (
    <div className='space-y-4'>
      <h2 className='text-xl font-bold'>Previous Chats</h2>
      {chats.length === 0 ? (
        <p className='text-gray-500'>No previous chats</p>
      ) : (
        chats.map((chat) => (
          <div
            key={chat.id}
            className='flex items-center justify-between bg-white p-3 rounded-lg shadow'
          >
            <button
              onClick={() => onSelectChat(chat.id)}
              className='flex-1 text-left truncate hover:text-blue-600'
            >
              {chat.title}
            </button>
            <button
              onClick={() => handleDeleteChat(chat.id)}
              className='text-red-500 hover:text-red-700 ml-2'
              aria-label='Delete chat'
            >
              <IoTrashOutline className='w-5 h-5' />
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default PreviousChats;