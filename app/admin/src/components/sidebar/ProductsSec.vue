<template>
    <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse"
            :data-bs-target="collapseIdTarget" aria-expanded="false">
            <h4>{{ title }}</h4> 
        </button>
        <div class="collapse" :id="collapseId">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li><a href="/product" class="nav-link rounded">Products ALL</a></li>
                <li><a href="/product/create" class="nav-link rounded">Create</a></li>
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
  