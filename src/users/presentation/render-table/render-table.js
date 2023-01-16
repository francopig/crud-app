import './render-table.css';
import usersStore from '../../store/users-store';
import { showModal } from '../render-modal/render-modal';
import { deleteUserById } from '../../use-cases/delete-user-by-id';

let table;

const createTable = () => {
    const table = document.createElement('table');
    const tableHeaders = document.createElement('thead');
    tableHeaders.innerHTML = `
        <tr>
            <th>#ID</th>
            <th>Balance</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Active</th>
            <th>Actions</th>
        </tr>
    `;

    const tableBody = document.createElement('tbody');
    table.append( tableHeaders, tableBody );
    return table;
}

/**
 * 
 * @param { MouseEvent } event 
 */
const tableSelectListener = ( event ) => {
    const element = event.target.closest('.select-user');
    if ( !element ) return;//Hizo click en otro lado

    const id = element.getAttribute('data-id');
    showModal(id);
}

/**
 * 
 * @param { MouseEvent } event 
 */
const tableDeleteListener = async( event ) => {
    const element = event.target.closest('.delete-user');
    if ( !element ) return;//Hizo click en otro lado

    const id = element.getAttribute('data-id');
    try {
        await deleteUserById(id);
        await usersStore.reloadPage();
        document.querySelector('#current-page').innerText = usersStore.getCurrentPage();
        renderTable();

    } catch (error) {
        alert('No se puedo eliminar');
        console.log(error);
    }
}


/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderTable = ( element ) => {
    
    //Renderiza los usuarios como estan en el store
    const users = usersStore.getUsers();
    if( !table ){
        table = createTable();
        element.append( table );

        table.addEventListener('click', ( event )=> tableSelectListener(event));
        table.addEventListener('click', ( event )=> tableDeleteListener(event));
    }

    let tableHTML = ''; 
    users.forEach( user => {
        tableHTML += `
        <tr>
            <td>${ user.id }</td>
            <td>${ user.balance }</td>
            <td>${ user.firstName }</td>
            <td>${ user.lastName }</td>
            <td>
                <a href="#" class="select-user" data-id="${ user.id }">Select</a>
                |
                <a href="#" class="delete-user" data-id="${ user.id }">Delete</a>
            </td>
            <td>Actions</td>
        </tr>
        `
    });

    table.querySelector('tbody').innerHTML = tableHTML;

}