import { Dispatch, FC, Fragment, SetStateAction } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'
import { useRouter } from 'next/router'


const DeleteDrop: FC<{ isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>, id: string }> = ({ isOpen, setIsOpen, id }) => {

    const router = useRouter();

    const closeModal = () => {
        setIsOpen(false)
    }

    const deleteDrop = async () => {
        const res = await axios.delete(`/api/drop/${id}`);
        console.log(res.data);

        setIsOpen(false);
        router.push('/dashboard');
    }

    return (
        <>
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
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg text-center font-medium leading-6 text-gray-900"
                                    >
                                        Are you sure you want to delete this Drop?
                                    </Dialog.Title>
                                    <div className="mt-4 flex justify-center">
                                        <div className='mx-4 px-3 py-1 text-red-500 bg-neutral-100 font-medium rounded-md'>
                                            <button className='' onClick={deleteDrop}>Yes, I am sure</button>
                                        </div>

                                        <div className='mx-4 px-3 py-1 text-indigo-500 bg-neutral-100 font-medium rounded-md'>
                                            <button className='' onClick={closeModal}>No, let&apos;s return</button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default DeleteDrop