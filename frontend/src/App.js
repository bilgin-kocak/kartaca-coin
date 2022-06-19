import './App.css';
import { useState, useEffect } from 'react';
import NavBarComponent from './components/NavBarComponent';
import { Route, Routes } from 'react-router';
import { ethers } from 'ethers';
import Home from './components/Home';
import { getAccountsFromMnemonic, initialSigner } from './utils/connector';
import KTCAddress from './contracts/contract-address.json';
import KartacaCoin from './contracts/KartacaCoin.json';
import { getBalances } from './utils/connector';

// Once a Ganache node is running, it behaves very similar to a
// JSON-RPC API node.
const url = 'http://localhost:8545';
// Or if you are running the UI version, use this instead:
// const url = "http://localhost:7545"

const provider = new ethers.providers.JsonRpcProvider(url);

function App() {
  const [accountsTable, setAccountsTable] = useState([]);
  // Get the list of accounts from the mnemonic
  const accounts = getAccountsFromMnemonic().map((account) => ({
    address: account.address,
    privateKey: account.privateKey,
  }));
  const [signer, setSigner] = useState(initialSigner(accounts[0], provider));
  // Create a new contract instance that we can interact with
  const [contract, setContract] = useState(
    new ethers.Contract(KTCAddress.Token, KartacaCoin.abi, signer)
  );

  useEffect(() => {
    // Listen ganache new block created event to syncronize our ETH and KTC balances
    provider.on('Block', async (blockNumber) => {
      console.log(blockNumber);
      const accountsTable = await getBalances(
        accounts,
        provider,
        contract,
        setAccountsTable
      );
    });
    return () => {
      provider.removeAllListeners();
    };
  }, []);

  return (
    <div className="App">
      <NavBarComponent
        accounts={accounts}
        setSigner={setSigner}
        provider={provider}
        setContract={setContract}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              accounts={accounts}
              contract={contract}
              provider={provider}
              signer={signer}
              accountsTable={accountsTable}
              setAccountsTable={setAccountsTable}
            />
          }
        />

        <Route
          path="*"
          element={<h2 style={{ padding: '10px' }}>Page not found.</h2>}
        />
      </Routes>
    </div>
  );
}

export default App;
