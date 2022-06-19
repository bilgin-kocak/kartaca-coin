import KTCAmounts from './KTCAmounts';
import TransferView from './TransferView';
import React from 'react';
// This is the component that will be rendered when the user is on the home page.
function Home(props) {
  return (
    <React.Fragment>
      <TransferView
        accounts={props.accounts}
        signer={props.signer}
        contract={props.contract}
        accountsTable={props.accountsTable}
      ></TransferView>
      <KTCAmounts
        accounts={props.accounts}
        contract={props.contract}
        provider={props.provider}
        accountsTable={props.accountsTable}
        setAccountsTable={props.setAccountsTable}
      ></KTCAmounts>
    </React.Fragment>
  );
}

export default Home;
