import React, { useState, useEffect} from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';

function App() {

  const [busqueda, guardarBusqueda] =  useState({
    ciudad: '',
    pais: ''
})
const [ consultar, guardarConsultar] =  useState(false)

const {ciudad, pais} = busqueda

useEffect(() => {
  
  
  const consultarAPI = async () => {
    if(consultar) {
      const api =  await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=8b37bb7f4053397eb3c79b1c09ef1d9b`)
      const data = await api.json()
      console.log(data.weather)
    }
  }
  consultarAPI()
}, [consultar])



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
          2
        </div>
      </div>
    </div>
  </div>
</>
  );
}

export default App;
