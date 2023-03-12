<script>
import Tabs from "@/components/Tabs.vue"

export default {
    components: {
        Tabs,
    },
    data() {
        return {
            tabList: ["Diets", "Recipes"],
        }
    }
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
                    <div class="diet-grid pt-grid">
                        <RouterLink :to="{ name: 'patient-diet-details' }">
                            <div class="diet-grid-item pt-diet-item">
                                <img src="@/assets/img/mediterranean.jpg" alt="Diet image">

                                <div class="diet-grid-item-content">
                                    <h6>Mediterranean diet</h6>

                                    <p>The Mediterranean Diet emphasizes plant-based foods and healthy fats.</p>
                                </div>
                            </div>
                        </RouterLink>

                        <RouterLink :to="{ name: 'patient-diet-details' }">
                            <div class="diet-grid-item pt-diet-item">
                                <img src="@/assets/img/paleo.png" alt="Diet image">
                                <div class="diet-grid-item-content">
                                    <h6>Paleo diet</h6>

                                    <p>Paleolithic diets are all about eating like our ancestors did - opting for grass-fed meats, an abundance of fruit and veg and other wholefoods like nuts and seeds.</p>
                                </div>
                            </div>
                        </RouterLink>

                        <RouterLink :to="{ name: 'patient-diet-details' }">
                            <div class="diet-grid-item pt-diet-item">
                                <img src="@/assets/img/paleo.png" alt="Diet image">
                                <div class="diet-grid-item-content">
                                    <h6>Paleo diet</h6>

                                    <p>Paleolithic diets are all about eating like our ancestors did - opting for grass-fed meats, an abundance of fruit and veg and other wholefoods like nuts and seeds.</p>
                                </div>
                            </div>
                        </RouterLink>
                                                
                        <RouterLink :to="{ name: 'patient-diet-details' }">
                            <div class="diet-grid-item pt-diet-item">
                                <img src="@/assets/img/mediterranean.jpg" alt="Diet image">

                                <div class="diet-grid-item-content">
                                    <h6>Mediterranean diet</h6>

                                    <p>The Mediterranean Diet emphasizes plant-based foods and healthy fats.</p>
                                </div>
                            </div>
                        </RouterLink>
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
                    <div class="diet-grid recipe-grid">
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