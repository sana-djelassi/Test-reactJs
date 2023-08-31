import { createSlice } from "@reduxjs/toolkit";

const initialState={
    products:[
       {_id:1,
       reference:1111,
       label:"PC",
       qty:30,
       price:800,
       is_gift:false,
       gift_price:90

        },
     
        {_id:2,
        reference:1113,
        label:"Tablet",
        qty:20,
        price:15,
        is_gift:true,
        gift_price:15
     
        },
        {_id:3,
            reference:1114,
            label:"Phone",
            qty:5,
            price:30,
            is_gift:true,
            gift_price:15
         
            }
    ]

}
export const products=createSlice({
    name:"products",
    initialState,
    reducers:{

    }
})

export default products.reducer