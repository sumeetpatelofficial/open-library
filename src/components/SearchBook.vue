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
  <div class="container mt-3">
    <p v-if="books.length">Total {{ count }} Results Found.</p>
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
        <div class="col-12" v-for="(author, i) in books" :key="i">
          <div class="card mb-3">
            <div class="row">
              <div class="col-md-4">
                <!-- <img src="..." alt="..."> -->
              </div>
              <div class="col-md-8">
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
        </div>
      </div>
      <div class="row my-3" v-else-if="books.length > 0">
        <div class="col-12">
          Data Not Found !!!!
        </div>
      </div>
      <div class="row my-3" v-else>
        <div class="col-12">
        {{ErrorMessage}}
        </div>
      </div>
    </b-skeleton-wrapper>
  </div>
</template>

<script>
import { defineComponent, defineEmits, onMounted, ref } from "vue";
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
    // console.log('created');

    async function initSearch() {
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
