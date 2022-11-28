import { Dispatch, FC, Fragment, SetStateAction, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'
import { DropType } from '../../types/types'


const EditDrop: FC<{ drop: DropType, setDrop: Dispatch<SetStateAction<DropType>>, isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>, id: string }> = ({ drop, setDrop, isOpen, setIsOpen, id }) => {

    const [name, setName] = useState(drop.name)
    const [description, setDescription] = useState(drop.description)
    const [dropTags, setDropTags] = useState<string[]>(drop.tags)
    const [tags, setTags] = useState(['sports', 'technology', 'songs'])

    const closeModal = () => {
        setIsOpen(false)
    }

    const handleLink = async () => {
        if (name && description && dropTags) {
            const res = await axios.patch(`/api/drop/${id}`, {
                name, description, tags: dropTags
            });
            console.log(res.data);

            setDrop(res.data.updatedDrop);
        }

        setIsOpen(false)
    }

    const handleTag = (tag: string) => {
        if (dropTags.includes(tag)) {
            setDropTags(dropTags.filter(t => t !== tag))
        } else {
            setDropTags([...dropTags, tag])
        }
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
                        <div className="fixed inset-0 bg-black bg-opacity-80" />
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
                                        className="text-xl font-medium leading-6 text-white"
                                    >
                                        Edit current drop
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <div className="flex flex-col">
                                            <label className="py-2 text-sm text-white">Name</label>
                                            <input type="text" required value={name} className="px-3 py-2 bg-[#252728] border border-[#252728] text-[#BCC0C8] rounded-md focus:outline-none focus:border-[#3F8DFD] sm:text-sm" onChange={(e) => setName(e.target.value)} />
                                        </div>

                                        <div className="flex flex-col">
                                            <label className="py-2 text-sm text-white">Description</label>
                                            <input type="text" required value={description} className="px-3 py-2 bg-[#252728] border border-[#252728] text-[#BCC0C8] rounded-md focus:outline-none focus:border-[#3F8DFD] sm:text-sm" onChange={(e) => setDescription(e.target.value)} />
                                        </div>

                                        <div className="py-2">
                                            <label className="text-sm text-white">Tags</label>
                                            <div className='flex pt-2'>
                                                {tags.map((tag, i) => (
                                                    <div className='mr-2' key={i}>
                                                        <button className={`bg-[#24282E] rounded-md px-2 py-0.5 ${dropTags.includes(tag) ? 'border border-white text-white' : 'text-[#A0A6B1] border border-[#24282E]'}`} onClick={() => handleTag(tag)}>{tag}</button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-[#3F8DFD] px-4 py-2 text-sm font-medium text-white hover:bg-[#1877FF] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={handleLink}
                                        >
                                            Update Drop
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

export default EditDrop