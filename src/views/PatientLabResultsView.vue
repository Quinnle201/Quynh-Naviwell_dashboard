<script>
import DownloadIcon from '@/components/icons/IconDownload.vue'

export default {
    components: {
        DownloadIcon,
    }
};
</script>

<template>
    <div class="page-wrapper">
        <div class="layout-wrapper">
            <h3>Lab results</h3>
        </div>

        <div class="results-wrapper page-bg">
            <div class="results-item">
                <div>
                    <div class="results-item-name">Blood test</div>
                    <div class="results-item-date">27.03.23</div>
                </div>
                
                <div class="results-item-file lab-file-inner">
                    <span>blood-result.pdf</span>
                    <DownloadIcon class="attach-icon" />
                </div>
            </div>
            <div class="results-item">
                <div>
                    <div class="results-item-name">Blood test</div>
                    <div class="results-item-date">27.03.23</div>
                </div>
                
                <div class="results-item-file lab-file-inner">
                    <span>blood-result.pdf</span>
                    <DownloadIcon class="attach-icon" />
                </div>
            </div>
            <div class="results-item">
                <div>
                    <div class="results-item-name">lorem ipsum dolor sit amet consectetur adipiscing elit</div>
                    <div class="results-item-date">27.03.23</div>
                </div>
                
                <div class="results-item-file lab-file-inner">
                    <span>lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit.pdf</span>
                    <DownloadIcon class="attach-icon" />
                </div>
            </div>
            <div class="results-item">
                <div>
                    <div class="results-item-name">Blood test</div>
                    <div class="results-item-date">27.03.23</div>
                </div>
                
                <div class="results-item-file lab-file-inner">
                    <span>blood-result.pdf</span>
                    <DownloadIcon class="attach-icon" />
                </div>
            </div>
        </div>
    </div>
</template>