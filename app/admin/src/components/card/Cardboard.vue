<template>
    <div>
        <div class="card" aria-hidden="true">
            <div v-if="isReady" class="card-body">
                <h5 class="card-title">{{ title }}</h5>
                <p class="card-text">{{ total }}</p>
            </div>

            <div v-else class="card-body">
                <h5 class="card-title placeholder-glow">
                    <span class="placeholder col-6"></span>
                </h5>
                <p class="card-text placeholder-glow">
                    <span class="placeholder col-7"></span>
                    <span class="placeholder col-4"></span>
                    <span class="placeholder col-4"></span>
                    <span class="placeholder col-6"></span>
                    <span class="placeholder col-8"></span>
                </p>
            </div>
        </div>


    </div>
</template>
  
<script>
import Layout from '@layouts/main'

export default {
    name: 'Cardboard',
    components: {
        Layout,
    },
    props: {
     title: {
      type: String,
      required: true
     },
     total: {
      type: Number,
      required: true
     }
    },
    data() {
      return {
        isReady: false
      };
    },
    mounted() {
    setTimeout(() => {
      this.isReady = true;
    }, 2000); 
    }
 
};
</script>