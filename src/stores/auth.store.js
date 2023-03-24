import { defineStore, acceptHMRUpdate } from 'pinia';

import { axiosInstance } from '@/helpers';
import router from '@/router';
import { useAlertStore, useProgrammaticAccesStore } from '@/stores';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')),
        claim: JSON.parse(localStorage.getItem('claim')),
        returnUrl: null
    }),
    getters: {
        isPatient: (state) => state.user?.profile_type.includes("PatientProfile")
      },
    actions: {
        async login(email, password) {
            try {
                const response = await axiosInstance.post('/login', { email, password });
                const data = response.data;

                if(data.message == "NEW_PASSWORD_REQUIRED") {
                    this.user = window.btoa(JSON.stringify({'email': email, 'password': password}))
                    router.push({ path: '/set-password' })
                    return;
                }

                // update pinia state
                this.user = data.data.user;
                this.claim = data.data.auth

                this.getUser()

                // store user details and jwt in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(this.user));
                localStorage.setItem('claim', JSON.stringify(this.claim));

                // redirect to previous url or default to home page
                router
                    .push({ path: '/' })
                    .then(() => { router.go() })
            } catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error.response.data.message);
            }
        },

        async getUser() {
            try {
                const response = await axiosInstance.get('/user');
                
                const data = response.data;
                this.user = data.data;
                localStorage.setItem('user', JSON.stringify(this.user));

                if(this.isPatient) {
                    const programmaticAccess = useProgrammaticAccesStore();
                    if(!this.user.profile.patient_confirmed) {
                        programmaticAccess.setAccessPage('onboarding')
                    } else if(this.user.profile.questionnaireRequired) {
                        programmaticAccess.setAccessPage('quiz')
                    }

                }

            } catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error.response.data.message);
            }
        },

        async logout() {
            await axiosInstance.get('/logout')
                .catch(function (error) {});

            this.user = null;
            this.claim = null;
            localStorage.removeItem('user');
            localStorage.removeItem('claim');
            router.push('/login');
            
        },

        async changePassword(email, password, new_password, new_password_confirmation, isInitial) {
            const refresh_token = "123"; //temporary until ellaysis pkg is updated
            try {
            const response = await axiosInstance.post('/change-password', { email, password, new_password, new_password_confirmation, refresh_token });

            const data = response.data;

            if(isInitial) {
                await this.login(email, new_password);
            }

            } catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error.response.data.message);
            }
        },

        async refreshToken() {
            if(!this.user || !this.claim) {
                this.logout();
                return;
            }
            var email = this.user.email;
            var refresh_token = this.claim.RefreshToken;
            const response = await axiosInstance.post('/refresh', { email, refresh_token });
            const data = response.data
            this.claim = data.data;
            localStorage.setItem('claim', JSON.stringify(this.claim));
        }
    }
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
