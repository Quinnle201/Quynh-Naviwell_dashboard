import axios from "axios";
import { useAuthStore } from '@/stores';
import { generateUUID, getFileExt } from './file.js'

export const axiosFileInstance = axios.create({
    baseURL: `${import.meta.env.VITE_FILEAPI_URL}`
});

axiosFileInstance.interceptors.request.use((request) => {
    const { claim } = useAuthStore();
    const isLoggedIn = !!claim?.AccessToken;
    const isFileUrl = request.baseURL.startsWith(import.meta.env.VITE_FILEAPI_URL);
    if (isLoggedIn && isFileUrl) {
        request.headers.Authorization = `Bearer ${claim.AccessToken}`
    }
    return request
})

export async function getFileUrlFromRef(type, ref) {
    try {
        const result = await axiosFileInstance.get(`/${type}/${ref}`)
        return result.data.body
    } catch (error) {
        return null
    }
}

export async function downloadFile(file, ref, type) {
    const a = document.createElement("a");
    if(file){
        a.download = file.name;
    }
    const tempUrl = await getFileUrlFromRef(type, ref);
    a.href = tempUrl;
    a.target = '_blank'
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

export function generateFileName(file) {
    const originalname = file.name;
    return generateUUID() + '.' + getFileExt(originalname);;
}

export function uploadFile(file, type, path, filename) {
    const originalname = file.name;
    if (filename == null) {
        filename = generateFileName(file);
    }
    const uploader = axiosFileInstance.put(`/${type}/${path}/${filename}`, file, {
        headers: {
            'Content-Type': file.type ? file.type : 'application/octet-stream'
        }
    })

    return {
        name: originalname,
        ref: filename,
        axios: uploader
    }
}