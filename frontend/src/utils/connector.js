import { ethers } from 'ethers';
// Get the list of accounts from the mnemonic
const getAccountsFromMnemonic = () => {
  const hdNode = ethers.utils.HDNode.fromMnemonic(
    'history health sick current drastic fatal horse medal venture spatial hold gate'
  );
  let accounts = [];
  for (let i = 0; i < 10; i++) {
    accounts.push(hdNode.derivePath(`m/44'/60'/0'/0/${i}`));
  }
  return accounts;
};
// Create initial signer
const initialSigner = (account, provider) => {
  const signer = new ethers.Wallet(account.privateKey, provider);
  return signer;
};
// Obtain the balances of all accounts
const getBalances = async (accounts, provider, contract, setAccounts) => {
  let balancePromises = accounts.map((account) =>
    provider.getBalance(account.address)
  );
  let balances = await Promise.all(balancePromises);
  balances = balances.map((balance) => ethers.utils.formatEther(balance));
  let ktcPromises = accounts.map((account) =>
    contract.balanceOf(account.address)
  );
  let ktcBalances = await Promise.all(ktcPromises);
  ktcBalances = ktcBalances.map((balance) => ethers.utils.formatEther(balance));
  for (let i = 0; i < accounts.length; i++) {
    accounts[i].balance = balances[i];
    accounts[i].ktcBalance = ktcBalances[i];
  }
  setAccounts([...accounts]);
  return accounts;
};

export { getBalances, getAccountsFromMnemonic, initialSigner };
