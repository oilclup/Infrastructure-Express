<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main'
import axios from '@/axios'
import { BASE_IMAGE_URL } from '@src/config/configs'
import Pagination from '@src/components/base/pagination'
import Search from '@src/components/base/search'
import moment from 'moment'

// import PageHeader from '@components/page-header'

/**
 * Contents component
 */
export default {
  page: {
    title: 'Add Fighter',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: {
    Pagination,
    Search,
    // PageHeader
  },
  data() {
    return {
      baseImageUrl: BASE_IMAGE_URL,
      value: [
        {
          sub_data: [],
          _id: '5f0f9709cc583b29dc03ff6c',
          url: 'https://vimeo.com/438731511',
          thumnail:
            'https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F925014815_1920x1080.jpg&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png',
          description: '123',
          name: '1',
          islock: true,
          vimeoid: '438731511',
          createdAt: '2020-07-15T23:53:45.092Z',
          updatedAt: '2020-07-15T23:53:45.092Z',
          __v: 0,
        },
      ],
      options: [],
      isEdit: false,
      text: '',

      search_types: [
        { key: 'content_title', value: 'Title' },
        { key: 'content_text', value: 'Text' },
      ],
      sortByList: [
        { key: 'Title', value: 'content_title' },
        { key: 'Text', value: 'content_text' },
      ],
      search: {},
      page: 1,
      data: [],
      pagination: {},
      sort_by: '',
    }
  },
  mounted() {
    this.initialUpdateItem()
    this.onLoad()
  },
  methods: {
    onPage(page) {
      this.page = page
      this.onLoad()
    },
    onSearch(search) {
      this.search = search
      this.page = 1
      this.onLoad()
    },
    async searchByHashtag(x) {
      this.search = {
        hashtag: x._id,
      }
      this.onLoad()
    },
    async onLoad() {
      // const data = await axios
      //   .get('/api/fighter')
      //   .then((res) => res.data)
      //   .catch((err) => {
      //     alert(err.response.data.message)
      //   })
      // this.options = data
    },

    async handleClickSave() {
      let fighter_id = []

      this.value.map((x) => {
        fighter_id.push(x._id)
      })
      let data = {
        fighter_id: fighter_id,
        sub_id: this.$route.params.id,
      }
      const queryid = this.$route.query.id
      const request = !this.isEdit
        ? axios.post('/api/subcategory/addfighter', data)
        : axios.post('/api/subcategory/update/addfighter', data)
      await request
        .then((res) => {
          this.$router.back()
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },

    async initialUpdateItem() {
      // const queryid = this.$route.query.id
      // if (!queryid) {
      //   return
      // }
      // let obj = await axios.get(`/api/category/getfighter/${queryid}`)
      // obj.data.map((x) => {
      //   this.value.push(x.fighter_id)
      // })
      // console.log(value)
      // // this.value = obj.data
      // this.isEdit = true
      // // })
    },
    async handleClickDeleteContent(id) {
      var confirmDel = confirm('Are you sure you want to delete?')

      if (confirmDel) {
      }
    },
    async formSubmit() {
      // console.log('test')
    },
  },
}
</script>

<template>
  <div class="row center mt-4">
    <div class="col-9">
      <h2>
        <label class="typo__label"> Thai Fighter</label>
      </h2>

      <b-form class="form-horizontal" @submit.prevent="formSubmit">
        <b-form-group label-cols-lg="0">
          <div class="row">
            <b-form-input
              class="w-50"
              v-model="text"
              placeholder="Enter your name"
            ></b-form-input>
            <button type="submit" class=" btn btn-primary ml-2">search</button>
          </div>
        </b-form-group>
      </b-form>

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
                <option v-for="x in sortByList" :key="x.key" :value="x.value">{{
                  x.key
                }}</option>
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
                  <th scope="col" class="text-center">Video</th>
                  <th scope="col" class="text-center">Title</th>
                  <th scope="col">action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(video, index) in value" :key="index">
                  <td style="width: 10%">{{ ++index }}</td>
                  <td>
                    <iframe
                      :src="`https://player.vimeo.com/video/${video.vimeoid}`"
                      width="350"
                      height="200"
                      frameborder="0"
                      allow=" fullscreen"
                      allowfullscreen
                    ></iframe>
                  </td>
                  <td>{{ video.name }}</td>

                  <td class="d-flex">
                    <b-button
                      @click="handleClickDelete(video._id)"
                      class="btn btn-danger p-0 px-2 py-1"
                      v-b-modal.modal-center
                      >Delete</b-button
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
        </div>
      </div>
      <div class="d-flex  justify-content-end mb-5">
        <button
          type="button"
          class="btn btn-danger width-lg rounded-pill aligncenter "
          @click="
            () => {
              this.$router.back()
            }
          "
        >
          <feather type="x"></feather>
          <span>Cancel</span>
        </button>
        <button
          @click="handleClickSave()"
          class="btn btn-primary width-lg rounded-pill aligncenter ml-2 "
        >
          <feather type="file-plus"></feather>
          <span>Save</span>
        </button>
      </div>
    </div>
  </div>
</template>
