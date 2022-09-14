<template>
  <div class="page-container-search">
    <div class="container">
      <div class="row">
        <div class="col-8">
          <h3 class="search-heading">{{name}}</h3>
          <div class="form-group">
            <b-form-input
              v-model="SearchValue"
              placeholder="Enter Book Name"
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
    // console.log('created');

    async function initSearch() {
      stateSearchValue.$patch({searchBook:SearchValue.value})      
      loading.value = true;
      books.value = [];
      await setTimeout(() => {
        axios
          .get("http://openlibrary.org/search.json?title=" + SearchValue.value)
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
      }, 3000);
    }

    onMounted(()=>{
      // console.log('mounted')
    })

    return {
      SearchValue,
      books,
      loading,
      count,
      initSearch,
      ErrorMessage
    };    
  },  
});
</script>
