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
    category_code: {
      type: String,
    },
  },
  data() {
    return {
      baseImageUrl: BASE_IMAGE_URL,

      isEdit: false,
      ismanuallyadd: false,
      data: {},
      form: {
        sub_name: '',
        sub_price: '',
        iapProductId: '',
        is_coming: false,
        sub_image: {},
        tag_data: '',
        fighter_name: '',
        description: '',
      },
      options: [
        { value: true, text: 'Hide' },
        { value: false, text: 'Show' },
      ],
      optionsTag: [{ value: '', text: '' }],
      optionsFighter: [{ value: '', text: '' }],

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
      sub_name: {
        required,
      },
      iapProductId: {
        // required,
      },
      sub_price: {
        required,
        decimal,
      },
    },
  },
  mounted() {
    this.initialUpdateItem()
    this.getCourseTags()
    this.getFighters()
    this.onLode()
  },
  methods: {
    async onLode() {
      await axios
        .get(`/api/category/${this.$route.params.id}`)
        .then((res) => {
          this.data = res.data
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    async getCourseTags() {
      const data = await axios
        .get('/api/coursetag')
        .then((res) => res.data)
        .catch((err) => {
          this.$toast.error(err.response.data.error.message)
        })
      data.map((x) => {
        x.value = x._id
        x.text = x.tag_name
      })

      this.optionsTag = [{ value: '', text: '' }, ...data]
    },
    async getFighters() {
      const data = await axios
        .get('/api/fighter')
        .then((res) => res.data)
        .catch((err) => {
          this.$toast.error(err.response.data.error.message)
        })

      data.map((x) => {
        x.value = x._id
        x.text = x.fighter_name
      })
      this.optionsFighter = [{ value: '', text: '' }, ...data]
    },
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name]
      return $dirty ? !$error : null
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
      data.append('description', this.form.description)
      data.append('sub_name', this.form.sub_name)
      data.append('sub_price', this.form.sub_price)
      data.append('is_coming', this.form.is_coming)
      data.append('iapProductId', this.form.iapProductId)

      data.append('category_code', this.category_code)
      this.form.tag_data && data.append('tag_data', this.form.tag_data)
      this.form.fighter_name &&
        data.append('fighter_name', this.form.fighter_name)

      const queryId = this.$route.query.id
      const request = !this.isEdit
        ? axios.post('/api/category/subcategory', data)
        : axios.patch(`/api/subcategory/${queryId}`, data)
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
      // const obj = this.$route.query.obj
      // console.log(obj)

      const id = this.$route.query.id
      if (!id) return

      await axios.get(`/api/subcategory/${id}`).then((res) => {
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
            <small class="color-text-small">
              {{
                form.tag_data || data.is_tag
                  ? 'Width 750 x Height 460. Just only one'
                  : 'Width 750 x Height 340. Just only one'
              }}.</small
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
          <label>Description</label>
          <b-form-input
            id="description"
            placeholder="Enter description..."
            name="description"
            type="text"
            v-model="form.description"
          ></b-form-input>
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
            >This is a required field and Number only</b-form-invalid-feedback
          >
        </b-form-group>

        <!-- <b-form-group label-cols-lg="0">
          <label>Status</label>
          <b-form-checkbox v-model="form.is_coming" switch size="lg"
            >coming soon</b-form-checkbox
          >
        </b-form-group>-->

        <b-form-group label-cols-lg="0">
          <label>Status</label>

          <div>
            <b-form-select
              v-model="form.is_coming"
              :options="options"
            ></b-form-select>
          </div>
        </b-form-group>
        <div>
          <b-form-group label-cols-lg="0">
            <label>Tag</label>

            <div>
              <b-form-select
                v-model="form.tag_data"
                :options="optionsTag"
              ></b-form-select>
            </div>
          </b-form-group>

          <b-form-group
            label-cols-lg="0"
            v-if="this.form.tag_data || data.is_tag"
          >
            <label>Fighter Name</label>
            <!-- <b-form-input
              id="FighterName"
              v-model="form.fighter_name"
              name="FighterName"
              type="text"
            ></b-form-input>
            <b-form-invalid-feedback id="input-2-live-feedback"
              >This is a required field</b-form-invalid-feedback
            > -->
            <div>
              <b-form-select
                v-model="form.fighter_name"
                :options="optionsFighter"
              ></b-form-select>
            </div>
          </b-form-group>
        </div>
        <b-form-group label-cols-lg="0">
          <label>
            Product Id
            <small class="color-text-small">*</small>
          </label>
          <b-form-input
            id="title"
            v-model="$v.form.iapProductId.$model"
            placeholder="Enter Product Id ..."
            name="title"
            type="text"
            :state="validateState('iapProductId')"
            aria-describedby="input-2-live-feedback"
          ></b-form-input>
          <b-form-invalid-feedback id="input-2-live-feedback"
            >This is a required field
          </b-form-invalid-feedback>
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
