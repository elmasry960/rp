import React, { useContext, useEffect , useState } from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'
import SliderHome from '../SliderHome/SliderHome';
import { ApiContext } from '../../Context/ApiContext';



export default function Home() {

  const {movies , tvShow} = useContext(ApiContext);

  return <>
  <SliderHome />

  {movies.length > 0 && tvShow.length > 0?<>
      <div className='container py-5'>
    <div className='row py-5'>
      <div className='col-lg-4 col-md-5 d-flex align-items-center' data-aos="fade-right">
        <div className='title position-relative'>
          <h2 className='text-white fs-1'>Trending <br/>Movies<br />to Watch now</h2>
          <p className='text-muted fs-5 mt-2'>Most Watched Movies by Days</p>
        </div>
      </div>
      
    {movies.map((movie , indx)=> <div key={indx} className='col-lg-2 col-md-3 col-sm-6 mb-3' data-aos="fade-up"
       data-aos-duration="3000">
          <Link className='text-decoration-none' to={`/moviemetails/${movie.id}`}>
        <div className='item'>
          <figure>
            <img className='w-100' src={"https://image.tmdb.org/t/p/w500/"+movie.poster_path} />
          </figure>
          <h4>{movie.title}</h4>
        </div>
        </Link>
      </div>)}
    </div>

    <div className='row py-5'>
      <div className='col-md-4 d-flex align-items-center' data-aos="fade-right">
        <div className='title position-relative'>
          <h2 className='text-white fs-1'>Trending <br/>Tv<br />to Watch now</h2>
          <p className='text-muted fs-5 mt-2'>Most Watched Tv by Days</p>
        </div>
      </div>
      {tvShow.map((tv , indx)=> <div key={indx} className='col-md-2 mb-3' data-aos="fade-up"
     data-aos-duration="3000">
        <Link className='text-decoration-none' to={`/tvdetails/${tv.id}`}>
          <div className='item'>
          <figure>
            <img className='w-100' src={"https://image.tmdb.org/t/p/w500/"+tv.poster_path} />
          </figure>
          <h4>{tv.name}</h4>
        </div>
        </Link>
      </div>)}
    </div>
  </div>
    </>: <div className='vh-100 d-flex justify-content-center align-items-center'>
        <i className='fa-solid fa-spinner fa-spin text-white fa-5x '></i>
      </div>}


  

  
  
  
  </>
}
