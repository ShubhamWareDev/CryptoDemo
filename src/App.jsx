import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Coin from "./pages/Coin/Coin";
// import TrendingCoin from "./components/Trending/TrendingCoin";
// import Trending from "./components/Trending/trending";
// import Trending from "./components/Navbar/Trending/Trending";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      {/* <TrendingCoin /> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:coinID" element={<Coin />} />
      </Routes>
    </div>
  );
};

export default App;
