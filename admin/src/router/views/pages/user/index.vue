<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main'
import PageHeader from '@components/page-header'
import { BASE_IMAGE_URL } from '@src/config/configs'
import axios from '@/axios'
import Pagination from '@src/components/base/pagination'
import Search from '@src/components/base/search'
import moment from 'moment'
import { target } from 'vuelidate/lib/params'
// import XLSX from 'xlsx'
import JsonExcel from 'vue-json-excel'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

/**
 * Contents component
 */
export default {
  page: {
    title: 'Contents',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout, PageHeader, Pagination, Search, JsonExcel, Loading },
  data() {
    return {
      isLoading: false,

      premiumPermission: false,
      show: false,
      showPurchasedHistory: false,
      showmodalPermission: false,
      modaldata: [],
      baseImageUrl: BASE_IMAGE_URL,
      title: 'Customer',
      search_types: [
        { key: 'email', value: 'Email' },
        { key: 'firstName', value: 'First Name' },
        { key: 'lastName', value: 'Last Name' },
      ],
      sortByList: [
        // { key: 'Title', value: 'content_title' },
        // { key: 'Text', value: 'content_text' },
      ],

      sortByType: [{ key: 'Influencer', value: true }],
      search: {},
      page: 1,
      data: [],
      dataExcel: [],

      pagination: {},
      sort_by: '',
      is_purchasedHistory: false,
      purchasedHistory: [],
      selectCustomer: {},
      sort_type: '',
      downlineMemberModal: false,
    }
  },
  mounted() {
    this.onLoad()
    this.exportExcel()
  },
  methods: {
    doAjax() {
      this.isLoading = true
      // simulate AJAX
    },
    onCancel() {
      this.isLoading = false

      // console.log('User cancelled the loader.')
    },
    async handleOk() {
      this.doAjax()
      let check = confirm('confirm')
      if (!check) return
      await axios
        .put(`/api/customer/${this.selectCustomer._id}`, {
          data: {
            premiumPermission: this.premiumPermission,
          },
        })
        .then((res) => {
          this.$toast.success('Saved successfully')

          this.onLoad()
        })
        .catch((err) => {
          alert(err.response)
        })
      this.onCancel()
    },

    async handleClickCode(id) {
      this.doAjax()
      let check = confirm('confirm')
      if (!check) return this.onCancel()
      await axios
        .put(`/api/customer/${id}`, {
          data: {},
        })
        .then((res) => {
          this.$toast.success('Saved successfully')

          this.onLoad()
        })
        .catch((err) => {
          alert(err.response)
        })
      this.onCancel()
    },
    resetModal() {
      this.selectCustomer = {}
    },
    handleClickPermistion(customer) {
      this.showmodalPermission = true
      this.selectCustomer = customer
      if (customer.premiumPermission) {
        this.premiumPermission = customer.premiumPermission
      } else {
        this.premiumPermission = false
      }
    },

    handleClickDownline(item) {
      this.downlineMemberModal = true
    },
    onPage(page) {
      this.page = page
      this.onLoad()
    },
    onSearch(search) {
      this.search = search
      this.page = 1
      this.onLoad()
    },
    async onLoad() {
      await axios
        .get('/api/customer', {
          params: {
            page: this.page,
            ...this.search,
            sort_by: this.sort_by,
            premiumPermission: this.sort_type,
            orderByField: 'createdAt',
            orderBy: 'asc',
          },
        })
        .then((res) => {
          this.data = res.data.data
          this.pagination = res.data
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },

    async openModal(data) {
      this.showPurchasedHistory = true

      if (!data) {
        alert('ไม่มีข้อมูล')
      }

      this.show = true
      this.modaldata = data

      // this.modalVisible = true
    },
    async exportExcel() {
      let targetCustomers = await axios.get('/api/customer/getAllCustomer')
      targetCustomers = targetCustomers.data
      targetCustomers.map((x) => {
        x.goals = x.fitnessAssessment.goals.join()
        x.interested = x.fitnessAssessment.interested.join()
        x.often = x.fitnessAssessment.often
        x.createdAt = moment(x.createdAt).format('MMMM Do YYYY, h:mm:ss a')
        delete x.fitnessAssessment
        x.provider.map((y) => {
          x.provider = y.type
        })
      })
      this.dataExcel = targetCustomers
      // const dataWS = XLSX.utils.json_to_sheet(targetCustomers)
      // const wb = XLSX.utils.book_new()
      // XLSX.utils.book_append_sheet(wb, dataWS)
      // XLSX.writeFile(wb, 'export.xlsx')
    },
    async openModalPurchasedHistory(data) {
      this.showPurchasedHistory = true

      let result = await axios.get('/api/customer/GetPurchasedHistory', {
        params: { user_id: data },
      })
      this.purchasedHistory = result.data
      // console.log(this.purchasedHistory)
      // this.modaldata = data

      // this.modalVisible = true
    },
    renderDate(date) {
      const formatDate = new Date(date)
      return moment(formatDate, 'MM/DD/YYYY').format('Do MMM YYYY')
    },
  },
}
</script>

<template>
  <Layout>
    <div class="row page-title align-items-center">
      <div class="col-md-3 col-xl-6">
        <h4 class="mb-1 mt-0">Member List</h4>
      </div>
      <div class="col-md-3 col-xl-6">
        <!-- <button
          class="btn btn-primary rounded-pill width-lg float-right aligncenter"
          @click="exportExcel()"
        >
          <feather type="file-text"></feather>export Excel
        </button> -->
        <JsonExcel
          :data="dataExcel"
          :name="`MemberList-${new Date().getTime()}.xls`"
        >
          <button
            class="btn btn-primary rounded-pill width-lg float-right aligncenter"
          >
            <feather type="file-text"></feather>export Excel
          </button>
        </JsonExcel>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <Search :types="search_types" @onSearch="onSearch($event)">
              <div class="input-group" style="margin-right:5px">
                <div class="input-group-prepend">
                  <label class="input-group-text">Sort by:</label>
                </div>
                <select
                  class="custom-select"
                  v-model="sort_by"
                  @change="onLoad()"
                >
                  <option value>All</option>
                  <option
                    v-for="x in sortByList"
                    :key="x.key"
                    :value="x.value"
                    >{{ x.key }}</option
                  >
                </select>
              </div>
              <div class="input-group" style="margin-right:5px">
                <div class="input-group-prepend">
                  <label class="input-group-text">Type:</label>
                </div>
                <select
                  class="custom-select"
                  v-model="sort_type"
                  @change="onLoad()"
                >
                  <option value>All</option>
                  <option
                    v-for="x in sortByType"
                    :key="x.key"
                    :value="x.value"
                    >{{ x.key }}</option
                  >
                </select>
              </div>
            </Search>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table mb-0">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col" class="tf-3">Avatar</th>
                    <th scope="col">Email</th>
                    <th scope="col">Name</th>
                    <th scope="col" class="tf-3">CityName</th>
                    <th scope="col" class="tf-3">Created At</th>
                    <th scope="col" class="tf-2">Survey</th>
                    <!-- <th scope="col" class="tf-2">Assessment</th> -->
                    <!-- <th scope="col" class="tf-2">Purchased History</th> -->
                    <th scope="col"> Permission</th>
                    <th v-if="sort_type" scope="col"> Code</th>

                    <th v-if="sort_type" scope="col"> Member</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in data" :key="index">
                    <td scope="row">{{
                      page == 1
                        ? page - 1 + index + 1
                        : (page - 1) * 20 + (index + 1)
                    }}</td>

                    <td scope="row">
                      <img
                        v-if="item.avatarUrl"
                        style="width:100px;height:100px;"
                        :src="
                          item.avatarUrl.includes('http')
                            ? `${item.avatarUrl}`
                            : `${baseImageUrl}/${item.avatarUrl}`
                        "
                        class="img-fluid"
                      />
                    </td>
                    <td scope="row">{{ item.email }}</td>
                    <td scope="row">
                      {{ item.firstName + ' ' + item.lastName }}
                    </td>

                    <td scope="row">{{
                      item.cityName
                        ? item.cityName + ',' + item.countryCode
                        : null
                    }}</td>
                    <td scope="row" style="max-width: 150px;">
                      <!-- {{ moment(item.createdAt).format('YYYY-MM-DD') }} -->
                      <!-- <div></div> -->
                      {{ renderDate(item.createdAt) }}
                      <!-- {{ item.createdAt.substring(0, 10) }} -->
                    </td>

                    <td>
                      <button
                        class="btn btn-info p-0 px-2 py-1 mr-2"
                        @click="
                          openModal(item.survey), (is_purchasedHistory = false)
                        "
                        >View</button
                      >
                    </td>
                    <!-- <td>
                      <button
                        class="btn btn-info p-0 px-2 py-1 mr-2"
                        @click="
                          openModalPurchasedHistory(item._id),
                            (is_purchasedHistory = true)
                        "
                        >View</button
                      >
                    </td> -->

                    <td @click="handleClickPermistion(item)">
                      <b-badge variant="success" v-if="item.premiumPermission"
                        >premium</b-badge
                      >

                      <b-badge v-else>None</b-badge>
                    </td>
                    <td v-if="sort_type">
                      <b-badge variant="warning" v-if="item.influencerCode">{{
                        item.influencerCode
                      }}</b-badge>

                      <b-badge
                        @click="handleClickCode(item._id)"
                        variant="secondary"
                        v-else
                        >generate code</b-badge
                      >
                    </td>
                    <td
                      v-if="sort_type && item.member"
                      @click="handleClickDownline(item)"
                    >
                      <b-badge variant="light"
                        >{{ 'All Member :'
                        }}{{
                          item.member.all ? item.member.all.length : 0
                        }}</b-badge
                      >
                      <br />

                      <b-badge variant="light"
                        >{{ 'Active Member :'
                        }}{{
                          item.member.active ? item.member.active.length : 0
                        }}</b-badge
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Pagination
              :data="pagination"
              :page="page"
              @onPage="onPage($event)"
            />
            <b-modal
              hide-footer
              id="modal-xl"
              size="lg"
              v-model="show"
              ref="modal"
            >
              <!-- <table class="table mb-0" v-if="!is_purchasedHistory">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">goals</th>
                    <th scope="col">interested</th>
                    <th scope="col">often</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td scope="row">
                      <div
                        v-for="(item, index) in modaldata.goals"
                        :key="index"
                      >
                        {{ item }}
                      </div>
                    </td>
                    <td>
                      <div
                        v-for="(item, index) in modaldata.interested"
                        :key="index"
                      >
                        {{ item }}
                      </div>
                    </td>

                    <td style="width:30%">
                      <div
                        v-for="(item, index) in modaldata.often"
                        :key="index"
                      >
                        {{ item }}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table> -->

              <div class="m-5">
                <div class="mt-4">
                  <h5>How did you hear about us?</h5>
                  <p
                    class="ml-5"
                    v-for="(item, index) in modaldata.references"
                    :key="index"
                  >
                    {{ ++index }} : {{ item }}
                  </p>
                </div>
                <div class="mt-4">
                  <h5>What style of Muaythai do you like?</h5>
                  <p
                    class="ml-5"
                    v-for="(item, index) in modaldata.styles"
                    :key="index"
                  >
                    {{ ++index }} : {{ item }}
                  </p>
                </div>
                <div class="mt-4">
                  <h5>How many times have you gone to Thailand?</h5>
                  <p
                    class="ml-5"
                    v-for="(item, index) in modaldata.time_gone_to_thailand"
                    :key="index"
                  >
                    {{ ++index }} : {{ item }}
                  </p>
                </div>
                <div class="mt-4">
                  <h5>How often do you watch Muaythai fights?</h5>
                  <p
                    class="ml-5"
                    v-for="(item, index) in modaldata.often"
                    :key="index"
                  >
                    {{ ++index }} : {{ item }}
                  </p>
                </div>
                <div class="mt-4">
                  <h5
                    >How much do you spend on Muaythai(E.g., Equipments,
                    watching fight, gym membership, or online training)?</h5
                  >
                  <p
                    class="ml-5"
                    v-for="(item, index) in modaldata.spend"
                    :key="index"
                  >
                    {{ ++index }} : {{ item }}
                  </p>
                </div>
              </div>
              <!-- <div v-else>
                <div v-for="(item, index) in modaldata" :key="index">
                  <a href="#">{{ item }}</a>
                </div>
              </div> -->
            </b-modal>
            <!-- <b-modal
              id="modal-xl"
              hide-footer
              size="lg"
              v-model="showPurchasedHistory"
              ref="modal"
              title=" PurchasedHistory"
            >
              <div>
                <table class="table mb-0" v-if="is_purchasedHistory">
                  <thead class="thead-light">
                    <tr>
                      <th scope="col">Order ID</th>
                      <th scope="col"> Item</th>
                      <th scope="col">Date</th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in purchasedHistory" :key="index">
                      <td>{{ item.purchasedHistory._id }}</td>
                      <td
                        >{{ item.catagory_name }}
                        {{ item.sub_name ? ' - ' + item.sub_name : null }}</td
                      >
                      <td>{{
                        item.purchasedHistory &&
                          item.purchasedHistory.createdAt.substring(0, 10)
                      }}</td>
                      <td>{{ item.sub_price && item.sub_price }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </b-modal> -->
            <b-modal
              id="modal-xl"
              size="lg"
              v-model="showmodalPermission"
              ref="modalPermission"
              title=" permission"
              @hidden="resetModal"
              @ok="handleOk"
            >
              <div>
                <b-form-group label-cols-lg="3" label="influencer Permission :">
                  <div>
                    <b-form-checkbox
                      style="display: flex;
                        align-items: center;"
                      v-model="premiumPermission"
                    >
                    </b-form-checkbox>
                  </div>
                </b-form-group>
              </div>
            </b-modal>

            <!-- <b-modal
              hide-footer
              id="modal-xl"
              size="lg"
              v-model="downlineMemberModal"
              ref="downlineMemberModal"
              title="downline member"
              @hidden="
                {
                }
              "
            >
            </b-modal> -->
          </div>
        </div>
      </div>
    </div>
    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :on-cancel="onCancel"
      :is-full-page="true"
    ></loading>
  </Layout>
</template>
