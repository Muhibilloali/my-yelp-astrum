import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import '../index.css';

const Form = ({ itemCollectionRef, getItemList }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");

  let auth = getAuth();

  const onSubmitItem = async (e) => {
    e.preventDefault();
    try {
      await addDoc(itemCollectionRef, {
        name,
        description,
        city,
        userId: auth?.currentUser?.uid
      });
      setName('')
      setDescription('')
      setCity('')

      getItemList();
    } catch (error) {
      console.log(error);
    }
  };

  return (

    <Stack p={2} color={ "black" } >
      <Typography textAlign={"center"} fontWeight={"bold"} fontSize={20} >
        Add Car
      </Typography>
      <form onSubmit={onSubmitItem}>
        <Box mb={2}>
          <label className="form-label">Car Model</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Box>
        <Box mb={2}>
          <label className="form-label">Car Color</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Box>
        <Box mb={2}>
          <label className="form-label">Made In City</label>
          <input
            type="text"
            className="form-control"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </Box>
        <Stack direction={"row"} justifyContent={"end"}>
          <Button type="submit" variant="contained" sx={{ width: "170px", 
          background: "#00c5a4", color: "black", fontWeight: "bold" }}>
            SUBMİT
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default Form;
