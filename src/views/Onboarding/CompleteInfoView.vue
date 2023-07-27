<script>

import { useAlertStore, useAuthStore, useProgrammaticAccesStore } from '@/stores';
import { downloadFile } from '@/helpers';


export default {
    data() {
        const alertStore = useAlertStore()
        const authStore = useAuthStore();
        const programmaticAccess = useProgrammaticAccesStore();
        return {
            alertStore,
            authStore,
            programmaticAccess
        }
    },
    computed: {
        userId() {
            return this.authStore.user.id
        }

    },
    methods: {
        downloadReport() {
            
            let quizReportRef = this.programmaticAccess.tempData.pdf
            this.alertStore.success(`Opening your report`)
            downloadFile(null, `${this.userId}/reports/${quizReportRef}`, 'users')

        }
    }
}

</script>
<template>
    <div class="welcome-wrapper">
        <div class="welcome-inner">
            <div class="welcome-heading">
                <h4>Congratulations!</h4>
                <h6>Questionnaires completed</h6>
            </div>

            <button class="info-form-button" @click="downloadReport">Report</button>
        </div>
    </div>
</template>

<style scoped>
.welcome-wrapper {
        background-color: #F4F4FF;
        height: 100vh;
        margin: -3.6px -1.2rem 0 -0.8rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .welcome-inner {
        background-color: rgba(255, 255, 255, .8);
        max-width: 40%;
        width: 100%;
        height: 50vh;
        margin: 0 auto;
        padding: 26px 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        border-radius: 16px;
        box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }

    .welcome-inner:before {
        content: '';
        background-color: rgba(255, 255, 255, 0.1);
        background-image: url("@/assets/img/confetti.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        opacity: .4;
    }

    .welcome-heading {
        text-align: center;
        z-index: 2;
    }

    .welcome-heading h4 {
        font-size: 36px;
        font-weight: 600;
    }

    .welcome-heading h6 {
        font-size: 27px;
        color: var(--primary);
    }

    .info-form-button {
        background-color: var(--primary);
        width: 220px;
        height: 56px;
        margin-top: 32px;
        padding: 12px 32px;
        font-size: 18px;
        font-weight: 500;
        color: #FFFFFF;
        text-align: center;
        border-radius: 16px;
        cursor: pointer;
        z-index: 2;
    }
</style>