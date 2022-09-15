<template>
  <div class="page-container-search">
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <h3 class="search-heading">{{name}}</h3>
          <div class="form-group">
            <b-form-input
              v-model="SearchValue"
              placeholder="Enter Book Name to Search"
            ></b-form-input>
            <div class="btn-abs">
              <b-button
                variant="primary"
                :disabled="SearchValue == ''"
                @click="initSearch()"
              >
                <b-spinner v-if="loading" small variant="light" class="mr-2"></b-spinner>
                <span>Search</span></b-button
              >
            </div>
          </div>
          <div class="trending-books mt-5">
            <h6 class="mb-0">The list of trending books</h6>
            <ul>
              <li v-for="book, bookIndex in trendingBooks" :key="bookIndex">
                <b-link class="text-capitalise" @click="searchBook(book)">{{book}}</b-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import {useBookStore} from "@/store/index"
import axios from "axios";

export default defineComponent({
  name:'Search Book',
  components:{},
  props:{
    name:''
  },
  setup() {
    const SearchValue = ref("");
    const books = ref([]);
    const loading = ref(false);
    const count = ref(0);
    const ErrorMessage=ref("");
    const stateSearchValue = useBookStore();    
    const trendingBooks=[
      "It Ends With Us",
      "power",
      "the love hypothesis",
      "Ugly Love",
      "Reminders of Him",
    ]

    // console.log('created');

    async function initSearch() {            
      loading.value = true;
      books.value = [];
      await setTimeout(() => {
        this.searchBook(SearchValue.value)
      }, 2000);
    }

    function searchBook(bookToSearch){
      stateSearchValue.$patch({searchBook:bookToSearch})
      axios
        .get("http://openlibrary.org/search.json?title=" + bookToSearch)
        .then((response) => {
          if (response.data) {
            [books.value, count.value] = [
              response.data.docs,
              response.data.numFound,
            ];
            loading.value = false;
            SearchValue.value = "";
            stateSearchValue.$patch({books:books.value})
            stateSearchValue.$patch({count:count.value})
            this.$router.push('/search-result');
          }
        })
        .catch((e) => {
          if(e.code == "ERR_NETWORK"){
            ErrorMessage.value = e.message
          }
          else{
            ErrorMessage.value = e.message
          }
        })
        .finally(() => {
          loading.value = false;
        });
    }

    onMounted(()=>{
      stateSearchValue.$patch({searchBook:""}) 
      stateSearchValue.$patch({books:[]})
      stateSearchValue.$patch({count:0}) 
    })

    return {
      SearchValue,
      books,
      loading,
      count,
      initSearch,
      searchBook,
      ErrorMessage,
      trendingBooks
    };    
  },  
});
</script>
