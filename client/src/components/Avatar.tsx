import React from "react";

const Avatar = ({
  children = "A",
  image,
  style,
}: {
  children: React.ReactNode;
  image?: string;
  style: string;
}) => {
  return (
    <>
      {image ? (
        <div className='w-[4rem] h-[4rem] rounded-full overflow-hidden flex justify-center items-center  border'>
          <img src={image} alt='preview' className='' />
        </div>
      ) : (
        <div
          className={`${style} rounded-full flex justify-center items-center border-2`}
        >
          <p>{children}</p>
        </div>
      )}
    </>
  );
};

export default Avatar;
