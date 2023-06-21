<script>
import axios from '@/axios'
import { vueVimeoPlayer } from 'vue-vimeo-player'
import Pagination from '@src/components/base/pagination'
import Search from '@src/components/base/search'
import { BASE_IMAGE_URL } from '@src/config/configs'

/**
 * Contents component
 */
export default {
  components: {
    vueVimeoPlayer,
    Pagination,
    Search,
    vueVimeoPlayer,
  },
  props: {
    category_code: {
      type: String,
    },
    sub_id: {
      type: String,
    },
    fighter_id: {
      type: Array,
    },
    sub_subcategory_id: {
      type: Array,
    },
  },
  data() {
    return {
      search_types: [{ key: 'content_title', value: 'Title' }],
      sortByList: [{ key: 'Title', value: 'content_title' }],
      search: {},
      dataVideo: [],
      search: {},
      page: 1,
      data: [],
      pagination: {},
      sort_by: '',
    }
  },
  mounted() {
    this.getVideos()
  },
  methods: {
    onPage(page) {
      this.page = page
      this.getVideos()
    },
    onSearch(search) {
      this.search = search
      this.page = 1
      this.getVideos()
    },

    async getVideos() {
      let body = {}

      body.category_code = this.category_code
      body.sub_id = this.sub_id ? this.sub_id : undefined
      body.fighter_id = this.fighter_id ? this.fighter_id : undefined
      body.sub_subcategory_id = this.sub_subcategory_id
        ? this.sub_subcategory_id
        : undefined

      const result = await axios.post(`/api/video/get`, {
        ...body,
        params: {
          page: this.page,
          ...this.search,
          sort_by: this.sort_by,
          orderByField: 'createdAt',
          orderBy: 'asc',
        },
      })

      this.dataVideo = result.data.data
      this.pagination = res.data
    },

    async handleClickDeleteVideo(targetvideo) {
      var confirmDel = confirm('Are you sure you want to delete?')

      if (!confirmDel) return
      let body = {
        video_id: targetvideo._id,
        vimeoid: targetvideo.vimeoid,
      }
      body.category_code = this.category_code ? this.category_code : undefined
      body.sub_id = this.sub_id ? this.sub_id : undefined
      body.fighter_id = this.fighter_id ? this.fighter_id : undefined
      body.sub_subcategory_id = this.sub_subcategory_id
        ? this.sub_subcategory_id
        : undefined

      await axios
        .patch(`/api/video`, body)
        .then((result) => {
          this.getVideos()
        })
        .catch((err) => {})
    },
    async handleClickEditVideo(x) {
      let path

      // if (this.category_code == 'M001') {
      // path = this.$route.fullPath + '/create'
      // }
      // if (this.sub_id) {
      //   console.log(this.$route.params)
      path = `/category/editvideo`
      // }

      this.$router.push({
        path: path,
        query: { obj: x },
      })
    },
    async searchByHashtag(x) {
      this.search = {
        hashtag: x._id,
      }
      this.onLoad()
    },
  },
}
</script>

<template>
  <div class="card">
    <div class="card-header">
      <Search :types="search_types" @onSearch="onSearch($event)">
        <div class="input-group" style="margin-right:5px">
          <div class="input-group-prepend">
            <label class="input-group-text">Sort by:</label>
          </div>
          <select class="custom-select" v-model="sort_by" @change="onLoad()">
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
              <th scope="col">video</th>
              <th scope="col">Thumbnail</th>
              <th scope="col">Title</th>
              <!-- <th scope="col">Description</th> -->
              <th scope="col">status</th>

              <th scope="col" class="thcenter">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in dataVideo" :key="index">
              <td scope="row">{{ ++index }}</td>
              <td>
                <iframe
                  :src="`https://player.vimeo.com/video/${item.vimeoid}`"
                  width="350"
                  height="200"
                  frameborder="0"
                  allow="  fullscreen"
                  allowfullscreen
                ></iframe>
              </td>

              <td style="width: 15%">
                <img
                  style="height: 200px; width: 350px; "
                  :src="item.thumnail"
                />
              </td>
              <td>{{ item.name }}</td>

              <td>
                <b-badge v-if="item.islock" variant="secondary">Lock</b-badge>
                <b-badge v-else variant="primary">Free</b-badge>
              </td>

              <td class="d-flex">
                <button
                  class="btn btn-warning p-0 px-2 py-1 mr-2"
                  @click="handleClickEditVideo(item)"
                  >Edit</button
                >

                <b-button
                  @click="handleClickDeleteVideo(item)"
                  class="btn btn-danger p-0 px-2 py-1"
                  v-b-modal.modal-center
                  >Delete</b-button
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination :data="pagination" :page="page" @onPage="onPage($event)" />
    </div>
  </div>
</template>
