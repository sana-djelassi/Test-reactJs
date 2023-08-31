import React from 'react'
import { useState } from 'react';
import { useSelector ,useDispatch} from 'react-redux'
import {Card} from "reactstrap"
import './style/panel.css';
import {removeProduct}from "../../features/productsPanel"
import { Popup } from "./PanelUpdateQuantity";

import 'reactjs-popup/dist/index.css';
export default function PanelListProducts() {

    const productsPanel = useSelector(state=>state.productsPanel)
    const dispatch=useDispatch()
    const [open, setOpen] = useState(false); 
    const [idProduct,setIdProduct]=useState()
    return (
    <>
        <Card>
            <p className='panelName'> Your Panel </p>
            {productsPanel.panel.length>0 && productsPanel.panel.map((panel,index)=>(
                
                <li   key={index}>
                <span>
                    {panel.quantity}
                </span>
                {''} 
                <span > {''} 
                {panel.product.label}
                </span>
                {''} 
                <i  className="iconD"aria-hidden="true" onClick={()=>dispatch(removeProduct(panel.product._id))}>Delete</i>
                <i className="iconU" aria-hidden="true" onClick={() => { setIdProduct(panel.product._id)
                    setOpen(true) 
                }}>Update</i>
                </li>
            ))}
            {productsPanel.panel.length == 0 && (
                <p className='panelName'>
                ...choose product !
                </p>)}
            {productsPanel.remainingCredit >=0 && 
            <p className='panelName'>Remaining Credit : {productsPanel.remainingCredit}</p>}
        
        
      </Card>

   
       {open ? <Popup id={idProduct} closePopup={() => setOpen(false)} /> : null}
    </>
  )
}
