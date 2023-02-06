import _findIndex from 'lodash/findIndex'
import { defineStore } from 'pinia'
import { axiosInstance, downloadFile, uploadFile, getFileUrlFromRef } from '@/helpers';

//Used for caching links from AWS

export const useFileStore = defineStore({
    id: 'filecache',
    state: () => ({
        profilePhotos: []
    }),
    getters: {
        profileAvatars() {
            return (user) => {
                if(user == null) {
                    return ''
                }
                var index = _findIndex(this.profilePhotos, ['userid', user.id]);
                if (index != -1) {
                    return this.profilePhotos[index].link
                }
                return ''
                
            }
        }
    },
    actions: {
        async getPhotoLinkForUser(user, force = false) {
            if(!user){
                return
            }
            var index = _findIndex(this.profilePhotos, ['userid', user.id]);
            if (index != -1 && !force) {
                return
            }

            if(force) {
                this.profilePhotos.splice(index, 1)
            }

            //create initial object so we refer to it only once.
            this.profilePhotos.push({
                userid: user.id,
                link: '/img/usericon.png'
            })

            if (user.image == null) {
                return
            }

            const link = await getFileUrlFromRef(`users/${user.id}/photos`, user.image);
            index = _findIndex(this.profilePhotos, ['userid', user.id]);
            this.profilePhotos[index] = {
                userid: user.id,
                link: link
            }


        },

    }
});