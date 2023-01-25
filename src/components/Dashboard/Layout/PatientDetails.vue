<script>
import ChatIcon from '../../icons/IconChat.vue'
import EditIcon from '../../icons/IconEdit.vue'
import CalendarIcon from '../../icons/IconCalendar.vue'
import RemoveIcon from '../../icons/IconRemove.vue'
import RoundBtn from '../../Dashboard/Layout/RoundBtn.vue'
import RoundBtnDelete from '../../Dashboard/Layout/RoundBtnDelete.vue'
import Modal from '../../Dashboard/Layout/Modal.vue'
import { Form, Field } from 'vee-validate';

export default {
    components: {
        ChatIcon,
        EditIcon,
        CalendarIcon,
        RemoveIcon,
        RoundBtn,
        RoundBtnDelete,
        Modal,
        Form,
        Field,
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
        <RoundBtn @click="showModal(null, null)">
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
    <Modal v-show="isModalVisible" @close="closeModal">
        <template #header>Schedule</template>
        <template #content>
            <div class="type-select">
                <div class="type-select-item active">Appointment</div>
                <div class="type-select-item">Telehealth</div>
                <div class="type-select-item">Personal</div>
            </div>
            <Form @submit="submitVisit" ref="visitForm">
                <div class="popup-content-item visit-type">
                    <label class="checkbox path">
                        <Field type="radio" name="visit_type" value="initial"></Field>
                        <CheckIcon />
                        <div class="label-bg">Initial NaviWell Visit</div>
                    </label>
                    <label class="checkbox path">
                        <Field type="radio" name="visit_type" value="wellness"></Field>
                        <CheckIcon />
                        <div class="label-bg">Wellness Coach Visit</div>
                    </label>
                    <label class="checkbox path">
                        <Field type="radio" name="visit_type" value="dietitian"></Field>
                        <CheckIcon />
                        <div class="label-bg">Dietitian Visit</div>
                    </label>
                    <label class="checkbox path">
                        <Field type="radio" name="visit_type" value="followup"></Field>
                        <CheckIcon />
                        <div class="label-bg">Follow-Up Visit</div>
                    </label>
                </div>

                <div class="popup-content-item">
                    <label class="label-w-icon">Date
                        <Field name="date" type="date" class="popup-content-item-input"></Field>
                        <CalendarIcon />
                    </label>
                </div>

                <div class="popup-content-item-wrapper">
                    <div class="popup-content-item">
                        <label>From</label>
                        <Field as="select" name="from">
                            <option v-for="item in hoursSelect" :value="item.value">{{ item.label }}
                            </option>
                        </Field>
                    </div>

                    <div class="popup-content-item">
                        <label>To</label>
                        <Field as="select" name="to">
                            <option v-for="item in hoursSelect" :value="item.value">{{ item.label }}
                            </option>
                        </Field>
                    </div>
                </div>

                <div class="popup-content-item">
                    <label for="textarea">Notes</label>
                    <Field as="textarea" name="notes"></Field>
                </div>

                <div class="popup-footer">
                    <button type="reset" class="w-btn w-btn-close" @click="closeModal">
                        Cancel
                    </button>
                    <button type="submit" class="w-btn">
                        {{ selectedEvent? 'Edit Event': 'Save Event' }}
                    </button>
                </div>
            </form>
        </template>
    </Modal>
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