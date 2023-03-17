<script>

import { axiosInstance } from '@/helpers';
import { useAlertStore } from '@/stores';
import { Form, Field, FieldArray } from 'vee-validate';
import CheckmarkIcon from '@/components/icons/IconCheckmark.vue'

const QuizContent = {
  article: 'article',
  questions: 'questions',
  completed: 'completed',
};

const QuizCompletedLabel = {
    allCorrect: { title: "Congratulations!", description: "All the answers are correct", class: "score-correct" },
    excellent:  { title: "Excellent", description: "Almost all the answers are correct", class: "score-excellent" },
    good:       { title: "You can do better!", description: "Most of the answers are correct", class: "score-good" },
    bad:        { title: "Hey, you did your best!", description: '', class: "score-bad" },
}

export default {
    components: {
        Form,
        Field,
        FieldArray,
        CheckmarkIcon
    },
    
    data() {
        const alertStore = useAlertStore()
        return {
            alertStore,
            quizId: null,
            quizData: null,
            content: QuizContent.article,
            currentQuestion: 0,
            userAnswers: [],
            QuizContent,
            QuizCompletedLabel
        }
    },
    computed: {
        quizScore() {
            let correctAnswerCount = 0;
            for (let index = 0; index < this.userAnswers.length; index++) {
                const answer = this.userAnswers[index];
                if(answer == this.quizData.questions[index].correct){
                    correctAnswerCount++;
                }
            }
            const pct = correctAnswerCount * 100 / this.quizData.questions.length
            return { correct: correctAnswerCount, percentage: Math.round(pct) }
        },
        quizLabel() {
            let score = this.quizScore

            if (score.percentage > 80) {
                return {...QuizCompletedLabel.allCorrect, correct: score.correct, total: this.quizData.questions.length }
            } else if (score.percentage > 70) {
                return {...QuizCompletedLabel.excellent, correct: score.correct, total: this.quizData.questions.length }
            } else if (score.percentage > 40) {
                return {...QuizCompletedLabel.good, correct: score.correct, total: this.quizData.questions.length }
            } else {
                return {...QuizCompletedLabel.bad, correct: score.correct, total: this.quizData.questions.length }
            }
        }
    },
    methods: {
        getQuiz(id) {
            axiosInstance.get(`/quizzes/${id}`)
                .then(response => {
                    this.quizData = response.data.data;
                })
                .catch(error => {
                    this.alertStore.error(error.response.data.message)
                    this.close()
                });
        },
        close() {
            this.$router.back()
        },
        startQuiz() {
            this.content = QuizContent.questions
            this.userAnswers.length = this.quizData.questions.length
            this.userAnswers.fill(-1);
        },
        nextQuestion() {
            if(this.currentQuestion == this.quizData.questions.length-1) {
                if(this.userAnswers.includes(-1)) {
                    let idx = this.userAnswers.indexOf(-1);
                    this.alertStore.error("Please answer all questions!")
                    this.currentQuestion = idx;
                    return;
                }
                this.saveQuizData()
                this.content = QuizContent.completed
            } else {
                this.currentQuestion++;
            }
        }, 
        saveQuizData() {
            axiosInstance.post("/patients/quiz", { id: this.quizId, score: `${this.quizScore.percentage}%` })
            .then(response => {
                       console.log("Saved")
                    })
                    .catch(error => {
                        console.log(error)
                        this.alertStore.error(error.response.data.message)
                    });
        }
    },
    mounted() {
        this.quizId = this.$route.params.id
        this.getQuiz(this.quizId)
    }
}
</script>

<template>
    <div class="page-wrapper" v-if="quizData">
        <div class="layout-wrapper">
            <h3>{{quizData.title}} quiz</h3>
        </div>

        <Transition>
            <div class="page-bg quiz-details" v-if="content == QuizContent.article">
                <div class="quiz-details-info">
                    <div class="ck-content" v-html="quizData.article"></div>
                </div>
                <button type="button" @click="startQuiz" class="quiz-details-btn">Start quiz</button>
            </div>

            <div class="page-bg" v-else-if="content == QuizContent.questions">
                <div class="question-wrapper">
                    <div>Question {{ currentQuestion+1 }} of {{ quizData.questions.length }}</div>
                    <h4>{{quizData.questions[currentQuestion].text }}</h4>
                    <form>
                        <fieldset v-for="(answer, index) in quizData.questions[currentQuestion].answers">
                            <label>
                                {{ answer }}
                                <input type="radio" v-model="userAnswers[currentQuestion]" :name="`answers[${currentQuestion}]`" :value="index" />
                            </label>
                        </fieldset>
                        <button type="button" @click="nextQuestion(values)">Next question</button>
                    </form>
                </div>
            </div>

            <div class="page-bg"  v-else-if="content == QuizContent.completed">
                <div class="complete-quiz">
                    <div class="score" :class="quizLabel.class">
                        <CheckmarkIcon />
                        <span>{{quizLabel.correct}} of {{quizLabel.total}}</span>
                    </div>
                    <h4>{{quizLabel.title}}</h4>
                    <h6>{{quizLabel.description}}</h6>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ante magna, rutrum sit amet ante a, ultrices aliquet quam.</p>

                    <RouterLink :to="{ name: 'quizzes' }">Go back to quizzes</RouterLink>
                </div>
            </div>
        </Transition>

    </div>
</template>