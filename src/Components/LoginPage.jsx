import axios from 'axios';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirectTo, setRedirectTo] = useState(null);
  const url = 'http://localhost:3000/login';
  const PostData = async () => {
    const res = await axios.post(url, {
      username,
      password,
    });
    handleRedirect(res.data.data.role);
    const user = await res.data.data;
    console.log(user);
    
    localStorage.setItem('user', JSON.stringify(user));
  };
  const OnLogin = () => {
    PostData();
  };
  
  const handleRedirect = (role) => {
    if (role === 'user') {
      setRedirectTo('/user');
    } else if (role === 'admin') {
      setRedirectTo('/admin');
    }
  };

  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-gray-100  ">
      {redirectTo && <Navigate to={redirectTo} replace={true} />}
      <div className="flex flex-col p-[30px] gap-10 w-[400px] h-[500px] bg-white rounded-xl shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
        <h1 className="text-2xl font-bold text-orange-500">Login</h1>
        <input
          onChange={(e) => setUsername(e.target.value)}
          className="border-2 py-4 text-xl px-3 border-black opacity-50 rounded-xl"
          placeholder="Username"
          type="email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 py-4 text-xl px-3 border-black rounded-xl opacity-50"
          placeholder="Password"
          type="passwor"
        />
        <h1></h1>
        <button
          onClick={OnLogin}
          className=" py-3 px-3 rounded-xl text-xl text-white bg-orange-500 shadow-[0_2px_30px_rgba(8,_112,_184,_0.7)] hover:bg-white hover:text-blue-400"
        >
          Login
        </button>
        <Link className="underline text-orange-500" to={'/register'}>
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
