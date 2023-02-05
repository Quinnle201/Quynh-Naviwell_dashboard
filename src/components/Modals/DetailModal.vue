<script>
import EditIcon from '../icons/IconEdit.vue'
import RemoveIcon from '../icons/IconRemove.vue'
import RoundBtn from '../Buttons/RoundBtn.vue'
import RoundBtnDelete from '../Buttons/RoundBtnDelete.vue'

export default {
    components: {
        EditIcon,
        RemoveIcon,
        RoundBtn,
        RoundBtnDelete,
    }
}
</script>

<template>
    <div>
        <div class="details-inner grid-two">
            <RoundBtn @click="$emit('update')">
                <template #btn-icon>
                    <EditIcon width="30" height="30" />
                </template>
                <template #btn-name>Update</template>
            </RoundBtn>
            <slot name="btn"></slot>
            <RoundBtnDelete @click="$emit('delete')">
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
    .details-inner.grid-two {
        display: flex;
        align-items: center;
        transform: translateX(-50%);
    }
</style>