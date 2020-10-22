import React,{useState,useRef} from 'react';
import {  TextField,Button } from '@material-ui/core';
import {storage,db} from './firebase';
import firebase from 'firebase';

export default function UploadPost({userName,email}) {
         const imgRef=useRef(null);
         const [caption, setCaption] = useState("");
         const [img, setImg] = useState("");
         const [progress, setProgress] = useState(0);

    //    imgRef.current.value=null;
    const handleChange=(e)=>{
        if(e.target.files[0]){
            setImg(e.target.files[0]);
        }
    }

    const handleUpload=(e)=>{
        e.preventDefault();
        // uploadTask is a refference to cloud storage images/ImageName and img will be //// image whihc we will put on cloud storage-
        const uploadTask=storage.ref(`images/${img.name}`).put(img);
        uploadTask.on("state_changed",(snapshot)=>{
    let progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
         setProgress(progress);
        },(error)=>{
            // If Gone Wrong ....
            alert(error.message);
        },()=>{
            // If Gone Successfull-
            // We are saying go to images collection having img.name doc and download url // of this image-
            storage.ref("images").child(img.name).getDownloadURL().then((url)=>{
                 db.collection("posts").add({
                    //  Storing Server timestamp inorder to make eveything consistent
                     timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                     caption,
                     imageUrl:url, 
                     userName,
                     email
                 }).then(_=>{
                    setProgress(0);
                    setImg(null);
                    setCaption("");
                    imgRef.current.value=null;
                 }).catch(error=>alert(error.message));
            }).catch(error=>alert(error.message));
        })
    }


    
    return (
        <div className="upload">
        <form  noValidate autoComplete="off" className="upload__post" onSubmit={handleUpload}>
        <progress value={progress} max="100" />
        <TextField id="standard-basic" value={caption} label="Enter Caption" onChange={(e)=>setCaption(e.target.value)} />
        <input
              accept="image/*"
              type="file"
              ref={imgRef}
              onChange={(e)=>handleChange(e)}
            />
            <Button  color="primary" variant="contained" type="submit">Upload Post</Button>
        </form>
        </div>
    )
}
