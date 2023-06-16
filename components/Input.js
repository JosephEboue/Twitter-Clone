import React, { useState } from 'react'
import { BsImage, BsEmojiSmile } from "react-icons/bs"
import { AiOutlineGif, AiOutlineClose } from "react-icons/ai"
import { RiBarChart2Line } from "react-icons/ri"
import { IoCalendarNumberOutline } from "react-icons/io5"
import { HiOutlineLocationMarker } from "react-icons/hi"
import { useSession } from 'next-auth/react'

function Input() {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null)

  const addImageToPost = (e) => {

    const reader = new FileReader()
    if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (readerEvent) => {
        setSelectedFile(readerEvent.target.result)
    }

}
  return (
    <div className={`mt-4 px-4 ${loading && "opacity-60"}`}>
      <div className="grid grid-cols-[48px,1fr] gap-4">
        <div>
          <img
            className="h-12 w-12 rounded-full object-contain"
            src={session?.user?.image}
            alt=""
          />
        </div>
        <div className="w-[90%]">
          <textarea
            className="w-[100%] bg-transparent outline-none text-[20px]"
            rows="2"
            placeholder="Ecrire un commentaire"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {selectedFile && (
            <div className="relative mb-4">
              <div
                className="absolute w-8 h-8 bg-[#15181c] hover:[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
                onClick={() => setSelectedFile(null)}
              >
                <AiOutlineClose className="text-white h-5" />
              </div>

              <img
                src={selectedFile}
                alt=""
                className="rounded-2xl max-h-80 object-contain"
              />
            </div>
          )}
          {!loading && (
                        <div className='flex justify-between items-center'>

                            <div className='flex gap-4 text-[20px] text-[#1d9bf0]'>

                                <label htmlFor="file">
                                    <BsImage className='cursor-pointer' />
                                </label>

                                <input id="file" type="file"
                                    hidden
                                    onChange={addImageToPost}
                                />

                                <div className='border-[#1d9bf0] border rounded h-[18px] text-[16px] grid place-items-center'>
                                    <AiOutlineGif />
                                </div>
                                <RiBarChart2Line className='rotate-90' />
                                <BsEmojiSmile className='cursor-pointer' onClick={() => setShowEmojis(!showEmojis)} />
                                <IoCalendarNumberOutline />
                                <HiOutlineLocationMarker />
                            </div>

                        </div>
                    )}

        </div>
      </div>
    </div>
  );
}

export default Input;
