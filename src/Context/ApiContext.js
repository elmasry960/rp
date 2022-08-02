import { createContext, useEffect, useState } from 'react'
import Axios from 'axios';

export const ApiContext = createContext()

export function ApiContextFuntion(props){

    let [movies , getMovies] = useState([]);
    let [tvShow , getTv] = useState([]);
    async function getTrendingMovie(){
  
      let {data} = await Axios.get("https://api.themoviedb.org/3/trending/movie/week?api_key=eba8b9a7199efdcb0ca1f96879b83c44")
      getMovies(data.results)
    }
    async function getTrendingTv(){
  
      let {data} = await Axios.get("https://api.themoviedb.org/3/trending/tv/week?api_key=eba8b9a7199efdcb0ca1f96879b83c44")
      getTv(data.results)
    }
  
    useEffect(()=>{
      getTrendingMovie()
      getTrendingTv()
      
    },[])

  return <ApiContext.Provider value={{ movies: movies , tvShow: tvShow }}>
            {props.children}
          </ApiContext.Provider>

}