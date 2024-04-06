import Button from "../Button";
import Input from "../Input";

const UserForm = ({
  user,
  handleFirstName,
  handleLastName,
  handleGender,
  handleBirthDate,
  handleSubmitUserForm,
}: {
  user: {
    firstName: string;
    lastName: string;
    gender: string;
    birthDate: string;
    image: string;
  };
  handleFirstName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLastName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleGender: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleBirthDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmitUserForm: (e: React.FormEvent) => void;
}) => {
  return (
    <form
      className='col-span-2 flex flex-col justify-end relative'
      onSubmit={handleSubmitUserForm}
    >
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <Input
          id='first-name'
          placeholder='Please enter first name'
          value={user.firstName}
          onChange={handleFirstName}
        >
          First name
        </Input>
        <Input
          id='last-name'
          placeholder='Please enter last name'
          value={user.lastName}
          onChange={handleLastName}
        >
          Last name
        </Input>
        <label htmlFor='gender' className='flex flex-col'>
          Gender
          <select
            name='gender'
            id='gender'
            className='border p-2 rounded-md'
            value={user.gender}
            onChange={handleGender}
          >
            <option value='' disabled>
              -- Please select Gender --
            </option>
            {[
              "male",
              "female",
              "lesbian",
              "gay",
              "bisexual",
              "transgender",
              "not to prefer",
            ].map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </label>
        <Input
          id='birth-date'
          placeholder=''
          type='date'
          value={user.birthDate}
          onChange={handleBirthDate}
        >
          Birth date
        </Input>
      </div>

      <div className=' ml-auto mt-6 mb-8 md:absolute md:bottom-[-10rem] md:right-0'>
        <Button style='bg-gray-300 mr-4'>Cancel</Button>
        <Button type='submit' style='bg-green-500'>
          Save
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
