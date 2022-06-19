import React, { useEffect } from 'react';
import { Form, Container, Button, Row, Col } from 'react-bootstrap';
import { ethers } from 'ethers';

function TransferView(props) {
  const sendAccounts = props.accounts.filter(
    (account) => account.address !== props.signer.address
  );
  const [toAddress, setToAddress] = React.useState(sendAccounts[0].address);
  const [sendAmount, setSendAmount] = React.useState('');

  useEffect(() => {
    // toAddress should be diffrent from the signer address
    if (toAddress === props.signer.address) {
      const sendAccounts = props.accounts.filter(
        (account) => account.address !== props.signer.address
      );
      setToAddress(sendAccounts[0].address);
    }
  }, [props.signer]);

  // Send the KTC to the selected address
  const handleSend = async () => {
    console.log('send', toAddress);
    try {
      const sendAmountBN = ethers.utils.parseEther(sendAmount);
      const sender = props.accountsTable.find(
        (account) => account.address === props.signer.address
      );
      const senderBalance = sender.ktcBalance;

      // If send amount is greater than 0 and less than balance, set send amount
      if (
        sendAmountBN.lte(ethers.utils.parseEther(senderBalance)) &&
        ethers.utils.parseEther(sendAmount).gt(0)
      ) {
        const tx = await props.contract.transfer(
          toAddress,
          ethers.utils.parseEther(sendAmount.toString())
        );
        console.log(tx);
      } else {
        alert(
          'Invalid amount: Amount should be greater zero and less than balance of your account!'
        );
      }
    } catch (e) {
      console.log(e);
      alert('Invalid amount');
    }
  };

  const handleSendAmount = (e) => {
    setSendAmount(e.target.value);
  };

  return (
    <React.Fragment>
      <h2>Transfer KTC Token to Other Address</h2>
      <Container>
        <Form>
          <Form.Group className="mb-3">
            <Row>
              <Col>
                <Form.Label>KTC Amount</Form.Label>
                <Form.Control
                  as="input"
                  type="number"
                  step="0.01"
                  placeholder="1 (KTC Amount)"
                  size="sm"
                  value={sendAmount}
                  onChange={handleSendAmount}
                  //   style={{ maxWidth: '300px' }}
                />
              </Col>
              <Col>
                <Form.Label>To</Form.Label>
                <Form.Select
                  size="sm"
                  //   style={{ maxWidth: '300px' }}
                  value={toAddress}
                  onChange={(e) => setToAddress(e.target.value)}
                >
                  {sendAccounts.map((account, index) => (
                    <option key={index} value={account.address}>
                      {account.address}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </Form.Group>
        </Form>
        <Button variant="primary" type="submit" onClick={handleSend}>
          Send
        </Button>
      </Container>
      <br />
      <br />
    </React.Fragment>
  );
}

export default TransferView;
