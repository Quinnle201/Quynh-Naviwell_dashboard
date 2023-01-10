<script>
  export default {
    name: 'Modal',
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
</script>

<template>
    <div class="popup-overlay">
        <div class="popup">
        <header class="popup-header">
            <h4>
                <slot name="header"></slot>
            </h4>
            <button type="button" class="popup-btn-close" @click="close">x</button>
        </header>

        <section class="popup-content">
            <slot name="content"></slot>
        </section>

        <footer class="popup-footer">
            <button type="button" class="w-btn w-btn-close" @click="close">
                Cancel
            </button>
            <button type="button" class="w-btn w-btn-save">
                Save Event
            </button>
        </footer>
        </div>
    </div>
</template>

<style>
  .popup-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }

  .popup {
    background: #FFFFFF;
    width: 410px;
    height: auto;
    padding: 32px 30px;
    display: flex;
    flex-direction: column;
    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    overflow-x: auto;
  }

  .popup-header {
    position: relative;
  }

  .popup-header h4 {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
    color: #000000;
  }

  .popup-btn-close {
    background: #E4E4E4;
    width: 30px;
    height: 30px;
    position: absolute;
    top: 0;
    right: 0;
    font-size: 18px;
    font-weight: 500;
    color: #FFFFFF;
    border-radius: 50%;
    border: none;
    cursor: pointer;
  }

  .popup-content {
    height: 100%;
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .popup-body {
    position: relative;
    padding: 20px 10px;
  }

  .popup-footer {
    margin-top: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>