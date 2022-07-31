import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import $ from 'jquery'
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Autoplay, Pagination, Navigation } from "swiper";
import  './SliderHome.css'



export default function SliderHome() {

  let [movies , getMovies] = useState([]);
  async function getTrendingMovie(){

    let {data} = await Axios.get("https://api.themoviedb.org/3/trending/movie/week?api_key=eba8b9a7199efdcb0ca1f96879b83c44")
    getMovies(data.results);
    document.title = "Movie";

  }

  console.log(movies)

  useEffect(()=>{
    getTrendingMovie();
  },[])

  return (
    <>
      <Swiper className="mySwiper" autoplay={{ delay: 2500, disableOnInteraction: false, }} modules={[Autoplay, Pagination, Navigation]}>
        {movies.map((movie, indx) => (
          <SwiperSlide
            key={indx} className="pt-5 SwiperSlide position-relative align-items-center" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,  }}>
            <div className="container slide-home d-flex h-100 align-items-center">
              <div className="row">
                <div className="col-md-4">
                  <img className="w-75" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
                </div>
                <div className="col-md-8 align-self-center">
                  <h1>{movie.original_title}</h1>
                  <p>{movie.overview}</p>
                  <Link to={`/moviemetails/${movie.id}`}>
                    <button className="btn rounded-pill btn-outline-info mt-3 px-4">
                      Watch Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="layer-slaid position-absolute top-0 end-0 bottom-0 start-0"></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
  
}

