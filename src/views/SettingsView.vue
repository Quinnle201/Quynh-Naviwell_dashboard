<script>
import CalendarIcon from '@/components/icons/IconCalendar.vue'
import { Form, Field } from 'vee-validate';

import { axiosInstance, uploadFile, getFileUrlFromRef } from '@/helpers';
import { useAlertStore } from '@/stores';

export default {
    components: {
        CalendarIcon,
        Form,
        Field
    },
    data() {
        const alertStore = useAlertStore()
        return {
            alertStore,
            file: null,
            user: null,
            photo_src: null
        }
    },
    methods: {
        selectFile() {
            const r = this.$refs.fileUpload;
            r.click();
        },
        addFile(event) {
            const files = event.target.files
            if (files) {
                this.file = files[0]
            }

        },
        async getPhotoLink() {
            if (this.user.image == null) {
                this.photo_src = (await import('@/assets/img/avatar.webp')).default;
                return
            }
            this.photo_src = await getFileUrlFromRef(`users/${this.user.id}/photos`, this.user.image);
        },
        getUser() {
            axiosInstance.get('/user')
                .then(response => {
                    console.log(response.data)
                    this.user = response.data.data
                    this.$refs.userForm.setValues({
                        'first_name': this.user.first_name,
                        'last_name': this.user.last_name,
                        'dob': new Date(this.user.profile.dob).toISOString().substring(0, 10)
                    })

                    this.getPhotoLink()

                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
        },
        submitUser(values) {
            var imageRef = null
            if (this.file != null) {
                const uploader = uploadFile(this.file, 'users', this.user.id + '/photos')
                imageRef = uploader.ref;
            }


            var formData = {
                image: imageRef,
                first_name: values.first_name,
                last_name: values.last_name,
                dob: new Date(values.dob).format('YYYY-MM-DD')

            }

            console.log(formData)

            axiosInstance.put('/user', formData)
                .then(response => {
                    console.log(response.data)
                    this.alertStore.success("Information has been updated")
                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
        }
    },
    mounted() {
        this.getUser()
    }
}
</script>

<template>
    <div class="page-wrapper">
        <div class="layout-wrapper">
            <h3>Settings</h3>
        </div>

        <div class="settings-wrapper page-bg">
            <Form @submit="submitUser" ref="userForm">
                <div class="settings-inner">
                    <input hidden type="file" name="attachment" @change="addFile" ref="fileUpload" />
                    <div class="settings-inner-img">
                        <img :src="photo_src" />
                        <button type="button" @click="selectFile()">Change Image</button>
                    </div>

                    <div class="border"></div>

                    <div class="settings-inner-input">
                        <label for="name">
                            First name
                            <Field name="first_name" type="text" placeholder="Type your first name..." />
                        </label>

                        <label for="surname">
                            Last name
                            <Field name="last_name" type="text" placeholder="Type your last name..." />
                        </label>

                        <label for="dob" class="settings-inner-input-date">
                            Date of birth
                            <Field name="dob" type="date" />
                            <CalendarIcon />
                        </label>

                        <button type="submit" class="w-btn">Save</button>

                    </div>
                </div>
            </Form>
        </div>
    </div>
</template>