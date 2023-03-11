import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import inboxReducer from "./inboxSlice";
// import expenses from "./expenses";

const store = configureStore({
  reducer: {
    auth: authReducer,
    inbox: inboxReducer,
  },
});


export default store;