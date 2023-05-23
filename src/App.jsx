import { useState, useEffect } from 'react'
import { fetchDataFromApi } from './utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration } from './store/homeSlice'

function App() {
  const { url } = useSelector((state) => state.home)
  const dispatch = useDispatch()

  useEffect(() => {
    apiTest()
  }, [])

  const apiTest = () => {
    fetchDataFromApi('/movie/popular').then((response) => {
      console.log(response)
      dispatch(getApiConfiguration(response))
    })
  }

  return <div className="App">App {url?.total_pages}</div>
}

export default App
