 
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 
import MetaMask from "./services/MetaMask"; 
import { create } from 'ipfs-http-client'
 
import React, { useEffect, useState } from 'react';
const projectId = process.env.REACT_APP_PROJECT_ID;
const projectSecret = process.env.REACT_APP_SECRET_KEY;
const urlIPFS = process.env.REACT_APP_URL_IPFS
 
const auth = "Basic " + btoa(projectId + ":" + projectSecret);
// dedicated gateway
const client = create({
    host: process.env.REACT_APP_UPLOAD_URL,
    port: 5001,
    protocol: "https",
    headers: {
        authorization: auth,
    },
});
function App() {
  const [fileUrl, setFileUrl ]= useState(null)
  const [account, setAccount] = useState(null)
  const [formInput, updateFormInput] = useState({
    price:'',
    name:'',
    description:''
  })
  async function onChange(e) {
    const file = e.target.files[0]
    try {
       await client
      .add(file, {
          progress: (size) => {
             
              console.log(`received: ${size}`);
          },
      })
      .then(async (response) => {
          const { path } = response;

          const url = urlIPFS+path
          setFileUrl(url)
          console.log(46, url)
        
      })
       
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    (async () => {
      try {
        const metaMaskInstance = new MetaMask();
        const result = await metaMaskInstance.initialize();
        console.log('initialize MetaMask Class', result);
        setAccount(result.currentAddress)
      } catch (error) {
        console.log('Error', error);
      }
    })();
  }, []);
  const handleMintNFT = async (e) => {
    console.log(68)
    e.preventDefault();
    
    const {name, description, nric} = formInput
    console.log(72, account, name, description, nric)
    if(!name || !description|| !fileUrl || !nric) return
    
  
  
    const data = JSON.stringify({
      name, description, image: fileUrl
    })
    console.log(84, data, typeof data)
    const jsonObject = JSON.parse(data);
   
    console.log(75, jsonObject, typeof jsonObject)
    try {
      const added = await client.add(JSON.stringify(jsonObject)) 
         
      
          console.log(97, added)
          const urlMetadata = urlIPFS+added.path
       
          console.log(89, urlMetadata)
     
      
    } catch (error) {
        console.error(error)
    }

   
    console.log("Minting NFT...");
  };

  return (
    <div className="App">
      <header className="App-header">
        
       <form onSubmit={handleMintNFT}>
          <div className="mb-3">
            <input className="form-control" type="file" onChange={e=>onChange(e)}/>
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name:</label>
            <input type="text" 
            
              className="form-control" id="name" name="name" 
              onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description:</label>
            <textarea className="form-control" id="description" name="description" 
              onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="nric" className="form-label">NRIC:</label>
            <input type="text" className="form-control" id="nric" name="nric" 
              onChange={e => updateFormInput({ ...formInput, nric: e.target.value })}
            />
          </div>      

          <button type='submit' className="btn btn-success">
            Mint NFT
          </button>
      </form>
      </header>
    </div>
  );
}

export default App;
