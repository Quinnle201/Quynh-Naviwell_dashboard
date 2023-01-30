import axios from "axios";
import { useAuthStore } from '@/stores';
import {generateUUID, getFileExt} from './file.js'

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

async function getFileUrlFromRef(type, ref) {
    const result = await axiosFileInstance.get(`/${type}/${ref}`)
    return result.data.body
}

export async function downloadFile(file, ref, type) {
    const a = document.createElement("a");
    a.download = file.name;
    const tempUrl = await getFileUrlFromRef(type, ref);
    a.href = tempUrl;
    a.target = '_blank'
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

export function uploadFile(file, type, path) {
    const originalname = file.name;
    const filename = generateUUID() + '.' + getFileExt(originalname);
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