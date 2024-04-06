import Button from "./Button";
import Avatar from "./Avatar";
import { User } from "./Home";

const UsersTable = ({
  users,
  handleEditUser,
  handleDeleteUser,
}: {
  users: User[];
  handleEditUser: (id: string, user: User) => void;
  handleDeleteUser: (id: string) => void;
}) => {
  return (
    <div className='relative w-full overflow-auto'>
      <table className='w-full text-nowrap'>
        <thead className='font-light'>
          <tr className=' bg-gray-200 border-collapse'>
            {[
              "Profile picture",
              "First name",
              "Last name",
              "Gender",
              "Birthday",
              "Action",
            ].map((t) => (
              <th key={t} className='p-4 font-semibold'>
                {t}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='text-center'>
          {users.length === 0 && (
            <tr>
              <td className='p-8' colSpan={6}>
                No Users
              </td>
            </tr>
          )}
          {users.map((user) => (
            <tr className='' key={user._id}>
              <td className='p-4 flex justify-center items-center'>
                <Avatar
                  image={user.image}
                  style='w-[4rem] h-[4rem] bg-blue-600 text-white'
                >
                  A
                </Avatar>
              </td>
              <td className='p-4'>{user.firstName}</td>
              <td className='p-4'>{user.lastName}</td>
              <td className='p-4'>{user.gender}</td>
              <td className='p-4'>{user.birthDate}</td>
              <td className='p-4 '>
                <div className='flex justify-center items-center gap-4'>
                  <Button
                    style='w-full lg:w-1/3 bg-yellow-400'
                    onClick={() => handleEditUser(user._id, user)}
                  >
                    Edit
                  </Button>
                  <Button
                    style='w-full lg:w-1/3 bg-red-500'
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    <span className='w-full'>Delete</span>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
