import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchContact = createAsyncThunk(
  "contact/fetchContact",
  async () => {
    const data = await fetch(
      `https://simple-contact-crud.herokuapp.com/contact`
    ).then((res) => res.json());
    return data;
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    entities: [],
    loading: false,
  },
  reducers: {
    contactInitFirst(state, action) {
      state.initialState.entities = action.payload;
    },
    contactAdded(state, action) {
      state.push(action.payload);
    },
    contactUpdated(state, action) {
      const { id, firstName, lastName, age, photo } = action.payload;
      const exitingContact = state.find(
        (contact) => contact.id === id
      );
      if (exitingContact) {
        exitingContact.firstName = firstName;
        exitingContact.lastName = lastName;
        exitingContact.age = age;
        exitingContact.photo = photo;
      }
    },
    contactDelete(state, action) {
      const { id } = action.payload;
      const existingUser = state.find(
        (contact) => contact.id === id
      );
      if (existingUser) {
        return state.filter((contact) => contact.id !== id);
      }
    },
  },
  extraReducers: {
    [fetchContact.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchContact.fulfilled]: (state, action) => {
      const { data } = action.payload;
      state.entities = data;
      state.loading = false;
    },
    [fetchContact.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const {
  contactAdded,
  contactUpdated,
  contactDelete,
} = contactSlice.actions;

export default contactSlice.reducer;
