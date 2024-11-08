import { useEffect, useState } from "react"
import axios from "axios"

// https://pokeapi.co/api/v2/pokemon

function App() {
  const [list, setList] = useState([])

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon").then((response) => {
      setList(response.data.results)
    })
  }, [])

  return (
    <>
      {list.map((item) => (
        <Pokemon data={item} />
      ))}
    </>
  )
}

const Pokemon = ({ data }) => {
  const [details, setDetails] = useState(null)

  useEffect(() => {
    axios.get(data.url).then((response) => {
      setDetails(response.data)
    })
  }, [])

  if (details === null) {
    return <div>Oops</div>
  }

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span>
        <img
          src={details.sprites.front_default}
          alt="Imagem pokemon"
          style={{ width: 40, marginRight: 20 }}
        />
      </span>
      <span>
        <b>{details.name}</b> - EXP {details.base_experience}
      </span>
    </div>
  )
}

export default App
