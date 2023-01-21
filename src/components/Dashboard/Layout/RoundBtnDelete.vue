<script setup>
</script>

<template>
    <div class="btn-wrapper">
        <div class="btn-icon delete">
            <slot name="btn-icon"></slot>
        </div>
        <slot name="btn-name"></slot>
    </div>
</template>

<style>

.btn-wrapper {
    font-size: 14px;
    font-weight: 500;
    color: #646464;
    text-align: center;
    cursor: pointer;
}

.btn-icon {
    background-color: var(--primary);
    width: 50px;
    height: 50px;
    margin: 0 auto 16px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
}

.btn-icon.delete {
    background-color: #FF0000;
}
</style>