import { defineStore } from "pinia"

export const useAppStore = defineStore('app', {
    state: () => ({
        client: null,
        commandsActionMap: null,
        autocom: null,
        student_name : null,
    }),
    getters: {},
    actions: {},
  })