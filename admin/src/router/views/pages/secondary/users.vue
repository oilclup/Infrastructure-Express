<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main'
import PageHeader from '@components/page-header'

/**
 * Starter component
 */
export default {
  page: {
    title: 'Users',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout, PageHeader },
  data() {
    return {
      title: 'Users',
    }
  },
}
</script>

<template>
  <Layout></Layout>
</template>
