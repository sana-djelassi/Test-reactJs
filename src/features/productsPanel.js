import {createSlice, current} from "@reduxjs/toolkit";
const initialState={
    
    remainingCredit:100,
    panel:[
   
        
    ]
}
export const productsPanel=createSlice({
  
    name:"productsPanel",
    initialState,
    reducers:{
          addProduct:(state,action)=>{
          const selectedProduct= action.payload.selectedProduct 
          const quantity= selectedProduct.qty < action.payload.quantity ? selectedProduct.qty : action.payload.quantity
          const productIndex = state.panel.findIndex(obj=>obj.product._id==action.payload.selectedProduct._id)
          
          /*********if the product exist ******/
          if(productIndex != -1){
         
            
          }else{
            /************* product not exist *************************/
               /** product not gifted **/
            if(selectedProduct.is_gift == false){

           selectedProduct.price * quantity
            state.panel.push({
            product:selectedProduct,
            quantity:quantity,
            totalPriceWithGift:0,
            totalPricewithoutGift: selectedProduct.price * quantity,
        
             })
          
            }else{
             /***product is gifted ***/
              let totalPriceGifted= (selectedProduct.gift_price * quantity)

              if(totalPriceGifted < state.remainingCredit){

                state.panel.push({
                  product: selectedProduct,
                  quantity: quantity,
                  totalPriceWithGift:( state.remainingCredit  - totalPriceGifted),
                  totalPricewithoutGift:0,
                  })
                  /**update remainingCredit  ****/
                state.remainingCredit = state.remainingCredit - totalPriceGifted
            
                  
              }else if(totalPriceGifted > state.remainingCredit && state.remainingCredit > 0 ){

              const suffix="not included in the gift credit"
              const newLabel=selectedProduct.label +' '+ suffix
              Object.freeze(selectedProduct);
              const objectCopy={...selectedProduct}
              objectCopy.label = newLabel

              state.panel.push({
                product: selectedProduct,
                quantity: quantity,
                totalPriceWithGift:(totalPriceGifted- state.remainingCredit ),
                totalPricewithoutGift:0,
              
              })
              if(quantity < selectedProduct.qty){
                  state.panel.push({
                  product:objectCopy,
                  quantity: 1,
                  totalPriceWithGift:0,
                  totalPricewithoutGift:(selectedProduct.price * quantity) - (totalPriceGifted - state.remainingCredit ),
            
                  })
              }
                
              
              /***update the remainingcredit */
              state.remainingCredit = 0

             
            }else if(state.remainingCredit==0){
        
              state.panel.push({
              product:selectedProduct,
              quantity:quantity,
              totalPriceWithGift:0,
              totalPricewithoutGift:selectedProduct.price * quantity,
          
              

              })


            }
          



          }
        }
          },
          /******remove product from panel ***/
          removeProduct:(state,action)=>{
            
              const productObj = state.panel.find(obj =>obj.product._id === action.payload)

              const CuObj =current(productObj)
           
              if(CuObj){
                  if(CuObj.quantity==1){
                  state.panel= state.panel.filter(CuObj=>CuObj.product._id !== action.payload)
                  /***update the  remainingCredit*/
                  state.remainingCredit=100

                  }else{

                    let totalPriceWithGift
                    let totalPricewithoutGift

                    if(CuObj.product.is_gift){
                      totalPriceWithGift= CuObj.product.gift_price* (CuObj.quantity - 1)
                      let RemCredit = state.remainingCredit +  CuObj.product.gift_price
                      state.remainingCredit=RemCredit<=100 && RemCredit
                    }else{
                      totalPricewithoutGift= CuObj.product.price* (CuObj.quantity - 1)
                    }
                    const newState = state.panel.map((item) => {
                      if (item.product._id === action.payload && item.quantity>1) {
                     
                        return {
                          ...item,
                          quantity: item.quantity -1,
                          totalPriceWithGift:totalPriceWithGift,
                          totalPricewithoutGift:totalPricewithoutGift
                        };
                       
                     
                      }
                      return item;
                    });
                  state.panel=newState
                  }
              }
         
            

          },
          /************ update Panel ******************/
          updatePanel:(state,action)=>{
            const productObj = state.panel.find(obj =>obj.product._id === action.payload._id)

            const CuObj =current(productObj)
        
                  if(CuObj){

                    let totalPriceWithGift=CuObj.totalPriceWithGift
                    let totalPricewithoutGift=CuObj.totalPricewithoutGift

                    if(CuObj.product.is_gift){
                      totalPriceWithGift= CuObj.product.gift_price*action.payload.quantity
                      let RemCredit = state.remainingCredit +  CuObj.product.gift_price
                      state.remainingCredit=RemCredit<=100 && RemCredit
                    }else{
                      totalPricewithoutGift= CuObj.product.price* action.payload.quantity
                    }
                    
                   const newState = state.panel.map((item) => {
                     if (item.product._id === action.payload._id) {
                       return {
                         ...item,
                         quantity: action.payload.quantity,
                         totalPriceWithGift:totalPriceWithGift,
                         totalPricewithoutGift:totalPricewithoutGift


                       };
                     }
                     return item;
                   });
                 state.panel=newState
                 
                 }
             }
          }
    

})


export const {addProduct,removeProduct,updatePanel} = productsPanel.actions
export default productsPanel.reducer