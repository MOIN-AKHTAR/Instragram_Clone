import React,{useState,useEffect} from 'react';
import Post from './Components/Post';
import {db,auth} from './firebase';
import './App.css';
import { Button, makeStyles, Input,Avatar } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import UploadPost from './UploadPost';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function App() {
const [signInmode, setSignInmode] = useState(false);
const [posts, setPosts] = useState([]);
const [open, setOpen] = useState(false);
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [user, setUser] = useState(null)
const classes = useStyles();
const [modalStyle] = useState(getModalStyle);


useEffect(() => {
  // onSnapShot is a RealTime Listener Who Always Run Whenever Any Data Changes-
  // Here It Will Execute Whenever Posts Are Changes [Inserted,Modified Or Deleted]
  db.collection("posts").orderBy("timestamp","desc").onSnapshot((snapShot)=>{
    setPosts(snapShot.docs.map(doc=>({
      id:doc.id,
      post:doc.data()
    })))
});
}, []);


useEffect(() => {
  const unsubscribe=auth.onAuthStateChanged((authUser)=>{
    if(authUser){
      setUser(authUser);
    }else{
      setUser(null);
    }
  })
  return () => {
    unsubscribe();
  }
}, [user]);

const resetFields=()=>{
  setName("");
  setEmail("");
  setPassword("");
  setOpen(false)
}


const onSubmit=(e)=>{
  e.preventDefault();
  if(signInmode){
    auth.signInWithEmailAndPassword(email,password).then((user)=>{
      resetFields()
      setOpen(false);
    }).catch(err=>alert(err.message))
  }else{
    auth.createUserWithEmailAndPassword(email,password).then((newUser)=>{
      resetFields()
      return newUser.user.updateProfile({
        displayName:name
      })
    }).then(updatedUser=>setUser(updatedUser)).catch(err=>alert(err.message));
  }
}

const logOut=()=>auth.signOut();




const body = (
  <div style={modalStyle} className={classes.paper}>
  <form className={"app_signin"} noValidate autoComplete="off" onSubmit={onSubmit}>
  <center>
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTjtjBw4xwF01ZdKL1cmnYZD3vdavlQPOWA7w&usqp=CAU" alt="No Instagram"
  className="app_headerImage"
  />
  </center>
 {!signInmode&&(
  <Input 
  id="name" 
  type="text"  
  placeholder="Your Name"
  value={name}
  onChange={(e)=>setName(e.target.value)}
   />
 )}
  <Input 
  id="email"
  type="email"
  label="Standard"
  placeholder="Your Email"
  value={email}
  onChange={(e)=>setEmail(e.target.value)}
      />
  <Input
  id="password"
  type="password"
  label="Standard"
  placeholder="Your Password"
  value={password}
  onChange={(e)=>setPassword(e.target.value)}
   />
   {signInmode?<Button type="submit">Sign In</Button>:<Button type="submit">Sign Up</Button>}
</form>
  </div>
);


  return (
    <div className="app">
      <header className="app_header">
     
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTjtjBw4xwF01ZdKL1cmnYZD3vdavlQPOWA7w&usqp=CAU" 
        alt="Logo" aria-hidden 
        className="app_headerImage"
        />
        <div style={{marginBottom:"1rem"}}>
          {
            user?(<div style={{display:"flex"}}>
            <Button color="secondary" onClick={logOut}>LogOut</Button>
            <Avatar>{user.displayName.substr(0,1)}</Avatar>
              </div>):(
        <React.Fragment>
        <Button onClick={()=>{ setSignInmode(true);setOpen(true);}}  color="primary">Sign In</Button>
        <Button onClick={()=>{ setSignInmode(false);setOpen(true);}}  color="primary">Sign Up</Button>
              </React.Fragment>
            )
          }
        
        </div>
      </header>
      
      <main className="main_content" >
      {user?.displayName&&<UploadPost userName={user.displayName} email={user.email}/>}
      <Modal
        open={open}
        onClose={()=>setOpen(false)}
      >
       {body}
      </Modal>
             {
               posts.map((doc)=>(
                 <Post
                 caption={doc.post.caption}
                 imgUrl={doc.post.imageUrl}
                 userName={doc.post.userName}
                 email={doc.post.email}
                 id={doc.id}
                 key={doc.id}
                 user={user}
                 />
               ))
             }
      </main>
    </div>
  );
}

export default App;
