import React from 'react';
import { ethers } from 'ethers';
import { Form } from 'react-bootstrap';
import KTCAddress from '../contracts/contract-address.json';
import KartacaCoin from '../contracts/KartacaCoin.json';

// This is the component that displays the wallet address selector
function AddressSelector(props) {
  const [address, setAddress] = React.useState(props.accounts[0].address);
  const handleChange = (event) => {
    setAddress(event.target.value);
    const signer = new ethers.Wallet(
      props.accounts[event.target.value].privateKey,
      props.provider
    );
    props.setSigner(signer);
    const contract = new ethers.Contract(
      KTCAddress.Token,
      KartacaCoin.abi,
      signer
    );
    props.setContract(contract);
  };

  return (
    <React.Fragment>
      <Form.Label style={{ marginRight: '10px' }}>
        Select Wallet Address:
      </Form.Label>
      <Form.Select
        size="sm"
        style={{ maxWidth: '300px' }}
        value={address}
        onChange={handleChange}
      >
        {props.accounts.map((account, index) => {
          return (
            <option key={index} value={index}>
              {account.address}
            </option>
          );
        })}
      </Form.Select>
    </React.Fragment>
  );
}

export default AddressSelector;
