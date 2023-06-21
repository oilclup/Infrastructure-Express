<script>
import VideoInput from 'vue-video-input'
import Loading from 'vue-loading-overlay'

import 'vue-loading-overlay/dist/vue-loading.css'
import axios from '@/axios'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
// import axios from '@/axios'

/**
 * Contents component
 */
export default {
  components: {
    VideoInput,
    vueDropzone: vue2Dropzone,
    Loading,
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
      getValidationState({ dirty, validated, valid = null }) {
        return dirty || validated ? valid : null
      },
      isEdit: false,
      isLoading: false,
      fullPage: true,
      form: {
        name: '',
        description: '',
        image: '',
        video: '',
        islock: false,
        is_send: false,
        notification_title: '',
        notification_text: '',
      },
      options: [
        { value: true, text: 'Lock' },
        { value: false, text: 'Free' },
      ],
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 375,
        thumbnailHight: 230,
        maxFilesize: 1000,
        maxFiles: 1,
        addRemoveLinks: true,
        dictDefaultMessage: "<i class='fa fa-cloud-upload'></i> UPLOAD ME",
      },
    }
  },
  validations: {
    form: {
      name: {
        required,
      },
      video: {
        required,
      },
    },
  },
  mounted() {
    this.initialUpdateItem()
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    doAjax() {
      this.isLoading = true
      // simulate AJAX
    },
    onCancel() {
      // console.log('User cancelled the loader.')
      this.isLoading = false
    },
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name]
      return $dirty ? !$error : null
    },
    async formSubmit() {
      const data = new FormData()

      if (!this.isEdit) {
        this.$v.form.$touch()
        if (this.$v.form.$anyError) {
          return
        }
        // let video = document.querySelector('#form-video')
        // video = video.files['0']
        // data.append('video', video)
      }

      this.doAjax()
      if (this.form.video) {
        data.append('video', this.form.video)
      }
      let image = this.form.image
      if (!this.ismanuallyadd) {
        data.append('image', image)
      }
      data.append('islock', this.form.islock)
      data.append('name', this.form.name)
      data.append('description', this.form.description)
      this.category_code && data.append('category_code', this.category_code)
      this.sub_id && data.append('sub_id', this.sub_id)
      this.fighter_id && data.append('fighter_id', this.fighter_id)
      this.sub_subcategory_id &&
        data.append('sub_subcategory_id', this.sub_subcategory_id)

      if (!this.isEdit && this.form.is_send) {
        data.append('is_send', this.form.is_send)
        data.append('notification_title', this.form.notification_title)
        data.append('notification_text', this.form.notification_text)
      }

      const request = !this.isEdit
        ? axios.post('/api/video/id', data)
        : axios.patch(`/api/video/${this.form._id}`, data)
      await request

        .then((result) => {
          this.$router.back()
        })
        .catch((err) => {
          this.onCancel()
          // this.$toast.error('some thing worng')
          this.$toast.error(err.response.data.error.message)
        })
    },
    vfileAdded(file) {
      this.form.image = file
    },
    async initialUpdateItem() {
      const obj = this.$route.query.obj

      if (!obj) return

      // await axios.get(`/api/video/${id}`).then((res) => {
      this.form = { ...this.form, ...obj }
      this.isEdit = true

      var file = { size: 123, name: 'Icon', type: 'image/png' }
      var url = this.form.thumnail
      this.$refs.myVueDropzone.manuallyAddFile(file, url)
      // })
    },
  },
}
</script>

<template>
  <b-form class="form-horizontal mt-3" @submit.prevent="formSubmit">
    <div class="row center">
      <div class="col-7">
        <iframe
          v-if="this.form.vimeoid"
          class="center"
          :src="`https://player.vimeo.com/video/${this.form.vimeoid}`"
          width="640"
          height="360"
          frameborder="0"
          allow="  fullscreen"
          allowfullscreen
        ></iframe>
        <b-form-group v-else label-cols-lg="0">
          <label>
            Video ID
            <!-- <small class="color-text-small">Just only one , Maximum file size is 500MB</small> -->
          </label>
          <b-input-group>
            <b-input-group-prepend is-text>
              <feather
                type="video"
                class="icon-dual icon-xs align-middle"
              ></feather>
            </b-input-group-prepend>
            <!-- <b-form-file
              id="form-video"
              accept="video/*"
              v-model="$v.form.video.$model"
              :state="validateState('video')"
              aria-describedby="input-3-live-feedback"
            ></b-form-file>-->

            <b-form-input
              id="form-video"
              placeholder="Enter Video ID "
              name="title"
              type="text"
              v-model="$v.form.video.$model"
              :state="validateState('video')"
              aria-describedby="input-3-live-feedback"
            ></b-form-input>
            <b-form-invalid-feedback id="input-3-live-feedback"
              >This is a required field</b-form-invalid-feedback
            >
          </b-input-group>
        </b-form-group>
        <div>
          <a v-if="this.form.vimeoid" :href="this.form.link" target="_blank"
            >Edit Video</a
          >
        </div>
        <b-form-group label-cols-lg="0" v-show="isEdit">
          <label>
            Thumbnail
            <small class="color-text-small"
              >Width 375 x Height 230. Just only one.</small
            >
          </label>
          <vue-dropzone
            @vdropzone-file-added="vfileAdded"
            id="form-image"
            ref="myVueDropzone"
            :options="dropzoneOptions"
          ></vue-dropzone>
        </b-form-group>

        <b-form-group label-cols-lg="0">
          <label>Title</label>
          <b-form-input
            id="title"
            placeholder="Enter title..."
            name="title"
            type="text"
            v-model="$v.form.name.$model"
            :state="validateState('name')"
            aria-describedby="input-1-live-feedback"
          ></b-form-input>
          <b-form-invalid-feedback id="input-1-live-feedback"
            >This is a required field</b-form-invalid-feedback
          >
        </b-form-group>
        <b-form-group label-cols-lg="0">
          <label>Description</label>
          <b-form-textarea
            id="textarea"
            name="Description"
            placeholder="Enter Description text..."
            rows="3"
            max-rows="6"
            v-model="form.description"
          ></b-form-textarea>
        </b-form-group>

        <!-- <b-form-checkbox v-model="form.islock" name="checkbox-1"
          >Lock Video</b-form-checkbox
        >-->

        <b-form-group label-cols-lg="0">
          <label>Type</label>

          <div>
            <b-form-select
              v-model="form.islock"
              :options="options"
            ></b-form-select>
          </div>
        </b-form-group>
        <div v-if="!isEdit">
          <b-form-group label-cols-lg="0">
            <b-container class="bv-example-row">
              <b-row>
                <label>Send Notification *:</label>

                <b-form-checkbox
                  class="ml-2"
                  v-model="form.is_send"
                ></b-form-checkbox>
              </b-row>
            </b-container>
          </b-form-group>
          <div v-if="form.is_send">
            <b-form-group label-cols-lg="0">
              <b-container class="bv-example-row">
                <b-row>
                  <b-col class="p-0 " cols="2"
                    ><label>Notification Title:</label></b-col
                  >
                  <b-col
                    ><b-form-input
                      class="mr-2"
                      v-model="form.notification_title"
                      placeholder="Enter Notification Title"
                    ></b-form-input
                  ></b-col>
                </b-row>
              </b-container>
            </b-form-group>
            <b-form-group>
              <b-container class="bv-example-row ">
                <b-row>
                  <b-col class="p-0" cols="2"
                    ><label>Notification Text:</label></b-col
                  >
                  <b-col>
                    <b-form-input
                      class="mr-2"
                      v-model="form.notification_text"
                      placeholder="Enter Notification Text"
                    ></b-form-input
                  ></b-col>
                </b-row>
              </b-container>
            </b-form-group>
            <!-- <b-form-group label-cols-lg="2" label="Notification Title:">
              <div>
                <b-form-input
                  v-model="form.notification_title"
                  placeholder="Enter Notification Title"
                ></b-form-input>
              </div>
            </b-form-group>

            <b-form-group label-cols-lg="2" label="Notification Text:">
              <div>
                <b-form-input
                  v-model="form.notification_text"
                  placeholder="Enter Notification Text"
                ></b-form-input>
              </div>
            </b-form-group> -->
          </div>
        </div>
        <loading
          :active.sync="isLoading"
          :can-cancel="false"
          :on-cancel="onCancel"
          :is-full-page="fullPage"
        ></loading>
        <b-form-group class="pt-5">
          <button
            type="button"
            class="btn btn-danger width-lg rounded-pill aligncenter float-left"
            @click="
              () => {
                this.$router.back()
              }
            "
          >
            <feather type="x"></feather>Cancel
          </button>

          <button
            type="submit"
            class="btn btn-primary width-lg rounded-pill aligncenter float-right"
          >
            <feather type="file-plus"></feather>
            <span v-if="this.form.vimeoid">Save</span>
            <span v-else>Create</span>
          </button>
        </b-form-group>
      </div>
    </div>
  </b-form>
</template>
