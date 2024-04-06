import React from "react";
import Button from "../Button";

const FileForm = ({
  image,
  handleUploadImage,
  handleDeleteImage,
}: {
  image: string;
  handleUploadImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeleteImage: () => void;
}) => {
  return (
    <form action='' className=' flex flex-col items-center gap-3'>
      <div className='flex justify-center w-40 aspect-square rounded-full border overflow-hidden'>
        {image && <img src={image} alt='preview' className='w-full' />}
      </div>
      <label
        htmlFor='image'
        className='bg-blue-500 text-white w-fit px-6 py-2 text-nowrap rounded-md'
      >
        <input
          type='file'
          id='image'
          accept='image/png, image/jpeg'
          className='hidden'
          onChange={handleUploadImage}
        />
        Upload profile picture
      </label>

      <Button style='bg-red-500' onClick={handleDeleteImage}>
        Delete picture
      </Button>
    </form>
  );
};

export default FileForm;
