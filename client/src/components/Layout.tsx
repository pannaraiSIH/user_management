import React from "react";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=''>
      <header className=' bg-blue-500'>
        <div className='container mx-auto min-h-[5rem] flex mb-8 px-4'>
          <nav className='flex-1 flex justify-between items-center'>
            <Link to={"/"}>
              <p className='text-lg text-white font-semibold'>
                User Management
              </p>
            </Link>

            <Avatar style='bg-white w-[3rem] h-[3rem]'>D</Avatar>
          </nav>
        </div>
      </header>

      {children}
    </div>
  );
};

export default Layout;
