import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'
import { Dispatch, FC, Fragment, SetStateAction, useState } from 'react'

const Form: FC<{ isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>, id: string }> = ({ isOpen, setIsOpen, id }) => {
    const [url, setUrl] = useState("")

    const closeModal = () => {
        setIsOpen(false)
    }
    const handleLink = async () => {
        //console.log(url)

        if(url){
            const res = await axios.patch(`/api/drop/${id}/addLink`, {
                url
            });
            console.log(res.data);
        }

        setIsOpen(false)
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
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Add a link to your drop
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <input type="email" value={url} placeholder="Enter your link here" className="px-3 py-1.5 border border-gray-300 text-gray-500 rounded-md focus:outline-none focus:border-indigo-400 placeholder:text-gray-300 sm:text-sm" onChange={(e) => setUrl(e.target.value)} />
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={handleLink}
                                        >
                                            Add Link
                                        </button>
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

export default Form