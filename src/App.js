import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [amount, setAmount] = useState();
  const [result, setResult] = useState();
  const onChange = (event) => {
    setAmount(event.target.value);
  };
  const selectCoin = (event) => {
    setResult(event.target.value);
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
        <input
          value={amount}
          onChange={onChange}
          placeholder="Enter the amount"
        />
        <div>
          {coins.symbol ? coins.symbol : "Coin"}: {amount / result}{" "}
        </div>
      </div>
    </div>
  );
}

export default App;
