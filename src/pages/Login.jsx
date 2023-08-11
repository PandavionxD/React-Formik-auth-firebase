import { useEffect, useState } from "react";
import { login } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const { user } = useUserContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ email, password });
    try {
      const userCredentials = await login({ email, password });
      console.log(userCredentials);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  return (
    <>
      <h1> Login </h1>
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
        <button type="submit"> Login </button>
      </form>
    </>
  );
};

export default Login;
