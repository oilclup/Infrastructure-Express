<template>
  <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse" >
      <div class="position-sticky pt-3" style="height: 100vh;">
      <ul class="list-unstyled ps-0 mt-3">
      <li class="mb-1">
        <button class="btn btn-toggle rounded collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
          <h4>Dashboard</h4>
        </button>
        <div class="collapse" id="dashboard-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 h6">
            <li><a href="#" class="nav-link rounded">Overview</a></li>
            <li><a href="#" class="nav-link rounded">Weekly</a></li>
            <li><a href="#" class="nav-link rounded">Monthly</a></li>
            <li><a href="#" class="nav-link rounded">Annually</a></li>
          </ul>
        </div>
      </li>
      <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
          <h4>Orders</h4>
        </button>
        <div class="collapse" id="orders-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" class="nav-link rounded">New</a></li>
            <li><a href="#" class="nav-link rounded">Processed</a></li>
            <li><a href="#" class="nav-link rounded">Shipped</a></li>
            <li><a href="#" class="nav-link rounded">Returned</a></li>
          </ul>
        </div>
      </li>
      <li class="border-top my-3"></li>
      <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
          <h4>Account</h4>
        </button>
        <div class="collapse" id="account-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" class="nav-link rounded">New...</a></li>
            <li><a href="#" class="nav-link rounded">Profile</a></li>
            <li><a href="#" class="nav-link rounded">Settings</a></li>
            <li><a href="#" class="nav-link rounded">Sign out</a></li>
          </ul>
        </div>
      </li>
    </ul>
    </div>
  </nav>
  
</template>
<script>

export default {
    components: {},
    props: {},
    data() {
        return {}
    },
    computed: {},
    methods: {},
}
</script>