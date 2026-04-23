import axios from "axios";
import { useState } from "react";

function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const submit = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", data);
      alert("Registered successfully");
      window.location = "/";
    } catch {
      alert("Error");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>

      <input placeholder="Name"
        onChange={e => setData({...data, name: e.target.value})} />

      <input placeholder="Email"
        onChange={e => setData({...data, email: e.target.value})} />

      <input type="password" placeholder="Password"
        onChange={e => setData({...data, password: e.target.value})} />

      <button onClick={submit}>Register</button>
    </div>
  );
}

export default Register;