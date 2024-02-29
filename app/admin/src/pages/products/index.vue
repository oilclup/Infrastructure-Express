<template>
    <Layout>
      <div>
        <Headerbar title="Products" />
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
    name: 'ProductsPage',
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

    },
    methods: {
      async getExample() {
        try {
          let resp = await axios.get('/api/example')
          console.log("data", resp)
          this.items = resp.data.data.data
        } catch (err) {
          console.log("dashborad Err : ", err)
          this.$swalError("ERROR !', 'something went wrong please try again later");
        }
      }
    },
    
  };
  </script>