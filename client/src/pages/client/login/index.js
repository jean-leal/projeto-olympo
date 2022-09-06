import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import api from "../../../services/api";
import { tokenUser, setUserId, setUserName } from "../../../services/auth";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";

const theme = createTheme();

export default function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    await api.post("/api/users/login", { login, password }).then((res) => {
      if (res.status === 200) {
        if (res.data.status === 1) {
          tokenUser(res.data.token);
          setUserId(res.data.id_client);
          setUserName(res.data.user_name);

          window.location.href = "/admin";
        } else if (res.data.status === 2) {
          alert("Atenção" + res.data.error);
          window.location.href = "/";
        }
        setLoading(true);
      } else {
        alert("Erro de servidor");
        setLoading(true);
      }
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="login"
            label="Login"
            name="login"
            autoComplete="none"
            autoFocus
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <FormControl
            sx={{ m: 1, width: "25ch" }}
            variant="outlined"
            style={{ width: "100%", marginTop: 10 }}
          >
            <InputLabel htmlFor="id-password">Senha</InputLabel>
            <OutlinedInput
              label="senha"
              id="id-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={(e) => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={120}
            />
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
            disabled={loading}
            size="large"
          >
            {loading ? <CircularProgress /> : "Logar"}
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
