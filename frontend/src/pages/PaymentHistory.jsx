import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PrimaryAppBar from "../components/header";

export default function PaymentHistory() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("ds-token");

    async function getPaymentHistory() {
      await axios
        .get("http://localhost:8000/ms-payment/payment/get-transactions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setPayments(res.data);
          console.log(res.data);
          console.log(payments);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getPaymentHistory();
    console.log(payments);
  }, []);
  return (
    <div>
      <PrimaryAppBar />
      <TableContainer sx={{ maxWidth: 650 }} component={Paper}>
        <Table sx={{ maxWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Course</TableCell>
              <TableCell align="center">User</TableCell>
              <TableCell align="center">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row?.courseName}</TableCell>
                <TableCell align="center">{row?.payment?.user}</TableCell>
                <TableCell align="center">{row?.payment?.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
