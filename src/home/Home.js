import React from "react";
import Nav from "./Nav";
import Products from "./Products";
import NewProduct from "./modals/NewProduct";
import { Container } from "@mui/material";
import NewCategory from "./modals/NewCategory";
import NewSign from "./modals/NewSign";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <>
      <Nav />
      <Container maxWidth="lg">
        <Products />
        <NewProduct />
        <NewProduct />
        <NewCategory />
        <NewSign />
      </Container>
    </>
  );
}
