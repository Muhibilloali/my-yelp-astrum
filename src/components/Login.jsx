import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../firebase/firebase.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wrongMsg, setWrongMsg] = useState(false);

  const loginHandler = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(getAuth(), email, password)
      .then(() => setWrongMsg(false))
      .catch(() => setWrongMsg(true));
  };
  return (
    <Box sx={{ background: "#102C57" }} height={"100vh"}>
      <Container>
        <Stack direction={"row"} justifyContent={"center"}>
          <Stack
            width={"450px"}
            height={"450px"}
            sx={{
              background: "#1C1678",
              color: "white",
              mt: "150px",
              p: "10px 20px",
              borderRadius: "20px",
            }}
          >
            <Box mb={2}>
              <Typography
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "25px",
                }}
              >
                Welcome to My Yelp
              </Typography>
            </Box>
            <form onSubmit={loginHandler}>
            <Box mb={2}>
                <label htmlFor="name" className="form-label">
                  User Name
                </label>
                <input
                  type="name"
                  name="name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </Box>
              <Box mb={2}>
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </Box>
              <Box mb={2}>
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </Box>
              {wrongMsg && (
                <Typography mt={1} mb={3} fontSize={13}  color={"red"}>
                  Your email or password is Wrong
                </Typography>
              )}

              <Typography mb={3}>
                Don't have an account? <Link to={"/register"}>Sign Up</Link>
              </Typography>
              <Button
                type="submit"
                variant="contained"
                
                sx={{ mt: "10px", width: "100%"}}
              >
                Sign in
              </Button>
            </form>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Login;