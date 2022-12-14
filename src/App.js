import './App.css';
import Navbar from './Components/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '@fortawesome/fontawesome-free/js/all.min.js'
import { Routes , Route , useNavigate, Navigate } from "react-router-dom";
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Movies from './Components/Movies/Movies';
import TvShow from './Components/TvShow/TvShow';
import Home from './Components/Home/Home';
import MovieDetails from './Components/MovieDetails/MovieDetails';
import TvDetails from './Components/TvDetails/TvDetails';
import jwtDecode from 'jwt-decode';
import { useState, useEffect } from "react";
import AOS from 'aos'
import $ from 'jquery'
import { ApiContextFuntion } from './Context/ApiContext';
import NotFound from './Components/NotFound/NotFound';


function App() {

  $(window).scroll( function(){

    if (  $(window).scrollTop() > 200){
      $("nav").css("backgroundColor", "#131722b8");
    }
    else{
      $("nav").css("backgroundColor", "transparent");
    }

  } )


  const navgate = useNavigate();
  const [currentUser , setCurrentUser] = useState(null)

  function TestingRoute(props){

    if(localStorage.getItem("tkn") == null){
      return <Navigate to='/login' />
    }
    else{
      return props.children;
    }
  }

  function decodeToken(){
    let user = jwtDecode( localStorage.getItem("tkn") )
    setCurrentUser(user)

  }


  function clerUserData(){
    localStorage.removeItem("tkn");
    setCurrentUser(null);
    navgate('/login')
    console.log("test")
  }

  useEffect(()=>{
    if( localStorage.getItem("tkn") != null){
      decodeToken()
    }
    AOS.init()

  }, [] )


  return (
    <>
      <Navbar crrUser={currentUser} clrUser={clerUserData} />

      <ApiContextFuntion>
        <Routes>
          <Route path="rp" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="movies" title="Movie" element={ <TestingRoute> <Movies /> </TestingRoute> } />
          <Route path="tv" title="Tv Show" element={ <TestingRoute> <TvShow /> </TestingRoute> } />
          <Route path="/tvdetails" element={ <TestingRoute> <TvDetails />  </TestingRoute> } >
          <Route path=":id" element={<TvDetails />} /> </Route>

          <Route path="/moviemetails" element={ <TestingRoute> <MovieDetails /> </TestingRoute> } >
            <Route path=":id" element={ <TestingRoute> <MovieDetails /> </TestingRoute>  } /> 
          </Route>
          <Route path="login" element={<Login decodeToken={decodeToken} />} />
          <Route path="register" element={<Register />} />
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </ApiContextFuntion>
      
    </>
  );
}

export default App;
