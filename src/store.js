import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./features/contact/contactSlices";

export default configureStore({
  reducer: {
      contact : contactReducer
  },
});