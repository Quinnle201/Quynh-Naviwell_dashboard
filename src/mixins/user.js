export default {
    computed: {
        userName() {
            return (user) => user?.first_name + ' ' + user?.last_name
        },
    }
}