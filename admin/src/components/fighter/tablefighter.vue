<script>
import appConfig from '@src/app.config'
import axios from '@/axios'
import { BASE_IMAGE_URL } from '@src/config/configs'
import Multiselect from 'vue-multiselect'

/**
 * Contents component
 */
export default {
  page: {
    title: 'Fighter',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: {
    Multiselect,
    //  PageHeader
  },
  data() {
    return {
      baseImageUrl: BASE_IMAGE_URL,
      fighters: [],
      show: false,
      value: [],
      options: [],

      allSelected: false,
      indeterminate: false,
    }
  },

  mounted() {
    this.getFighters()
  },
  methods: {
    async getFighters() {
      let subId = this.$route.params.id
      axios
        .get(`/api/category/getfighter/${this.$route.params.id}`)
        .then((res) => {
          this.fighters = res.data
        })
        .catch((err) => {
          // console.log(err)
          // alert(err.response.data.message)
        })
    },

    async handleClickDelete(id) {
      // console.log(id)
      var confirmDel = confirm('Are you sure you want to delete?')
      if (confirmDel) {
        await axios
          .patch(`/api/subcategory/delete/FighterData/${id._id}`)
          .then((result) => {
            this.getFighters()
          })
          .catch((err) => {})
      }
    },

    async handleClickEdit(fighter) {
      // console.log(fighter)
      this.$router.push({
        path: `/category/child/sub/form/${this.$route.params.id}`,
        query: { obj: fighter },
      })
    },
    async openModal(data) {
      this.show = true
      this.options = data.fighter_id.video_data
      this.value = data.video_data

      // this.modalVisible = true
    },
    toggleAll(checked) {
      this.selected = checked ? this.flavours.slice() : []
    },
    async handleOk() {
      await this.updateVideoSubFighter()
      this.value = ''
    },
    async updateVideoSubFighter() {},
  },
}
</script>

<template>
  <div class="table-responsive">
    <table class="table mb-0">
      <thead class="thead-light">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Image</th>
          <th scope="col">Name</th>

          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <b-modal
          id="modal-xl"
          size="lg"
          v-model="show"
          ref="modal"
          title=" Video List"
          @ok="handleOk()"
        >
          <table class="table mb-0">
            <thead class="thead-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">video</th>
                <th scope="col">Title</th>
                <th scope="col">status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in value" :key="index">
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

                <td style="width:30%">{{ item.name }}</td>

                <td style="width:30%">
                  <b-badge v-if="item.islock" variant="secondary"
                    >Locked</b-badge
                  >
                  <b-badge v-else variant="primary">Unlock</b-badge>
                </td>
              </tr>
            </tbody>
          </table>
        </b-modal>
        <tr v-for="(fighter, index) in fighters" :key="index">
          <td>{{ ++index }}</td>
          <td style="width: 20%">
            <img
              v-if="fighter.fighter_id"
              style="max-width:170px;height:120px;"
              :src="`${baseImageUrl}/${fighter.fighter_id.fighter_image}`"
              alt
              class="img-fluid"
            />
          </td>
          <td v-if="fighter.fighter_id" style="width: 50%">{{
            fighter.fighter_id.fighter_name
          }}</td>

          <td>
            <button
              class="btn btn-info p-0 px-2 py-1 mr-2"
              @click="openModal(fighter)"
              >View</button
            >

            <button
              class="btn btn-warning p-0 px-2 py-1 mr-2"
              @click="handleClickEdit(fighter)"
              >Edit</button
            >
            <button
              class="btn btn-danger p-0 px-2 py-1"
              @click="handleClickDelete(fighter)"
              >Delete</button
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
