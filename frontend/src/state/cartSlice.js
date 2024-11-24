import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const newProduct = action.payload;
            if (!Boolean(state.cartItems.find(product => product._id === newProduct._id))) {
                state.cartItems = [...state.cartItems, newProduct]
            }
        },
        removeFromCart: (state, action) => {
            const productId = action.payload;
            const updatedCartItems = state.cartItems.filter(product => product._id !== productId);
            state.cartItems = updatedCartItems;
        },
        addQuantity: (state, action) => {
            const productId = action.payload;
            const item = state.cartItems.find(product => product._id === productId);

            if (item) {
                item.quantity = (item.quantity || 0) + 1;
            } else {
                console.log("Product not found in cart");
            }
        },
        reduceQuantity: (state, action) => {
            const productId = action.payload;
            const item = state.cartItems.find(product => product._id === productId);

            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    state.cartItems = state.cartItems.filter(product => product._id !== productId);
                }
            } else {
                console.log("Product not found in cart");
            }

        },
        removeAllFromCart: (state, action) => {
            state.cartItems = [];
        }
    }
})

export const { addToCart, removeFromCart, removeAllFromCart, reduceQuantity, addQuantity } = cartSlice.actions

export default cartSlice.reducer;