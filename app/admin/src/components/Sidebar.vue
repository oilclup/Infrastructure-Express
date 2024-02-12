<template>
  <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
    <div class="position-sticky pt-3" style="height: 100vh;">
      <ul class="list-unstyled mt-3">
        <li class="mb-1">
          <a href="/" class="btn btn-toggle rounded collapsed"><h4>Dashboard</h4></a>
        </li>
        <li class="border-top my-3"></li>

        <!-- Import and use ProductsSec -->
        <ProductsSec :title="'Products'" collapseId="products-collapse" />
        <EmployeeSec :title="'Employees'" collapseId="employees-collapse" />

      </ul>
    </div>
  </nav>
</template>

<script>
import ProductsSec from '@components/sidebar/ProductsSec.vue';
import EmployeeSec from '@components/sidebar/EmployeeSec.vue';

export default {
  components: {
    ProductsSec,
    EmployeeSec
  },
  props: {},
  data() {
    return {
      userRole: 'admin'
    }
  },
  async mounted() {
    console.log("sidebar", this.$store.state.auth.currentUser.data.data.role);
  },
  computed: {},
  methods: {},
}
</script>
