<script>
import CheckmarkIcon from '@/components/icons/IconCheckmark.vue'

export default {
    components: {
        CheckmarkIcon
    },
}
</script>

<template>
    <div class="page-wrapper">
        <div class="layout-wrapper">
            <h3>Diabetes quiz</h3>
        </div>

        <div class="page-bg">
            <div class="complete-quiz">
                <div class="score">
                    <CheckmarkIcon />
                    <span>10 of 10</span>
                </div>
                <h4>Congratulations!</h4>
                <h6>All the answers are correct</h6>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ante magna, rutrum sit amet ante a, ultrices aliquet quam.</p>

                <RouterLink :to="{ name: 'questionnaire' }">Go back to quizzes</RouterLink>
            </div>
        </div>
    </div>
</template>