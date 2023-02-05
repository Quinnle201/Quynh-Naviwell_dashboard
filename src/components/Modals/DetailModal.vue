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
        grid-template-columns: repeat(2, 1fr);
        transform: translateX(-50%);
    }
</style>