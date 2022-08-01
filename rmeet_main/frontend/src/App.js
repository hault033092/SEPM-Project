import React from "react"
import styled from "styled-components"
import NavBar from "./components/NavBar"
import Pages from "./pages/Pages"


const App = () => {
  return (
    <div className='App'>
      <AppContainer>
      <NavBar />
      <Pages />
      </AppContainer>
    </div>
  )
}

const AppContainer = styled.div`
  height: 100%;
  display: flex;
`

export default App
