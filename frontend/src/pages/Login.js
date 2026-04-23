import axios from "axios";
import { useState } from "react";

function Login() {
  const [data, setData] = useState({ email: "", password: "" });

  const submit = async () => {
    try {
      const res = await axios.post("https://fsd-3-mse2-backend.onrender.com/api/auth/login", data);
      localStorage.setItem("token", res.data.token);
      window.location = "/dashboard";
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      <input placeholder="Email"
        onChange={e => setData({...data, email: e.target.value})} />

      <input type="password" placeholder="Password"
        onChange={e => setData({...data, password: e.target.value})} />

      <button onClick={submit}>Login</button>

      <p onClick={() => window.location="/register"}>
        Don't have account? Register
      </p>
    </div>
  );
}

export default Login;