import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useFetch from '../../../hooks/useFetch'
import Img from '../../../components/lazyLoadImage/Img'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import './style.scss'

const HeroBanner = () => {
  const [background, setBackground] = useState('')
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { url } = useSelector((state) => state.home)

  const { data, loading } = useFetch('/movie/upcoming')

  useEffect(() => {
    const bground =
      url.backdrop +
      data?.results[Math.floor(Math.random() * 20)]?.backdrop_path
    setBackground(bground)
  }, [data])

  const searchQueryHandlerForInput = (event) => {
    if (event.key === 'Enter' && query.length > 0) {
      navigate(`/search/${query}`)
    }
  }

  const searchQueryHandlerForButton = () => {
    if (query.length > 0) {
      navigate(`/search/${query}`)
    }
  }

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}

      <div className="opacity-layer"></div>

      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome</span>
          <span className="subTitle">
            Millions of movies, TV shows and people to discover. Explore now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or TV show..."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandlerForInput}
            />
            <button onClick={searchQueryHandlerForButton}>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}

export default HeroBanner
