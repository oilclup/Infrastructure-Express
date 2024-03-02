<template>
  <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-2 shadow">
    <div class="navbar-nav">
      <div class="nav-item text-nowrap">
        <button class="navbar-toggler d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation" @click="toggleSidebar">
          <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="#">Company name</a>

      </div>
    </div>
    <div>
      <MenuProfile />
    </div>
  </header>
</template>
<script>
import DropdownMultiLang from '@components/sidebar/dropdown/MultiLang.vue';
import MenuProfile from '@components/sidebar/dropdown/MenuProfile.vue';
export default {
  components: {
    DropdownMultiLang,
    MenuProfile
  },
  props: {},
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>

