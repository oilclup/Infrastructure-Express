<template>
    <div class="dropdown">
          <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle me-2">
            <strong class="text-white">{{ $t("t-sidebar.footer.menu-profile.text") }}</strong>
          </a>
          <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser1">
            <li><a class="dropdown-item" href="#">{{ $t("t-sidebar.footer.menu-profile.setting") }}</a></li>
            <li><a class="dropdown-item" href="#">{{ $t("t-sidebar.footer.menu-profile.profile") }}</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><router-link class="dropdown-item" :to="{ name: 'logout' }">Sign out</router-link></li>
          </ul>
    </div>
</template>
    
<script>
  
  export default {
    methods: { },
  };
  
  </script>
    