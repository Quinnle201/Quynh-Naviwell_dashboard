<script>
import ChatIcon from '../../icons/IconChat.vue'
import EditIcon from '../../icons/IconEdit.vue'
import CalendarIcon from '../../icons/IconCalendar.vue'
import RemoveIcon from '../../icons/IconRemove.vue'

export default {
    components: {
        ChatIcon,
        EditIcon,
        CalendarIcon,
        RemoveIcon
    },
}
</script>

<template>
    <div class="details-inner">
        <div class="details-item">
            <div class="details-icon">
                <ChatIcon width="30" height="30" />
            </div>
            Chat
        </div>
        <div class="details-item">
            <div class="details-icon">
                <EditIcon width="30" height="30" />
            </div>
            Update
        </div>
        <div class="details-item">
            <div class="details-icon">
                <CalendarIcon width="30" height="30" />
            </div>
            Schedule
        </div>
        <div class="details-item">
            <div class="details-icon delete">
                <RemoveIcon width="30" height="30" />
            </div>
            Delete
        </div>
    </div>
</template>

<style>
    .v-enter-active,
    .v-leave-active {
        transition: opacity 0.9s ease;
    }

    .v-enter-from,
    .v-leave-to {
        opacity: 0;
        transition: opacity 0.9s ease;
    }

    .details-inner {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        justify-items: center;
        gap: 0 12px;
        background-color: #FFFFFF;
        padding: 12px 16px;
        position: absolute;
        bottom: 50px;
        left: 50%;
        transform: translateX(-72%);
        border-radius: 16px;
        box-shadow: 2px 4px 28px rgba(0, 0, 0, 0.1);
        z-index: 10;
    }

    .details-item {
        font-size: 14px;
        font-weight: 500;
        color: var(--text-color);
        text-align: center;
        cursor: pointer;
    }

    .details-icon {
        background-color: var(--primary);
        width: 50px;
        height: 50px;
        margin: 0 auto 16px auto;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
    }

    .details-icon.delete {
        background-color: #FF0000;
    }
</style>