import { useState } from "react";
import { storage } from "./Firebase";
import { ref, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";

function App() {
  const [getPhoto, setGetPhoto] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleUploadProgress = (snapshot) => {
    const progress = Math.round(
      (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    );
    setUploadProgress(progress);
  };

  const Uploadphoto = () => {
    if (getPhoto == null) return;

    let PhotoV4 = v4();
    const photoRef = ref(storage, `images/${PhotoV4}`);
    const uploadTask = uploadBytesResumable(photoRef, getPhoto);

    uploadTask.on("state_changed", handleUploadProgress);

    uploadTask
      .then(() => {
        alert("Image Uploaded! UUID: " + PhotoV4);
        setUploadProgress(0);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <h1>Hello Users</h1>
      <hr />

      <div>
        <label>
          <span>Select Image: </span>
          <input type="file" onChange={(e) => setGetPhoto(e.target.files[0])} />
        </label>
        <label>
          <button onClick={Uploadphoto}>Send Photo</button>
        </label>
        <div style={uploadProgress > 0 ? {display: "block"} : {display: "none"}}>{uploadProgress}% uploaded</div>
      </div>
    </>
  );
}

export default App;
