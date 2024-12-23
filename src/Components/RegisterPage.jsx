import axios from 'axios';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [redirectTo, setRedirectTo] = useState(null);
  const [data,setData]=useState([])
  console.log(name +  ' ' + username + ' ' + password);
  const url = 'http://localhost:3000/register';

  const PostData = async () => {
    try {
      const res = await axios.post(url, {
        name,
        username,
        password,
      }).then(res=>setData(res.data));
      handleRedirect(res.status);
      console.log(res);
      const user = await res.data;
      localStorage.setItem('user', JSON.stringify(user)); // Store the entire user object in localStorage
    } catch (error) {
      setError(error.data);
    }
  };

  const OnRegister = () => {
    PostData();
  };

  const handleRedirect = (status) => {
    if (status === 200 || status === 201) {
      setRedirectTo('/user');
    }
  };

  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-gray-100">
      {redirectTo && <Navigate to={redirectTo} replace={true} />}
      <div className="flex flex-col p-[30px] gap-10 w-[400px] h-[600px] bg-white rounded-xl shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
        <h1 className="text-2xl font-bold text-orange-500">Register</h1>
        <div className="w-full flex items-center gap-5 justify-between flex-wrap">
          <input
            onChange={(e) => setName(e.target.value)}
            className="w-[350px] border-2 py-4 text-xl px-3 border-black opacity-50 rounded-xl"
            placeholder="Name"
            type="text"
          />
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="w-[350px] border-2 py-4 text-xl px-3 border-black rounded-xl opacity-50"
            placeholder="Username"
            type="text"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-[350px] border-2 py-4 text-xl px-3 border-black rounded-xl opacity-50"
            placeholder="Password"
            type="password"
          />
        </div>
        <span>{error}</span>
        <button
          onClick={OnRegister}
          className="py-3 px-3 rounded-xl text-xl text-white bg-orange-500 shadow-[0_2px_30px_rgba(8,_112,_184,_0.7)] hover:bg-white hover:text-orange-500"
        >
          Register
        </button>
        <Link className="underline text-orange-500" to={'/'}>
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
