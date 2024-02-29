<template>
  <div class="dropdown mb-3">
      <a href="#" class="d-flex align-items-center text-dark text-decoration-none dropdown-toggle"
        data-bs-toggle="dropdown" aria-expanded="false">
        <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2">
        <strong>{{ $t("t-sidebar.footer.menu-profile.text") }}</strong>
      </a>
      <ul class="dropdown-menu dropdown-menu-dark text-small shadow" style="">
        <li><a class="dropdown-item" href="#">{{ $t("t-sidebar.footer.menu-profile.setting") }}</a></li>
        <li><a class="dropdown-item" href="#">{{ $t("t-sidebar.footer.menu-profile.profile") }}</a></li>
        <li>
          <hr class="dropdown-divider">
        </li>
        <li><router-link class="dropdown-item" :to="{ name: 'logout' }">{{ $t("t-sidebar.footer.menu-profile.signout") }}</router-link></li>
      </ul>
    </div>
</template>
    
<script>
  
  export default {
    methods: { },
  };
  
  </script>
    