import { loadUsersByPage } from "../use-cases/load-users-by-page";

const state = {
    currentPage: 0,
    users: [],
}

const loadNextPage = async() =>{
    await loadUsersByPage( state.currentPage + 1 )
}

const loadPreviousPage = async() => {
    throw new Error('Not implemented');
}


const onUserChanged = () => {
    throw new Error('Not implemented');
}


const reloadPage = () => {
    throw new Error('Not implemented');
}


export default{
    loadNextPage,
    loadPreviousPage,
    onUserChanged,
    reloadPage,
    getUser: () => [...state.users],
    getCurrentPage: ()=> state.currentPage,
}