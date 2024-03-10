<template>
    <Layout>
        <div>
            <Headerbar :title="$t('t-sidebar.employee.sub-create')" />
            <VeeForm v-slot="{ handleSubmit }" :validation-schema="schema" as="div">
                <form @submit="handleSubmit($event, onSubmit)">
                    <div class="row g-3 mt-3 mb-5">
                        <div class="col-sm-6">
                            <label for="Name" class="form-label">{{ $t("form.employee.lable.name") }}</label>
                            <Field type="text" v-model.trim="form.name" class="form-control" name="name" />
                            <ErrorMessage class="text-danger" name="name" />
                        </div>
                        <div class="col-sm-6">
                            <label for="email" class="form-label">{{ $t("form.employee.lable.email") }}</label>
                            <Field type="text" v-model="form.email" class="form-control" name="email" />
                            <ErrorMessage class="text-danger" name="email" />
                        </div>
                        <div class="col-sm-6">
                            <label for="age" class="form-label">{{ $t("form.employee.lable.age") }}</label>
                            <Field type="number" v-model.number="form.age" class="form-control" name="age" step="1" />
                            <ErrorMessage class="text-danger" name="age" />
                        </div>

                        <div class="col-sm-6">
                            <label for="position" class="form-label">{{ $t("form.employee.lable.position") }}</label>
                            <Field as="select" v-model="form.position" class="form-select" name="position">
                                <option value="">Choose...</option>
                                <option value="manager">manager</option>
                                <option value="developer">developer</option>
                                <option value="designer">Designer</option>
                                <option value="sales">sales</option>
                                <option value="hr">hr</option>

                            </Field>
                            <ErrorMessage class="text-danger" name="position" />
                        </div>
                    </div>
                    <hr class="my-4">
                    <div class="d-flex bd-highlight">
                        <button class="w-100 btn btn-primary btn-lg rounded-0" type="submit">{{ $t("button.form.save") }}</button>
                        <!-- if  :to="{ name: 'Employee' }"   beforeEnter: (to, from, next) => { } not working -->
                        <router-link class="w-100 btn btn-danger btn-lg rounded-0" :to="{ name: 'Employee' }">{{ $t("button.form.cancel") }}</router-link>

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
    name: 'EmployeesCreate',
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
                email: "",
                age: null,
                position: ""
            }
        };
    },
    setup() {
        const schema = yup.object({
            email: yup.string().required().email(),
            name: yup.string().required(),
            age: yup.number().required().positive().integer().moreThan(0),
            position: yup.string().required(),
        });

        return { schema };
    },
    methods: {
        async onSubmit() {
            try {
                let resp = await axios.post('/api/employee', this.form);
                if (resp.status === 201) {
                    this.$swalSuccess('Success!', 'Created employee successfully.');
                    setTimeout(() =>{ this.$router.push('/employee') },3000)
                }
            } catch (err) {
                console.log("Err : ", err)
                this.$swalError("ERROR !", "something went wrong please try again later");
            }
        },
    },
};
</script>
