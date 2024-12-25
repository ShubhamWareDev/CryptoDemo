import React, { useContext, useEffect, useState } from "react";
import { CoinContext } from "../../context/CoinContext";
import "./Trending.css";
import { formatLargeNumber } from "../../Api/formatnumber";

const TrendingCoin = () => {
  const { currency } = useContext(CoinContext);
  const [trendCoin, setTrendCoin] = useState([]);
  const [topCoin, setTopcoin] = useState({});

  const coinDetails = {
    btc: {
      name: "Bitcoin",
      symbol: "BTC",
      image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    },
    eth: {
      name: "Ethereum",
      symbol: "ETH",
      image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    },
    ltc: {
      name: "Litecoin",
      symbol: "LTC",
      image: "https://cryptologos.cc/logos/litecoin-ltc-logo.png",
    },
  };

  const TopCoin = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-5bTQytHnEnf5ZYDVyvS5fQPV",
      },
    };

    fetch("https://api.coingecko.com/api/v3/global", options)
      .then((res) => res.json())
      .then((res) => setTopcoin(res.data))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    TopCoin();
  }, [currency]);

  const fetchTrendingCoin = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-5bTQytHnEnf5ZYDVyvS5fQPV",
      },
    };

    fetch("https://api.coingecko.com/api/v3/search/trending", options)
      .then((res) => res.json())
      .then((res) => setTrendCoin(res.coins))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTrendingCoin();
  }, [currency]);

  return (
    <div className="container-top-section">
      <div className="trending-crypto">
        <h3>Trending</h3>
        {trendCoin.slice(7, 10).map((item, index) => (
          <div key={index} className="trending-layout">
            <p>{item.item.market_cap_rank}</p>
            <img src={item.item.small} alt="" />
            <p>{item.item.name + "-" + item.item.symbol}</p>
            <p>
              {currency.symbol}
              {parseFloat(item.item.data.price).toFixed(3)}
            </p>
            <p>
              {parseFloat(
                item.item.data.price_change_percentage_24h.usd
              ).toFixed(3)}
            </p>
          </div>
        ))}
      </div>

      <div className="trending-crypto">
        <h3>Top 3 Cryptos by Market Cap</h3>
        {topCoin.total_market_cap ? (
          Object.entries(topCoin.total_market_cap)
            .filter(([key]) => ["btc", "eth", "ltc"].includes(key))
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([key, value], index) => {
              const { name, symbol, image } = coinDetails[key];

              return (
                <div key={index} className="top-coin">
                  <div className="coin-info">
                    <img src={image} alt={name} className="coin-image" />

                    <p>
                      {name}-{symbol}
                    </p>
                    <p className="currency-symbol">
                      {currency.symbol} {formatLargeNumber(value)}{" "}
                      {/* Format market cap */}
                    </p>
                  </div>
                </div>
              );
            })
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div className="trending-crypto market">
        <div className="market-crypto">
          <h3 className="market-text">Market Cap</h3>
          <p>
            {currency.symbol}
            {topCoin.total_market_cap
              ? formatLargeNumber(topCoin.total_market_cap.usd)
              : ""}
          </p>
        </div>
        {/* <div className="market-crypto market change">
          <h3 className="market-text">Market Cap</h3>
          <p>
            {topCoin.market_cap_change_percentage_24h_usd
              ? Math.floor(topCoin.market_cap_change_percentage_24h_usd * 100) /
                100
              : ""}
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default TrendingCoin;
