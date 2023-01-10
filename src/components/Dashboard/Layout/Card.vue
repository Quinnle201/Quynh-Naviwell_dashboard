<script setup>
</script>

<template>
    <div class="dashboard-card">
        <h4>
            <slot name="card-title"></slot>
        </h4>
        <slot />
        <span class="dashboard-card-btn">
            <slot name="card-btn"></slot>
        </span>
    </div>
</template>

<style>
    .dashboard-card {
        background-color: #FFFEFE;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 18px 20px;
        border: 0.75px solid #737373;
        border-radius: 16.7164px;
        box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.25);
        overflow: hidden;
    }

    .dashboard-card h4 {
        font-size: 24px;
        font-weight: 600;
        line-height: 24px;
        color: var(--text-color);
    }

    .dashboard-card-btn {
        align-self: center;
        font-size: 16px;
        font-weight: 500;
        line-height: 16px;
        color: var(--main-color);
        cursor: pointer;
        transition: .3s ease;
    }

    .dashboard-card-btn.active-btn:after, 
    .dashboard-card-btn.active-btn:before {
        content: "*";
        color: red;
    }

    .dashboard-card-btn:empty {
        display: none!important;
    }
</style>