import modalHtml from './render-modal.html?raw';
import './render-modal.css';
import { User } from '../../models/user' ;
import { getUserById } from '../../use-cases/get-user-by-id';

let modal, form;
let loadedUser = {}; //para saber si hubo información cargada y guardarla

/**
 * @param {String|Number} id
 */
export const showModal = async( id ) =>{
    modal?.classList.remove('hide-modal');
    loadedUser = {}; //para asegurarme que siempre hay un objeto para el spread mas abajo

    if ( !id ) return;

    const user = await getUserById( id );
    setFormValues(user);
}


export const hideModal = () => {
    
    modal?.classList.add('hide-modal');
    
    //Reset formulario
    form?.reset();
}
    
/**
 * 
 * @param {User} user 
 */
const setFormValues = ( user ) => {
    form.querySelector('[name=firstName]').value = user.firstName; 
    form.querySelector('[name=lastName]').value = user.lastName; 
    form.querySelector('[name=balance]').value = user.balance; 
    form.querySelector('[name=isActive]').checked = user.isActive; 
    loadedUser = user;
}

/**
 * 
 * @param {HTMLDivElement} element 
 * @param {(userLike)=> Promise<void>} callback
 */
export const renderModal = ( element, callback ) => {

    if( modal ) return; //Si ya existe no hacemos nada

    modal = document.createElement('div');
    modal.innerHTML =  modalHtml;
    modal.className = 'modal-container hide-modal';
    form = modal.querySelector('form');

    modal.addEventListener('click', ( event )=> {
        if( event.target.className === 'modal-container' ) hideModal();
    });

    form.addEventListener('submit', async( event )=>{
        event.preventDefault();
        
        const formData = new FormData( form );
        const userLike = { ...loadedUser };

        //Para solucionar el boolean de isActive
        if(!formData.get('isActive')){
            formData.append('isActive', 'off');
        }

        for (const [key, value] of formData) {
            if( key === 'balance'){
                userLike[key] = Number(value);
                continue;
            }

            if( key === 'isActive'){
                userLike[key] = (value === 'on') ? true: false;
                continue;
            }


            userLike[key] = value;
        }

        await callback( userLike );

        hideModal();

        

    });

    element.append( modal );

}