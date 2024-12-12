import { useState } from "react"


export const QrCode = () => {

  const [img, setImg] = useState ("");
  const [loading, setLoading] = useState(false);
  const [qrcode, setQrcode] = useState("");
  const [size, setSize] = useState("")

  

  function generateQR(){
   setLoading(true);
   try{
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${qrcode}`; // ${encodeURLComponent(qrdata)}
    setImg(url);

   }catch(error) {
    console.error("Error generating QR code", error);
   } finally {
    setLoading(false)
   }
  }


  function downloadQR(){
   
    fetch(img)
    .then((response) => response.blob())
    .then((blob)=>{
      const link = document.createElement("a");
      link.href= URL.createObjectURL(blob);
      link.download="qrcode.png"
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }).catch((error) =>{
      console.error("Error downloading QR code", error)
    });
    

  }

  return ( <div className="app-container">
    <h1>QR CODE GENERATOR</h1>
        {loading &&  <p>Please wait...</p>}
       { img &&  <img className="qr-img" src={img} /> }
        <div>
        <label htmlFor="dataInput" className="input-label"  >Data for QR code:</label>
        <input type="text" id="dataInput" value={qrcode} onChange={ (e) => setQrcode (e.target.value)} placeholder="Enter data for QR code" /> <br />

        <label htmlFor="sizeInput" className="input-label">Image size (e.g., 150):</label>
        <input type="text" id="sizeInput" placeholder="Enter image size" value={size} onChange={ (e) => setSize(e.target.value)} /> <br />
<div className="btn">

        <button className="generate-button" onClick={generateQR} disabled={loading}>Generate QR Code</button>
        <button className="download-button" onClick={downloadQR}>Download QR Code</button>

</div>

    </div>
  
  </div>
   
  )
}
