'use client';

import { use, useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/app/AuthContext';
import { User } from 'firebase/auth';
import { getUser } from '@/lib/actions';
import Image from 'next/image';
import { type UserProfile } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

export default function Profile() {
  const { user } = useContext(AuthContext) as { user: User | null };
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (user) {
      const fetchUserProfile = async () => {
        const profile = (await getUser(user?.uid ?? '')) as UserProfile;
        setUserProfile(profile);
      };

      fetchUserProfile();
    }
  }, [user]);

  const nameFromEmail = userProfile?.email?.split('@')[0];

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col items-start gap-4 px-4 sm:px-0">
        <div className="w-16 h-16 block">
          <Image
            className="rounded-full"
            src={
              userProfile?.photoURL ??
              'https://firebasestorage.googleapis.com/v0/b/task-app-771ec.appspot.com/o/blank-avatar.png?alt=media&token=8be38932-3735-418d-9038-472720cc01e7'
            }
            alt={userProfile?.displayName ?? `${nameFromEmail}`}
            width={64}
            height={64}
          />
        </div>
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">
            Hi, {userProfile?.displayName}! 👋
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Personal details and order history.
          </p>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-xs text-zinc-500">Display name</div>
        <div className="text-base">{userProfile?.displayName}</div>
      </div>
      <Separator />
      <div className="flex flex-col">
        <div className="text-xs text-zinc-500">Email address</div>
        <div className="text-base">{userProfile?.email}</div>
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        <div className="text-xs text-zinc-500">Delete account</div>
        <Button className="w-fit text-white bg-red-500 rounded-full hover:bg-red-600 transition-colors shadow-md">
          Delete account
        </Button>
      </div>
    </div>
  );
}
