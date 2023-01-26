<script>
import ChatIcon from '../../icons/IconChat.vue'
import EditIcon from '../../icons/IconEdit.vue'
import RemoveIcon from '../../icons/IconRemove.vue'
import RoundBtn from '../../Dashboard/Layout/RoundBtn.vue'
import RoundBtnDelete from '../../Dashboard/Layout/RoundBtnDelete.vue'
import CalendarIcon from '../../icons/IconCalendar.vue'

export default {
    components: {
        ChatIcon,
        EditIcon,
        CalendarIcon,
        RemoveIcon,
        RoundBtn,
        RoundBtnDelete,
    },
    data() {
        return {
            isModalVisible: false,
        }
    },
    methods: {
        showModal(event, e) {
            this.selectedEvent = event
            this.isModalVisible = true;
            if (e != null) {
                e.stopPropagation()
            }
        },
        closeModal() {
            this.selectedEvent = null
            this.isModalVisible = false;
        },
    }
}
</script>

<template>
    <div class="details-inner">
        <RoundBtn>
            <template #btn-icon>
                <ChatIcon width="30" height="30" />
            </template>
            <template #btn-name>Chat</template>
        </RoundBtn>
        <RoundBtn @click="$emit('update')">
            <template #btn-icon>
                <EditIcon width="30" height="30" />
            </template>
            <template #btn-name>Update</template>
        </RoundBtn>
        <RoundBtn @click="$emit('calendar')">
            <template #btn-icon>
                <CalendarIcon width="30" height="30" />
            </template>
            <template #btn-name>Schedule</template>
        </RoundBtn>
        <RoundBtnDelete>
            <template #btn-icon>
                <RemoveIcon width="30" height="30" />
            </template>
            <template #btn-name>Delete</template>
        </RoundBtnDelete>
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
</style>