import './render-table.css';
import usersStore from '../../store/users-store';

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
 * @param {HTMLDivElement} element 
 */
export const renderTable = ( element ) => {
    
    //Renderiza los usuarios como estan en el store
    const users = usersStore.getUsers();
    if( !table ){
        table = createTable();
        element.append( table );

        // TODO: Listeners a la table
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
                <a href="#" data-id="${ user.id }">Select</a>
                |
                <a href="#" data-id="${ user.id }">Delete</a>
            </td>
            <td>Actions</td>
        </tr>
        `
    });

    table.querySelector('tbody').innerHTML = tableHTML;

}