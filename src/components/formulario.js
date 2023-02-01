
import { useEffect, useState } from "react";
import  {useForm} from "react-hook-form";
import axios from "axios";
import '../App.css';

const Formulario =({sendData,data,stateData})=>{
   
    console.log("ESTOS ES FORMULARIO DATASTATE"+data);


    const {register,handleSubmit,formState:{errors},reset}= useForm();
    // const [dataId,setDataId]=useState(data.id);

    const [dataSelect,setDataSelect]=useState(null);
    const [dataId,setDataId]=useState("");
 
    useEffect(() => {
      if(data.length !== 0){
        setDataSelect(data);
        setDataId(data.id);
        reset({
          name: data.name,
          category: data.category,
          price: data.price,
          isAvailable:data.isAvailable,
        });
        
          
      }

      return
    }, [data]);


    const getData=()=>{
 
        axios.get('https://products-crud.academlo.tech/products/')
        .then((res) => sendData(res.data))
        .catch(error => console.log(error));
        setDataSelect(null);
        setDataId(undefined);
        resetForm();
        
        
    }


    const onSubmit=(data)=>{

         if(dataSelect !==null){
              axios.put(`https://products-crud.academlo.tech/products/${dataId}/`,data)
              .then(()=> {
            
                    getData();
                
              } )
                .catch(error => console.log(error));
          }
          else{
            axios.post('https://products-crud.academlo.tech/products/',data)
            .then(()=> {
          
                  getData();
              
            } )
              .catch(error => console.log(error));
            
            } 
          }
      
        
    const resetForm = () => {
        reset({
          name: "",
          category: "",
          price: "",
          pisAvailable:"",
        });
    };
      

    return (
        <div className="form">
             <h1>Ingreso de Productos</h1>    
       <form onSubmit={handleSubmit(onSubmit)}>
         <div className="inputs">
           <label>Nombre         </label>
           <input type="text" {...register('name',{ 
                 required:true
               }
           )}></input>
           {errors.name?.type ==="required" && <p>El Nombre es un Campo Obligatorio</p>}
         </div>
         <div className="inputs">
           <label>Categoria         </label>
           <input type="text"   {...register('category',{ 
                 required:true
               })}></input>
               {errors.category?.type ==="required" && <p>La Categoria es un Campo Obligatorio</p>}
         </div>
         <div className="inputs">
           <label>Precio         </label>
           <input type="number"  {...register('price',{ 
                 required:true
               })}></input>
               {errors.price?.type ==="required" && <p>El Precio es un Campo Obligatorio</p>}
         </div>
         <div className="isAvailable">
           <label>Disponible         </label>
           <input type="checkbox"  {...register('isAvailable',{ 
                 required:false
               })}></input>
         </div>
         <div className="botton">
           <input  type="submit" name=""></input>
         </div>
       </form>
   </div> 


    );

}

export default Formulario; 