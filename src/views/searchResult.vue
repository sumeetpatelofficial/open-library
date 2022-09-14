<template>
  <div class="container mt-3">
    <h4 class="text-primary">Showing Results for <strong>{{getSearchedValue.searchBook.value}}</strong></h4>
    <p v-if="books.length">Total <strong>{{count}}</strong> Results Found.</p>
    <b-skeleton-wrapper :loading="loading">
      <template #loading>
        <b-card class="my-3">
          <b-skeleton width="85%"></b-skeleton>
          <b-skeleton width="55%"></b-skeleton>
          <b-skeleton width="70%"></b-skeleton>
        </b-card>
        <b-card class="my-3">
          <b-skeleton width="85%"></b-skeleton>
          <b-skeleton width="55%"></b-skeleton>
          <b-skeleton width="70%"></b-skeleton>
        </b-card>
        <b-card class="my-3">
          <b-skeleton width="85%"></b-skeleton>
          <b-skeleton width="55%"></b-skeleton>
          <b-skeleton width="70%"></b-skeleton>
        </b-card>
      </template>

      <div class="row my-3" v-if="books.length">
        <div class="col-6" v-for="(author, i) in books" :key="i">
          <div class="card mb-3">
            <div class="card-body">
              <div>
                First publishing year
                <span class="badge badge-primary">{{
                  author.first_publish_year
                }}</span>
              </div>
              <h5 class="card-title">{{ author.title }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">
                {{ author.title_suggest }}
              </h6>
            </div>              
          </div>
        </div>
      </div>
      <div class="row my-3" v-else-if="books.length > 0">
        <div class="col-12">
          Data Not Found !!!!
        </div>
      </div>
    </b-skeleton-wrapper>    
  </div>
</template>

<script>
import {defineComponent, onMounted, ref} from 'vue';
import {useBookStore} from "@/store/index";
import { storeToRefs } from "pinia";

export default defineComponent({
  setup() {
    const stateSearchValue = useBookStore();
    const getSearchedValue= storeToRefs(stateSearchValue)      
    const books = ref([]);
    const count = ref(0);
    const loading= ref(false);
    const ErrorMessage = getSearchedValue.message.value;

  onMounted(()=>{  
    loading.value = true;
    setTimeout(() => {
      books.value = getSearchedValue.books.value;
      count.value = getSearchedValue.books.value.length; 
      loading.value = false;     
    }, 2000);    
  })    

    return{
      stateSearchValue,
      getSearchedValue,
      books, 
      count,
      loading
    }
  }
})
</script>
