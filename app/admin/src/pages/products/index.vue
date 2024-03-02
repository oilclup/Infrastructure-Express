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
          this.items = resp.data.data.data
        } catch (error) {
          this.$swalError("ERROR !", error.response.data.error.message);

        }
      }
    },
    
  };
  </script>