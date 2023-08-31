

import { BrowserRouter,Route,Routes } from 'react-router-dom'
import './App.css'
import Products from "./pages/Products/Products"
import PanelRecap from './pages/ProductsPanel/PanelRecap'
function App() {
 

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route  path="/"  element={ <Products/>}/>
      <Route  path="/Panel"  element={ <PanelRecap/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
