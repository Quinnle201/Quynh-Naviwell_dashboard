<script>
import QuestionnaireIcon from '@/components/icons/IconQuestionnaire.vue'

export default {
    components: {
        QuestionnaireIcon
    },
}
</script>

<template>
    <div class="page-wrapper">
        <div class="layout-wrapper">
            <h3>My Quizzes & Questionnaires</h3>
        </div>

        <div class="page-bg">
            <div class="q-title">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ante magna, rutrum sit amet ante a, ultrices aliquet quam.
            </div>

            <ul class="q-list">
                <li>
                    <div class="q-list-icon">
                        <QuestionnaireIcon />
                    </div>
                    <div class="q-info">
                        <div>Diabetes</div>
                        <span>10 questions</span>
                    </div>
                    <RouterLink :to="{ name: 'question-details' }">Begin</RouterLink>
                </li>
                <li>
                    <div class="q-list-icon">
                        <QuestionnaireIcon />
                    </div>
                    <div class="q-info">
                        <div>Anxiety</div>
                        <span>8 questions</span>
                    </div>
                    <RouterLink :to="{ name: 'question-details' }">Begin</RouterLink>
                </li>
            </ul>
        </div>
    </div>
</template>