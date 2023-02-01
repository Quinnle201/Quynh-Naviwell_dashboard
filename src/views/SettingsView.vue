<script>
import CalendarIcon from '@/components/icons/IconCalendar.vue'

export default {
    components: {
        CalendarIcon
    }
}
</script>

<template>
    <div class="page-wrapper">
        <div class="layout-wrapper">
            <h3>Settings</h3>
        </div>

        <div class="settings-wrapper page-bg">
            <div class="settings-inner">
                <div class="settings-inner-img">
                    <img src="@/assets/img/avatar.webp" alt="" />
                    <button>Change Image</button>
                </div>

                <div class="border"></div>

                <div class="settings-inner-input">
                    <form>
                        <label for="name">
                        Name
                            <input type="text" name="name" placeholder="Type your name..."/>
                        </label>

                        <label for="surname">
                            Surname
                            <input type="text" name="surname" placeholder="Type your surname..." />
                        </label>

                        <label for="dob" class="settings-inner-input-date">
                            Date of birth
                            <input type="date" name="dob" />
                            <CalendarIcon />
                        </label>

                        <label for="password">
                            Password
                            <input type="password" name="password" placeholder="Type your password..." />
                        </label>
                        
                        <button type="submit" class="w-btn">Save</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>