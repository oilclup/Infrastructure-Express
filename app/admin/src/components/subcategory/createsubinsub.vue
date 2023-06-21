<script>
import appConfig from '@src/app.config'
// import Layout from '@layouts/main'
import axios from '@/axios'
// import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
// import { validationMixin } from 'vuelidate'
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
    // Layout,
    // vueDropzone: vue2Dropzone,
    // PageHeader
  },
  props: {
    categorycode: {
      type: String,
      // default: '',
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
        is_coming: false,
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
    }
  },
  validations: {
    form: {
      name: {
        required,
      },
    },
  },
  mounted() {
    this.initialUpdateItem()
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name]
      return $dirty ? !$error : null
    },
    async formSubmit() {
      console.warn(555555)
      this.$v.form.$touch()
      if (this.$v.form.$anyError) {
        return
      }
      const data = new FormData()

      data.append('name', this.form.name)
      data.append('category_code', this.categorycode)
      const queryId = this.$route.query.id
      const request = !this.isEdit
        ? axios.post('/api/subcategory', data)
        : axios.patch(`/api/subcategory/get/getsub/${queryId}`, data)
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
      const id = this.$route.query.id
      if (!id) return

      await axios.get(`/api/subcategory/get/getsub/${id}`).then((res) => {
        // this.form = { ...this.form, ...res.data }
        this.form = res.data
        this.isEdit = true

        // var file = { size: 123, name: 'Icon', type: 'image/png' }

        // var url = `${this.baseImageUrl}/${this.form.sub_image}`
        // this.$refs.myVueDropzone.manuallyAddFile(file, url)
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
          <label class="mt-1">Title</label>
          <b-form-input
            id="title"
            v-model="$v.form.name.$model"
            placeholder="Enter content title..."
            name="title"
            type="text"
            :state="validateState('name')"
            aria-describedby="input-1-live-feedback"
          ></b-form-input>
          <b-form-invalid-feedback id="input-1-live-feedback"
            >This is a required field</b-form-invalid-feedback
          >
        </b-form-group>

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
