<template>
  <li class="mb-1">
      <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse"
          :data-bs-target="collapseIdTarget" aria-expanded="false">
          <h4>{{ title }}</h4> 
      </button>
      <div class="collapse" :id="collapseId">
          <ul class="nav flex-column btn-toggle-nav list-unstyled fw-normal pb-1 h6">
              <li class="nav-item"><a href="/employee" class="nav-link text-dark">Employee ALL</a></li>
              <li class="nav-item"><a href="/employee/create" class="nav-link text-dark">Create</a></li>
          </ul>
      </div>
  </li>
</template>

<script>
export default {
  props: {
      title: {
          type: String,
          default: ''
      },
      collapseId: {
          type: String,
          default: ''
      }
  },
  computed: {
      collapseIdTarget() {
          return `#${this.collapseId}`;
      }
  }
};

</script>
