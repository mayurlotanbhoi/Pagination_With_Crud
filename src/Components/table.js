import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TablePagination,
  IconButton,
  Box,
  Typography,
  Button,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import useFetch from "./FetchCompo";
import Upadte from "./updateCom";
import PostData from "./postProduct";

// var data = [
//   100, 10, 10, 100, 10, 10, 100, 10, 10, 100, 10, 10, 100, 10, 10, 100, 10, 10,
//   100, 10, 10, 100, 10, 10, 100, 10, 10, 100, 10, 10, 100, 10, 10, 100, 10, 10,
//   100, 10, 10,
// ];

const TableBi = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [ApiData, setApiData] = useState([]);
  const [delet, setDelet] = useState(0);
  const [UpdatData, setUpdatData] = useState();
  const [postsave, setpostsave] = useState(false);
  const [pages, setpages] = useState(1);

  const [save, setSave] = useState(false);

  const [open, setOpen] = useState(false);

  const handleChangePage = (event, newPage) => {
    // console.log(event);
    setpages(newPage);
    // console.log(newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);

    setPage(0);
  };

  useEffect(() => {
    //   const [data] = useFetch("http://localhost:5000/product/page/2");

    const getdata = async () => {
      const res = await fetch("http://localhost:5000/product/page/" + pages);
      const getapidata = await res.json();
      // console.log(getapidata.product);
      setApiData(getapidata);
    };
    getdata();
    //   console.log(data);
    console.log(ApiData);
  }, [delet, save, postsave, pages]);

  console.log(ApiData.product);

  const deletFun = async (productid) => {
    console.log(productid);
    const res = await fetch(`http://localhost:5000/product/${productid}`, {
      method: "delete",
    });
    const getapidata = await res.json();

    if (getapidata.deletedCount) {
      alert("deleted");
      setDelet((pre) => pre + 1);
    }
  };

  const update = (data) => {
    setUpdatData(data);
    setOpen(true);
  };

  console.log(UpdatData);

  return (
    <>
      {UpdatData && (
        <Upadte
          open={open}
          setOpen={setOpen}
          update={UpdatData}
          setsave={setSave}
          save={save}
        />
      )}

      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Paper sx={{ width: "90%", overflow: "hidden" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h3">PRODUCT DETAILS</Typography>
            <Button onClick={() => setpostsave(true)}>ADD PRODUCT</Button>
            <PostData postsave={postsave} setpost={setpostsave} />
          </Box>
          <TableContainer sx={{ maxHeight: 500 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>PRODUCT ID</TableCell>
                  <TableCell>PRODUCT NAME</TableCell>
                  <TableCell>PRODUCT CATEGORY</TableCell>
                  <TableCell>CATEGORY ID</TableCell>
                  <TableCell>DELETE</TableCell>
                  <TableCell>UPDATE</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {/* {console.log(.length)} */}

                {ApiData.product &&
                  ApiData.product.map((data) => {
                    {
                      /* console.log(ApiData.data[0]); */
                    }
                    return (
                      <>
                        <TableRow>
                          <TableCell component="td">
                            {data.CategoryName.toUpperCase()}
                          </TableCell>
                          <TableCell>{data.Categoryid}</TableCell>
                          <TableCell>
                            {data.ProductName.toUpperCase()}
                          </TableCell>
                          <TableCell>{data.Productid}</TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() => deletFun(data.Productid)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                          <TableCell>
                            <IconButton onClick={() => update(data)}>
                              <ChangeCircleIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      </>
                    );
                  })}

                {/* .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) */}
              </TableBody>

              {/* <TableFooter></TableFooter> */}
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            count={ApiData.total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  );
};

export default TableBi;
