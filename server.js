var Tx = require('ethereumjs-tx').Transaction; //libraries for transaction
const Web3 = require('web3');
const web3 = new Web3('https://rinkeby.infura.io/v3/e0d123b93c0843c68b54174a00c4eab4')

const account = '0x99d015a411FaF303f53a3920aFFF75FE9ED9320A'
const privatekey = Buffer.from('process.env.PRIVATE_KEY', 'hex');

// console.log(process.env.PRIVATE_KEY)

web3.eth.getTransactionCount(account, (err, txCount) =>{
    const data = '0x608060405234801561001057600080fd5b5060405161022338038061022383398181016040528101906100329190610054565b806000819055505061009e565b60008151905061004e81610087565b92915050565b60006020828403121561006657600080fd5b60006100748482850161003f565b91505092915050565b6000819050919050565b6100908161007d565b811461009b57600080fd5b50565b610176806100ad6000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80632a1afcd91461004657806360fe47b1146100645780636d4ce63c14610080575b600080fd5b61004e61009e565b60405161005b9190610104565b60405180910390f35b61007e600480360381019061007991906100cc565b6100a4565b005b6100886100ae565b6040516100959190610104565b60405180910390f35b60005481565b8060008190555050565b60008054905090565b6000813590506100c681610129565b92915050565b6000602082840312156100de57600080fd5b60006100ec848285016100b7565b91505092915050565b6100fe8161011f565b82525050565b600060208201905061011960008301846100f5565b92915050565b6000819050919050565b6101328161011f565b811461013d57600080fd5b5056fea26469706673582212206369ebbd5bb989ac4f2abe4fe0ae8b2977824920cb9aeccf8ee8fd9029f1c2fd64736f6c63430008010033' //bytecode of smartcontract in data field
    const txObject = {  //Creating transaction object
        from: account,
        nonce: web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(1000000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('1', 'gwei')),
        data: data
    }

    const tx = new Tx(txObject, {chain: 'rinkeby'});
    tx.sign(privatekey);  //unlock account to send the transaction sign all the transactions wi private key locally

    const serializedTx = tx.serialize()
    const raw = '0x' + serializedTx.toString('hex');
    // console.log(raw);
    
    web3.eth.sendSignedTransaction(raw, (err, txHash)=>{
        console.log('txHash: ', txHash); //broadcasting the transaction
    })
})

const contractAddress = '0x39Dd1b649ff9068d2559915d7B5E39B1d85B77B5'
const contractABI = [{"inputs":[{"internalType":"uint256","name":"initVal","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"get","outputs":[{"internalType":"uint256","name":"retVal","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"storedData","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

var simpleStorageContract = new web3.eth.Contract(contractABI, contractAddress)
console.log(simpleStorageContract);