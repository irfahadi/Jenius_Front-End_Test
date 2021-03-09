import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const fetchContact = createAsyncThunk("contact/fetchContact", 
  async () =>{
    const config = {
        headers: {
              "Content-Type": "application/json",
            },
        }
        try {
            const {
                data: { data: contactRespone },
            } = await axios.get(
                `https://simple-contact-crud.herokuapp.com/contact`,
                config
            )
          // console.log(contactRespone)
           return await contactRespone
        } catch (e) {
            console.log(e)
        }
  }
)

const contactSlice = createSlice({
  name: "contact",
  initialState:{
    entities : [],
    loading : false
  },
  reducers: {
    contactAdded(state, action){
      state.push(action.payload)
    },
    contactUpdated(state, action){
      const {firstName, lastName, age, photo} = action.payload;
      const exitingContact = state.find(contact=>contact.firstName === firstName)
      if(exitingContact){
        exitingContact.firstName = firstName;
        exitingContact.lastName = lastName;
        exitingContact.age = age;
        exitingContact.photo = photo
      }
    },
    contactDelete(state, action) {
      const { firstName } = action.payload;
      const existingUser = state.find((contact) => contact.firstName === firstName);
      if (existingUser) {
        return state.filter((contact) => contact.firstName !== firstName);
      }
    },
    extraReducer:{
      [fetchContact.pending]: (state, action) => {
        state.loading = true;
      },
      [fetchContact.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
      },
      [fetchContact.rejected]: (state, action) => {
        state.loading = false;
      },
    },
  },
});

export const { contactAdded, contactUpdated, contactDelete } = contactSlice.actions;

export default contactSlice.reducer;