<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main'
import axios from '@/axios'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import { validationMixin } from 'vuelidate'
import { required, decimal } from 'vuelidate/lib/validators'
import { BASE_IMAGE_URL } from '@src/config/configs'

// import PageHeader from '@components/page-header'

/**
 * Contents component
 */
export default {
  page: {
    title: 'Contents',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: {
    Layout,
    vueDropzone: vue2Dropzone,

    // PageHeader
  },
  props: {
    categoryCode: {
      type: String,
    },
  },
  data() {
    return {
      baseImageUrl: BASE_IMAGE_URL,

      isEdit: false,
      ismanuallyadd: false,

      form: {
        sub_name: '',
        sub_price: '',
        sub_fighter: '',
        sub_image: {},
      },

      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 340,
        maxFilesize: 100,
        maxFiles: 1,
        addRemoveLinks: true,
        dictDefaultMessage: "<i class='fa fa-cloud-upload'></i> UPLOAD ME",
      },
      subcategory_id: '',
      subinsub_id: '',
    }
  },
  validations: {
    form: {
      sub_name: {
        required,
      },
      sub_fighter: {
        required,
      },
      sub_price: {
        required,
        decimal,
      },
    },
  },
  mounted() {
    this.subcategory_id = this.$route.params.id
    // console.log(this.subcategory_id, 6666, this.$route.params)
    this.subinsub_id = this.$route.params.subid
    this.initialUpdateItem()
  },
  methods: {
    validateState(name) {
      // const { $dirty, $error } = this.$v.form[name]
      // return $dirty ? !$error : null
    },
    async formSubmit() {
      if (!this.form.sub_image) {
        alert('Image field must not be empty ')
        return
      }
      this.$v.form.$touch()
      if (this.$v.form.$anyError) {
        return
      }
      const data = new FormData()
      let image = this.form.sub_image
      if (!this.ismanuallyadd) {
        data.append('image', image)
      }

      data.append('sub_name', this.form.sub_name)
      data.append('sub_price', this.form.sub_price)
      // data.append('is_coming', this.form.is_coming)
      data.append('sub_fighter', this.form.sub_fighter)
      data.append('subcategory_id', this.subcategory_id)
      const queryId = this.$route.query.id
      const request = !this.isEdit
        ? axios.post('/api/subcategory/subinsub', data)
        : axios.patch(
            `/api/subcategory/update/subinsub/${this.subinsub_id}`,
            data
          )
      await request
        .then((result) => {
          this.$router.back()
        })
        .catch((err) => {
          alert(err.response.data.error.message)
        })
    },
    vfileAdded(file) {
      this.form.sub_image = file
      this.ismanuallyadd = false
    },
    vfilemanuallyAdded(file) {
      this.ismanuallyadd = true
    },
    async initialUpdateItem() {
      const id = this.$route.params.subid

      // console.log(id)
      if (!id) return

      await axios.get(`/api/subcategory/get/subinsub/${id}`).then((res) => {
        // console.log(res.data)
        this.form = { ...this.form, ...res.data }
        this.isEdit = true

        var file = { size: 123, name: 'Icon', type: 'image/png' }

        var url = `${this.baseImageUrl}/${this.form.sub_image}`
        this.$refs.myVueDropzone.manuallyAddFile(file, url)
      })
    },
  },
}
</script>

<template>
  <b-form class="form-horizontal" @submit.prevent="formSubmit">
    <div class="row center">
      <div class="col-7">
        <b-form-group label-cols-lg="0">
          <label>
            Image
            <small class="color-text-small"
              >Width 170 x Height 120. Just only one.</small
            >
          </label>
          <vue-dropzone
            id="form-image"
            ref="myVueDropzone"
            :options="dropzoneOptions"
            @vdropzone-file-added="vfileAdded"
          ></vue-dropzone>
        </b-form-group>

        <b-form-group label-cols-lg="0">
          <label>Title</label>
          <b-form-input
            id="title"
            v-model="$v.form.sub_name.$model"
            placeholder="Enter content title..."
            name="title"
            type="text"
            :state="validateState('sub_name')"
            aria-describedby="input-1-live-feedback"
          ></b-form-input>
          <b-form-invalid-feedback id="input-1-live-feedback"
            >This is a required field</b-form-invalid-feedback
          >
        </b-form-group>

        <b-form-group label-cols-lg="0">
          <label>Fighter</label>
          <b-form-input
            id="title"
            v-model="$v.form.sub_fighter.$model"
            placeholder="Enter content title..."
            name="title"
            type="text"
            :state="validateState('sub_fighter')"
            aria-describedby="input-1-live-feedback"
          ></b-form-input>
          <b-form-invalid-feedback id="input-1-live-feedback"
            >This is a required field</b-form-invalid-feedback
          >
        </b-form-group>

        <b-form-group label-cols-lg="0">
          <label>
            Price
            <small class="color-text-small">Number only.</small>
          </label>
          <b-form-input
            id="title"
            v-model="$v.form.sub_price.$model"
            placeholder="Enter price ..."
            name="title"
            type="text"
            :state="validateState('sub_price')"
            aria-describedby="input-2-live-feedback"
          ></b-form-input>
          <b-form-invalid-feedback id="input-2-live-feedback"
            >This is a required field</b-form-invalid-feedback
          >
        </b-form-group>

        <!-- <b-form-group label-cols-lg="0">
          <label>Status</label>
          <b-form-checkbox v-model="form.is_coming" switch size="lg"
            >coming soon</b-form-checkbox
          >
        </b-form-group> -->
        <b-form-group>
          <button
            type="button"
            class="btn btn-danger width-lg rounded-pill aligncenter float-left"
            @click="() => this.$router.back()"
          >
            <feather type="x"></feather>Cancel
          </button>

          <button
            type="submit"
            class="btn btn-primary width-lg rounded-pill aligncenter float-right"
          >
            <feather type="file-plus"></feather>Save
          </button>
        </b-form-group>
      </div>
    </div>
  </b-form>
</template>
