import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Autoplay, Pagination, Navigation } from "swiper";
import  './SliderHome.css'



export default function SliderTv() {

  let [tv , getTv] = useState([]);
  async function getTrendingMovie(){

    let {data} = await Axios.get("https://api.themoviedb.org/3/trending/tv/week?api_key=eba8b9a7199efdcb0ca1f96879b83c44")
    getTv(data.results);
    document.title = "Movie";

    console.log(data)

  }



  console.log(tv)

  useEffect(()=>{
    getTrendingMovie();
  },[])

  return (
    <>
      <Swiper className="mySwiper" autoplay={{ delay: 2500, disableOnInteraction: false, }} modules={[Autoplay, Pagination, Navigation]}>
        {tv.map((tv, indx) => (
          <SwiperSlide
            key={indx} className="pt-5 SwiperSlide position-relative align-items-center" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${tv.backdrop_path})`,  }}>
            <div className="container slide-home d-flex h-100 align-items-center">
              <div className="row">
                <div className="col-md-4">
                  <img className="w-75" src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`} />
                </div>
                <div className="col-md-8 align-self-center">
                  <h1>{tv.original_name}</h1>
                  <p>{tv.overview}</p>
                  <Link to={`/tvdetails/${tv.id}`}>
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

