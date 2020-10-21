import React from 'react';
import Post from './Components/Post'
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app_header">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTjtjBw4xwF01ZdKL1cmnYZD3vdavlQPOWA7w&usqp=CAU" 
        alt="Logo" aria-hidden 
        className="app_headerImage"
        />
      </header>
      <main className="main_content" >
             <Post
             userName="Anas Hussain"
             imgUrl="https://wl-brightside.cf.tsp.li/resize/728x/jpg/7f3/beb/b533a65889b024e800b6a13fd6.jpg"
             caption="Woow beautiful tiger"
             />
             <Post
             userName="Tabish Rafique"
             imgUrl="https://i.pinimg.com/originals/ce/66/db/ce66dbc81d606ff0771d98799f73d515.jpg"
             caption="What a beauty!!!"
             />
             <Post
             userName="Alishba Saad"
             imgUrl="https://i.pinimg.com/originals/05/fc/73/05fc73fe482836c7558ede7c4d9c6d25.jpg"
             caption="Nature is a beauty just look carefully!!!"
             />
      </main>
      <footer>

      </footer>
    </div>
  );
}

export default App;
