import {
  Avatar,
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import Form from "./Form";
import { useEffect, useState } from "react";
import Table from "./Table";
import "../firebase/config";
import { getAuth, signOut } from "firebase/auth";
import { db } from "../firebase/config";
import { getDocs, collection } from "firebase/firestore";

const Main = ({ userName }) => {
  const [itemList, setItemList] = useState([]);
  const [userId, setUserId] = useState("");

  const itemCollectionRef = collection(db, "restaurants");

  const getItemList = async () => {
    try {
      const data = await getDocs(itemCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        itemId: doc.itemId,
      }));
      setItemList(filteredData);
      setUserId(getAuth()?.currentUser?.uid);
      console.log(getAuth());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItemList();
  }, []);

  const logoutHandler = () => {
    signOut(getAuth())
      .then(() => alert("Logout is success"))
      .catch((e) => alert(e.error));
  };

  return (
    <Box>
      <Container>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          sx={{ background: "#fe7e37", borderRadius: "5px" }}
        >
          <Stack width={100}>
            <img src="./yelp-logo.png" alt="logo" />
          </Stack>
          <Stack direction={"row"} spacing={2}>
            <Typography variant="h4" pt={1.5}>
              {userName}
            </Typography>
            <Button>
              <Avatar sx={{ background: "blue" }}></Avatar>
            </Button>
          </Stack>
        </Stack>
        <Stack direction={'row'} justifyContent={'end'}>
          <Button onClick={logoutHandler} variant="contained">
            Logout
          </Button>
        </Stack>
        <Stack direction={"row"} spacing={10} mt={5}>
          <Stack
            sx={{
              background: "#f9bf51",
              borderRadius: "10px",
              width: "400px",
              height: "355px",
            }}
          >
            <Form
              itemCollectionRef={itemCollectionRef}
              getItemList={getItemList}
            />
          </Stack>
          <Stack
            sx={{
              background: "#471812",
              borderRadius: "20px",
              padding: "15px 20px 30px",
            }}
          >
            <Table itemList={itemList} userId={userId} />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Main;
