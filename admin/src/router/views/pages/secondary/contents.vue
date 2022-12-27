<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main'
import PageHeader from '@components/page-header'

/**
 * Contents component
 */
export default {
  page: {
    title: 'Contents',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout, PageHeader },
  data() {
    return {
      title: 'Contents',
    }
  },
}
</script>


<template>
  <Layout>
    <div class="row page-title align-items-center">
      <div class="col-md-3 col-xl-6">
        <h4 class="mb-1 mt-0">content</h4>
      </div>
      <div class="col-md-3 col-xl-6">
        <router-link to="/apps/product/create">
          <button class="btn btn-primary float-right">Create</button>
        </router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="table-responsive">
              <table class="table mb-0">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">title</th>
                    <th scope="col">text</th>
                    <th scope="col">image</th>

                    <th scope="col">video</th>
                    <th scope="col">anthor</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- <tr v-for="(product, index) in products" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>
                      {{
                        `${product.modelNo}-${product.colorText}-${
                          product.size
                        }`
                      }}
                    </td>
                    <td>{{ product.name }}</td>
                    <td>{{ product.category }}</td>
                    <td>{{ product.colorText }}</td>
                    <td>{{ product.size }}</td>
                    <td>{{ product.price }}</td>
                    <td>{{ product.salePrice }}</td>
                    <td>{{ product.weight }}</td>
                    <td class="d-flex">
                      <router-link :to="`/apps/product/stock/${product._id}`">
                        <button class="btn btn-success p-0 px-2 py-1 mr-2"
                          >Stock</button
                        >
                      </router-link>
                      <router-link :to="`/apps/product/update/${product._id}`">
                        <button class="btn btn-warning p-0 px-2 py-1 mr-2"
                          >Edit</button
                        >
                      </router-link>
                      <button
                        class="btn btn-danger p-0 px-2 py-1"
                        @click="deleteProduct(product._id)"
                        >Delete</button
                      >
                    </td>
                  </tr>-->
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
