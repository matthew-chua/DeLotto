import "./App.css";

//web 3

import { useEffect, useState } from "react";

//init smart contract 
import {loadData} from "./LoadData";
import { joinLottery } from "./joinLottery";

function App() {
  const [wid, setWID] = useState("wallet not connected");
  const [pool, setPool] = useState(0);
  const [contract, setContract] = useState()
  const [web3, setWeb3] = useState()
  
  // let contract, web3;

  const getAccount = async () => {
    //requests user to connect their metamusk
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        console.log(accounts);
        setWID(accounts[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect( async () => {
    const [contract, web3] = await loadData()
    setContract(contract);
    setWeb3(web3);

    console.log("contract", contract);
    getBalance(contract)
    getAccount();
  }, []);

  const getBalance = async (contract) => {
    let balance = await contract.methods.getBalance().call();
    console.log("balance", balance);
    setPool(balance/1000000000000000000);
  }

  const joinHandler = () => {
    console.log("JOINED!", contract);
    joinLottery(wid, contract, web3);
  }

  const winnerHandler = async () => {
    console.log("winner!", contract)
    console.log("???")
    const res = await contract.methods.pickWinnner().send({
      from: wid
    });
    console.log('res', res);
  }


  return (
    <div className="App">
      <h1>Lottery!</h1>
      <h2>Price to enter: 1 eth</h2>
      <h3>Account:</h3>
      <h3>{wid}</h3>
      <h1>Amount in Pool: {pool} eth</h1>
      <button onClick={joinHandler}>Join Lottery</button>
      <button onClick={winnerHandler}>Pick winner</button>
    </div>
  );
}

export default App;
