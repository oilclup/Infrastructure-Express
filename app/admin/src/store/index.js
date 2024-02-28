import { createStore } from "vuex";
import { auth } from "./modules/auth.module";
import { generic } from "./modules/generic.module";

const store = createStore({
  modules: {
    auth,
    generic
  },
});

export default store;
