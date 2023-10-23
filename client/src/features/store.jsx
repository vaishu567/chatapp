import { configureStore } from "@reduxjs/toolkit";
import refreshSidebar from "./refreshSidebar";

export const store = configureStore({
  reducer: {
    refreshKey: refreshSidebar,
  },
});
