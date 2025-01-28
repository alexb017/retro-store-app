'use client';

import { useContext } from 'react';
import { AuthContext } from '@/app/AuthContext';
import { User } from 'firebase/auth';
import useUserData from '@/lib/use-user-data';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cleanedDate } from '@/lib/utils';
import { deleteUserFromFirebaseAuth } from '@/lib/actions';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { usePathname, useRouter } from 'next/navigation';

async function handleDeleteAccount(userId: string) {
  try {
    // Call the API route to delete the user's data
    const response = await fetch('/api/delete_user', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    const data = await response.json();

    if (!response.ok) {
      // console.error('API error:', data.error);
      throw new Error(data.error);
    }
  } catch (error: any) {
    // console.error('Error deleting user data:', error.message);
    throw new Error('Failed to delete user data');
  }
}

export default function Profile() {
  const { user, userSignOut } = useContext(AuthContext) as {
    user: User;
    userSignOut: () => void;
  };
  const [profileUser] = useUserData(user?.uid ?? '');
  const pathname = usePathname();
  const router = useRouter();

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
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className="rounded-full">
            Delete account
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="sm:rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="rounded-full"
              onClick={async () => {
                try {
                  await handleDeleteAccount(user?.uid);

                  userSignOut();

                  if (pathname === '/profile') {
                    router.push('/');
                  }
                } catch (error: any) {
                  console.error('Error deleting user:', error.message);
                }
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
