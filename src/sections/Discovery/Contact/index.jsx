import { FaPlus } from 'react-icons/fa';

function RecentContacts() {
  const contacts = [
    'Add',
    'Collins',
    'Lydia',
    'Steff',
    'Mikel',
    'Paul',
    'Soffiyah',
    'Sandra',
    'Sandra',
  ];

  return (
    <div className='flex flex-col items-start justify-start overflow-x-auto space-x-4 p-4 gap-5'>
      <p className=' text-[#656565]'>Recent Contact</p>

      <div className='flex justify-start gap-4'>
        {contacts.map((contact, index) => (
          <div key={index} className='flex flex-col items-center'>
            <div className='w-[42px] h-[42px] rounded-full bg-gray-200 flex items-center justify-center overflow-hidden'>
              {index === 0 ? (
                <div className='w-[42px] h-[42px] rounded-full bg-gray-[#008080] flex items-center justify-center overflow-hidden'>
                  <FaPlus className='text-[#008080]' />
                </div>
              ) : (
                <img
                  src={`https://via.placeholder.com/42x42?text=${contact[0]}`}
                  alt={contact}
                  className='w-full h-full object-cover'
                />
              )}
            </div>
            <p className='text-xs mt-1'>{contact}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentContacts;
