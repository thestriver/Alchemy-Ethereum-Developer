### Patricia Merkle tries 
are used predominantly in Ethereum in order to keep track of various states by simply committing a tree root hash and keeping all of the raw data readily available off-chain (in a full node, for example). These include:

* State Root: keeps track of all account states (balances, nonce, smart contract state, etc)
* if the account is a smart contract, it then contains a second nested Patricia Merkle trie: **the storage root**, this is where all the smart contract state is stored
* Transactions Root: keeps track of all the transactions in a block, never changes
* Transactions Receipt Root: keeps track of the aftermath of all transactions, never changes

<br />

-1 ether is equal to 10^18 Wei (the smallest denomination of Ether) or 10^9 Gwei


### Further reads

- EVPM OPCODES : https://github.com/crytic/evm-opcodes
- [Smart Contracts: Building Blocks for Digital Markets (Nick Szabo)](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html)
- https://hardhat.org/tutorial/testing-contracts
- Storage layout (Storage Slots): https://docs.alchemy.com/docs/smart-contract-storage-layout