import { Link, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import Button from "./Button";
import { useEffect, useState } from "react";
import UsersTable from "./UsersTable";
import { axiosInstance } from "../lib/axios";
import Loading from "./Loading";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
  image: string;
}

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [nameSurname, setNameSurname] = useState("");
  const [limit] = useState(2);
  const [pageIndex, setPageIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nameSurname) return;

    setLoading(true);
    try {
      const res = await axiosInstance.get(`/api/users/${nameSurname}`);
      const { users, total } = res.data;
      const pages = Math.ceil(total / limit);

      setUsers(users);
      setTotalPages(total !== 0 ? pages : 1);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleDeleteUser = async (id: string) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/api/users/${id}`);

      const usersRes = await axiosInstance.get(`/api/users`);
      setUsers(usersRes.data.users);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleEditUser = (id: string, user: User) => {
    navigate(`user/${id}`, { state: { ...user } });
  };

  const handlePrevPage = () => {
    if (pageIndex + 1 > 1) {
      setPageIndex((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (pageIndex + 1 < totalPages) {
      setPageIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setNameSurname("");

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(
          `/api/users?limit=${limit}&pageIndex=${pageIndex}`
        );
        const { users, total } = res.data;
        const pages = Math.ceil(total / limit);

        setUsers(users);
        setTotalPages(pages);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchData();
  }, [limit, pageIndex]);

  return (
    <Layout>
      <main className='container mx-auto px-4 space-y-8'>
        <div className='grid grid-cols-3 gap-y-4  items-center md:grid-cols-3'>
          <p className='col-span-2 text-lg text-gray-500 font-semibold md:col-span-1'>
            User List
          </p>

          <form
            action=''
            className='col-span-4 flex gap-2 md:col-span-1'
            onSubmit={handleSearch}
          >
            <input
              type='text'
              placeholder='Search'
              className='p-2 border-2 border-gray-300 rounded-md w-full'
              onChange={(e) => setNameSurname(e.target.value)}
            />
            <button type='submit'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-search'
              >
                <circle cx='11' cy='11' r='8' />
                <path d='m21 21-4.3-4.3' />
              </svg>
            </button>
          </form>

          <Link
            to={"/user"}
            className='col-start-3 row-start-1 justify-self-end w-1/2 md:w-1/3 lg:w-1/4'
          >
            <Button style='bg-blue-500 w-full'>Add +</Button>
          </Link>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <>
            <UsersTable
              users={users}
              handleEditUser={handleEditUser}
              handleDeleteUser={handleDeleteUser}
            />

            <div className='flex items-center justify-end gap-2 text-gray-500 font-semibold'>
              <button className='py-1 px-2' onClick={handlePrevPage}>
                &lt;
              </button>
              <ul className='flex gap-2'>
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((item, index) => (
                  <li
                    key={item}
                    className={`${
                      pageIndex === index ? "font-bold text-gray-600" : ""
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <button className='py-1 px-2' onClick={handleNextPage}>
                &gt;
              </button>
            </div>
          </>
        )}
      </main>
    </Layout>
  );
};

export default Home;
