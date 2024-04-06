import { Link, useLocation, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import UserForm from "./Forms/UserForm";
import FileForm from "./Forms/FileForm";
import Button from "./Button";
import { FormEvent, useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import Loading from "./Loading";
import Compress from "react-image-file-resizer";

const User = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    birthDate: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  const { state } = useLocation();
  const pathname = window.location.pathname;
  const userId = pathname.split("/")[pathname.split("/").length - 1];

  const navigate = useNavigate();

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files && event.currentTarget.files[0];

    if (file) {
      Compress.imageFileResizer(file, 480, 480, "JPEG", 70, 0, (uri) => {
        setUser((prev) => ({ ...prev, image: uri as string }));
      }),
        "base64";
      // reader.onload = (e) => {
      //   setUser((prev) => ({ ...prev, image: e.target?.result as string }));
      // };

      // reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setUser((prev) => ({ ...prev, image: "" }));
  };

  const handleFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, firstName: e.target.value }));
  };

  const handleLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, lastName: e.target.value }));
  };

  const handleGender = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUser((prev) => ({ ...prev, gender: e.target.value }));
  };

  const handleBirthDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, birthDate: e.target.value }));
  };

  const handleSubmitUserForm = async (event: FormEvent) => {
    event.preventDefault();

    const { firstName, lastName, gender, birthDate } = user;

    if (!firstName || !lastName || !gender || !birthDate) return;

    setLoading(true);

    try {
      if (userId !== "" && userId !== "user") {
        await axiosInstance.put(`/api/users/${userId}`, user);
      } else {
        await axiosInstance.post("/api/users", user);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }

    setTimeout(() => navigate("/"), 2000);
  };

  useEffect(() => {
    if (state) {
      setUser(state);
    }
  }, [state]);

  return (
    <Layout>
      <main className='container mx-auto px-4 space-y-8 flex flex-col'>
        <div className='flex justify-between items-center'>
          <p className='text-lg text-gray-500 font-semibold'>Create new User</p>

          <Link to={"/user"} className=''>
            <Button style='bg-blue-500 w-full'>Add +</Button>
          </Link>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className='flex-1 grid grid-cols-1 gap-y-8 md:grid-cols-3 md:gap-4'>
            <FileForm
              image={user?.image}
              handleUploadImage={handleUploadImage}
              handleDeleteImage={handleDeleteImage}
            />
            <UserForm
              user={user}
              handleFirstName={handleFirstName}
              handleLastName={handleLastName}
              handleBirthDate={handleBirthDate}
              handleGender={handleGender}
              handleSubmitUserForm={handleSubmitUserForm}
            />
          </div>
        )}
      </main>
    </Layout>
  );
};

export default User;
