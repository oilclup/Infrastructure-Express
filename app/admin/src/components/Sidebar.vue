<template>
    <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
    <div class="position-sticky pt-3" style="height: 100vh;">
      <ul class="list-unstyled mt-3">
        <li class="mb-1">
          <a href="/" class="btn btn-toggle rounded collapsed">
            <h4>{{ $t("t-sidebar.dashboard.header") }}</h4>
          </a>
        </li>
        <li class="border-top my-3"></li>

        <!-- Import and use -->
        <ProductsSec v-if="isAllowedRoles('admin','superAdmin')" :title="$t('t-sidebar.products.header')" collapseId="products-collapse" />
        <EmployeeSec v-if="isAllowedRoles('admin','superAdmin')" :title="$t('t-sidebar.employee.header')" collapseId="employees-collapse" />

      </ul>
    </div>
    <!-- <DropdownMultiLang />
    <hr />
    <MenuProfile />  -->
  </nav>
 
</template>

<script>
import ProductsSec from '@components/sidebar/ProductsSec.vue';
import EmployeeSec from '@components/sidebar/EmployeeSec.vue';
import DropdownMultiLang from '@components/sidebar/dropdown/MultiLang.vue';
import MenuProfile from '@components/sidebar/dropdown/MenuProfile.vue';

export default {
  components: {
    ProductsSec,
    EmployeeSec,
    DropdownMultiLang,
    MenuProfile
  },
  props: {},
  data() {
    return {
      role: '',
    }
  },
  created() {
   let role = this.$store.state.auth.currentUser.data.data.role
   this.role = role ? role : console.log("role undefined")
  },
  async mounted() {
  },
  computed: {},
  methods: {
    isAllowedRoles(...roles) {
      return roles.includes(this.role);
    },
   
  }
}
</script>
