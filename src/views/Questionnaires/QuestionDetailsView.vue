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
            QuizContent,
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
        },
        nextQuestion() {
            if(this.currentQuestion == this.quizData.questions.length-1) {
                this.content = QuizContent.completed
            } else {
                this.currentQuestion++;
            }
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
                    <Form>
                        <FieldArray name="questions">
                            <fieldset v-for="(answer, index) in quizData.questions[currentQuestion].answers">
                                <label>
                                    {{ answer }}
                                    <Field type="radio" :name="`1`" :value="index" />
                                </label>
                            </fieldset>
                        </FieldArray>

                        <button type="button" @click="nextQuestion">Next question</button>
                    </Form>
                </div>
            </div>

            <div class="page-bg"  v-else-if="content == QuizContent.completed">
                <div class="complete-quiz">
                    <div class="score">
                        <CheckmarkIcon />
                        <span>10 of 10</span>
                    </div>
                    <h4>Congratulations!</h4>
                    <h6>All the answers are correct</h6>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ante magna, rutrum sit amet ante a, ultrices aliquet quam.</p>

                    <RouterLink :to="{ name: 'quizzes' }">Go back to quizzes</RouterLink>
                </div>
            </div>
        </Transition>

    </div>
</template>