<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main'
import PageHeader from '@components/page-header'

/**
 * Payment component
 */
export default {
  page: {
    title: 'Payments',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout, PageHeader },
  data() {
    return {
      title: 'Payments',
    }
  },
}
</script>

<template>
  <Layout></Layout>
</template>
