<template>
  <Layout >
  <div>
    <p><strong>Token:</strong></p>
    <p><strong>Id:</strong></p>
    <p><strong>Email:</strong></p>
    <strong>Authorities:</strong>
    <ul></ul>
  </div>
</Layout>
</template>

<script>
import Layout from '@layouts/main'

export default {
  name: 'Profile',
  components: {
    Layout,
  },
  computed: {
    // currentUser() {
    //   return this.$store.state.auth.user;
    // }
  },
  mounted() {
    console.log("c", this.$store.state.auth);

    /*  if (!this.currentUser) {
          this.$router.push('/login');
        } */
  }
};
</script>