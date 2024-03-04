<template>
  <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-3 shadow">
    <div class="navbar-nav">
      <div class="nav-item text-nowrap">
        <button class="navbar-toggler d-md-none collapsed me-1" type="button" data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation"
          @click="toggleSidebar">
          <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="#">Company name</a>
      </div>
    </div>
    <div class="hstack gap-3 me-5">
      <MenuProfile />
      <div class="vr text-white"></div>
      <MultiLang />
    </div>
</header>
</template>

<script>
import DropdownMultiLang from '@components/sidebar/dropdown/MultiLang.vue';
import MenuProfile from '@components/sidebar/dropdown/MenuProfile.vue';
import MultiLang from '@components/sidebar/dropdown/MultiLang.vue';

export default {
  components: {
    DropdownMultiLang,
    MenuProfile,
    MultiLang
  },
  props: {},
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>
