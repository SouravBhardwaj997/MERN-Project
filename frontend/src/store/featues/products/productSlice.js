import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  productsList: {
    items: [],
    status: "idle",
    error: null,
  },
};

export const createNewProduct = createAsyncThunk(
  "product/create",
  async (product, { rejectWithValue }) => {
    if (!product.name || !product.price || !product.imageUrl) {
      return rejectWithValue("All Fields are required");
    }
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    if (!res.ok) {
      console.log("response not ok");
      return rejectWithValue("Error while creating new product");
    }
    const data = await res.json();
    return data;
  }
);

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    const res = await fetch("/api/products");
    if (!res.ok) {
      return rejectWithValue("Failed to fetch all product");
    }
    const data = await res.json();
    return data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, { rejectWithValue }) => {
    const res = await fetch(`api/products/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      return rejectWithValue("Unable to delete");
    }
    const data = await res.json();
    return data;
  }
);

export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ product, id }, { rejectWithValue }) => {
    const res = await fetch(`api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    if (!res.ok) {
      return rejectWithValue("Error while updating the product");
    }
    const data = await res.json();
    return data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createNewProduct.pending, (state) => {
      state.productsList.status = "pending";
    });
    builder.addCase(createNewProduct.fulfilled, (state, action) => {
      state.productsList.items.push(action.payload.data);
      state.productsList.status = "fulfilled";
    });
    builder.addCase(createNewProduct.rejected, (state, action) => {
      state.productsList.status = "rejected";
      state.productsList.error = action.payload;
    });
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.productsList.status = "pending";
    });
    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      state.productsList.status = "rejected";
      state.productsList.error = action.payload;
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.productsList.items = action.payload.data;
      state.productsList.status = "fulfilled";
    });
    builder.addCase(deleteProduct.pending, (state) => {
      state.productsList.status = "pending";
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.productsList.error = action.payload;
      state.productsList.status = "rejected";
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.productsList.status = "fulfilled";
      state.productsList.items = state.productsList.items.filter(
        (el) => el._id != data.data._id
      );
    });
    builder.addCase(updateProduct.pending, (state) => {
      state.productsList.status = "pending";
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.productsList.status = "rejected";
      state.productsList.error = action.payload;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.productsList.status = "fulfilled";
      state.productsList.items = state.productsList.items.map((el) => {
        if (el._id == action.payload.data._id) {
          return action.payload.data;
        }
        return el;
      });
    });
  },
});

export default productSlice.reducer;
