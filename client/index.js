const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');
const prompt = require('prompt-sync')();

const serverUrl = 'http://localhost:1225';
// Create Merkle Tree from Nice List
const merkleTree = new MerkleTree(niceList);
// Generate Merkle Root to hardcode in server
// console.log(`Merkle Root: ${merkleTree.getRoot()}`);

async function main() {
  // TODO: how do we prove to the server we're on the nice list?
  // Prompt user for name in console
  const name = prompt('Please enter name: ');

  // Find poisition of name provided in the Nice List
  const index = niceList.findIndex(n => n === name);

  // Construct Merkle Proof
  const merkleProof = merkleTree.getProof(index);
  
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    name,
    merkleProof,
  });

  console.log(`${name}:`,{ gift });
}

main();