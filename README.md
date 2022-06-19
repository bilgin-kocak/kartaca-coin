# KartacaCoin Project

This project demonstrates a basic ERC20 token deployment and transfers between accounts.

Try running some of the following tasks:

## Installation

To install run the following commands.

```shell
npm install -g ganache
npm install
cd frontend
npm install
```

## Quick Start

To start application run the following commands.

Compile the KartacaCoin smart contract

```shell
npm run compile
```

Run tests for smart contracts.

```shell
npm run test
```

Test result are shown below.

![image](https://user-images.githubusercontent.com/30844607/174490127-a9cb7ee6-d265-43e6-974a-7238a66deeb9.png)

Start the ganache localhost EVM backend. Do not close this terminal.

```shell
npm run start-ganache
```

Now we can deploy the smart contract to ganache. Open a new terminal and run the following.

```shell
npm run deploy
```

Now everything is ready. We can start the frontend by the following commands.

```shell
cd frontend
npm start
```

You can transfer the KTC to other ganache accounts. You can change wallet address and recevier address. You can determine the sender KTC amounts. You can play with the app. Also you can see the new created blocks in ganache terminal.

![image](https://user-images.githubusercontent.com/30844607/174490358-f64d56ff-26d6-4c70-b9e9-26f9b879a21a.png)
