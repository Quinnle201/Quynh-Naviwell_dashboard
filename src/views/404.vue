<script>
import { RouterLink } from 'vue-router'
</script>

<template>
    <div class="notfound-wrapper">
        <div class="notfound-block">
           <img src="@/assets/img/pagenotfound.svg" alt=""> 
        </div>
        
        <h1>Page not found</h1>
        <p>The page you are looking for does not exist or was removed</p>
        <RouterLink to="/" class="w-btn">Back to homepage</RouterLink>
    </div>
</template>

<style scoped>
    .notfound-wrapper {
        margin-top: 160px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .notfound-block {
        position: relative;
    }

    .notfound-block:before {
        content: '404';
        position: absolute;
        top: 50%;
        left: 45%;
        transform: translate(-50%, -50%);
        font-size: 320px;
        color: #E7E7E7;
    }

    img {
        width: 180px;
    }

    h1 {
        margin-top: 32px;
        font-size: 74px;
        color: #5C90F1;
    }

    p {
        font-size: 18px;
        font-weight: 500;
        color: var(--text-color);
    }

    a {
        min-width: 220px;
        margin-top: 16px;
        padding: 16px 32px;
        font-size: 20px;
        transition: .3s ease;
    }

    @media (hover: hover) and (pointer: fine) {
        a:hover {
            color: #FFFFFF;
            box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
        }
    }

    @media screen and (max-width: 768px) {
        .notfound-wrapper {
            margin-top: 10vh;
        }

        .notfound-block:before {
            font-size: 160px;
        }

        img {
            width: 92px;
        }

        h1 {
            font-size: 56px;
        }

        h1, 
        p {
            text-align: center;
        }
    }
</style>