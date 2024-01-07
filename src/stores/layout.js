import { getDesktopLayout } from "../functions/getDesktopLayout";
import { defineStore } from "pinia";

export const useLayoutStore = defineStore("layout", {
  state: () => ({ layout: getDesktopLayout() }),
});
