<template>
  <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse" >
    <div class="position-sticky pt-3" style="height: 100vh;">
      <ul class="list-unstyled ps-0 mt-3">
        <li  class="mb-1">
          <a href="/"  class="btn">
            <h4>Dashboard</h4>
          </a>
      <!--     <div class="collapse" id="dashboard-collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 h6">
              <li><a href="#" class="nav-link rounded">Overview</a></li>
              <li><a href="#" class="nav-link rounded">Weekly</a></li>
              <li><a href="#" class="nav-link rounded">Monthly</a></li>
              <li><a href="#" class="nav-link rounded">Annually</a></li>
            </ul>
          </div> -->
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
