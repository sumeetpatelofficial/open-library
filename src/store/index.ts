import { defineStore } from "pinia";

export const useBookStore = defineStore("book",{
  state:() =>({
    searchBook:'',
    books:[], 
    count:0, 
    message:''
  }),
  getters:{
    
  },
  actions:{

  }
})  
