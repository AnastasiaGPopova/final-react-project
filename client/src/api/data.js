import * as api from './api.js';


const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

// Implement application-specific requests
export async function getRecords() {
    return await api.get(host + '/records');
}


export async function get4LastAdded() {
    const response = await api.get(host + '/records/getLast');
    console.log(response)
    return response

}




export async function getItemById(id) {
    return await api.get(host + '/records/' + id);
}

export async function getMyRecords() {
    const userId = sessionStorage.getItem('userId');
    return await api.get(host + `/records?where=_ownerId%3D%22${userId}%22`);
}

export async function createRecord(data) {

        const response = await api.post(host + '/records', data);
        console.log(response)
        return response
}

export async function editRecord(id, data) {
    try{
        return await api.put(host + '/records/' + id, data);
    }catch(error){
        console.log(error)
    }
}


export async function addToWishingList(recordId, data) {
    try{
        return await api.get(host + '/records/' + recordId + '/wish', data);
    }catch(error){
        console.log(error)
    }
}




export async function deleteRecord(id) {
    return await api.del(host + '/records/' + id);
}


export async function addComment(data) {

    const response = await api.post(host + '/comments', data);
    console.log(response)
    return response
}


export async function getAllCommentsForRecord(id) {
    return await api.get(host + '/comments/' + id);
}