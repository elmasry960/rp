import Axios from 'axios'
import React, { useEffect , useState } from 'react'
import {Link} from 'react-router-dom'
import AOS from 'aos'

export default function TvShow() {
  let [tvShow , getTv] = useState([]);

  async function getTrendingTv(){
    let {data} = await Axios.get("https://api.themoviedb.org/3/trending/tv/week?api_key=eba8b9a7199efdcb0ca1f96879b83c44")
    getTv(data.results)
    document.title = "Tv Show";

  }

  useEffect(()=>{
    getTrendingTv()
    AOS.init();
  },[])

  return <>

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
