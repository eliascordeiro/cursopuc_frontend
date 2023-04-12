import React from "react";
import { Redirect } from "react-router-dom";

import { isLoggedIn } from "../../auth/auth";

import Navbar from "../../layout/Navbar";

const Home = () => {
  if (!isLoggedIn()) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Navbar />
      
      {/*
      <div className="flex sm justify-center mt-50">
        <img src="/logo.png" alt="logo aspma" width={'50%'} />
      </div>
      */}

    </>
  );
};

export default Home;
