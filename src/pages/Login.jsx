import { useEffect } from "react";
import { login } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { Formik } from "formik";
import * as Yup from "yup";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

const Login = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  const onSubmit = async (
    { email, password },
    { setSubmitting, setErrors, resetForm }
  ) => {
    try {
      const userCredentials = await login({ email, password });
      console.log(userCredentials);
      resetForm();
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
      if (error.code === "auth/wrong-password") {
        return setErrors({ password: "contraseña incorrecta" });
      }
      if (error.code === "auth/user-not-found") {
        return setErrors({ email: "usuario no registrado" });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const ValidationScheme = Yup.object().shape({
    email: Yup.string().email("email no valido").required("email requerido"),
    password: Yup.string()
      .trim()
      .min(6, "Minimo 6 caracteres")
      .required("password requerido"),
  });

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{

          margin: "0 auto",
          maxWidth: "400px",
          textAlign: "center",
          padding: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            display:'flex',
            alignItems:'center',
            margin: 1,
            fontSize: "48px",
          }}
        >
          Login
          <LoginIcon sx={{
            fontSize:40,
            ml:1
          }} />
        </Typography>
        <hr />

        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={onSubmit}
          validationSchema={ValidationScheme}
        >
          {({
            values,
            handleSubmit,
            handleChange,
            errors,
            touched,
            handleBlur,
            isSubmitting,
          }) => (
            <Box
              component="form"
              sx={{
                mt: 1,
              }}
              onSubmit={handleSubmit}
              className="form"
            >
              <TextField
                value={values.email}
                onChange={handleChange}
                type="email"
                name="email"
                placeholder="nombre@mail.com"
                onBlur={handleBlur}
                id="email"
                label="Email"
                variant="standard"
                error={errors.email && touched.email}
                helperText={errors.email && touched.email && errors.email}
                sx={{
                  mb: 2,
                }}
              />

              <TextField
                value={values.password}
                onChange={handleChange}
                type="password"
                name="password"
                placeholder="******"
                onBlur={handleBlur}
                id="password"
                label="Contraseña"
                variant="standard"
                error={errors.password && touched.password}
                helperText={
                  errors.password && touched.password && errors.password
                }
                sx={{
                  mb: 2,
                }}
              />
              <Button
                variant="contained"
                sx={{
                  my: 1,
                }}
                type="submit"
                disabled={isSubmitting}
              >
                Ingresar
              </Button>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                color="secondary"
              >
                Registro
              </Button>
            </Box>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Login;
