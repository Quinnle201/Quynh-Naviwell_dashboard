<script>
import DownloadIcon from '@/components/icons/IconDownload.vue'

export default {
    components: {
        DownloadIcon,
    },
};
</script>

<template>
    <div class="page-wrapper">
        <div class="layout-wrapper">
            <h3>Questionnaires results</h3>
        </div>

        <div class="results-wrapper page-bg">
            <div class="results-item">
                <div>
                    <div class="results-item-name">Questionnaire name</div>
                    <div class="results-item-date">02.08.2023</div>
                </div>
                
                <div class="results-item-file lab-file-inner">
                    <span>file_name,pdf</span>
                    <DownloadIcon class="attach-icon" /> 
                </div>
            </div>
        </div>
    </div>
</template>