import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Link as RouterLink } from 'react-router-dom';
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailAndPassword } from "../../app";

const customForm = {
  email: '',
  password: '',
  name: ''
}

const formValidations = {
  email: [(value) => value.includes('@'), "El correo debe tener @"],
  password: [(value) => value.length >= 6, "El password debe de tener mas de 6 letras"],
  name: [(value) => value.length >= 1, "El nombre es obligatorio"]
}
export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { status, errorMessage } = useSelector(state => state.authSlice);
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);
  const { formState, email, name, password, onInputChange,
    isFormValid, emailValid, nameValid, passwordValid
  } = useForm(customForm, formValidations)

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;

    dispatch(startCreatingUserWithEmailAndPassword(formState));
  }
  return (
    <AuthLayout title="Crear cuenta">
      {/* <h1>FormValid {isFormValid ? 'Valid':'Incorrecto'}</h1> */}
      <form onSubmit={onSubmit} className="animate__animated animate_fadeIn animate__faster">
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="Nombre completo"
              fullWidth
              name="name"
              value={name}
              onChange={onInputChange}
              error={!!nameValid && formSubmitted}
              helperText={nameValid && formSubmitted} />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@mail.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid && formSubmitted} />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contrasenna"
              type="password"
              placeholder="Contrasenna"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid && formSubmitted} />
            <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={12} display={!!errorMessage?'':'none'}>
                <Alert severity="error" >{errorMessage}</Alert>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  disabled={isCheckingAuthentication}
                  variant="contained"
                  fullWidth>
                  Crear Cuenta
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr: 1 }}>Ya tienes una cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to='/auth/login'>Ingresar</Link>

          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}