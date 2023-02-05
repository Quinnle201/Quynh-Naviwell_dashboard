<script>
import AddIcon from '@/components/icons/IconAdd.vue'
import SearchIcon from '@/components/icons/IconSearch.vue'
import EditIcon from '@/components/icons/IconEdit.vue'

export default {
    components: {
        AddIcon,
        SearchIcon,
        EditIcon
    }
}
</script>

<template>
    <div class="page-wrapper">
        <div class="layout-wrapper">
            <h3>Quizzes</h3>

            <RouterLink :to="{ name: 'add-quiz' }" class="add-button">
                <AddIcon />
                <button type="button">Add New Quiz</button>
            </RouterLink>
        </div>

        <div class="quizzes-wrapper page-bg">
            <div class="quotes-search-wrapper">
                <label class="quotes-search">
                    <input placeholder="Search" type="search" autocomplete="off">
                    <SearchIcon />
                </label>
            </div>

            <div class="quizzes-grid">
                <div class="quizzes-grid-item">
                    <div class="quizzes-grid-item-content">
                        <h6>Quiz title</h6>
                        <div class="quizzes-grid-item-date">04/02/2023</div>
                    </div>
                    <div class="quizzes-grid-item-btn" @click="">
                        <EditIcon />
                    </div>
                </div>

                <div class="quizzes-grid-item">
                    <div class="quizzes-grid-item-content">
                        <h6>Quiz title</h6>
                        <div class="quizzes-grid-item-date">04/02/2023</div>
                    </div>
                    <div class="quizzes-grid-item-btn" @click="">
                        <EditIcon />
                    </div>
                </div>

                <div class="quizzes-grid-item">
                    <div class="quizzes-grid-item-content">
                        <h6>Quiz title</h6>
                        <div class="quizzes-grid-item-date">04/02/2023</div>
                    </div>
                    <div class="quizzes-grid-item-btn" @click="">
                        <EditIcon />
                    </div>
                </div>

                <div class="quizzes-grid-item">
                    <div class="quizzes-grid-item-content">
                        <h6>Quiz title</h6>
                        <div class="quizzes-grid-item-date">04/02/2023</div>
                    </div>
                    <div class="quizzes-grid-item-btn" @click="">
                        <EditIcon />
                    </div>
                </div>

                <div class="quizzes-grid-item">
                    <div class="quizzes-grid-item-content">
                        <h6>Quiz title</h6>
                        <div class="quizzes-grid-item-date">04/02/2023</div>
                    </div>
                    <div class="quizzes-grid-item-btn" @click="">
                        <EditIcon />
                    </div>
                </div>

                <div class="quizzes-grid-item">
                    <div class="quizzes-grid-item-content">
                        <h6>Quiz title</h6>
                        <div class="quizzes-grid-item-date">04/02/2023</div>
                    </div>
                    <div class="quizzes-grid-item-btn" @click="">
                        <EditIcon />
                    </div>
                </div>

                <div class="quizzes-grid-item">
                    <div class="quizzes-grid-item-content">
                        <h6>Quiz title</h6>
                        <div class="quizzes-grid-item-date">04/02/2023</div>
                    </div>
                    <div class="quizzes-grid-item-btn" @click="">
                        <EditIcon />
                    </div>
                </div>

                <div class="quizzes-grid-item">
                    <div class="quizzes-grid-item-content">
                        <h6>Quiz title</h6>
                        <div class="quizzes-grid-item-date">04/02/2023</div>
                    </div>
                    <div class="quizzes-grid-item-btn" @click="">
                        <EditIcon />
                    </div>
                </div>

                <div class="quizzes-grid-item">
                    <div class="quizzes-grid-item-content">
                        <h6>Quiz title</h6>
                        <div class="quizzes-grid-item-date">04/02/2023</div>
                    </div>
                    <div class="quizzes-grid-item-btn" @click="">
                        <EditIcon />
                    </div>
                </div>

                <div class="quizzes-grid-item">
                    <div class="quizzes-grid-item-content">
                        <h6>Quiz title</h6>
                        <div class="quizzes-grid-item-date">04/02/2023</div>
                    </div>
                    <div class="quizzes-grid-item-btn" @click="">
                        <EditIcon />
                    </div>
                </div>

                <div class="quizzes-grid-item">
                    <div class="quizzes-grid-item-content">
                        <h6>Quiz title</h6>
                        <div class="quizzes-grid-item-date">04/02/2023</div>
                    </div>
                    <div class="quizzes-grid-item-btn" @click="">
                        <EditIcon />
                    </div>
                </div>

                <div class="quizzes-grid-item">
                    <div class="quizzes-grid-item-content">
                        <h6>Quiz title</h6>
                        <div class="quizzes-grid-item-date">04/02/2023</div>
                    </div>
                    <div class="quizzes-grid-item-btn" @click="">
                        <EditIcon />
                    </div>
                </div>

                <div class="quizzes-grid-item">
                    <div class="quizzes-grid-item-content">
                        <h6>Quiz title</h6>
                        <div class="quizzes-grid-item-date">04/02/2023</div>
                    </div>
                    <div class="quizzes-grid-item-btn" @click="">
                        <EditIcon />
                    </div>
                </div>

                <div class="quizzes-grid-item">
                    <div class="quizzes-grid-item-content">
                        <h6>Quiz title</h6>
                        <div class="quizzes-grid-item-date">04/02/2023</div>
                    </div>
                    <div class="quizzes-grid-item-btn" @click="">
                        <EditIcon />
                    </div>
                </div>

                <div class="quizzes-grid-item">
                    <div class="quizzes-grid-item-content">
                        <h6>Quiz title</h6>
                        <div class="quizzes-grid-item-date">04/02/2023</div>
                    </div>
                    <div class="quizzes-grid-item-btn" @click="">
                        <EditIcon />
                    </div>
                </div>

                <div class="quizzes-grid-item">
                    <div class="quizzes-grid-item-content">
                        <h6>Quiz title</h6>
                        <div class="quizzes-grid-item-date">04/02/2023</div>
                    </div>
                    <div class="quizzes-grid-item-btn" @click="">
                        <EditIcon />
                    </div>
                </div>

                <div class="quizzes-grid-item">
                    <div class="quizzes-grid-item-content">
                        <h6>Quiz title</h6>
                        <div class="quizzes-grid-item-date">04/02/2023</div>
                    </div>
                    <div class="quizzes-grid-item-btn" @click="">
                        <EditIcon />
                    </div>
                </div>

                <div class="quizzes-grid-item">
                    <div class="quizzes-grid-item-content">
                        <h6>Quiz title</h6>
                        <div class="quizzes-grid-item-date">04/02/2023</div>
                    </div>
                    <div class="quizzes-grid-item-btn" @click="">
                        <EditIcon />
                    </div>
                </div>

                <div class="quizzes-grid-item">
                    <div class="quizzes-grid-item-content">
                        <h6>Quiz title</h6>
                        <div class="quizzes-grid-item-date">04/02/2023</div>
                    </div>
                    <div class="quizzes-grid-item-btn" @click="">
                        <EditIcon />
                    </div>
                </div>

                <div class="quizzes-grid-item">
                    <div class="quizzes-grid-item-content">
                        <h6>Quiz title</h6>
                        <div class="quizzes-grid-item-date">04/02/2023</div>
                    </div>
                    <div class="quizzes-grid-item-btn" @click="">
                        <EditIcon />
                    </div>
                </div>
            </div>

            <div class="pagination-wrapper">
                <div class="pagination-item pagination-item-arrow-left">
                    <img src="@/assets/img/select-icon.svg" alt="" />
                </div>
                <div class="pagination-item active">1</div>
                <div class="pagination-item">2</div>
                <div class="pagination-item">3</div>
                <div class="pagination-item">...</div>
                <div class="pagination-item">9</div>
                <div class="pagination-item pagination-item-arrow-right">
                    <img src="@/assets/img/select-icon.svg" alt="" />
                </div>
            </div>
        </div>
    </div>
</template>