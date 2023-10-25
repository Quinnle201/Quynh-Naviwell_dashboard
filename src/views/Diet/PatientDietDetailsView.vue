<script>
import { axiosInstance } from '@/helpers';
import { useAlertStore, useFileStore } from '@/stores';

export default {
    data() {
        const alertStore = useAlertStore()
        const fileStore = useFileStore()
        return {
            dietId: null,
            dietData: null,
            alertStore,
            fileStore,
        }
    },
    computed: {
        dietPdf() {
            if(this.fileStore.dietPdfFiles(this.dietData)){
                return this.fileStore.dietPdfFiles(this.dietData)
            }
            return null
        },
    },
    methods: {
        getDiet(id) {
            axiosInstance.get(`/diet/${id}`)
                .then(response => {
                    this.dietData = response.data.data;
                    this.fileStore.getPhotoLinkForDiet(this.dietData)
                    this.fileStore.getPdfLinkForDiet(this.dietData)
                })
                .catch(error => {
                    this.alertStore.error(error.response.data.message)
                    this.close()
                });
        },
        close() {
            this.$router.back()
        },
    },
    mounted() {
        this.dietId = this.$route.params.id
        this.getDiet(this.dietId)
    }
}
</script>

<template>
    <div class="page-wrapper" v-if="dietData">
        <div class="diet-wrapper diet-details">
            <div class="diet-details-img">
                <h3>{{ dietData.title }}</h3>
                <img :src="fileStore.dietImages(dietData)" alt="">
            </div>

            <div class="diet-details-descr">
                <p>{{ dietData.description }}</p>
            </div>

            <a v-if="dietPdf" :href="dietPdf" target="_blank">Download attachment</a>

            <div class="diet-details-plan">
                <h5>Diet plan</h5>

                <div class="diet-details-day" v-for="(day, index) in dietData.days">
                    <h6>Day {{ index + 1 }}</h6>
                    <ul>
                        <li v-if="day['morning-snack']">
                            <span>Snack</span>
                            <ul>
                                <li>{{ day['morning-snack'] }}</li>
                            </ul>
                        </li>
                        <li v-if="day.breakfast">
                            <span>Breakfast</span>
                            <ul>
                                <li>{{ day.breakfast }}</li>
                            </ul>
                        </li>
                        <li v-if="day['afternoon-snack']">
                            <span>Afternoon snack</span>
                            <ul>
                                <li>{{ day['afternoon-snack'] }}</li>
                            </ul>
                        </li>
                        <li v-if="day.lunch">
                            <span>Lunch</span>
                            <ul>
                                <li>{{ day.lunch }}</li>
                            </ul>
                        </li>
                        <li v-if="day.dinner">
                            <span>Dinner</span>
                            <ul>
                                <li>{{ day.dinner }}</li>
                            </ul>
                        </li>
                    </ul>
                </div>

            </div>

        </div>
    </div>
</template>