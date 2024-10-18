import { useState } from 'react';
import { Image, Search, Eye, GraduationCap } from 'lucide-react';
import { Button } from './button';
import { IconBooks, IconBrandAppleNews, IconWallet } from '@tabler/icons-react';
import { BsGraphUp } from 'react-icons/bs';

const suggestions = [
  {
    icon: <IconWallet className='h-6 w-6' />, // Changed to Wallet icon
    text: 'Create a crypto wallet for my assets',
    color: 'text-[#76D0EB]',
  },
  {
    icon: <IconBrandAppleNews className='h-6 w-6' />, // Changed to News icon
    text: "What's the latest news in the crypto market?",
    color: 'text-[#76D0EB]',
  },
  {
    icon: <BsGraphUp className='h-6 w-6' />, // Changed to GraphUp icon
    text: 'Suggest a crypto investment strategy',
    color: 'text-[#ED6262]',
  },
  {
    icon: <IconBooks className='h-6 w-6' />, // Changed to Book icon
    text: 'Learn about blockchain technology',
    color: 'text-[#76D0EB]',
  },
];

export default function SuggestionGrid({ sendMessage, selectedSuggestionSet }) {
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  const handleSuggestionClick = (suggestion) => {
    sendMessage(suggestion.text);
    selectedSuggestionSet(false);
  };

  return (
    <div className='mx-auto mt-12 max-w-3xl'>
      <div className='flex flex-wrap items-stretch justify-center gap-4'>
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant='outline'
            className={`relative flex h-auto w-40 flex-col items-start gap-2 rounded-2xl px-3 pb-4 pt-3 text-start shadow-sm transition ${
              selectedSuggestion === suggestion.text
                ? 'bg-gray-100 dark:bg-gray-100  border-gray-200'
                : 'hover:bg-gray-50 dark:hover:bg-gray-200 border-gray-200'
            }`}
            onClick={() => handleSuggestionClick(suggestion)}
          >
            <div className={suggestion.color}>{suggestion.icon}</div>
            <div className='line-clamp-3 text-sm text-gray-600 dark:text-gray-400'>
              {suggestion.text}
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}
