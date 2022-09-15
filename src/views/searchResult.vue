<template>
  <div class="container mt-3">
    
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">Search Result for <strong>{{getSearchedValue.searchBook.value}}</strong></li>
      </ol>
    </nav>
    <p v-if="books.length">Showing <strong>{{books.length}}</strong> of total <strong>{{count}}</strong> Results Found.</p>
    
    <div class="book-list">          
      <b-skeleton-wrapper :loading="loading">
        <template #loading>
          <div class="my-3 card">
            <div class="card-body flex-column align-items-start">
              <b-skeleton width="85%"></b-skeleton>
              <b-skeleton width="55%"></b-skeleton>
              <b-skeleton width="70%"></b-skeleton>
            </div>
          </div>
          <div class="my-3 card">
            <div class="card-body flex-column align-items-start">
              <b-skeleton width="85%"></b-skeleton>
              <b-skeleton width="55%"></b-skeleton>
              <b-skeleton width="70%"></b-skeleton>
            </div>
          </div>
          <div class="my-3 card">
            <div class="card-body flex-column align-items-start">
              <b-skeleton width="85%"></b-skeleton>
              <b-skeleton width="55%"></b-skeleton>
              <b-skeleton width="70%"></b-skeleton>
            </div>
          </div>
        </template>

        <div class="row" v-if="books.length">
          <div class="col-md-6 col-sm-12" v-for="(author, i) in books" :key="i">
            <div class="card">
              <div class="card-body">
                <div class="highlight">
                  {{author.first_publish_year ? author.first_publish_year : 'NA'}}
                </div>
                <div class="book-detail">
                <h5 class="card-title">{{ author.title }}</h5>
                <p class="mb-0 text-muted">Total {{author.edition_count}} edition published</p>
                </div>
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
  </div>
</template>

<script>
import {defineComponent, onMounted, ref} from 'vue';
import {useBookStore} from "@/store/index";
import { storeToRefs } from "pinia";
import _ from 'lodash'
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
      books.value = _.take(getSearchedValue.books.value, 10);
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
