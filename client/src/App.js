import logo from './logo.svg';
import './App.css';

import { useState } from "react";
import { ethers } from "ethers";
import SupplyChain from "./artifacts/contracts/SupplyChain.sol/Supplychain.json";
import DisplayWorkers from './components/DisplayWorkers.js';

function App() {
  const [data, setData] = useState();

  const ContractAddress = "0x827B90aA5e49d93025953E21e7a7227a091De69e" //"0xFa56954976bA7d616945c09A7e360499e7038d98";

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function getWorker() {
    if (typeof window.ethereum !== "undefined") {
      requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      console.log(await signer.getAddress())

      const contract = new ethers.Contract(
        ContractAddress,
        SupplyChain.abi,
        provider
      );
      try {
        const Wdata = await contract.getWorkerssList();
        console.log("data: ", Wdata);
        //console.log(contract);
        setData(Wdata);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }



  return (
    <div className="App">

      <button onClick={getWorker}> GETWORKERS </button>
      <DisplayWorkers workersList={data} />

    </div>
  );
}

export default App;