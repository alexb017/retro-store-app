'use client';

import { useContext } from 'react';
import { AuthContext } from '@/app/AuthContext';
import { User } from 'firebase/auth';
import useUserData from '@/lib/use-user-data';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cleanedDate } from '@/lib/utils';

export default function Profile() {
  const { user } = useContext(AuthContext) as { user: User | null };
  const [profileUser] = useUserData(user?.uid ?? '');

  if (!profileUser) {
    return null;
  }

  return (
    <div className="flex flex-col items-start gap-4">
      {profileUser?.photoURL && (
        <div className="flex items-center justify-center w-12 h-12 aspect-square">
          <Image
            src={profileUser?.photoURL}
            alt={`${profileUser?.displayName} profile photo`}
            width={48}
            height={48}
            className="rounded-full"
          />
        </div>
      )}
      <div>
        <h4 className="text-xl font-semibold tracking-tight">
          Hi, {profileUser?.displayName}!
        </h4>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Profile details and order history.
        </p>
      </div>
      <div>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Email address
        </p>
        <p className="text-sm">{profileUser?.email}</p>
      </div>
      <Button variant="destructive" className="rounded-full" disabled>
        Delete account
      </Button>
      <div>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Account created
        </p>
        <p className="text-xs">
          {cleanedDate(profileUser?.metadata.creationTime)}
        </p>
      </div>
      <div>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Last sign in
        </p>
        <p className="text-xs">
          {cleanedDate(profileUser?.metadata.lastSignInTime)}
        </p>
      </div>
    </div>
  );
}
