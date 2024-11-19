import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../component/ui/Card';
import { Button } from '../../component/ui/button';
import { Badge } from '../../component/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '../../component/ui/tabs';
import { ScrollArea } from '../../component/ui/scroll-area';
import { Skeleton } from '../../component/ui/Skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../component/ui/dialog';
import { Input } from '../../component/ui/input';
import { Label } from '../../component/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../component/ui/select';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  useGetTrendingTokens,
  useGetUserBalance,
  useGetUserTransactionHistory,
} from '../../libs/builder/user/queries';
import {
  Eye,
  TrendingUp,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  History,
  ChevronRight,
  Coins,
  BarChart3,
  Activity,
  Plus,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react';
import { useCreateBuyToken } from '../../libs/builder/user/mutations';

// Skeleton Components
const WalletSkeleton = () => (
  <div className='space-y-4'>
    <div className='flex items-center justify-between'>
      <Skeleton className='h-6 w-32' />
      <Skeleton className='h-5 w-5 rounded-full' />
    </div>
    <Skeleton className='h-10 w-40' />
    <div className='grid grid-cols-2 gap-4'>
      <div>
        <Skeleton className='h-4 w-20 mb-2' />
        <Skeleton className='h-6 w-24' />
      </div>
      <div>
        <Skeleton className='h-4 w-20 mb-2' />
        <Skeleton className='h-6 w-24' />
      </div>
    </div>
  </div>
);

const TokenCardSkeleton = () => (
  <Card>
    <CardContent className='p-4'>
      <div className='flex items-center space-x-3'>
        <Skeleton className='w-12 h-12 rounded-full' />
        <div>
          <Skeleton className='h-5 w-24 mb-2' />
          <Skeleton className='h-4 w-16' />
        </div>
      </div>
      <div className='mt-4 grid grid-cols-2 gap-4'>
        <div>
          <Skeleton className='h-4 w-20 mb-2' />
          <Skeleton className='h-5 w-24' />
        </div>
        <div>
          <Skeleton className='h-4 w-20 mb-2' />
          <Skeleton className='h-5 w-24' />
        </div>
      </div>
      <Skeleton className='h-9 w-full mt-4' />
    </CardContent>
  </Card>
);

function Discovery({ userInfo }) {
  const [showBalance, setShowBalance] = useState(false);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [selectedChain, setSelectedChain] = useState('solana');
  const [selectedToken, setSelectedToken] = useState(null);
  const [copiedAddress, setCopiedAddress] = useState('');
  const { data: trendingTokens, isLoading } = useGetTrendingTokens();
  const userId = userInfo?.data?.userInfo?.id;
  const { data: balanceResponse, isLoading: balanceLoading } =
    useGetUserBalance(userId);
  const balances = balanceResponse?.data?.data;
  const tokens = trendingTokens?.data?.data?.[selectedChain]?.tokens || [];
  const { mutate: buyToken, isLoading: isBuying } = useCreateBuyToken();
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const { data: historyResponse, isLoading: historyLoader } =
    useGetUserTransactionHistory(userId);
  const history = historyResponse?.data?.data;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAddress(text);
      setTimeout(() => setCopiedAddress(''), 2000);
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleBuyToken = async (token) => {
    setSelectedToken(token);
    setIsBuyModalOpen(true);
  };

  const onSubmit = async (data) => {
    try {
      // Implement your send transaction logic here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      toast.success('Transaction initiated successfully');
      setIsSendModalOpen(false);
      reset();
    } catch (error) {
      toast.error(error.message || 'Failed to send transaction');
    }
  };

  const onSubmitBuy = async (data) => {
    try {
      await buyToken(
        {
          userId,
          tokenAddress: selectedToken.address,
          amount: data.amount.toString(),
          chain: selectedChain,
        },
        {
          onSuccess: () => {
            toast.success('Token purchase initiated successfully');
            setIsBuyModalOpen(false);
            reset();
          },
          onError: (error) => {
            toast.error(error.message || 'Failed to purchase token');
          },
        }
      );
    } catch (error) {
      toast.error('Failed to process purchase');
    }
  };

  const TokenCard = ({ token }) => (
    <Card key={token.address}>
      <CardContent className='p-4'>
        <div className='flex items-center space-x-3'>
          <div className='relative'>
            <img
              src={token.logoURI}
              alt={token.name}
              className='w-12 h-12 rounded-full'
            />
            <Badge variant='secondary' className='absolute -top-2 -right-2'>
              #{token.rank + 1}
            </Badge>
          </div>
          <div>
            <h4 className='font-medium'>{token.name}</h4>
            <p className='text-sm text-muted-foreground'>{token.symbol}</p>
          </div>
        </div>

        <div className='mt-4 grid grid-cols-2 gap-4'>
          <div>
            <p className='text-sm text-muted-foreground'>Volume 24h</p>
            <p className='font-medium'>
              $
              {Number(token.volume24hUSD).toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          <div>
            <p className='text-sm text-muted-foreground'>Liquidity</p>
            <p className='font-medium'>
              $
              {Number(token.liquidity).toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>

        <Button
          variant='outline'
          className='w-full mt-4'
          onClick={() => handleBuyToken(token)}
        >
          Trade Now
          <ChevronRight className='ml-2 h-4 w-4' />
        </Button>
      </CardContent>
    </Card>
  );

  const BalanceDisplay = ({ chain, balance }) => (
    <div className='space-y-2 p-3 rounded-lg bg-white/10'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center space-x-2'>
          <span className='text-sm font-medium'>{chain.toUpperCase()}</span>
          <Badge variant='secondary' className='bg-white/20'>
            Native
          </Badge>
        </div>
        <Button
          variant='ghost'
          size='icon'
          className='h-8 w-8'
          onClick={() => copyToClipboard(balance.nativeTokenAmount)}
        >
          {copiedAddress === balance.nativeTokenAmount ? (
            <Check className='h-4 w-4' />
          ) : (
            <Copy className='h-4 w-4' />
          )}
        </Button>
      </div>
      <div className='flex justify-between items-center'>
        <span className='text-sm opacity-70'>Amount</span>
        <span className='font-medium'>
          {Number(balance.nativeTokenAmount).toFixed(6)}
        </span>
      </div>
      <div className='flex justify-between items-center'>
        <span className='text-sm opacity-70'>USD Value</span>
        <span className='font-medium'>
          ${Number(balance.totalUsd).toLocaleString()}
        </span>
      </div>
    </div>
  );

  const BuyTokenModal = () => (
    <Dialog open={isBuyModalOpen} onOpenChange={setIsBuyModalOpen}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Buy {selectedToken?.name}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitBuy)} className='space-y-4'>
          <div className='space-y-2'>
            <Label>Token Information</Label>
            <div className='flex items-center space-x-3 p-3 rounded-lg bg-secondary'>
              <img
                src={selectedToken?.logoURI}
                alt={selectedToken?.name}
                className='w-10 h-10 rounded-full'
              />
              <div>
                <p className='font-medium'>{selectedToken?.name}</p>
                <p className='text-sm text-muted-foreground'>
                  {selectedToken?.symbol}
                </p>
              </div>
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='amount'>Amount</Label>
            <div className='relative'>
              <Input
                id='amount'
                type='number'
                step='any'
                {...register('amount', {
                  required: 'Amount is required',
                  min: { value: 0, message: 'Amount must be positive' },
                })}
                placeholder='Enter amount'
              />
              <div className='absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground'>
                {selectedChain.toUpperCase()}
              </div>
            </div>
            {errors.amount && (
              <span className='text-sm text-red-500'>
                {errors.amount.message}
              </span>
            )}
          </div>

          <div className='space-y-2'>
            <Label>Estimated Cost</Label>
            <div className='p-3 rounded-lg bg-secondary'>
              <div className='flex justify-between items-center'>
                <span className='text-sm text-muted-foreground'>
                  Price Impact
                </span>
                <span className='text-sm'>~2.5%</span>
              </div>
              <div className='flex justify-between items-center mt-2'>
                <span className='text-sm text-muted-foreground'>
                  Network Fee
                </span>
                <span className='text-sm'>~$2.50</span>
              </div>
            </div>
          </div>

          <div className='flex justify-end space-x-2'>
            <Button
              type='button'
              variant='outline'
              onClick={() => setIsBuyModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type='submit' disabled={isBuying}>
              {isBuying ? (
                <>
                  <div className='h-full bg-primary/10 animate-pulse rounded-full' />
                  Buying...
                </>
              ) : (
                'Buy Token'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className='space-y-6'>
      <Card className='bg-[#008080] text-white'>
        <CardContent className='p-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {balanceLoading ? (
              <WalletSkeleton />
            ) : (
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <h3 className='text-lg font-medium'>Chattatrader Balance</h3>
                  <Eye
                    className='h-5 w-5 cursor-pointer hover:opacity-80'
                    onClick={() => setShowBalance(!showBalance)}
                  />
                </div>
                <div className='mb-4'>
                  <Tabs
                    defaultValue={selectedChain}
                    onValueChange={setSelectedChain}
                  >
                    <TabsList className='bg-[#FFFFFF1A]'>
                      <TabsTrigger
                        value='sol'
                        className='text-white data-[state=active]:bg-[#FFFFFF33]'
                      >
                        Solana
                      </TabsTrigger>
                      <TabsTrigger
                        value='eth'
                        className='text-white data-[state=active]:bg-[#FFFFFF33]'
                      >
                        Ethereum
                      </TabsTrigger>
                      <TabsTrigger
                        value='base'
                        className='text-white data-[state=active]:bg-[#FFFFFF33]'
                      >
                        Base
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                {showBalance ? (
                  <div className='space-y-2 p-3 rounded-lg bg-white/10'>
                    <div className='flex justify-between items-center'>
                      <div className='flex items-center space-x-2'>
                        <span className='text-sm font-medium'>
                          {selectedChain.toUpperCase()}
                        </span>
                        <Badge variant='secondary' className='bg-white/20'>
                          Native
                        </Badge>
                      </div>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='h-8 w-8'
                        onClick={() =>
                          copyToClipboard(
                            balances?.[selectedChain]?.nativeTokenAmount
                          )
                        }
                      >
                        {copiedAddress ===
                        balances?.[selectedChain]?.nativeTokenAmount ? (
                          <Check className='h-4 w-4' />
                        ) : (
                          <Copy className='h-4 w-4' />
                        )}
                      </Button>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-sm opacity-70'>Amount</span>
                      <span className='font-medium'>
                        {Number(
                          balances?.[selectedChain]?.nativeTokenAmount || 0
                        ).toFixed(6)}
                      </span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-sm opacity-70'>USD Value</span>
                      <span className='font-medium'>
                        $
                        {Number(
                          balances?.[selectedChain]?.totalUsd || 0
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className='text-2xl font-bold'>****</div>
                )}
              </div>
            )}

            <div className='space-y-4 flex flex-col justify-between'>
              <h3 className='text-lg font-medium'>Quick Actions</h3>
              <div className='grid grid-cols-2 gap-4'>
                <Button
                  variant='secondary'
                  className='w-full'
                  onClick={() => setIsSendModalOpen(true)}
                >
                  <ArrowUpRight className='mr-2 h-4 w-4' />
                  Send
                </Button>
                <Button variant='secondary' className='w-full'>
                  <ArrowDownRight className='mr-2 h-4 w-4' />
                  Receive
                </Button>
                <Button
                  variant='secondary'
                  className='w-full'
                  onClick={handleBuyToken}
                >
                  <Wallet className='mr-2 h-4 w-4' />
                  Buy
                </Button>
                <Button variant='secondary' className='w-full'>
                  <History className='mr-2 h-4 w-4' />
                  History
                </Button>
              </div>
            </div>

            {/* <div className='space-y-4'>
              <h3 className='text-lg font-medium'>Recent Activity</h3>
              <ScrollArea className='h-[120px]'>
                <div className='space-y-2'>
                  {[1, 2, 3].map((_, i) => (
                    <div
                      key={i}
                      className='flex items-center justify-between p-2 rounded-lg hover:bg-white/10'
                    >
                      <div className='flex items-center space-x-3'>
                        <div className='p-2 rounded-full bg-white/10'>
                          <ArrowUpRight className='h-4 w-4' />
                        </div>
                        <div>
                          <p className='text-sm font-medium'>
                            Sent {selectedChain.toUpperCase()}
                          </p>
                          <p className='text-xs opacity-70'>2 hours ago</p>
                        </div>
                      </div>
                      <span className='text-sm font-medium'>
                        -2.5 {selectedChain.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div> */}
          </div>
        </CardContent>
      </Card>

      {/* Send Modal */}
      <Dialog open={isSendModalOpen} onOpenChange={setIsSendModalOpen}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Send Tokens</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='chain'>Chain</Label>
              <Select
                onValueChange={(value) =>
                  register('chain').onChange({ target: { value } })
                }
                defaultValue='solana'
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select chain' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='solana'>Solana</SelectItem>
                  <SelectItem value='ethereum'>Ethereum</SelectItem>
                  <SelectItem value='base'>Base</SelectItem>
                </SelectContent>
              </Select>
              {errors.chain && (
                <span className='text-sm text-red-500'>
                  {errors.chain.message}
                </span>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='recipientAddress'>Recipient Address</Label>
              <Input
                id='recipientAddress'
                {...register('recipientAddress', {
                  required: 'Recipient address is required',
                })}
                placeholder='Enter recipient address'
              />
              {errors.recipientAddress && (
                <span className='text-sm text-red-500'>
                  {errors.recipientAddress.message}
                </span>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='amount'>Amount</Label>
              <Input
                id='amount'
                type='number'
                step='any'
                {...register('amount', {
                  required: 'Amount is required',
                  min: { value: 0, message: 'Amount must be positive' },
                })}
                placeholder='Enter amount'
              />
              {errors.amount && (
                <span className='text-sm text-red-500'>
                  {errors.amount.message}
                </span>
              )}
            </div>

            <div className='flex justify-end space-x-2'>
              <Button
                type='button'
                variant='outline'
                onClick={() => setIsSendModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className='h-full bg-primary/10 animate-pulse rounded-full' />
                    Sending...
                  </>
                ) : (
                  'Send'
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Trending Tokens Section */}
      <Card>
        <CardHeader>
          <CardTitle>Trending Tokens</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={selectedChain} onValueChange={setSelectedChain}>
            <TabsList>
              <TabsTrigger value='solana'>Solana</TabsTrigger>
              <TabsTrigger value='ethereum'>Ethereum</TabsTrigger>
              <TabsTrigger value='base'>Base</TabsTrigger>
            </TabsList>
            <div className='mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {isLoading
                ? Array(6)
                    .fill(0)
                    .map((_, i) => <TokenCardSkeleton key={i} />)
                : tokens
                    .slice(0, 6)
                    .map((token) => (
                      <TokenCard key={token.address} token={token} />
                    ))}
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* Market Overview Section */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center space-x-2'>
              <BarChart3 className='h-5 w-5 text-[#008080]' />
              <span>Market Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className='space-y-4'>
                <Skeleton className='h-[200px] w-full' />
                <div className='grid grid-cols-3 gap-4'>
                  <Skeleton className='h-8 w-full' />
                  <Skeleton className='h-8 w-full' />
                  <Skeleton className='h-8 w-full' />
                </div>
              </div>
            ) : (
              // Add your market overview chart here
              <div className='h-[200px] flex items-center justify-center text-muted-foreground'>
                Chart Component Goes Here
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center space-x-2'>
              <Activity className='h-5 w-5 text-[#008080]' />
              <span>Trading Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {historyLoader ? (
              <div className='space-y-3'>
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className='flex items-center space-x-4'>
                      <Skeleton className='h-12 w-12 rounded-full' />
                      <div className='space-y-2'>
                        <Skeleton className='h-4 w-[200px]' />
                        <Skeleton className='h-4 w-[160px]' />
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              // Add your trading activity list here
              <div className='space-y-4'>
                <div className='rounded-lg bg-white/10 p-2'>
                  {history?.[selectedChain]?.length > 0 ? (
                    <div className='space-y-2'>
                      {history[selectedChain].slice(0, 5).map((tx, i) => (
                        <div
                          key={i}
                          className='flex items-center justify-between p-2 hover:bg-white/10 rounded-lg cursor-pointer transition-colors'
                        >
                          <div className='flex items-center space-x-3'>
                            <div className='p-2 rounded-full bg-white/10'>
                              {tx.type === 'send' ? (
                                <ArrowUpRight className='h-4 w-4' />
                              ) : (
                                <ArrowDownRight className='h-4 w-4' />
                              )}
                            </div>
                            <div>
                              <p className='text-sm font-medium'>
                                {tx.type === 'send' ? 'Sent' : 'Received'}
                              </p>
                              <p className='text-xs '>
                                {new Date(tx.timestamp).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`text-sm font-medium ${
                              tx.type === 'send'
                                ? 'text-red-400'
                                : 'text-green-400'
                            }`}
                          >
                            {tx.type === 'send' ? '-' : '+'}
                            {tx.amount} {selectedChain.toUpperCase()}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className='flex justify-center items-center py-8'>
                      <div className='text-center'>
                        <History className='h-8 w-8 mx-auto mb-2 opacity-50' />
                        <p>No transactions found</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        <BuyTokenModal />
      </div>
    </div>
  );
}

export default Discovery;
