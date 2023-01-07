import { defineStore, acceptHMRUpdate } from 'pinia';

import { axiosInstance } from '@/helpers';
import router from '@/router';
import { useAlertStore } from '@/stores';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')),
        claim: JSON.parse(localStorage.getItem('claim')),
        returnUrl: null
    }),
    actions: {
        async login(email, password) {
            try {
                const response = await axiosInstance.post('/login', { email, password });
                const user = response.data;
                // update pinia state
                this.user = user.user;
                this.claim = user.auth

                // store user details and jwt in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user.user));
                localStorage.setItem('claim', JSON.stringify(user.auth));

                // redirect to previous url or default to home page
                router.push('/');
            } catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error.response.data);
            }
        },
        async logout() {
            this.user = null;
            localStorage.removeItem('user');
            localStorage.removeItem('claim');
            router.push('/login');
        },

        async refreshToken() {
            var email = this.user.email;
            var refresh_token = this.claim.RefreshToken;
            const response = await axiosInstance.post('/refresh', { email, refresh_token });
            this.claim = response.data;
            localStorage.setItem('claim', JSON.stringify(this.claim));
        }
    }
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
