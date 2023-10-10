import React, { useContext, useState } from 'react';
// import { Auth } from 'aws-amplify';
import { AccountContext } from '../Accounts';
import { useNavigate } from 'react-router-dom';

export const Login = (props:any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // const [successMessage, setSuccessMessage] = useState('')
  
  const { loggedInUser, signIn, signOut } = useContext(AccountContext);

  let navigate = useNavigate();
  let from = props.from || "/";

  const onSubmit = async (event: any) => {
    event.preventDefault();

    try {
      // Check if the user exists
      const existingUser = await signIn(username, password);
      console.log("Logged in.", existingUser);
      navigate(from, { replace: true });
    } catch (loginError) {
      console.error("Error logging in.", loginError);
      setErrorMessage("Invalid username or password.");
    }
  };

  return (
<div className="flex flex-row w-full justify-end bg-black">
  {!loggedInUser && (
    <form onSubmit={onSubmit} className="flex flex-row">
      <div className="mb-4">
        <label className="text-white font-semibold">Username:</label>
        <input
          className="mt-2 border-b-2 bg-transparent border-white text-white px-2 py-1 rounded-md focus:outline-none focus:border-blue-500"
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="text-white font-semibold">Password:</label>
        <input
          className="mt-2 border-b-2 bg-transparent border-white text-white px-2 py-1 rounded-md focus:outline-none focus:border-blue-500"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div className="flex justify-center">
        {!loggedInUser && (
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-2 rounded-md focus:outline-none">
            Login
          </button>
        )}
      </div>
    </form>
  )}

  {loggedInUser && (
    <button
      onClick={() => signOut(() => navigate("/"))}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none"
    >
      Log Out
    </button>
  )}
</div>
  );
  }
