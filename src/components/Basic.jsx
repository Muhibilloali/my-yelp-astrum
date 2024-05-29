import {
  Avatar,
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import Form from "./Form";
import { useEffect, useState } from "react";
import Table from "./Schedule";
import "../firebase/firebase";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { db } from "../firebase/firebase";
import { getDocs, collection } from "firebase/firestore";
import "../index.css";

const Basic = ({ accountList, getAccountList }) => {
  const [itemList, setItemList] = useState([]);
  const [userId, setUserId] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openEditName, setOpenEditName] = useState(false);
  const [newName, setNewName] = useState("");

  const currentEmail = getAuth().currentUser;
  const userName = accountList.filter(
    (acc) => acc.email === currentEmail.email
  )[0]?.userName;

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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAccountList();
    getItemList();
  }, [accountList]);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    signOut(getAuth());
    handleMenuClose();
  };

  const handleEditName = () => {
    setNewName(userName);
    setOpenEditName(true);
    handleMenuClose();
  };

  const handleCloseEditName = () => {
    setOpenEditName(false);
  };

  const handleSaveName = async () => {
    try {
      const auth = getAuth();
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: newName });
        // Update the account list with the new name
        const updatedAccountList = accountList.map((acc) =>
          acc.email === currentEmail.email ? { ...acc, userName: newName } : acc
        );
        getAccountList(updatedAccountList);
        handleCloseEditName();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Container>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          sx={{
            background: "#418f82",
            color: "black",
            borderRadius: "5px",
            width: "100%",
          }}
        >
          <Stack className="yelp-icon" width={100} m={2}>
            <img src="./yelp.png" alt="logo" />
          </Stack>
          <Typography
            sx={{
              margin: "auto",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "25px",
            }}
          >
            Welcome to My Yelp
          </Typography>
          <Stack direction={"row"} spacing={2}>
            <Typography variant="h4" pt={1.5}>
              {userName && userName}
            </Typography>
            <Stack className="yelp-person" onClick={handleAvatarClick}>
              <img src="./icon-person.png" alt="logo" />
            </Stack>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleEditName}>Edit Name</MenuItem>
              <MenuItem
                onClick={handleLogout}
                className=" bg-danger text-black"
              >
                Logout
              </MenuItem>
            </Menu>
          </Stack>
        </Stack>

        <Stack direction={"row"} spacing={10} mt={5}>
          <Stack
            sx={{
              background: "#418f82",
              borderRadius: "10px",
              width: "400px",
              height: "auto",
            }}
          >
            <Form
              itemCollectionRef={itemCollectionRef}
              getItemList={getItemList}
            />
          </Stack>
          <Stack
            sx={{
              background: "#418f82",
              borderRadius: "20px",
              padding: "15px 20px 30px",
            }}
          >
            <Table itemList={itemList} userId={userId} />
          </Stack>
        </Stack>
      </Container>
      <Dialog open={openEditName} onClose={handleCloseEditName}>
        <DialogTitle>Edit Name</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            Please enter your new name below:
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            label="New Name"
            type="text"
            fullWidth
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            className="bg-danger text-white"
            onClick={handleCloseEditName}
          >
            Cancel
          </Button>
          <Button
            className=" bg-success text-white"
            onClick={handleSaveName}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Basic;
