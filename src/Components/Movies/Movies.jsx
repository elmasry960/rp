import Axios from 'axios'
import React, { useEffect , useState } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'

export default function Movies() {
    let [movies , getMovies] = useState([]);
  async function getTrendingMovie(){

    let {data} = await Axios.get("https://api.themoviedb.org/3/trending/movie/week?api_key=eba8b9a7199efdcb0ca1f96879b83c44")
    getMovies(data.results);
    document.title = "Movie";

  }

  useEffect(()=>{
    getTrendingMovie();
    AOS.init();
  },[])

  return <>

  <div className='container py-5'>
    <div className='row py-5'>
      <div className='col-md-4 d-flex align-items-center' data-aos="fade-right">
          <div className='title position-relative'>
          <h2 className='text-white fs-1'>Trending <br/>Movies<br />to Watch now</h2>
          <p className='text-muted fs-5 mt-2'>Most Watched Movies by Days</p>
        </div>
      </div>
      {movies.map((movie , indx)=> <div key={indx} className='col-md-2 mb-3' data-aos="fade-up"
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
