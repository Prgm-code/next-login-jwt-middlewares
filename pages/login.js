import { useState } from "react";
import { useRouter } from "next/router";

import axios from "axios";

function LoginPage() {
  const router = useRouter();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,

      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credentials);

    const response = await axios.post("api/auth/login", credentials);
    console.log(response.status);

    if (response.status === 200) {
      return router.push("/dashboard");
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <p>Log in to your account</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
