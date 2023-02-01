import {  useState,useEffect } from "react";
import { identity } from "lodash";
import '../App.css';
const Viewlist = ({data,sendData,sendData2})=>{
    
      

    const deleteData=()=>{
            sendData(data.id);
    }
    const selectData=()=>{

            sendData2(data.id);
     }
   

    return (
        <div className="list" style={data?.isAvailable===true ? {backgroundColor:"green"}:{backgroundColor:"red"}} >

            <li>{"Nombre:"+" "+data?.name}</li>
            <li>{"Categoria:"+" "+data?.category}</li>
            <li>{"Precio:"+" "+data?.price}</li>
            <li>{data?.isAvailable==true?"Esta Disponible":"No está Disponible"}</li>
            <div>
                <button onClick={selectData}>Seleccionar</button>
                <button onClick={deleteData}>Eliminar</button>
            </div>
        </div>
    );
}
export default Viewlist; 