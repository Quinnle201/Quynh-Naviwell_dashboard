import { defineStore } from 'pinia';
import { generateUUID } from '@/helpers';

export const useAlertStore = defineStore({
    id: 'alert',
    state: () => ({
        alerts: []
    }),
    actions: {
        success(message) {
            this.addMessage(message, 'alert-success')
        },
        error(message) {
            this.addMessage(message, 'alert-danger')
        },
        remove(id) {
            const ind = this.alerts.findIndex((elem) => elem.uid == id)
            if (ind == -1) {
                return
            }
            this.alerts.splice(ind, 1)
        },
        cancelTimer(id) {
            const ind = this.alerts.findIndex((elem) => elem.uid == id)
            if (ind == -1) {
                return
            }
            const alert = this.alerts[ind]
            clearTimeout(alert.timeoutId)
        },
        clear() {
            this.alerts = []
        },

        //according to great explanation from: https://ux.stackexchange.com/a/85897
        addMessage(message, type) {

            const uid = generateUUID()
            const msToReadMsg = message.length * 50;
            const msMaxShowTime = 7000
            const msMinShowTime = 2000
            const msShowTime = Math.min(Math.max(msToReadMsg, msMinShowTime), msMaxShowTime);

            const timeoutId = setTimeout(() => {
                this.remove(uid)
            }, msShowTime)

            this.alerts.push({
                message,
                type: type,
                uid: uid,
                timeoutId: timeoutId
            })

        }
    }
});
