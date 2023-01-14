import { User } from '../models/user';

/**
 * Recibe un usuario y retorna una instancia de User con esos valores
 * @param {Like<User>} localhostUser 
 * @returns {User}
 */
export const localhostUserToModel = ( localhostUser ) => {

    //De localhostUser desestructuramos y extraemos sus propiedades
    const { 
        avatar,
        balance,
        first_name,
        gender,
        id,
        isActive,
        last_name
    } = localhostUser;


    return new User({
        avatar,
        balance,
        firstName:first_name,
        gender,
        id,
        isActive,
        lastName: last_name,
    });
}