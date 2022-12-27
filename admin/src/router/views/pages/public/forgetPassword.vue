<script>
import Layout from '@layouts/default'
import { authMethods } from '@state/helpers'
import appConfig from '@src/app.config'
import axios from '@/axios'

export default {
  page: {
    title: 'Forget Password',
    meta: [
      { name: 'description', content: `Forget Password to ${appConfig.title}` },
    ],
  },
  components: { Layout },
  data() {
    return {
      password: '',
      confirmPassword: '',
      error: '',
      successMessage: '',
    }
  },
  computed: {},
  methods: {
    ...authMethods,
    // Try to register the user in with the email, fullname
    // and password they provided.
    async tryToReset() {
      if (!this.password || !this.confirmPassword) {
        this.error = 'Please enter new password and confirm password'
        return
      }
      let token = this.$route.query.token
      await axios
        .post(`/customers/reset/${token}`, {
          password: this.password,
          confirmPassword: this.confirmPassword,
        })
        .then((res) => {
          this.password = ''
          this.confirmPassword = ''
          this.error = ''
          this.successMessage = res.data.message
        })
        .catch((err) => {
          this.successMessage = ''
          this.error = err.response.data.error.message
        })
    },
  },
}
</script>

<template>
  <Layout>
    <div class="account-pages my-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-7">
            <div class="card">
              <div class="card-body p-0">
                <div class="row">
                  <div class="col  p-5">
                    <div class="mx-auto mb-5">
                      <a href="/">
                        <!-- <img src="@assets/images/logo.png" alt height="24" /> -->
                        <h3 class="d-inline align-middle ml-1 text-logo"
                          >Muaythai iyarin</h3
                        >
                      </a>
                    </div>

                    <h6 class="h5 mb-0 mt-4">Reset Password</h6>
                    <!-- <p class="text-muted mt-1 mb-5">Enter your New Password</p> -->

                    <br />
                    <div class="alert alert-success" v-show="successMessage">{{
                      successMessage
                    }}</div>
                    <div class="alert alert-danger" v-show="error">{{
                      error
                    }}</div>

                    <form
                      action="#"
                      class="authentication-form"
                      oninput='up2.setCustomValidity(up2.value != up.value ? "Passwords do not match." : "")'
                      @submit.prevent="tryToReset"
                    >
                      <div class="form-group">
                        <label class="form-control-label">New Password</label>
                        <div class="input-group input-group-merge">
                          <div class="input-group-prepend"> </div>
                          <input
                            id="email"
                            v-model="password"
                            type="password"
                            class="form-control"
                            name="up"
                          />
                        </div>
                      </div>

                      <div class="form-group">
                        <label class="form-control-label"
                          >Confirm New password</label
                        >
                        <div class="input-group input-group-merge">
                          <div class="input-group-prepend"> </div>
                          <input
                            v-model="confirmPassword"
                            id="email"
                            type="password"
                            class="form-control"
                            name="up2"
                          />
                        </div>
                      </div>

                      <div class="form-group mb-0 text-center">
                        <button class="btn btn-primary btn-block" type="submit"
                          >Reset password</button
                        >
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <!-- end card-body -->
            </div>
            <!-- end card -->

            <!-- end row -->
          </div>
          <!-- end col -->
        </div>
        <!-- end row -->
      </div>
      <!-- end container -->
    </div>
  </Layout>
</template>

<style lang="scss" module></style>
