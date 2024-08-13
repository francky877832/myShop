// basketSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BACKEND } from '@env';
import { server } from '../../remote/server';

// Initial state
const initialState = {
  basket: [],
  selectedProducts: {},
  selectedSeller: '',
  totalPrice: 0,
  isLoading: false,
};

// Thunks
export const fetchUserBasket = createAsyncThunk(
    'basket/fetchUserBasket',
    async (userId, { rejectWithValue }) => {
        
      try {
        const response = await fetch(`${server}/api/datas/basket/get/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch basket');
        }
        const data = await response.json();

        //console.log(data)

        return data[0].productDetails;
      } catch (error) {
        console.error(error)
        return rejectWithValue(error.message);
      }
    }
  );

export const addToBasket = createAsyncThunk(
    'basket/addToBasket',
    async ({product, user}, { rejectWithValue }) => {
        const basket = {
            user : user._id,
            username : user.username,
            product : product._id,
        }
      try {
        const response = await fetch(`${server}/api/datas/basket/update/${user._id}`, {
          method: 'POST',
          body: JSON.stringify(basket),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (!response.ok) {
          throw new Error('Failed to add to basket');
        }
  
        //return item;
      } catch (error) {
        console.error(error)
        return rejectWithValue(error.message);
      }
    }
  );
  
  // Async thunk for removing from basket
  export const removeFromBasket = createAsyncThunk(
    'basket/removeFromBasket',
    async ({product, user}, { rejectWithValue }) => {
        const basket = {
            user : user._id,
            username : user.username,
            product : product._id,
        }
      try {
        const response = await fetch(`${server}/api/datas/basket/remove/${user._id}`, {
          method: 'PUT',
          body: JSON.stringify(basket),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (!response.ok) {
          throw new Error('Failed to remove from basket');
        }
  
        //return item._id;
      } catch (error) {
        console.error(error)
        return rejectWithValue(error.message);
      }
    }
  );

// Slice
const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    updateSelectedProducts: (state, action) => {
      const { itemId, bool } = action.payload;
      const updatedSelectedProducts = {
        ...state.selectedProducts,
        [itemId]: bool !== 'remove' ? !state.selectedProducts[itemId] : false,
      };
      state.selectedProducts = updatedSelectedProducts;
      state.totalPrice = Object.keys(updatedSelectedProducts).reduce((total, key) => {
        const isSelected = updatedSelectedProducts[key];
        const item = state.basket.find((product) => product._id === key);
        return isSelected ? total + (item?.price || 0) : total;
      }, 0);
    },
    setSelectedSeller: (state, action) => {
      state.selectedSeller = action.payload;
    },

    updateLocalBasket(state, action) {
        const { product, isAdding } = action.payload;
        const existingIndex = state.basket.findIndex(basketItem => basketItem._id === product._id);
      
        if (isAdding) {
          if (existingIndex === -1) {
            state.basket.push(product);
          }
        } else {
          if (existingIndex !== -1) {
            state.basket.splice(existingIndex, 1);
          }
        }
      },

      addLocalBasket(state, action) {
        const item = action.payload;
        const existingIndex = state.basket.findIndex(basketItem => basketItem._id === item._id);
  
        if (existingIndex === -1) {
          state.basket.push(item);
        }
      },
      removeLocalBasket(state, action) {
        const itemId = action.payload;
        const existingIndex = state.basket.findIndex(basketItem => basketItem._id === itemId);
  
        if (existingIndex !== -1) {
          state.basket.splice(existingIndex, 1);
        }
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserBasket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserBasket.fulfilled, (state, action) => {
        state.basket = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUserBasket.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addToBasket.fulfilled, (state, action) => {
        const item = action.payload;
        const isPresent = state.basket.find((product) => product._id === item._id);
        if (!isPresent) {
          state.basket.push(item);
        } else {
          state.basket = state.basket.filter((product) => product._id !== item._id);
        }
      })
      .addCase(removeFromBasket.fulfilled, (state, action) => {
        state.basket = state.basket.filter((product) => product._id !== action.payload);
      });
  },
});

export const isProductBasket = (state, productId) => {
    //console.log("BASKET")
    //console.log(productId)
    return state.basket.basket.some(product => product._id === productId);
  };

// Selectors
export const selectBasket = (state) => state.basket.basket;
export const selectIsLoading = (state) => state.basket.status;
export const selectError = (state) => state.basket.error;
export const selectSelectedProducts = (state) => state.basket.selectedProducts;
export const selectSelectedSeller = (state) => state.basket.selectedSeller;
export const selectTotalPrice = (state) => state.basket.totalPrice;

export const { updateSelectedProducts, setSelectedSeller, updateLocalBasket } = basketSlice.actions;
export default basketSlice.reducer;
