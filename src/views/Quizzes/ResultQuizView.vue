<script>
export default {
    data() {
        return {
            quizzes: [
                { title: 'Eating carbohydrates increases the blood sugar level, but the extent of this rise depends on a food’s _________.', answers : [{ item : 'Iron levels' },{ item : 'Protein content', correct: 'wrong-answer' }, { item: 'Organic nature'}, { item: 'Glycemic Index', correct: 'right-answer'}]},
                { title: 'Foods with a low glycemic index are quickly broken down, leading to sharp increases in blood sugar, followed by sharp drops.', answers : [{ item : 'True', correct: 'wrong-answer' },{ item : 'False', correct: 'right-answer' }]},
                { title: 'Sharp fluctuations in the blood sugar level can increase the risk of diabetes, obesity and heart disease.', answers : [{ item : 'True', correct: 'right-answer' },{ item : 'False', correct: 'wrong-answer' }]}
            ]
        }
    },
}
</script>

<template>
    <div class="page-wrapper">
        <div class="layout-wrapper quiz">
            <h3>What Happens When You Diet?</h3>
        </div>

        <div class="quizzes-wrapper page-bg">
            <div v-for="(quiz, index) in quizzes" :key="quiz.key" class="quiz-result-card">
                <span>Question {{ index + 1 }}</span>
                <div class="quiz-result-card-question">{{ quiz.title }}</div>
                <ul>
                    <li v-for="(answer) in quiz.answers" :class="answer.correct">{{ answer.item }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>