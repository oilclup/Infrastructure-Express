<template>
  <Layout>
    <div>
     <Headerbar :title="$t('t-sidebar.dashboard.header')" />
      <div class="row">
        <div class="col-sm"><Cardboard title="total" :total="items.length" /></div>
        <div class="col-sm"><Cardboard title="total" :total="items.length" /></div>
        <div class="col-sm"><Cardboard title="total" :total="items.length" /></div>
      </div>
    </div>

  </Layout>
</template>

<script>
import Layout from '@layouts/main'
import Cardboard from '@components/card/Cardboard'
import Headerbar from '@components/Headerbar'

import axios from '@/axios'

export default {
  name: 'Profile',
  components: {
    Layout,
    Cardboard,
    Headerbar
  },
  data() {
    return {
      items: []
    };
  },
  async created() {
   await this.getExample()
  },
  async mounted() {
   console.log("c", this.$store.state.auth);
    /*  if (!this.currentUser) {
          this.$router.push('/login');
        } */
  },
  methods: {
    async getExample() {
      try {
        let resp = await axios.get('/api/example')
        this.items = resp.data.data.data
      } catch (error) {        
        this.$swalError("ERROR !", error.response.data.error.message);
      }
    }
  },
  
};
</script>