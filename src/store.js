import { configureStore} from "@reduxjs/toolkit";
import products from "./features/products";
import productsPanel from "./features/productsPanel";
export const store=configureStore({
    reducer:{
       products,
       productsPanel

    }

})