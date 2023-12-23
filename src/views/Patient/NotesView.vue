<script>
import TagsTextarea from "@/components/Tags.vue";

export default {
    components: {
        TagsTextarea
    },
    data() {
        return {
            tags: ["Lorem ipsum, dolor sit", "amet consectetur adipisicing elit.", "Ducimus fuga, nulla", "deserunt vitae voluptatum modi officiis?", "Lorem ipsum, dolor sit amet consectetur adipisicing elit."]
    };
    },
};
</script>

<template>
    <div class="page-wrapper">
        <div class="layout-wrapper">
            <h3>*Patient Name*</h3>
        </div>

        <div class="page-bg notes-wrapper">
            <form action="">
                <div class="notes-input-wrapper">
                    <div class="notes-input-inner">
                        <label for="">
                            <span>Time In</span>
                            <TagsTextarea :tags="tags" />
                        </label>
                        <label for="">
                            <span>Time Out</span>
                            <TagsTextarea :tags="tags" />
                        </label>
                    </div>

                    <label for="" class="bg-textarea">
                        <span>Counselling</span>
                        <TagsTextarea :tags="tags" />
                    </label>
                </div>

                <div class="notes-input-wrapper">
                    <label for="">
                        <span>Discussed the following:</span>
                        <TagsTextarea :tags="tags" />
                    </label>

                    <label for="">
                        <span>Next session date</span>
                        <TagsTextarea :tags="tags" />
                    </label>
                </div>

                <div class="notes-input-wrapper">
                    <label for="">
                        <span>Patient homework</span>
                        <TagsTextarea :tags="tags" />
                    </label>

                    <label for="">
                        <span>Date for next follow up with physian</span>
                        <TagsTextarea :tags="tags" />
                    </label>
                </div>

                <div class="notes-input-wrapper notes-health-input">
                    <div class="notes-height-wrapper">
                        <label>Height</label>
                        <div class="notes-height-input">
                            <label for="">
                                <input type="text" />
                                <span>ft</span>
                            </label>
                            <label for="">
                                <input type="text" />
                                <span>in</span>
                            </label>
                        </div>
                    </div>

                    <label>
                        <span>Weight (lbs)</span>
                        <input type="text" />
                    </label>

                    <label>
                        <span>Body Fat (%)</span>
                        <input type="text" />
                    </label>
                </div>

                <div class="notes-input-wrapper notes-health-input">
                    <label>
                        <span>BP</span>
                        <input type="text" />
                    </label>

                    <label>
                        <span>BMI</span>
                        <input type="text" />
                    </label>
                
                    <label>
                        <span>Resting HR</span>
                        <input type="text" />
                    </label>
                </div>

                <button type="submit" class="w-btn">Save</button>
            </form>
        </div>

        <div>
    </div>
    </div>
</template>

<style>
    .notes-input-wrapper {
        width: 100%;
        margin-bottom: 16px;
        padding-bottom: 16px;
        display: flex;
        justify-content: space-between;
        gap: 32px;
        border-bottom: 1px solid #E1E1E1;
    }

    .notes-input-wrapper:last-child {
        border: none;
    }

    .notes-input-inner {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 16px;
    }

    .notes-input-wrapper .notes-input-inner textarea {
        background-color: #FFFFFF;
        width: 100%;
        height: 56px;
        padding: 8px 12px;
        border-radius: 10px;
        color: #000000;
        outline: none;
        border: 1px solid #E7E7E7;
    }

    .notes-input-wrapper label {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .notes-input-wrapper label span {
        margin-bottom: 4px;
        font-size: 16px;
        font-weight: 500;
    }

    .notes-input-wrapper label input {
        background-color: #FFFFFF;
        width: 100%;
        height: 56px;
        padding: 8px 12px;
        border-radius: 10px;
        color: #000000;
        outline: none;
        border: 1px solid #E7E7E7;
    }

    .notes-input-wrapper label textarea {
        background-color: #FFFFFF;
        width: 100%;
        height: 56px;
        padding: 8px 12px;
        color: #000000;
        outline: none;
        resize: none;
        border: 1px solid #E7E7E7;
        border-radius: 10px;
    }

    .notes-input-wrapper .bg-textarea textarea {
        height: 165px;
    }

    .notes-input-wrapper.notes-health-input {
        padding: 0;
        border: none;
    }

    .notes-height-wrapper {
        width: 100%;
    }

    .notes-height-wrapper > label {
        margin-bottom: 4px;
        font-size: 16px;
        font-weight: 500;
    }

    .notes-height-input {
        display: flex;
        gap: 16px;
    }

    .notes-height-input input {
        background-color: #FFFFFF;
        width: 100%;
        height: 56px;
        padding-left: 22px;
        border-radius: 10px;
        color: #000000;
        outline: none;
        border: 1px solid #E7E7E7;
    }

    .notes-height-input > label {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
    }

    .notes-height-input > label span {
        margin: 0 0 0 4px;
    }

    .notes-wrapper .w-btn {
        min-width: auto;
        margin-top: 32px;
        margin-left: auto;
        padding: 16px 56px;
        display: flex;
        justify-content: center;
        font-size: 18px;
    }
</style>