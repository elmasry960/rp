import React, {  useContext } from 'react'
import { Link } from 'react-router-dom'

import { ApiContext } from '../../Context/ApiContext'
import SliderHome from './../SliderHome/SliderHome';

export default function Movies() {

    const {movies} = useContext(ApiContext)


  return <>
  <SliderHome/>
  <div className='container py-5'>
    <div className='row py-5'>
      <div className='col-lg-4 col-md-6 d-flex align-items-center' data-aos="fade-right">
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
  </div>
  </>
}
