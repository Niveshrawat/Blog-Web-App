import React, { useContext } from 'react';
import './styles/App.css'
import './styles/Responsive.css'
import Login from './pages/Login';
import Signup from './pages/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateBlog from './pages/CreateBlog';
import Navbar from './components/Navbar';
import Search from './pages/Search';
import Profile from './pages/Profile';
import { AuthContext } from './context/AuthContext';
import Read from './pages/Read';

const App = () => {

  const currentUser = useContext(AuthContext);

  // const  = ({ children }) => {
  //   if (!currentUser) {
  //     return <Navigate to="/login" />
  //   }

  //   else {
  //     return children;
  //   }
  // }


  return (
    <>
      <BrowserRouter>
        
          {currentUser && <Navbar />}
        
        <Routes>
          <Route path="/login" element={ !currentUser ? <Login /> : <Home />} />
          <Route path="/signup" element={!currentUser ? <Signup />: <Home />} />

          <Route path="/" element={currentUser ? <Home /> : <Login />} />
          <Route path="/create-blog" element={currentUser ? <CreateBlog /> : <Login />} />
          <Route path="/search" element={currentUser ? <Search /> : <Login />} />
          <Route path="/profile/:userID" element={currentUser ? <Profile /> : <Login />} />
          <Route path='/read/:blogId' element={<Read />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;