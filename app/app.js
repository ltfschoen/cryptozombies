const Web3 = require('web3');
const fs = require('fs');

const web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
// Configure sender account
web3.eth.defaultAccount = web3.eth.accounts[0];
console.log(`Web3.js version: ${web3.version.api}`);
console.log(`Platform details: ${web3.version.node}`);
console.log("Press CTRL+C to exit");
// Access contract
const zombieFactoryContractCompiledJSON = JSON.parse(fs.readFileSync('build/contracts/ZombieFactory.json', 'utf8'));
// ABI generated by the compiler
const contractABI = zombieFactoryContractCompiledJSON["abi"];
// Contract address on Ethereum after deploying
const contractAddress = zombieFactoryContractCompiledJSON["networks"]["1000"]["address"];
const zombieFactoryContract = web3.eth.contract(contractABI);
// Instance with access to public functions and events of the contract
const zombieFactoryInstance = zombieFactoryContract.at(contractAddress);
// User input
const name = "luke";
// Call the contract createRandomZombie function
zombieFactoryInstance.createRandomZombie(name);

// Event listener for the NewZombie event. Update the UI
const event = zombieFactoryInstance.NewZombie((error, result) => {
  if (error) return;
  zombie = generateZombie(result.zombieId, result.name, result.dna);
  console.log("Created Zombie:\n", JSON.stringify(zombie, null, 2));
  return zombie;
})

// Update image with Zombie DNA
function generateZombie(id, name, dna) {
  let dnaStr = String(dna);
  // Pad the DNA with leading zeroes if less than 16 characters
  while (dnaStr.length < 16) {
    dnaStr = "0" + dnaStr;
  }
  let zombieDetails = {
    // First 2 digits comprise the head. 
    // Given 7 possible heads so take modulus 7 to get a number 0 - 6
    // Add 1 so result is in the range 1 - 7. 
    // Use the number to load 7 image files named "head1.png" through "head7.png"
    headChoice: dnaStr.substring(0, 2) % 7 + 1,
    // Second 2 digits comprise the eyes where there are 11 variations
    eyeChoice: dnaStr.substring(2, 4) % 11 + 1,
    // As above for shirts with 6 variations
    shirtChoice: dnaStr.substring(4, 6) % 6 + 1,
    // Last 6 digits control color. Updated using CSS filter: hue-rotate
    // that has 360 degrees:
    skinColorChoice: parseInt(dnaStr.substring(6, 8) / 100 * 360),
    eyeColorChoice: parseInt(dnaStr.substring(8, 10) / 100 * 360),
    clothesColorChoice: parseInt(dnaStr.substring(10, 12) / 100 * 360),
    zombieName: name,
    zombieDescription: "Level 1 CryptoZombie"
  }
  return zombieDetails;
}
