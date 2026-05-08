import { useGetIdentity } from '@refinedev/core';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type User = {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  avatar?: string;
};

export function UserAvatar() {
  const { data: user, isLoading: userIsLoading } = useGetIdentity<User>();

  if (userIsLoading || !user) {
    return <Skeleton className={cn('h-10', 'w-10', 'rounded-full')} />;
  }

  const { fullName, avatar } = user;

  return (
    <Avatar className={cn('h-10', 'w-10')}>
      {avatar && <AvatarImage src={avatar} alt={fullName} />}
      <AvatarFallback>{getInitials(fullName)}</AvatarFallback>
    </Avatar>
  );
}

const getInitials = (name = '') => {
  const names = name.split(' ').filter(Boolean);
  if (names.length === 0) return '';

  const first = names[0];
  let initials = first ? first.substring(0, 1).toUpperCase() : '';

  if (names.length > 1) {
    const last = names[names.length - 1];
    if (last) {
      initials += last.substring(0, 1).toUpperCase();
    }
  }
  return initials;
};

UserAvatar.displayName = 'UserAvatar';
