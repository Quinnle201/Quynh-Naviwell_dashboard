<script>
import AddIcon from '@/components/icons/IconAdd.vue'
import Tabs from "@/components/Tabs.vue"
import SearchIcon from '@/components/icons/IconSearch.vue'
import EditIcon from '@/components/icons/IconEdit.vue'
import TimeIcon from '@/components/icons/IconTime.vue'
import WeeklyIcon from '@/components/icons/IconWeekly.vue'

export default {
    components: {
        AddIcon, 
        Tabs, 
        SearchIcon, 
        EditIcon,
        TimeIcon, 
        WeeklyIcon
    },
    data() {
        return {
            tabList: ["Diets", "Recipes"], 
        };
    },
}
</script>
<template>
    <div class="page-wrapper">
        <div class="layout-wrapper">
            <h3>Nutritional Therapy</h3>
        </div>

        <div class="diet-wrapper">
            <tabs class="diet-tabs" :tabList="tabList">
                <template v-slot:tabPanel-1>
                    <div class="diet-search-wrapper">
                        <form class="" method="get">
                            <label class="search-input">
                                <input placeholder="Search" type="search" autocomplete="off">
                                <SearchIcon />
                            </label>
                        </form>

                        <RouterLink :to="{ name: 'add-diet' }" class="add-button">
                            <AddIcon />
                            <button type="button">Add New Diet</button>
                        </RouterLink>
                    </div>

                    <div class="diet-grid">
                        <div class="diet-grid-item">
                            <div class="diet-grid-item-content">
                                <h6>Atkins Diet</h6>

                                <div class="diet-grid-item-content-icon">
                                    <WeeklyIcon />
                                    <span>7 days</span>
                                </div>
                            </div>

                            <div class="quotes-grid-item-btn">
                                <EditIcon />
                            </div>
                        </div>

                        <div class="diet-grid-item">
                            <div class="diet-grid-item-content">
                                <h6>Dukan Diet</h6>

                                <div class="diet-grid-item-content-icon">
                                    <WeeklyIcon />
                                    <span>10 days</span>
                                </div>
                            </div>

                            <div class="quotes-grid-item-btn">
                                <EditIcon />
                            </div>
                        </div>

                        <div class="diet-grid-item">
                            <div class="diet-grid-item-content">
                                <h6>Paleo Diet</h6>

                                <div class="diet-grid-item-content-icon">
                                    <WeeklyIcon />
                                    <span>5 days</span>
                                </div>
                            </div>

                            <div class="quotes-grid-item-btn">
                                <EditIcon />
                            </div>
                        </div>

                        <div class="diet-grid-item">
                            <div class="diet-grid-item-content">
                                <h6>Mediterranean Diet</h6>

                                <div class="diet-grid-item-content-icon">
                                    <WeeklyIcon />
                                    <span>14 days</span>
                                </div>
                            </div>

                            <div class="quotes-grid-item-btn">
                                <EditIcon />
                            </div>
                        </div>

                        <div class="diet-grid-item">
                            <div class="diet-grid-item-content">
                                <h6>Cardiac diet</h6>

                                <div class="diet-grid-item-content-icon">
                                    <WeeklyIcon />
                                    <span>5 days</span>
                                </div>
                            </div>

                            <div class="quotes-grid-item-btn">
                                <EditIcon />
                            </div>
                        </div>

                        <div class="diet-grid-item">
                            <div class="diet-grid-item-content">
                                <h6>Keto Diet</h6>

                                <div class="diet-grid-item-content-icon">
                                    <WeeklyIcon />
                                    <span>3 days</span>
                                </div>
                            </div>

                            <div class="quotes-grid-item-btn">
                                <EditIcon />
                            </div>
                        </div>

                        <div class="diet-grid-item">
                            <div class="diet-grid-item-content">
                                <h6>Renal Diet</h6>

                                <div class="diet-grid-item-content-icon">
                                    <WeeklyIcon />
                                    <span>7 days</span>
                                </div>
                            </div>

                            <div class="quotes-grid-item-btn">
                                <EditIcon />
                            </div>
                        </div>

                        <div class="diet-grid-item">
                            <div class="diet-grid-item-content">
                                <h6>Diet "Table number 5"</h6>

                                <div class="diet-grid-item-content-icon">
                                    <WeeklyIcon />
                                    <span>14 days</span>
                                </div>
                            </div>

                            <div class="quotes-grid-item-btn">
                                <EditIcon />
                            </div>
                        </div>

                        <div class="diet-grid-item">
                            <div class="diet-grid-item-content">
                                <h6>Atkins Diet</h6>

                                <div class="diet-grid-item-content-icon">
                                    <WeeklyIcon />
                                    <span>7 days</span>
                                </div>
                            </div>

                            <div class="quotes-grid-item-btn">
                                <EditIcon />
                            </div>
                        </div>

                        <div class="diet-grid-item">
                            <div class="diet-grid-item-content">
                                <h6>Dukan Diet</h6>

                                <div class="diet-grid-item-content-icon">
                                    <WeeklyIcon />
                                    <span>10 days</span>
                                </div>
                            </div>

                            <div class="quotes-grid-item-btn">
                                <EditIcon />
                            </div>
                        </div>

                        <div class="diet-grid-item">
                            <div class="diet-grid-item-content">
                                <h6>Paleo Diet</h6>

                                <div class="diet-grid-item-content-icon">
                                    <WeeklyIcon />
                                    <span>5 days</span>
                                </div>
                            </div>

                            <div class="quotes-grid-item-btn">
                                <EditIcon />
                            </div>
                        </div>

                        <div class="diet-grid-item">
                            <div class="diet-grid-item-content">
                                <h6>Mediterranean Diet</h6>

                                <div class="diet-grid-item-content-icon">
                                    <WeeklyIcon />
                                    <span>14 days</span>
                                </div>
                            </div>

                            <div class="quotes-grid-item-btn">
                                <EditIcon />
                            </div>
                        </div>

                        <div class="diet-grid-item">
                            <div class="diet-grid-item-content">
                                <h6>Cardiac diet</h6>

                                <div class="diet-grid-item-content-icon">
                                    <WeeklyIcon />
                                    <span>5 days</span>
                                </div>
                            </div>

                            <div class="quotes-grid-item-btn">
                                <EditIcon />
                            </div>
                        </div>

                        <div class="diet-grid-item">
                            <div class="diet-grid-item-content">
                                <h6>Keto Diet</h6>

                                <div class="diet-grid-item-content-icon">
                                    <WeeklyIcon />
                                    <span>3 days</span>
                                </div>
                            </div>

                            <div class="quotes-grid-item-btn">
                                <EditIcon />
                            </div>
                        </div>

                        <div class="diet-grid-item">
                            <div class="diet-grid-item-content">
                                <h6>Renal Diet</h6>

                                <div class="diet-grid-item-content-icon">
                                    <WeeklyIcon />
                                    <span>7 days</span>
                                </div>
                            </div>

                            <div class="quotes-grid-item-btn">
                                <EditIcon />
                            </div>
                        </div>

                        <div class="diet-grid-item">
                            <div class="diet-grid-item-content">
                                <h6>Diet "Table number 5"</h6>

                                <div class="diet-grid-item-content-icon">
                                    <WeeklyIcon />
                                    <span>14 days</span>
                                </div>
                            </div>

                            <div class="quotes-grid-item-btn">
                                <EditIcon />
                            </div>
                        </div>

                        <div class="diet-grid-item">
                            <div class="diet-grid-item-content">
                                <h6>Atkins Diet</h6>

                                <div class="diet-grid-item-content-icon">
                                    <WeeklyIcon />
                                    <span>7 days</span>
                                </div>
                            </div>

                            <div class="quotes-grid-item-btn">
                                <EditIcon />
                            </div>
                        </div>

                        <div class="diet-grid-item">
                            <div class="diet-grid-item-content">
                                <h6>Dukan Diet</h6>

                                <div class="diet-grid-item-content-icon">
                                    <WeeklyIcon />
                                    <span>10 days</span>
                                </div>
                            </div>

                            <div class="quotes-grid-item-btn">
                                <EditIcon />
                            </div>
                        </div>

                        <div class="diet-grid-item">
                            <div class="diet-grid-item-content">
                                <h6>Paleo Diet</h6>

                                <div class="diet-grid-item-content-icon">
                                    <WeeklyIcon />
                                    <span>5 days</span>
                                </div>
                            </div>

                            <div class="quotes-grid-item-btn">
                                <EditIcon />
                            </div>
                        </div>

                        <div class="diet-grid-item">
                            <div class="diet-grid-item-content">
                                <h6>Mediterranean Diet</h6>

                                <div class="diet-grid-item-content-icon">
                                    <WeeklyIcon />
                                    <span>14 days</span>
                                </div>
                            </div>

                            <div class="quotes-grid-item-btn">
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
                </template>

                <template v-slot:tabPanel-2>
                    <div class="diet-search-wrapper">
                        <form class="" method="get">
                            <label class="search-input">
                                <input placeholder="Search" type="search" autocomplete="off">
                                <SearchIcon />
                            </label>
                        </form>

                        <RouterLink :to="{ name: 'add-recipe' }" class="add-button">
                            <AddIcon />
                            <button type="button">Add New Recipe</button>
                        </RouterLink>
                    </div>

                    <div class="diet-grid recipe-grid">
                        <div class="diet-grid-item">
                            <div class="diet-grid-item-content">
                                <h6>Lemon chicken</h6>

                                <ul class="diet-grid-item-content-list">
                                    <li>lemon</li>
                                    <li>chicken</li>
                                    <li>dark soy sauce</li>
                                </ul>

                                <div class="diet-grid-item-content-icon">
                                    <TimeIcon />
                                    <span>10 min</span>
                                </div>
                            </div>

                            <div class="quotes-grid-item-btn">
                                <EditIcon />
                            </div>
                        </div>

                        <div class="diet-grid-item">
                            <div class="diet-grid-item-content">
                                <h6>Sesame beef with gochujang udon noodles</h6>

                                <ul class="diet-grid-item-content-list">
                                    <li>beef steak</li>
                                    <li>udon noodles</li>
                                    <li>mixed mushrooms</li>
                                </ul>

                                <div class="diet-grid-item-content-icon">
                                    <TimeIcon />
                                    <span>7-10 min</span>
                                </div>
                            </div>

                            <div class="quotes-grid-item-btn">
                                <EditIcon />
                            </div>
                        </div>

                        <div class="diet-grid-item">
                            <div class="diet-grid-item-content">
                                <h6>Garlicky fried rice with crisp pork</h6>

                                <ul class="diet-grid-item-content-list">
                                    <li>peanut oil</li>
                                    <li>garlic cloves</li>
                                    <li>minced pork</li>
                                </ul>

                                <div class="diet-grid-item-content-icon">
                                    <TimeIcon />
                                    <span>10-12 min</span>
                                </div>
                            </div>

                            <div class="quotes-grid-item-btn">
                                <EditIcon />
                            </div>
                        </div>

                        <div class="diet-grid-item">
                            <div class="diet-grid-item-content">
                                <h6>Tofu scramble with shredded cabbage and chilli sambal</h6>

                                <ul class="diet-grid-item-content-list">
                                    <li>ginger</li>
                                    <li>silken tofu</li>
                                    <li>cabbage</li>
                                </ul>

                                <div class="diet-grid-item-content-icon">
                                    <TimeIcon />
                                    <span>14-16 min</span>
                                </div>
                            </div>

                            <div class="quotes-grid-item-btn">
                                <EditIcon />
                            </div>
                        </div>

                        <div class="diet-grid-item">
                            <div class="diet-grid-item-content">
                                <h6>Garlic and spinach gnocchi with lemon and pecorino</h6>

                                <ul class="diet-grid-item-content-list">
                                    <li>King Edward potatoes</li>
                                    <li>baby spinach</li>
                                    <li>butter</li>
                                </ul>

                                <div class="diet-grid-item-content-icon">
                                    <TimeIcon />
                                    <span>20 min</span>
                                </div>
                            </div>

                            <div class="quotes-grid-item-btn">
                                <EditIcon />
                            </div>
                        </div>

                        <div class="diet-grid-item">
                            <div class="diet-grid-item-content">
                                <h6>Lemon chicken</h6>

                                <ul class="diet-grid-item-content-list">
                                    <li>lemon</li>
                                    <li>chicken</li>
                                    <li>dark soy sauce</li>
                                </ul>

                                <div class="diet-grid-item-content-icon">
                                    <TimeIcon />
                                    <span>10 min</span>
                                </div>
                            </div>

                            <div class="quotes-grid-item-btn">
                                <EditIcon />
                            </div>
                        </div>

                        <div class="diet-grid-item">
                            <div class="diet-grid-item-content">
                                <h6>Sesame beef with gochujang udon noodles</h6>

                                <ul class="diet-grid-item-content-list">
                                    <li>beef steak</li>
                                    <li>udon noodles</li>
                                    <li>mixed mushrooms</li>
                                </ul>

                                <div class="diet-grid-item-content-icon">
                                    <TimeIcon />
                                    <span>7-10 min</span>
                                </div>
                            </div>

                            <div class="quotes-grid-item-btn">
                                <EditIcon />
                            </div>
                        </div>

                        <div class="diet-grid-item">
                            <div class="diet-grid-item-content">
                                <h6>Garlicky fried rice with crisp pork</h6>

                                <ul class="diet-grid-item-content-list">
                                    <li>peanut oil</li>
                                    <li>garlic cloves</li>
                                    <li>minced pork</li>
                                </ul>

                                <div class="diet-grid-item-content-icon">
                                    <TimeIcon />
                                    <span>10-12 min</span>
                                </div>
                            </div>

                            <div class="quotes-grid-item-btn">
                                <EditIcon />
                            </div>
                        </div>

                        <div class="diet-grid-item">
                            <div class="diet-grid-item-content">
                                <h6>Tofu scramble with shredded cabbage and chilli sambal</h6>

                                <ul class="diet-grid-item-content-list">
                                    <li>ginger</li>
                                    <li>silken tofu</li>
                                    <li>cabbage</li>
                                </ul>

                                <div class="diet-grid-item-content-icon">
                                    <TimeIcon />
                                    <span>14-16 min</span>
                                </div>
                            </div>

                            <div class="quotes-grid-item-btn">
                                <EditIcon />
                            </div>
                        </div>

                        <div class="diet-grid-item">
                            <div class="diet-grid-item-content">
                                <h6>Garlic and spinach gnocchi with lemon and pecorino</h6>

                                <ul class="diet-grid-item-content-list">
                                    <li>King Edward potatoes</li>
                                    <li>baby spinach</li>
                                    <li>butter</li>
                                </ul>

                                <div class="diet-grid-item-content-icon">
                                    <TimeIcon />
                                    <span>20 min</span>
                                </div>
                            </div>

                            <div class="quotes-grid-item-btn">
                                <EditIcon />
                            </div>
                        </div>

                        <div class="diet-grid-item">
                            <div class="diet-grid-item-content">
                                <h6>Lemon chicken</h6>

                                <ul class="diet-grid-item-content-list">
                                    <li>lemon</li>
                                    <li>chicken</li>
                                    <li>dark soy sauce</li>
                                </ul>

                                <div class="diet-grid-item-content-icon">
                                    <TimeIcon />
                                    <span>10 min</span>
                                </div>
                            </div>

                            <div class="quotes-grid-item-btn">
                                <EditIcon />
                            </div>
                        </div>

                        <div class="diet-grid-item">
                            <div class="diet-grid-item-content">
                                <h6>Sesame beef with gochujang udon noodles</h6>

                                <ul class="diet-grid-item-content-list">
                                    <li>beef steak</li>
                                    <li>udon noodles</li>
                                    <li>mixed mushrooms</li>
                                </ul>

                                <div class="diet-grid-item-content-icon">
                                    <TimeIcon />
                                    <span>7-10 min</span>
                                </div>
                            </div>

                            <div class="quotes-grid-item-btn">
                                <EditIcon />
                            </div>
                        </div>

                        <div class="diet-grid-item">
                            <div class="diet-grid-item-content">
                                <h6>Garlicky fried rice with crisp pork</h6>

                                <ul class="diet-grid-item-content-list">
                                    <li>peanut oil</li>
                                    <li>garlic cloves</li>
                                    <li>minced pork</li>
                                </ul>

                                <div class="diet-grid-item-content-icon">
                                    <TimeIcon />
                                    <span>10-12 min</span>
                                </div>
                            </div>

                            <div class="quotes-grid-item-btn">
                                <EditIcon />
                            </div>
                        </div>

                        <div class="diet-grid-item">
                            <div class="diet-grid-item-content">
                                <h6>Tofu scramble with shredded cabbage and chilli sambal</h6>

                                <ul class="diet-grid-item-content-list">
                                    <li>ginger</li>
                                    <li>silken tofu</li>
                                    <li>cabbage</li>
                                </ul>

                                <div class="diet-grid-item-content-icon">
                                    <TimeIcon />
                                    <span>14-16 min</span>
                                </div>
                            </div>

                            <div class="quotes-grid-item-btn">
                                <EditIcon />
                            </div>
                        </div>

                        <div class="diet-grid-item">
                            <div class="diet-grid-item-content">
                                <h6>Garlic and spinach gnocchi with lemon and pecorino</h6>

                                <ul class="diet-grid-item-content-list">
                                    <li>King Edward potatoes</li>
                                    <li>baby spinach</li>
                                    <li>butter</li>
                                </ul>

                                <div class="diet-grid-item-content-icon">
                                    <TimeIcon />
                                    <span>20 min</span>
                                </div>
                            </div>

                            <div class="quotes-grid-item-btn">
                                <EditIcon />
                            </div>
                        </div>

                        <div class="diet-grid-item">
                            <div class="diet-grid-item-content">
                                <h6>Lemon chicken</h6>

                                <ul class="diet-grid-item-content-list">
                                    <li>lemon</li>
                                    <li>chicken</li>
                                    <li>dark soy sauce</li>
                                </ul>

                                <div class="diet-grid-item-content-icon">
                                    <TimeIcon />
                                    <span>10 min</span>
                                </div>
                            </div>

                            <div class="quotes-grid-item-btn">
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
                </template>
            </tabs>
        </div>
    </div>
</template>