<script>
  export default {
    name: 'Delete Modal',
    methods: {
      close() {
        this.$emit('close');
      },
      deleteAction() {
        this.$emit('delete')
      }
    },
  };
</script>

<template>
  <Transition>
    <div class="popup-overlay" @click="$emit('close')">
        <div class="popup" @click.stop>
            <div class="modal-inner">
                <slot name="content">
                </slot>
                <div class="popup-footer">
                        <button type="button" class="w-btn w-btn-close" @click="close">
                            Cancel
                        </button>
                        <button type="button" class="w-btn w-btn-delete" @click="deleteAction">
                            Delete
                        </button>
                    </div>
                </div>
            
        </div>
    </div>
  </Transition>
</template>

<style>
    .v-enter-active,
    .v-leave-active {
        transition: opacity 0.4s ease;
    }

    .v-enter-from,
    .v-leave-to {
        opacity: 0;
    }

    .modal-inner {
        text-align: center;
    }

    .modal-inner h4 {
        margin-bottom: 16px;
        font-size: 24px;
        font-weight: 600;
        color: #000000;
    }

    .modal-inner p {
        margin-bottom: 42px;
        font-size: 16px;
        font-weight: 500;
        color: #AFAFAF;
    }
</style>