import React, { useRef, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const UpdateCom = (props) => {
  const [ProID, setproid] = useState(props.update.Productid);
  const [proname, setproname] = useState(props.update.ProductName);

  const [catogoryname, setcatogoryname] = useState(props.update.CategoryName);
  const [catogoruid, setcatogoruid] = useState(props.update.Categoryid);

  console.log(props.update._id);

  const onSave = async (id) => {
    const inputData = {
      Productid: ProID,
      ProductName: proname,
      CategoryName: catogoryname,
      Categoryid: catogoruid,
    };

    console.log(inputData);

    console.log(id);

    fetch(`http://localhost:5000/product/${id}`, {
      method: "PATCH",
      body: JSON.stringify(inputData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));

    // console.log(update);
    props.setsave(!props.save);
    props.setOpen(false);
  };

  //   props.update.CategoryName;

  //   console.log(props.update.CategoryName);

  //   const product = [1, 2];

  //   const product = [
  //     props.update.CategoryName,
  //     props.update.Categoryid,
  //     props.update.ProductName,
  //     props.update.Productid,
  //   ];

  return (
    <Box>
      <Dialog open={props.open}>
        <DialogTitle>UPDATE PRODUCT</DialogTitle>

        <DialogContent sx={{ padding: "20px" }}>
          {/* {product.map((product) => {
            return (
             
            );
          })} */}

          <TextField
            // id="outlined-password-input"
            label="PRODUCT ID"
            type="text"
            autoComplete="current-password"
            sx={{ margin: "20px" }}
            value={ProID}
            onChange={(e) => setproid(e.target.value)}
          />

          <TextField
            // id="outlined-password-input"
            label="PRODUCT NAME"
            type="text"
            autoComplete="current-password"
            sx={{ margin: "20px" }}
            value={proname}
            onChange={(e) => setproname(e.target.value)}
          />

          <TextField
            // id="outlined-password-input"
            label="CATEGORY ID"
            type="text"
            autoComplete="current-password"
            sx={{ margin: "20px" }}
            value={catogoruid}
            onChange={(e) => setcatogoruid(e.target.value)}
          />

          <TextField
            // id="outlined-password-input"
            label="CATEGORY NAME"
            type="text"
            autoComplete="current-password"
            sx={{ margin: "20px" }}
            value={catogoryname}
            onChange={(e) => setcatogoryname(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button>Clear</Button>
          <Button onClick={() => onSave(props.update._id)}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UpdateCom;
