import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

function Dashboard() {
  const router = useRouter();

  const [user, setUser] = useState({
    username: "",
    email: "",
  });

  const getProfile = async () => {
    const response = await axios.get("api/profile");
    console.log(response);
    setUser(response.data);
  };
  const logout = async () => {
    try {
      await axios.post("api/auth/logout");
      router.push("/login");
    } catch (error) {
      console.log(error);
      router.push("/login");
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => getProfile()}>get profile</button>
      <pre>
        <code>{JSON.stringify(user, null, 2)}</code>
      </pre>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}

export default Dashboard;
