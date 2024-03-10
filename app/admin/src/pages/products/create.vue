<template>
    <Layout>
        <div>
            <Headerbar :title="$t('t-sidebar.products.sub-create')" />
            <VeeForm v-slot="{ handleSubmit }" :validation-schema="schema" as="div">
                <form @submit="handleSubmit($event, onSubmit)">
                    <div class="row g-3 mt-3 mb-5">
                        <div class="col-sm-6">
                            <label for="Name" class="form-label">{{ $t("form.product.lable.name") }}</label>
                            <Field type="text" v-model.trim="form.name" class="form-control" name="name" />
                            <ErrorMessage class="text-danger" name="name" />
                        </div>
                        <div class="col-sm-3">
                            <label for="Price" class="form-label">{{ $t("form.product.lable.price") }}</label>
                            <Field type="text" v-model.number="form.price" class="form-control" name="price" />
                            <ErrorMessage class="text-danger" name="price" />
                        </div>
                        <div class="col-sm-3">
                            <label for="Qty" class="form-label">{{ $t("form.product.lable.qty") }}</label>
                            <Field type="text" v-model.number="form.qty" class="form-control" name="qty" />
                            <ErrorMessage class="text-danger" name="qty" />
                        </div>
                        <div class="col-sm-6">
                            <label for="Detail" class="form-label">{{ $t("form.product.lable.detail") }}</label>
                            <Field name="detail" as="textarea" v-model="form.detail" class="form-control" rows="3" />
                            <ErrorMessage class="text-danger" name="detail" />
                        </div>
                        <div class="col-sm-6"></div>
                        <div class="col-sm-6">
                            <label for="formFile" class="form-label">Upload multiple images</label>
                            <input class="form-control" type="file" accept="image/*" id="formFile" multiple
                                @change="previewMultiImage" ref="myFileInput">
                        </div>
                        <div class="col-sm-6">
                            <div class="row" v-if="preview_list.length">
                                <div v-for="(image, index) in preview_list" :key="index" class="col-sm-4 mb-3">
                                    <div class="position-relative">
                                        <img :src="image" alt="Preview" class="img-thumbnail img-fluid">
                                    <!--     <span class="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger"
                                            @click="removeImage(index)">
                                            <i class="bi bi-x"></i>
                                        </span> -->
                                        <i class="position-absolute top-0 start-100 translate-middle bi bi-x-circle-fill fs-4 text-danger"  @click="removeImage(index)" ></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr class="my-4">
                    <div class="d-flex bd-highlight">
                        <button class="w-100 btn btn-primary btn-lg rounded-0" type="submit">{{ $t("button.form.save")
                            }}</button>
                        <router-link class="w-100 btn btn-danger btn-lg rounded-0" :to="{ name: 'Product' }">{{
                $t("button.form.cancel") }}</router-link>
                    </div>


                </form>
            </VeeForm>

        </div>
    </Layout>
</template>

<script>
import Layout from '@layouts/main'
import Headerbar from '@components/Headerbar'
import { Form as VeeForm, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import axios from '@/axios'

export default {
    name: 'ProductCreate',
    components: {
        Layout,
        Headerbar,
        VeeForm,
        Field,
        ErrorMessage,
    },
    data() {
        return {
            form: {
                name: "",
                detail: "",
                price: "",
                qty: "",
            },
            preview_list: [],
            image_list: []
        };
    },
    setup() {
        const schema = yup.object({
            name: yup.string().required(),
            detail: yup.string(),
            price: yup.number().typeError("price must be a number.").required("price is required.").positive().integer().moreThan(0, "price must be greater than 0."),
            qty: yup.number().typeError("quantity must be a number.").required("quantity is required.").positive().integer().moreThan(0, "quantity must be greater than 0."),
        });

        return { schema };
    },
    methods: {
        async onSubmit() {
            try {
                const formData = new FormData();
                formData.append('prod_name', this.form.name);
                formData.append('prod_detail', this.form.detail);
                formData.append('price', this.form.price);
                formData.append('qty', this.form.qty);
                this.image_list.forEach((image, index) => {
                    formData.append('products_file', image);
                });


                let resp = await axios.post('/api/product', formData);
                if (resp.status === 201) {
                    this.$swalSuccess('Success!', 'created product successfully.');
                    setTimeout(() => { this.$router.push('/product') }, 3000)
                }
            } catch (error) {
                console.log("Err : ", error)
                this.$swalError("ERROR !", error.response.data.error.message);
            }
        },
        previewMultiImage(event) {
            var input = event.target;
            var count = input.files.length;
            var index = 0;
            if (input.files) {
                while (count--) {
                    var reader = new FileReader();
                    reader.onload = (e) => {
                        this.preview_list.push(e.target.result);
                    }
                    this.image_list.push(input.files[index]);
                    reader.readAsDataURL(input.files[index]);
                    index++;
                }
            }
        },
        removeImage(index) {
            this.preview_list.splice(index, 1);
            this.image_list.splice(index, 1);
            const input = this.$refs.myFileInput;
            input.value = null;
        },
    },
};
</script>
