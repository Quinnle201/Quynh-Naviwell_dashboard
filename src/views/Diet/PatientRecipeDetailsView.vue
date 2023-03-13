<script>
export default {
    data() {
        return {
            steps: [
                {value: 'Remove the shells from the shrimp and set aside.'},
                {value: 'Heat the sesame oil in a large pot set over medium heat. Add the star anise, garlic, and ginger; heat until fragrant, about 30-60 seconds. Pour in the broth, shrimp shells, soy sauce, hoisin sauce, fish sauce, lime juice, and sliced jalapeño. Bring to a boil, then reduce the heat to low and simmer for 20 minutes with the pot covered 3/4 of the way.'},
                {value: 'While the broth is simmering, cook the noodles according to package instructions. Drain in a strainer, then rinse the noodles with cold water until they are no longer warm to prevent them from continuing to cook. (I also recommend tossing the noodles with a drizzle of oil, like sesame oil, to prevent them from sticking.)'},
                {value: 'Using a slotted spoon, carefully remove the shrimp shells and discard.'},
                {value: 'Finish cooking the soup. Add the bok choy and shrimp to the broth and cook for 3-4 minutes, until the shrimp are fully cooked and opaque.'},
                {value: 'Serve.Divide the noodles between bowls and ladle the soup over top, garnish and serve hot.'}
            ]
        }
    }
}
</script>

<template>
    <div class="page-wrapper">
        <div class="diet-wrapper recipe-details">
            <div class="recipe-details-aside">
                <img src="@/assets/img/shrimp-pho.jpg" alt="Diet image">

                <div class="recipe-details-aside-ing">
                    <h5>Ingredients</h5>
                    <ul>
                        <li>200 gr shrimp</li>
                        <li>noodle</li>
                        <li>vegetables</li>
                        <li>sesame oil</li>
                        <li>anise</li>
                        <li>garlic</li>
                        <li>ginger</li>
                        <li>soy sauce</li>
                        <li>hoisin sauce</li>
                        <li>fish sauce</li>
                        <li>lime</li>
                        <li>jalapeno</li>
                    </ul>
                </div>
            </div>

            <div class="recipe-details-descr">
                <h3>Shrimp Pho</h3>

                <div class="recipe-details-descr-labels">
                    <span>
                        <img src="@/assets/img/servings.svg" alt="Icon">
                        2-4
                    </span>
                    <span>
                        <img src="@/assets/img/time.svg" alt="Icon">
                        20 min
                    </span>
                </div>

                <div class="recipe-details-dir">
                    <h5>Directions</h5>

                    <div class="recipe-details-dir-item" v-for="(step, index) in steps">
                        <span>Step {{ index + 1 }}</span>
                        <div>{{ step.value }}</div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>