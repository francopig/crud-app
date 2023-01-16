import {User} from '../models/user';

/**
 * 
 * @param {User} user 
 */
export const userModelToLocalhost = ( user ) => {
    
    const {
        avatar,
        balance,
        firstName,
        gender,
        id,
        isActive,
        lastName,
    } = user;

    //Regreso un objeto como los espera mi backend
    return{
        avatar,
        balance,
        first_name: firstName,
        gender,
        id,
        isActive,
        last_name: lastName,
    }

}