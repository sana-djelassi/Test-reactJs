import {React,useState }from "react";
import "./style/Popup.css";
import { Input } from "reactstrap";
import { useDispatch } from "react-redux";
import {updatePanel} from "../../features/productsPanel"
export const Popup = ({ id, closePopup }) => {
    const [newQuantity,setNewQuantity]=useState()

     const dispatch=useDispatch()
   
  return (
    <div className="popup-container">
     <div className="popup-body">
      <h2>Change Quantity</h2>
      <Input  value={newQuantity} onChange={(e)=>setNewQuantity(e.target.value)}/>
      <button className="btn" onClick={()=> dispatch(updatePanel({_id:id,quantity:newQuantity})) }>Validate</button>
      <button className="btn" onClick={closePopup}>close</button>
      </div>
    </div>
  );
};