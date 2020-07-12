import React, { useState, useEffect} from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';

function App() {

  const [busqueda, guardarBusqueda] =  useState({
    ciudad: '',
    pais: ''
})
const [ consultar, guardarConsultar] =  useState(false)
const [ resultado, guardarResultado] = useState({})
const [error, guardarError] = useState(false)
const {ciudad, pais} = busqueda

useEffect(() => {
  
  
  const consultarAPI = async () => {
    if(consultar) {
      const api =  await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=8b37bb7f4053397eb3c79b1c09ef1d9b`)
      const data = await api.json()
      guardarResultado(data)
      guardarConsultar(false)

      //detecta si hay resultado

      if(resultado.cod === "404"){
        guardarError(true)
      } else {
        guardarError(false)
      }
      
    }
  }
  consultarAPI()
  // eslint-disable-next-line
}, [consultar])



let componente;
  
  if(error) {
    componente =<Error mensaje="No hay resultados" /> 
  } else {
    componente = <Clima 
      resultado={resultado}
    />
  }


  return (
<>
<Header 
titulo='Clima react app'
/>

  <div className="contenedor-form">
    <div className="container">
      <div className="row">
        <div className="col m6 s12">
         <Formulario 
         busqueda = {busqueda}
         guardarBusqueda={guardarBusqueda}
         guardarConsultar={guardarConsultar}
         /> 
        </div>
        <div className="col m6 s12">
          <Clima resultado={resultado} />
        </div>
      </div>
    </div>
  </div>
</>
  );
}

export default App;
