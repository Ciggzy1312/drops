import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'
import { Dispatch, FC, Fragment, SetStateAction, useState } from 'react'

const AddLink: FC<{ isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>, id: string }> = ({ isOpen, setIsOpen, id }) => {
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
                        <div className="fixed inset-0 bg-black bg-opacity-70" />
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
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#131517] p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-xl font-medium leading-6 text-white my-4"
                                    >
                                        Add a link to your drop
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <input type="email" value={url} placeholder="Enter your link here" className="w-[80%] px-3 py-1.5 bg-[#252728] border border-[#252728] text-[#BCC0C8] rounded-md focus:outline-none focus:border-[#3F8DFD]" onChange={(e) => setUrl(e.target.value)} />
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-[#3F8DFD] px-4 py-1.5 text-sm font-medium text-white hover:bg-[#1877FF] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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

export default AddLink