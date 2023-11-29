import { useState, Fragment, useContext } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { AuthContext } from '@/app/AuthContext';
import CloseIcon from './icons/close';
import { useRouter } from 'next/navigation';
import GoogleIcon from './icons/google';
import SignInIcon from './icons/sign-in';

export default function SignIn() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, googleSignIn } = useContext(AuthContext);
  const router = useRouter();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium hover:bg-blue-200 transition-colors"
        >
          <SignInIcon classname="h-5" />
          Sign in
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-3xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex items-center justify-between">
                    <Dialog.Title as="h3" className="text-xl font-bold">
                      Welcome to Store!
                    </Dialog.Title>
                    <button
                      type="button"
                      className="flex justify-center rounded-full bg-gray-50 px-2 py-2 hover:bg-gray-100 transition-colors"
                      onClick={closeModal}
                    >
                      <CloseIcon classname="h-5" />
                    </button>
                  </div>

                  <div>
                    <p className="text-base font-medium text-gray-500">
                      Log in to Store with your social account.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={async () => {
                        try {
                          const res = await googleSignIn();

                          if (res) {
                            router.push('/');
                          }
                        } catch (error: any) {
                          if (error.code === 'auth/popup-closed-by-user') {
                            return;
                          }
                          throw new Error(error);
                        }
                      }}
                      className="flex items-center gap-2 rounded-full bg-blue-50 hover:bg-blue-100 px-6 py-2 transition-colors"
                    >
                      <GoogleIcon classname="h-5" />
                      Sign in with Google
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
