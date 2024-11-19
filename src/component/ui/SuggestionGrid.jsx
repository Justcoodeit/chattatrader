import { useState } from 'react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/button';
import { IconWallet, IconBrandAppleNews, IconBooks } from '@tabler/icons-react';
import { BsGraphUp } from 'react-icons/bs';
import { useGetTrendingTokens } from '../../libs/builder/user/queries';

export default function SuggestionGrid({ sendMessage, selectedSuggestionSet }) {
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const { data: trendingTokens, isLoading } = useGetTrendingTokens();

  const getTrendingTokensSuggestions = () => {
    if (!trendingTokens?.data?.data) return [];

    const { solana, ethereum } = trendingTokens.data.data;
    return [
      {
        icon: <IconWallet className='h-6 w-6' />,
        text: `Tell me about $${solana.tokens[0].name} (${solana.tokens[0].symbol}) `,
        color: 'text-purple-500',
        Address: `${solana.tokens[0].address}`,
      },
      {
        icon: <IconWallet className='h-6 w-6' />,
        text: `Tell me about $${ethereum.tokens[0].name} (${ethereum.tokens[0].symbol})  `,
        color: 'text-blue-500',
        Address: `${ethereum.tokens[0].address}`,
      },
    ];
  };

  const handleSuggestionClick = (suggestion) => {
    sendMessage(`tell me about ${suggestion.Address}`);
    selectedSuggestionSet(false);
  };

  const allSuggestions = [...getTrendingTokensSuggestions()];

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
        {allSuggestions.map((suggestion, index) => (
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
      <div className=' flex justify-center mt-6 w-full'>
        <Button
          className='flex justify-center w-full'
          onClick={() => selectedSuggestionSet(false)}
        >
          Start
        </Button>
      </div>
    </div>
  );
}
