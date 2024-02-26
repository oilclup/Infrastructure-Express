<template>
  <Layout>
    <div>
      <Headerbar title="Employee" />
      <div class="row">
        <div class="col-sm">
          <Cardboard title="total" :total="items.length" />
        </div>
        <div class="col-sm">
          <Cardboard title="total" :total="items.length" />
        </div>
        <div class="col-sm">
          <Cardboard title="total" :total="items.length" />
        </div>
      </div>

      <div class="datatable mt-5">
        <div v-if="loadingTable" class="text-center d-flex justify-content-center align-items-center"
          style="height: 500px;"> <!-- Apply Flexbox classes -->
          <div class="rounded p-5">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <!-- Content of datatable -->
        <div v-else>
          <nav class="section-header mb-3">
            <HeadPaginationCom :current-limit="pagination.limit" :search-text="searchText" @update:currentLimit="handleLimitChange" @update:searchText="handleSearchTextChange" />
          </nav>
          <div class="table-responsive">
            <table class="section-table table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Position</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in items" :key="item.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.email }}</td>
                  <td>{{ item.position }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- Pagination -->
          <PaginationCom :current-page="pagination.page" :total-pages="pagination.totalPages" @page-change="changePage" />
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from '@layouts/main'
import Cardboard from '@components/card/Cardboard'
import Headerbar from '@components/Headerbar'
import PaginationCom from '@components/datatables/PaginationCom'
import HeadPaginationCom from '@components/datatables/HeadPaginationCom'

import axios from '@/axios'
import { mapState } from 'vuex';

export default {
  name: 'EmployeesPage',
  components: {
    Layout,
    Cardboard,
    Headerbar,
    PaginationCom,
    HeadPaginationCom
  },
  computed: {
    ...mapState({
      user: state => state.auth.currentUser.data.data
    })
  },
  data() {
    return {
      items: [],
      pagination: {
        page: 1,
        limit: 10,
        totalPages: 0
      },
      searchText: "",
      loadingTable: true,
    };
  },
  watch: {
    /* "pagination.limit" (newVal) {
      this.pagination.page = 1;
      this.pagination.limit = newVal;
       this.getEmployee();
    } */
  },
  async created() {
    await this.getEmployee()
  },
  async mounted() {

  },
  methods: {
    async getEmployee() {
      try {
        this.loadingTable = true;
        let resp = await axios.get(`/api/employee?page=${this.pagination.page}&size=${this.pagination.limit}&searchText=${this.searchText}`)

        this.items = resp.data.data.data
        this.pagination.totalPages = resp.data.data.totalPages;
        this.pagination.page = resp.data.data.currentPage;
        setTimeout(async () => {
          this.loadingTable = false;
        }, 100);
      } catch (err) {
        console.log("Err : ", err)
        this.$swalError('Oops!', 'Something went wrong.');
      }
    },
    async changePage(pageNumber) {
      this.pagination.page = pageNumber;
      await this.getEmployee();
    },
    handleLimitChange(newLimit) {
      console.log("newLimit", newLimit)
      this.pagination.page = 1;
      this.pagination.limit = newLimit;
      this.getEmployee();
    },
    handleSearchTextChange(newSearchText) {
      console.log("text", newSearchText)
      this.pagination.page = 1;
      this.searchText = newSearchText;
      this.getEmployee();
    }
      /*   onSearch() {
      this.pagination.page = 1;
      this.pagination.limit = 10;
      this.getEmployee();
    }, */
    /*   async changeHeader({ pageLimit, searchData }) {
        this.pagination.limit = pageLimit
        this.searchText = searchData
        this.pagination.page = 1;
        await this.getEmployee();
      }, */
  },
};
</script>

<style scoped></style>