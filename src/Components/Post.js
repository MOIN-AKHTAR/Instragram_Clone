import React,{useState,useEffect} from 'react';
import {Avatar,Button,TextField} from '@material-ui/core';
import {db} from '../firebase';
import firebase from 'firebase';

export default function Post({id,userName,imgUrl,caption,user,email}) {
       const [comment, setComment] = useState("");
       const [comments, setComments] = useState([]);

useEffect(() => {
let unsubscribe=db.collection("posts").doc(id).collection("comments").orderBy("timestamp","asc").onSnapshot(snapShot=>{
            setComments(snapShot.docs.map(comment=>({
                   id:comment.id,
                   ...comment.data()
               })))
           });
           return ()=>unsubscribe();
       }, [id]);


       const addComment=(e)=>{
           e.preventDefault();
           if(comment.trim().length>0){
            db.collection("posts").doc(id).collection("comments").add({
                timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                comment,
                userName:user.displayName,
                email:user.email
            }).then(_=>{
                setComment("")
            }).catch(err=>alert(err.message));
           }
       }

       const deleteComment=(commentId)=>(
        db.collection("posts").doc(id).collection("comments").doc(commentId).delete()
       );

       const deletePost=()=>db.collection("posts").doc(id).delete();

    return (
        <div className="post">
            <div className="post__header" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
            <Avatar  
            aria-hidden
            className="post__avatar"
            >{userName.substr(0,1)}</Avatar>
            <h4>{userName}</h4>
            </div>
            {email&&user?.email==email&&<Button onClick={deletePost} color="secondary">Delete</Button>}
            </div>
            <img src={imgUrl} alt="Image" 
            aria-hidden
            className="post__image"
            />
            <h4 className="post__text"><strong>{userName}</strong> {caption}</h4>
            {
                comments.map(({id,userName,comment,email})=>(
                    <div key={id} className="user_comment">
                    <p><strong>{userName}</strong> {comment}</p>
                    {user?.email===email&&<Button color="secondary" onClick={(e)=>deleteComment(id)}>Delete</Button>}
                    </div>
                ))
            }
            {
                user&&<form noValidate autoComplete="off" className="comment_section" onSubmit={addComment}>
            <TextField id="standard-basic" label="Add a comment..."  onChange={(e)=>{setComment(e.target.value)}} value={comment}/>
            <Button color="primary" type="submit">Post</Button>
           </form>
            }
        </div>
    )
}
