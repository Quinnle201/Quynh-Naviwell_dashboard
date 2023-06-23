import _findIndex from 'lodash/findIndex'
import { defineStore } from 'pinia'
import { axiosInstance, downloadFile, uploadFile, getFileUrlFromRef } from '@/helpers';

//Used for caching links from AWS

export const useFileStore = defineStore({
    id: 'filecache',
    state: () => ({
        profilePhotos: [],
        dietPhotos: [],
        dietPdfs: [],
        recipePhotos: [],
        recipePdfs: []
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
        },
        dietImages() {
            return (diet) => {
                if(diet == null) {
                    return null
                }
                var index = _findIndex(this.dietPhotos, ['dietid', diet.id]);
                if (index != -1) {
                    return this.dietPhotos[index].link
                }
                return null
                
            }
        },
        dietPdfFiles() {
            return (diet) => {
                if(diet == null) {
                    return null
                }
                var index = _findIndex(this.dietPdfs, ['dietid', diet.id]);
                if (index != -1) {
                    return this.dietPdfs[index].link
                }
                return null
                
            }
        },
        recipeImages() {
            return (recipe) => {
                if(recipe == null) {
                    return null
                }
                var index = _findIndex(this.recipePhotos, ['recipeid', recipe.id]);
                if (index != -1) {
                    return this.recipePhotos[index].link
                }
                return null
                
            }
        },
        recipePdfFiles() {
            return (recipe) => {
                if(recipe == null) {
                    return null
                }
                var index = _findIndex(this.recipePdfs, ['recipeid', recipe.id]);
                if (index != -1) {
                    return this.recipePdfs[index].link
                }
                return null
                
            }
        },
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
        async getPhotoLinkForDiet(diet, force = false) {
            if(!diet){
                return
            }

            var index = _findIndex(this.dietPhotos, ['dietid', diet.id]);
            if (index != -1 && !force) {
                return
            }

            if(force) {
                this.dietPhotos.splice(index, 1)
            }

            //create initial object so we refer to it only once.
            this.dietPhotos.push({
                dietid: diet.id,
                link: null
            })

            if (diet.image == null) {
                return
            }

            const link = await getFileUrlFromRef(`diets/${diet.id}`, diet.image);
            index = _findIndex(this.dietPhotos, ['dietid', diet.id]);
            this.dietPhotos[index] = {
                dietid: diet.id,
                link: link
            }


        },
        async getPdfLinkForDiet(diet, force = false) {
            if(!diet){
                return
            }

            var index = _findIndex(this.dietPdfs, ['dietid', diet.id]);
            if (index != -1 && !force) {
                return
            }

            if(force) {
                this.dietPdfs.splice(index, 1)
            }

            //create initial object so we refer to it only once.
            this.dietPdfs.push({
                dietid: diet.id,
                link: null
            })

            if (diet.attachment == null) {
                return
            }

            const link = await getFileUrlFromRef(`diets/${diet.id}`, diet.attachment);
            index = _findIndex(this.dietPdfs, ['dietid', diet.id]);
            this.dietPdfs[index] = {
                dietid: diet.id,
                link: link
            }


        },
        async getPhotoLinkForRecipe(recipe, force = false) {
            if(!recipe){
                return
            }

            var index = _findIndex(this.recipePhotos, ['recipeid', recipe.id]);
            if (index != -1 && !force) {
                return
            }

            if(force) {
                this.recipePhotos.splice(index, 1)
            }

            //create initial object so we refer to it only once.
            this.recipePhotos.push({
                recipeid: recipe.id,
                link: null
            })

            if (recipe.image == null) {
                return
            }

            const link = await getFileUrlFromRef(`recipes/${recipe.id}`, recipe.image);
            index = _findIndex(this.recipePhotos, ['recipeid', recipe.id]);
            this.recipePhotos[index] = {
                recipeid: recipe.id,
                link: link
            }


        },
        async getPdfLinkForRecipe(recipe, force = false) {
            if(!recipe){
                return
            }

            var index = _findIndex(this.recipePdfs, ['recipeid', recipe.id]);
            if (index != -1 && !force) {
                return
            }

            if(force) {
                this.recipePdfs.splice(index, 1)
            }

            //create initial object so we refer to it only once.
            this.recipePdfs.push({
                recipeid: recipe.id,
                link: null
            })

            if (recipe.attachment == null) {
                return
            }

            const link = await getFileUrlFromRef(`recipes/${recipe.id}`, recipe.attachment);
            index = _findIndex(this.recipePdfs, ['recipeid', recipe.id]);
            this.recipePdfs[index] = {
                recipeid: recipe.id,
                link: link
            }


        },

    }
});