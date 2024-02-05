<template>
    <Layout>
      <div>
        <Headerbar title="Employee" />
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
    name: 'EmployeesPage',
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
     await this.getEmployee()
    },
    async mounted() {

    },
    methods: {
      async getEmployee() {
        try {
          let resp = await axios.get('/api/employee')
          console.log("data", resp)
          this.items = resp.data.data.data
        } catch (err) {
          console.log("dashborad Err : ", err)
          this.$swalError('Oops!', 'Something went wrong.');
        }
      }
    },
    
  };
  </script>