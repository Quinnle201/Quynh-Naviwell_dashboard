<script>
    export default {
    props: {
        tags: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            text: "",
            showPopup: false
        };
    },
    methods: {
        showTagPopup() {
            this.showPopup = true;
            document.body.addEventListener('click', this.closeTagPopup);
        },
        addTag(tag) {
            this.text += `${tag} `;
            this.showPopup = false;
            this.removeClickListener();
        },
        closeTagPopup(event) {
            if (!this.$refs.tagPopup.contains(event.target) && event.target !== this.$el.querySelector('textarea')) {
                this.showPopup = false;
                this.removeClickListener();
            }
        },
        removeClickListener() {
            document.body.removeEventListener('click', this.closeTagPopup);
        }
    },
    beforeDestroy() {
        this.removeClickListener();
    }
};
</script>

<template>
    <div>
        <textarea @click="showTagPopup" v-model="text"></textarea>

        <div v-if="showPopup" class="tag-popup" ref="tagPopup">
            <ul>
                <li v-for="tag in tags" :key="tag" @click="addTag(tag)">{{ tag }}</li>
            </ul>
        </div>
    </div>
</template>
  
  <style>
    .tag-popup {
        background-color: #FFFFFF;
        padding: 8px;
        position: absolute;
        top: calc(100% + 10px);
        left: 50%;
        transform: translateX(-50%);
        border: 1px solid #E1E1E1;
        border-radius: 8px;
        z-index: 9;
    }

    .tag-popup:before {
        content: "";
        width: 0;
        height: 0;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -24px;
        bottom: auto;
        border: 12px solid;
        border-color: transparent transparent #E1E1E1 transparent;
    }

    .tag-popup:after {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        left: 50%;
        transform: translateX(-50%);
        top: -20px;
        border: 10px solid;
        border-color: transparent transparent #FFFFFF transparent;
    }

    .tag-popup ul {
        max-width: 500px;
        display: flex;
        flex-wrap: wrap;
        gap: 2px;
        list-style: none;
    }

    .tag-popup ul li {
        background-color: #969696;
        padding: 2px 6px;
        font-size: 12px;
        color: #FFFFFF;
        border-radius: 8px;
        cursor: pointer;
    }
  </style>
  