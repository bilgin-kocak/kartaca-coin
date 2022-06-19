import { Table, Container } from 'react-bootstrap';
import KTCAmountRow from './KTCAmountRow';

// This is the component that will be rendered when the user is on the home page.
function KTCAmounts(props) {
  return (
    <Container>
      <p>After approximately 1 second you will see the transfer below.</p>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Wallet Address</th>
            <th>ETH Amount</th>
            <th>KTC Amount</th>
          </tr>
        </thead>
        <tbody>
          {props.accountsTable.map((account, index) => (
            <KTCAmountRow
              key={index}
              walletAddress={account.address}
              eth={account.balance}
              ktc={account.ktcBalance}
              index={index + 1}
            />
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default KTCAmounts;
