import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [usd, setUsd] = useState();
  const [price, setPrice] = useState();
  const onChange = (event) => {
    setUsd(event.target.value);
  };
  const selectCoin = (event) => {
    setPrice(event.target.value);
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => setCoins(json));
    setLoading(false);
  }, []);
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>

      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={selectCoin}>
          {coins.map((coin, index) => (
            <option
              key={index}
              value={coin.quotes.USD.price}
              id={coin.symbol}
              symbol={coin.symbol}
            >
              {coin.name} ({coin.symbol}) : {coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      <div>
        USD:{" "}
        <input value={usd} onChange={onChange} placeholder="Enter the USD" />
        <div>
          {coins.symbol ? coins.symbol : "Coin"}: {usd / price}{" "}
        </div>
      </div>
    </div>
  );
}

export default App;
