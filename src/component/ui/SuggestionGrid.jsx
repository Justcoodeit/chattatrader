import { useState } from 'react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/button';
import { IconWallet, IconBrandAppleNews, IconBooks } from '@tabler/icons-react';
import { BsGraphUp } from 'react-icons/bs';

const suggestions = [
  {
    icon: <IconWallet className='h-6 w-6' />,
    text: 'Create a crypto wallet for my assets.',
    color: 'text-blue-500',
  },
  {
    icon: <IconBrandAppleNews className='h-6 w-6' />,
    text: "What's the latest news in the crypto market?",
    color: 'text-blue-500',
  },
  {
    icon: <BsGraphUp className='h-6 w-6' />,
    text: 'Suggest a crypto investment strategy.',
    color: 'text-red-500',
  },
  {
    icon: <IconBooks className='h-6 w-6' />,
    text: 'Learn about blockchain technology.',
    color: 'text-blue-500',
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
      <Card className='mb-8 bg-gradient-to-r from-[#008080] to-[#0b9898]'>
        <CardContent className='flex justify-center items-center p-6'>
          <h1 className='text-2xl font-bold text-white'>
            Welcome to <span className='text-teal-300'>Chatta</span>
            <span className='text-yellow-300'>trader</span>
          </h1>
        </CardContent>
      </Card>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant='outline'
            className={`h-auto p-4 justify-start space-x-4 bg-white hover:bg-gray-50 ${
              selectedSuggestion === suggestion.text
                ? 'ring-2 ring-blue-500'
                : ''
            }`}
            onClick={() => handleSuggestionClick(suggestion)}
          >
            <span className={suggestion.color}>{suggestion.icon}</span>
            <span className='text-sm text-gray-600 text-left'>
              {suggestion.text}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}
