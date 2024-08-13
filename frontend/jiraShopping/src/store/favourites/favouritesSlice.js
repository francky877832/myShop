import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { server } from '../../remote/server';
import { useCallback } from 'react';
// slices/favouritesSlice.js

const loggedUser = "Francky";
const loggedUserId = "66715deae5f65636347e7f9e";

// Thunks asynchrones

// Equivalent de la fonction `addFavourite` dans FavouritesContext
export const addFavourite = createAsyncThunk(
  'favourites/addFavourite',
  async ({ item, bool }, { rejectWithValue }) => {
    try {
      let response;
      const favourite = {
        user: loggedUserId,
        username: loggedUser,
        product: item._id,
      };

      if (bool) {
        response = await fetch(`${server}/api/datas/favourites/update/${loggedUserId}`, {
          method: 'POST',
          body: JSON.stringify(favourite),
          headers: { 'Content-Type': 'application/json' },
        });

        await fetch(`${server}/api/datas/products/likes/update/${item._id}`, {
          method: 'PUT',
          body: JSON.stringify({ updateLikes: 1 }),
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        response = await fetch(`${server}/api/datas/favourites/remove/${loggedUserId}`, {
          method: 'PUT',
          body: JSON.stringify(favourite),
          headers: { 'Content-Type': 'application/json' },
        });

        await fetch(`${server}/api/datas/products/likes/update/${item._id}`, {
          method: 'PUT',
          body: JSON.stringify({ updateLikes: -1 }),
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (!response.ok) {
        throw new Error('Erreur lors de la requête');
      }

      return { item, bool };
    } catch (error) {
        console.error(error)
      return rejectWithValue(error.message);
    }
  }
);

// Equivalent de la fonction `fetchUserFavourites` dans FavouritesContext
export const fetchUserFavourites = createAsyncThunk(
  'favourites/fetchUserFavourites',
  async ({ user, page }, { getState, rejectWithValue }) => {
    //console.log("page")
    //console.log(user)
    try {
      const response = await fetch(`${server}/api/datas/favourites/get/${user}?page=${page}`);
      if (!response.ok) {
        throw new Error('Erreur lors de la requête');
      }
      return await response.json();
    } catch (error) {
        console.error(error)
      return rejectWithValue(error.message);
    }
  }
);

// Slice Redux
const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: {
    favourites: [], // Equivalent de `const [favourites, setFavourites] = useState([])`
    liked: null, // Equivalent de `const [liked, setLikedIcon] = useState()`
    isLoading: false, // Equivalent de `const [isLoading, setIsLoading] = useState(false)`
    disableLikeButton: false, // Equivalent de `const [disableLikeButton, setDisableLikeButton] = useState(false)`
    hasMore: true, // Equivalent de `const [hasMore, setHasMore] = useState(true)`
    page: 1, // Equivalent de `const [page, setPage] = useState(1)`
    error: null,
  },
  reducers: {
    addLocalFavourite(state, action) {
        //console.log(action.payload)
      const newProduct = action.payload;
      if (!state.favourites.some(product => product._id === newProduct._id)) {
        state.favourites.unshift(newProduct);
      }
    },
    // Méthode pour supprimer un produit de la liste des favoris (exemple)
    removeLocalFavourite(state, action) {
      state.favourites = state.favourites.filter(product => product._id !== action.payload._id);
    },
    setLikedIcon(state, action) {
      state.liked = action.payload; // Equivalent de `setLikedIcon`
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload; // Equivalent de `setIsLoading`
    },
    setDisableLikeButton(state, action) {
      state.disableLikeButton = action.payload; // Equivalent de `setDisableLikeButton`
    },
    setPage(state, action) {
      state.page = action.payload; // Equivalent de `setPage`
    },
    setHasMore(state, action) {
      state.hasMore = action.payload; // Equivalent de `setHasMore`
    },
    addFavouriteContext(state, action) {
      const { item, bool } = action.payload;
      //console.log(item)
      const favouriteIds = new Set(state.favourites.map(fav => fav._id));
      const isPresent = favouriteIds.has(item._id);

      if (bool && !isPresent) {
        state.favourites = [item, ...state.favourites];
      } else if (!bool && isPresent) {
        state.favourites = state.favourites.filter(fav => fav._id !== item._id);
      }
    },
    updateLocalFavourites(state, action) {
        const { item, isAdding } = action.payload;
        const existingIndex = state.favourites.findIndex(fav => fav._id === item._id);
  
        if (isAdding) {
          if (existingIndex === -1) {
            state.favourites.push(item);
          }
        } else {
          if (existingIndex !== -1) {
            state.favourites.splice(existingIndex, 1);
          }
        }
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addFavourite.pending, (state) => {
        state.isLoading = true; // Equivalent de `setIsLoading(true)`
      })
      .addCase(addFavourite.fulfilled, (state, action) => {
        state.isLoading = false; // Equivalent de `setIsLoading(false)`
        const { item, bool } = action.payload;
        state.favourites = state.favourites.map(fav =>
          fav._id === item._id ? { ...fav, liked: bool ? fav.liked + 1 : fav.liked - 1 } : fav
        );
      })
      .addCase(addFavourite.rejected, (state, action) => {
        state.isLoading = false; // Equivalent de `setIsLoading(false)`
        state.error = action.payload; // Gestion des erreurs
      })
      .addCase(fetchUserFavourites.pending, (state) => {
        state.isLoading = true; // Equivalent de `setIsLoading(true)`
      })
      .addCase(fetchUserFavourites.fulfilled, (state, action) => {
        state.isLoading = false; // Equivalent de `setIsLoading(false)`
        const products = action.payload.datas;
        if (products.length > 0) {
          state.favourites = [...state.favourites, ...products[0].productDetails]; // Equivalent de `setFavourites([...prevProducts, ...products[0].productDetails])`
          state.page += 1; // Equivalent de `setPage((prevPage) => prevPage + 1)`
        } else {
          state.hasMore = false; // Equivalent de `setHasMore(false)`
        }
      })
      .addCase(fetchUserFavourites.rejected, (state, action) => {
        state.isLoading = false; // Equivalent de `setIsLoading(false)`
        state.error = action.payload; // Gestion des erreurs
      });
  },
});

export const isProductFavourite = (state, productId) => {
    //console.log("productId-")
    //console.log(productId)

    return state.favourites.favourites.some(product => product._id === productId);
  };

export const { setLikedIcon, setIsLoading, setDisableLikeButton, setPage, setHasMore, addFavouriteContext, updateLocalFavourites,  addLocalFavourite, removeLocalFavourite } = favouritesSlice.actions;

export default favouritesSlice.reducer;
