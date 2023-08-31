
import {React, useEffect, useState } from 'react';
import { useSelector ,useDispatch} from 'react-redux'
import Dropdown from 'react-dropdown';
import  {NavLink}  from "react-router-dom"
import {Input} from "reactstrap";
import Select from "react-select";
import 'react-dropdown/style.css';
import "./products.css"
import {addProduct} from "../../features/productsPanel"
import PanelListProducts from '../ProductsPanel/PanelListProducts';

export default function ListProducts() {

    const dispatch=useDispatch()
    const products= useSelector(state=>state.products)

    const productsPanel=useSelector(state=>state.productsPanel)
    
    
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState();
    const [productsList,setProductsList]=useState()

    let optionsP=[]
    for(let i=0;i<products.products.length;i++){
        optionsP.push({
        label:products.products[i].label,
        value:products.products[i]._id,
        
        })
    }
  
    const handleChange=(e)=>{
    
    const selectedProduct = products.products.find(
        (item) => item._id === e.value
      );
    setSelectedProduct(selectedProduct)
  
    }


    const handleChangeQuantity=(value)=>{
       
            setQuantity(value)
        }
    useEffect(()=>{
        
        setProductsList({selectedProduct,quantity})
    
        
    },[quantity])
    
    const AddToPanel=()=>{

        dispatch(addProduct(productsList))
        setSelectedProduct(null)
        setQuantity('')
    }
   
  return (
    <div className="container">
    <h1 > Products</h1>
   
 
        <Select placeholder="choose product" onChange={e => handleChange(e)} 
        options={optionsP} value={selectedProduct}/>
        
        <Input  className="input"  placeholder="quantity" value={quantity}
           onChange={e=>handleChangeQuantity(e.target.value)}/>
        
        <button  className='btn' onClick={()=>AddToPanel()}>Add to panel</button>

        <PanelListProducts/>

        <NavLink  to={`/Panel`}>
            
            <button className='btn'>Validate</button>
            
        </NavLink>
    

    </div>
  )
}
