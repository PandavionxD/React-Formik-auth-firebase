import { register } from "../config/firebase";
import { useRedirect } from "../hooks/useRedirect";
import { useUserContext } from "../context/UserContext";
import { Formik } from "formik";
import * as Yup from "yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { Link } from "react-router-dom";

const Register = () => {
  const { user } = useUserContext();

  useRedirect(user, "/dashboard");

  const onSubmit = async (
    { email, password },
    { setSubmitting, setErrors, resetForm }
  ) => {
    try {
      const userCredentials = await register({ email, password });
      console.log(userCredentials);
      resetForm();
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
      if (error.code === "auth/email-already-in-use") {
        return setErrors({ email: "Email en uso" });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const validationScheme = Yup.object().shape({
    email: Yup.string().email("Email no valido").required(),
    password: Yup.string()
      .min(6, "La contraseña tiene que ser mayor de 6")
      .required()
      .trim(),
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
          sx={{
            display: "flex",
            alignItems: "center",
            margin: 1,
            fontSize: "48px",
          }}
        >
          Registro
          <HowToRegIcon
            sx={{
              fontSize: 40,
              ml: 1,
            }}
          />
        </Typography>
        <hr />
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={onSubmit}
          validationSchema={validationScheme}
        >
          {({
            values,
            handleChange,
            handleSubmit,
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
                variant="filled"
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
                variant="filled"
                error={errors.password && touched.password}
                helperText={
                  errors.password && touched.password && errors.password
                }
                sx={{
                  mb: 2,
                }}
              />

              <Button 
              component={Link}
              type="submit" 
              sx={{
                my:1
              }}
              variant="contained"
              disabled={isSubmitting}>
                Registro
              </Button>
              <Button component={Link} 
              color="secondary"
              variant="contained"
              to="/" >
                Volver
              </Button>
            </Box>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Register;
