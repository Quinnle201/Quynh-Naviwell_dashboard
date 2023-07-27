<script>

import { useProgrammaticAccesStore } from '@/stores';

export default {
    methods: {
        clickAction() {
            const programmaticAccess = useProgrammaticAccesStore();
            programmaticAccess.setAccessPage('quiz')
        },
    }
}
</script>
<template>
    <div class="welcome-wrapper">
        <div class="welcome-inner">
            <div class="welcome-heading">
                <h4>Thank you for joining us!</h4>
                <h6>Let’s evaluate your health score</h6>
            </div>

            <button class="info-form-button" @click="clickAction">Get started</button>
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

    @media screen and (max-width: 1440px) {
        .welcome-inner {
            max-width: 60%;
        }
    }

    @media screen and (max-width: 1199px) {
        .welcome-inner {
            max-width: 80%;
        }
    }

    @media screen and (max-width: 768px) {
        .welcome-heading h4 {
            font-size: 28px;
        }

        .welcome-heading h6 {
            font-size: 20px;
        }

        .info-form-button {
            margin-top: 16px;
            font-size: 16px;
        }
    }

    @media screen and (max-width: 576px) {
        .welcome-inner {
            max-width: 90%;
            padding: 16px 32px;
        }

        .welcome-heading h4 {
            font-size: 24px;
        }

        .welcome-heading h6 {
            font-size: 18px;
        }

        .info-form-button {
            width: 100%;
            height: auto;
        }
    }

    @media screen and (max-width: 375px) {
        .welcome-inner {
            padding: 16px 32px;
        }

        .welcome-heading h4 {
            font-size: 22px;
        }

        .welcome-heading h6 {
            font-size: 16px;
        }
    }
</style>