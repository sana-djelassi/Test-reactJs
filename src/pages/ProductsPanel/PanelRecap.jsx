import React from 'react'
import { useSelector } from 'react-redux'
import {  Card } from 'reactstrap'
import './style/panelRecap.css'
import { NavLink } from 'react-router-dom'

export default function PanelRecap() {
  const productsPanel=useSelector(state=>state.productsPanel)

 
  return (
    
  <Card>
      <h2>Panel Recap</h2>
      {productsPanel.panel.length>0 &&
      
     
      <ul>

       <li className='liRecap'>Number of products: {productsPanel.panel.length}</li>
       <li className='liRecap'>Total Price Gifted: {productsPanel.panel.reduce((acc,item) => (item.totalPriceWithGift)+ acc,0)} DT</li>
       <li className='liRecap'>Total Price without Gift: {productsPanel.panel.reduce((acc,item) =>item.totalPricewithoutGift+ acc,0)} DT</li>
       <li className='liRecap'>Number of entities: {productsPanel.panel.reduce((acc,item) => parseInt(item.quantity) + acc,0)}</li>
       <li className='liRecap'>Used Gift: {100 - productsPanel.remainingCredit}</li>
       <li className='liRecap'>Left Gift: {productsPanel.remainingCredit }</li>
      
       </ul>
      }
      <NavLink to={'/'}>
      <button className='btn'>go Panel</button>
      </NavLink>
      
   

</Card>
)
}
