import axios from "axios";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Link, useNavigate } from "react-router-dom";
import { CONFIG } from "../../config/config";

const UserSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSignUP(e) {
    e.preventDefault();

    const userDetail = {
      name,
      email,
      password,
      mobile,
      age,
      gender,
    };

    try {
      const res = await axios.post(
        `${CONFIG.BASE_URL}/signup`,
        userDetail
      );

      setError("");
      navigate("/login", { replace: true });
    } catch (err) {
      const responseData = err.response?.data;

      setError(
        responseData?.errors?.[0]?.msg ||
          responseData?.message ||
          responseData?.error ||
          err.message ||
          "Signup failed. Please try again."
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
            label="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            label="Mobile No."
            type="tel"
            required
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />

          <TextField
            label="Age"
            type="number"
            required
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <FormControl sx={{ textAlign: "left" }}>
            <FormLabel>Gender</FormLabel>

            <RadioGroup
              row
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
              />

              <FormControlLabel
                value="Male"
                control={<Radio />}
                label="Male"
              />

              <FormControlLabel
                value="Other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
        </Stack>
      </Box>

      <Button variant="outlined" onClick={handleSignUP}>
        Sign Up
      </Button>

      <Box sx={{ padding: "2%" }}>
        Already Registered? <Link to="/login">Login</Link>
      </Box>

      {error && (
        <Box sx={{ color: "red", margin: "1%" }}>
          {error}
        </Box>
      )}
    </Box>
  );
};

export default UserSignup;