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



export async function getItemById(id) {
    return await api.get(host + '/records/' + id);
}

export async function getMyRecords(id) {
 
    const response = await api.get(host + `/records/` + id);
    return response
}

export async function getMyWishList(id) {
 
    const response = await api.get(host + `/records/` + id);
    return response
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



export async function searchFunction(data) {
    try{
        return await api.post(host + '/search', data);
        
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

export async function getUser() {
 
    const response = await api.get(host + `/users/`);
    return response
}


export async function deleteAllCommentsbyUser(id) {
    return await api.post(host + '/comments/' + id);
}
