<script>
export default {
    props: {
        maxVisibleButtons: {
            type: Number,
            required: false,
            default: 3
        },
        totalPages: {
            type: Number,
            required: true
        },
        currentPage: {
            type: Number,
            required: true
        }
    },
    computed: {
        isInFirstPage() {
            return this.currentPage === 1;
        },
        isInLastPage() {
            return this.currentPage === this.totalPages;
        },
        startPage() {
            // When on the first page
            if (this.currentPage === 1) {
                return 1;
            }

            // When on the last page
            if (this.currentPage === this.totalPages) {
                const start = this.totalPages - (this.maxVisibleButtons - 1);

                if (start === 0) {
                return 1;
                } else {
                return start;
                }
            }

            // When inbetween
            return this.currentPage - 1;
        },
        pages() {
            const range = [];

            for (
                let i = this.startPage;
                i <= Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
                i++
            ) {
                range.push({
                    name: i,
                    isDisabled: i === this.currentPage
                });
            }

            return range;
        },
        
    },
    methods: {
        isPageActive(page) {
            return this.currentPage === page;
        },
        onClickPreviousPage() {
            if(this.isInFirstPage) {
                return
            }
            this.$emit('pagechanged', this.currentPage - 1);
        },
        onClickPage(page) {
            if(page.isDisabled){
                return
            }
            this.$emit('pagechanged', page.name);
        },
        onClickNextPage() {
            if(this.isInLastPage) {
                return
            }
            this.$emit('pagechanged', this.currentPage + 1);
        }
    }
};
</script>

<template>
    <div class="pagination-wrapper">
        <div class="pagination-item pagination-item-arrow-left" >
            <img src="@/assets/img/select-icon.svg" alt="" @click="onClickPreviousPage"/>
        </div>
        <div v-for="page in pages" :key="page.name" @click="onClickPage(page)"
            class="pagination-item" :class="{ active: isPageActive(page.name) }">{{ page.name }}
        </div>
        <div class="pagination-item pagination-item-arrow-right" @click="onClickNextPage">
            <img src="@/assets/img/select-icon.svg" alt="" />
        </div>
    </div>
</template>