import { useEffect, useState } from "react";
import "./App.css";
import {
  CheckIsValidAddress,
  WsSubscribe,
  WsUnsubscribe,
  getAdressBalance,
} from "./InfoRequests";

const App: React.FC = () => {
  const [blockNumber, setBlockNumber] = useState("");
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAddress(e.target.value);
  }
  function handleBlockNumUpdate(num: number) {
    setBlockNumber(num.toString());
  }
  async function handleSubmit() {
    if (!CheckIsValidAddress(address)) {
      alert("Invalid address");
      return;
    }
    const balance = await getAdressBalance(address);
    setBalance(balance);
  }

  useEffect(() => {
    WsSubscribe(handleBlockNumUpdate);

    return () => {
      WsUnsubscribe(handleBlockNumUpdate);
    };
  }, []);

  return (
    <div className="App">
      <div className="header">
        <h1 className="title-main">Ethereum block explorer</h1>
        <p className="block-info">Latest block: {blockNumber}</p>
      </div>
      <div className="content">
        <div className="inputs">
          <input
            type="text"
            className="address-input"
            placeholder="Ethereum address"
            value={address}
            onChange={handleChange}
          ></input>
          <div className="find-btn" onClick={handleSubmit}>
            Search
          </div>
        </div>
        {balance != "" && <p style={{justifySelf: "center"}}>Balance: {balance} eth</p>}
      </div>
    </div>
  );
};

export default App;
