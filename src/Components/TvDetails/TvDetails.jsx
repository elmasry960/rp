import axios from 'axios'
import React, { useEffect , useState } from 'react'
import {useParams} from 'react-router-dom'

export default function TvDetails() {

  let paseImg = "https://image.tmdb.org/t/p/original/";
  let {id} = useParams()
  const [tvDetails , setTvDetails] = useState({});

  async function getMovieDetails(){

    let {data} = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US`)

    setTvDetails(data);

  }

  useEffect( ()=>{
    getMovieDetails()

  }, [] )


  return (
    <>
      <div
        className="container-fluid movieDetails"
        style={{
          backgroundImage: `url(${paseImg + tvDetails.backdrop_path})`,
        }}
      >
        <div className="container mt-3 text-white">
          <div className="row">
            <div className="col-md-4">
              <figure>
                <img
                  className="w-100"
                  src={`https://image.tmdb.org/t/p/w500/${tvDetails.poster_path}`}
                />
              </figure>
            </div>
            <div className="col-md-8 mt-5">
              <div className="item">
                <h2
                  data-aos="fade-down"
                  data-aos-duration="2000"
                  data-aos-easing="ease-in"
                >
                  {tvDetails.name}
                </h2>
                <h4
                  data-aos="fade-down"
                  data-aos-duration="1500"
                  data-aos-easing="ease-in"
                  className="pt-1"
                >
                  {tvDetails.tagline}
                </h4>
                <div className="mt-3">
                  {tvDetails.genres?.map((genre, idx) => (
                    <span
                      data-aos="fade-down"
                      data-aos-duration="1300"
                      data-aos-easing="ease-in"
                      className="bg-info text-white p-1 ms-2"
                      key={idx}
                    >
                      {genre.name}{" "}
                    </span>
                  ))}
                </div>
                <div className="py-5 px-2">
                  <p
                    data-aos="fade-right"
                    data-aos-duration="400"
                    data-aos-easing="ease-in"
                  >
                    Vota: {tvDetails.vote_average}
                  </p>
                  <p
                    data-aos="fade-right"
                    data-aos-duration="400"
                    data-aos-easing="ease-in"
                  >
                    Vota Count: {tvDetails.vote_count}
                  </p>
                  <p
                    data-aos="fade-right"
                    data-aos-duration="400"
                    data-aos-easing="ease-in"
                  >
                    Popularity: {tvDetails.popularity}
                  </p>
                  <p
                    data-aos="fade-right"
                    data-aos-duration="400"
                    data-aos-easing="ease-in"
                  >
                    Release Date: {tvDetails.release_date}
                  </p>
                </div>
                <p
                  data-aos="fade-up"
                  data-aos-duration="1200"
                  data-aos-easing="ease-in"
                >
                  {tvDetails.overview}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  
}
