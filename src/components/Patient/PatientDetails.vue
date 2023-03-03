<script>
import ChatIcon from '../icons/IconChat.vue'
import EditIcon from '../icons/IconEdit.vue'
import RemoveIcon from '../icons/IconRemove.vue'
import RoundBtn from '../Buttons/RoundBtn.vue'
import RoundBtnDelete from '../Buttons/RoundBtnDelete.vue'
import CalendarIcon from '../icons/IconCalendar.vue'

export default {
    components: {
        ChatIcon,
        EditIcon,
        CalendarIcon,
        RemoveIcon,
        RoundBtn,
        RoundBtnDelete,
    },
    props: {
        items: {
            type: Array,
            default: ["chat", "update", "calendar", "delete"]
        } 
    },
}
</script>

<template>
    <div>
        <div class="details-inner">
            <RoundBtn v-if="items.includes('chat')" @click="$emit('chat')">
                <template #btn-icon>
                    <ChatIcon width="30" height="30" />
                </template>
                <template #btn-name>Chat</template>
            </RoundBtn>
            <RoundBtn v-if="items.includes('update')" @click="$emit('update')">
                <template #btn-icon>
                    <EditIcon width="30" height="30" />
                </template>
                <template #btn-name>Update</template>
            </RoundBtn>
            <RoundBtn v-if="items.includes('calendar')" @click="$emit('calendar')">
                <template #btn-icon>
                    <CalendarIcon width="30" height="30" />
                </template>
                <template #btn-name>Schedule</template>
            </RoundBtn>
            <RoundBtnDelete v-if="items.includes('delete')" @click="$emit('delete')">
                <template #btn-icon>
                    <RemoveIcon width="30" height="30" />
                </template>
                <template #btn-name>Delete</template>
            </RoundBtnDelete>
        </div>
        <div class="modal-overlay" @click="$emit('close')"></div>
    </div>
</template>

<style>
    .modal-overlay {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 9999;
    }

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
        z-index: 10000;
    }
</style>