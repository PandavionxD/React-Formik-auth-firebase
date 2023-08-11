import { useState } from "react";
import { register } from "../config/firebase";
import { useRedirect } from "../hooks/useRedirect";
import { useUserContext } from "../context/UserContext";

const Register = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const {user} = useUserContext()

  useRedirect(user,'/dashboard')

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log({email,password})
    try {
        const userCredentials = await register({email,password})
        console.log(userCredentials)
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <>
      <h1> Register </h1>
      <hr />
      <form onSubmit={handleSubmit} className="form">
        <input
          value={email}
          onChange={(e) => {
            setemail(e.target.value);
          }}
          type="email"
          placeholder="Introduce tu email aquí..."
        />
        <input
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          type="password"
          placeholder="Introduce tu contraseña aqui"
        />
        <button type="submit"> Register </button>
      </form>
    </>
  );
};

export default Register;
