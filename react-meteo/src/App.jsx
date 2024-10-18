import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import { Provider } from 'react-redux';
import store from "./store/store";
import { Route, Routes } from "react-router-dom";
import MoreInfo from "./pages/MoreInfo";
import HomePage from "./pages/HomePage";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
 

  return (
    <>
    
    <Provider store = { store }>
      
      <Routes>
      <Route path='/'element={<ErrorBoundary><HomePage/></ErrorBoundary>} /> {/*wrappando la pagina dentro l'errore, in caso di errore nel caricamento pagina mi esce l'errore in console*/}
      <Route path='/more-info/:cityname'element={<ErrorBoundary><MoreInfo/></ErrorBoundary>} /> 
      </Routes>
      </Provider>
     
    </>
  )
}

export default App
