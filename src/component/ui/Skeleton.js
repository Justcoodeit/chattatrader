import { cn } from '../../lib/utils';

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-[#E0E0E0]', className)}
      {...props}
    />
  );
}

export { Skeleton };
