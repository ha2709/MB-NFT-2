const fs = require('fs');
const MBNFT = artifacts.require("MBNFT");

module.exports = async function (deployer) {
  await deployer.deploy(MBNFT,"", "");
  const MBNFTContract = await MBNFT.deployed()
};



// let config = `

// [
//   {
//     "token": "${tokenAddress}" ,
//     "name": "Collection 1"

//     }
// ]
//  `;

// let data = JSON.stringify(config);
// fs.writeFileSync('data.json', JSON.parse(data));
// console.log(35, data)