
import './App.css';
import Formulario from './components/formulario';
import Viewlist from './components/viewlist';
import { useState,useEffect } from "react";
import axios from "axios";
function App() {
  const [datos,setDatos]=useState([]);
  const [dataSelect,setDataSelect]=useState([]);
  const [stateData,setStateData]=useState(false);


     
  useEffect(() => {

    axios.get('https://products-crud.academlo.tech/products/')
    .then((res) => sendData(res.data))
    .catch(error => console.log(error));

    return
  }, []);

  const sendData=(data)=>{
    setDatos(data);
  }
  const getData=()=>{
     axios.get('https://products-crud.academlo.tech/products/')
     .then((res) => setDatos(res.data))
     .catch(error => console.log(error));
     }
  const deleteData=(dato)=>{
     console.log("AQUI ESTAMOS EN DELETE");
     console.log(dato);
     axios.delete(`https://products-crud.academlo.tech/products/${dato}/`)
       .then(()=> getData() )
       .catch(error => console.log(error));
  }
  const selectData=(data)=>{
      console.log("AQUI ESTAMOS EN SELECT");
      console.log(data);
        axios.get(`https://products-crud.academlo.tech/products/${data}/`)
        .then((res)=> setDataSelect(res.data))
        .catch(error => console.log(error));
  }


  return (
      <>
      < div className="boardForm">

          <Formulario sendData={sendData} data={dataSelect}  dataState={stateData}></Formulario>
      </div>   
      < div className="boardlist">
          <ul  className="listproducts" key={datos.id}>
         {    
              
            datos?.map((data1)=>(
         
               <Viewlist  data={data1} sendData={deleteData} sendData2={selectData}/>
               )  
            )
         }
       </ul> 
  
      </div>
      </>
  );
}

export default App;
