<script>
</script>

<template>
    <div class="page-wrapper">
        <div class="layout-wrapper">
            <h3>Diabetes quiz</h3>
        </div>

        <div class="page-bg quiz-details">
            <div class="quiz-details-info">
                <h2>Introduction</h2>
                <p>RCTs have found that type 2 diabetes can be prevented among high-risk individuals by metformin medication and evidence-based lifestyle change programs. The purpose of this study is to estimate the use of interventions to prevent type 2 diabetes in real-world clinical practice settings and determine the impact on diabetes-related clinical outcomes.</p>
                <h2>Methods</h2>
                <p>The analysis performed in 2020 used 2010-2018 electronic health record data from 69,434 patients aged ≥18 years at high risk for type 2 diabetes in 2 health systems. The use and impact of prescribed metformin, lifestyle change program, bariatric surgery, and combinations of the 3 were examined. A subanalysis was performed to examine uptake and retention among patients referred to the National Diabetes Prevention Program.</p>
                <h2>Results</h2>
                <p>Mean HbA1c values declined from before to after intervention for patients who were prescribed metformin (-0.067%; p &lt; 0.001) or had bariatric surgery (-0.318%; p &lt; 0.001). Among patients referred to the National Diabetes Prevention Program lifestyle change program, the type 2 diabetes postintervention incidence proportion was 14.0% for nonattendees, 12.8% for some attendance, and 7.5% for those who attended ≥4 sessions (p &lt; 0.001). Among referred patients to the National Diabetes Prevention Program lifestyle change program, uptake was low (13% for 1-3 sessions, 15% for ≥4 sessions), especially among males and Hispanic patients.</p>
                <h2>Conclusions</h2>
                <p>Findings suggest that metformin and bariatric surgery may improve HbA1c levels and that participation in the National Diabetes Prevention Program may reduce type 2 diabetes incidence. Efforts to increase the use of these interventions may have positive impacts on diabetes-related health outcomes.</p>
            </div>

            <RouterLink :to="{ name: 'question' }">Start quiz</RouterLink>
        </div>
    </div>
</template>