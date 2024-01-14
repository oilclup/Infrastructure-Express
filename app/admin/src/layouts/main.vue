<script>
import Vertical from '@layouts/vertical'

export default {
  components: { Vertical },
  data() {
    return {}
  },
  computed: {
  },
  methods: {},
}
</script>

<template>
  <div>
    <Vertical>
      <slot />
    </Vertical>

  </div>
</template>