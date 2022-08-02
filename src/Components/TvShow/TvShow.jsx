import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { ApiContext } from '../../Context/ApiContext'
import SliderTv from '../SliderHome/SliderTv'
import { NavLink } from 'react-router-dom';

export default function TvShow() {

  const {tvShow} = useContext(ApiContext)

  return <>
  <SliderTv />
  <div className='container py-5'>
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
  </>
}
