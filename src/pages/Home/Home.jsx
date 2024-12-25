import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { allcoins, currency } = useContext(CoinContext);

  const [displayCoin, setDisplayCoin] = useState([]);

  const [input, setInput] = useState("");

  function inputHandler(e) {
    setInput(e.target.value);
    console.log(e.target.value);
    if (e.target.value === "") {
      setDisplayCoin(allcoins);
    }
  }

  const inSumbitHandler = async (e) => {
    e.preventDefault();
    const coins = await allcoins.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(coins);
  };

  useEffect(() => {
    setDisplayCoin(allcoins);
  }, [allcoins]);

  return (
    <div className="coins-container">
      <div className="search">
        <form onSubmit={inSumbitHandler} action="">
          <input
            onChange={inputHandler}
            value={input}
            className="input"
            type="text"
            placeholder="Search Crypto"
            required
          />
          <button className="btn" type="submit">
            Search
          </button>
        </form>
      </div>

      {/* <h3>{allcoins.length}</h3> */}

      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className="market-cap">Market Cap</p>
        </div>
        {displayCoin.slice(0, 50).map((item, index) => (
          <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt="" />
              <p>{item.name + "-" + item.symbol}</p>
            </div>
            <p>
              {currency.symbol} {item.current_price.toLocaleString()}
            </p>
            <p
              className={item.price_change_percentage_24h > 0 ? "green" : "red"}
            >
              {Math.floor(item.price_change_percentage_24h * 100) / 100}
            </p>
            <p className="market-cap">
              {currency.symbol}
              {item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
