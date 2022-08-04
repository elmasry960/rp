import axios from 'axios'
import React, { useEffect , useState } from 'react'
import {useParams} from 'react-router-dom'
import $ from 'jquery'
import './MovieDetails.css'

export default function MovieDetails() {

  let {id} = useParams()
  const paseImg = "https://image.tmdb.org/t/p/original/";
  const[trailer , setTrailer] = useState([]) 
  const [movieDetails , setMovieDetails] = useState({});

// Git Details Movie
  async function getMovieDetails(){
    let {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US`)
    setMovieDetails(data);
  }


  // Git ID Trailer
  async function getTrailer(){
    let { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US`);
      setTrailer(data); 
    }

    function openTrailer(){
      $(".layerTrailer").fadeToggle()(500);
      $(".layerTrailer").fadeToggle()(500);
    }

  useEffect(() => {
    getTrailer();
    getMovieDetails();
  }, []);

  
  return (
    <>
      <div
        className="container-fluid movieDetails"
        style={{
          backgroundImage: `url(${paseImg + movieDetails.backdrop_path})`,
        }}
      >
        <div className="container py-5">
          <div
            className="row">
            <div className="col-md-4">
              <figure>
                <img data-aos="fade-right" data-aos-duration="800" data-aos-easing="ease-in" className="w-100" src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}/>
              </figure>
            </div>
            <div className="col-md-8 mt-5">
              <div className="item text-white">
                <h2 data-aos="fade-down" data-aos-duration="800" data-aos-easing="ease-in" > {movieDetails.original_title} </h2>
                <h4 data-aos="fade-down" data-aos-duration="700" data-aos-easing="ease-in" > {movieDetails.tagline} </h4>
                <div className="mt-3">
                  {movieDetails.genres?.map((genre, idx) => (
                    <span data-aos="fade-down" data-aos-duration="10s00" data-aos-easing="ease-in" className="p-1 ms-2"  key={idx} > {genre.name}{" "}</span>))}
                </div>
                <div className="py-3 px-2">
                  <p data-aos="fade-right" data-aos-duration="400" data-aos-easing="ease-in" >
                    Vota: {movieDetails.vote_average}
                  </p>
                  <p data-aos="fade-right" data-aos-duration="500" data-aos-easing="ease-in" >
                    Vota Count: {movieDetails.vote_count}
                  </p>
                  <p data-aos="fade-right" data-aos-duration="500" data-aos-easing="ease-in" > Popularity: {movieDetails.popularity} </p>
                  <p data-aos="fade-right" data-aos-duration="600" data-aos-easing="ease-in" > Release Date: {movieDetails.release_date} </p>
                </div>
                <p data-aos="fade-up" data-aos-duration="1200" data-aos-easing="ease-in" > {movieDetails.overview} </p>
                <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered modal-dialog modal-xl">
                  <div class="modal-content modal-dialog modal-xl">
                    <div class="modal-header">
                      <button type="button" class="btn-close fa-2x text-white" data-bs-dismiss="modal" aria-label="Close">
                        <i class="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                    <div class="modal-body m-auto">
                      <iframe width="900" height="500" src={`https://www.youtube.com/embed/${ trailer.results == undefined ? "" : trailer.results[0].key}?controls=1&rel=0&showinfo=0&color=white`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                    </div>
                  </div>
                </div>
                </div>
              <a class="btn btn-outline-info" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Watch Trailer</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}