<script>
import CalendarIcon from '@/components/icons/IconCalendar.vue'
import { Form, Field } from 'vee-validate';

import { axiosInstance, uploadFile, getFileUrlFromRef } from '@/helpers';
import { useAlertStore, useFileStore, useAuthStore } from '@/stores';

export default {
    components: {
        CalendarIcon,
        Form,
        Field
    },
    data() {
        const alertStore = useAlertStore()
        const fileStore = useFileStore()
        const authStore = useAuthStore();

        return {
            alertStore,
            fileStore,
            authStore,
            file: null,
            user: null,
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
        getUser() {
            axiosInstance.get('/user')
                .then(response => {
                    this.user = response.data.data
                    this.$refs.userForm.setValues({
                        'first_name': this.user.first_name,
                        'last_name': this.user.last_name,
                        'dob': new Date(this.user.profile.dob).toISOString().substring(0, 10)
                    })
                    this.fileStore.getPhotoLinkForUser(this.user)                

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

            axiosInstance.put('/user', formData)
                .then(response => {
                    this.alertStore.success("Information has been updated")
                    this.user = response.data.data
                    setTimeout(() => this.fileStore.getPhotoLinkForUser(this.user, true), 2000)
                    
                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });

            if(values.password && values.new_password && values.new_password_confirmation) {
                if(values.new_password != values.new_password_confirmation) {
                    this.alertStore.error("New passwords don't match")
                    return
                }
                this.updatePassword(this.authStore.user.email, values.password, values.new_password, values.new_password_confirmation)
            }
            
        },
        async updatePassword(email, oldPwd, newPwd, newPwdConf) {
            await this.authStore.changePassword(email, oldPwd, newPwd, newPwdConf, false);
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
                        <img :src="fileStore.profileAvatars(user)" />
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

                        <label for="password" class="settings-inner-input-date">
                            Old password
                            <Field name="password" type="password" />
                        </label>

                        <label for="new_password" class="settings-inner-input-date">
                            New password
                            <Field name="new_password" type="password" />
                        </label>

                        <label for="new_password_confirmation" class="settings-inner-input-date">
                            Confirm new password
                            <Field name="new_password_confirmation" type="password" />
                        </label>

                        <button type="submit" class="w-btn">Save</button>

                    </div>
                </div>
            </Form>
        </div>
    </div>
</template>