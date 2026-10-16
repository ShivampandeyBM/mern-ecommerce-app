import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { CONFIG } from "../../config/config";

const UserLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    const loginDetail = {
      email,
      password,
    };

    try {
      const res = await axios.post(
        `${CONFIG.BASE_URL}/login`,
        loginDetail
      );

      const data = res.data;

      if (data.user) {
        localStorage.setItem("LoginData", JSON.stringify(data));
        setError("");
        navigate("/", { replace: true });
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Unable to connect to the server."
      );
    }
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
          "& > :not(style)": { m: 1 },
        }}
      >
        <Stack direction="column" spacing={2}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Stack>
      </Box>

      <Button variant="outlined" onClick={handleLogin}>
        Login
      </Button>

      <Box sx={{ padding: "2%" }}>
        New user! <Link to="/signup">Signup Now</Link>
      </Box>

      {error && (
        <Box sx={{ color: "red", padding: "1%" }}>
          {error}
        </Box>
      )}
    </Box>
  );
};

export default UserLogin;