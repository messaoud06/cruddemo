import jwt_decode from 'jwt-decode';

class helper {

    //manage storage 
    storageManager = JSON.parse(localStorage.getItem('crudapp_rememberuser')) === true ? localStorage : sessionStorage;

    //managing token in storage
    getTokenFromStorage = () => this.storageManager.getItem('crudapp_token');
    setTokenInStorage = (token) => this.storageManager.setItem('crudapp_token', token);
    removeTokenFromStorage = () => this.storageManager.removeItem('crudapp_token');

    decodeJWT = () => {
        const token = this.getTokenFromStorage()?.replace('Bearer ', '');
        return token !== undefined ? jwt_decode(token) : null;
    }

    getRolesFromToken = () => {
        return this.decodeJWT()?.ROLES;
    }

    getUsernameFromToken = () => {
        return this.decodeJWT()?.sub;
    }

    isUserLogged = () => {
        try {
            return this.decodeJWT()?.aud === 'butterfly_api';
        } catch (err) {
            return false;
        }
    }
    

    isUserDenied = () => {
        return this.isUserLogged() && this.decodeJWT()?.ROLES.length === 0;
    }

    getCachedItem = (key) => {
        return JSON.parse(localStorage.getItem(key));
    }

    setItemCache = (key, item) => {
        localStorage.setItem(key, JSON.stringify(item));
    }

    ignoreNullableField = (field) => {
        return (field !== null && field !== undefined) ? field : "";
    }


    //idle session time expiration
    idleTime = 1000 * 60 * 520;

    //chech if user has been issued
    isUserChanged = (newObject, oldObject) => {
        return (
            newObject.first_name !== oldObject.first_name || 
            newObject.last_name !== oldObject.last_name ||
            newObject.username !== oldObject.username ||
            newObject.profile !== oldObject.profile ||
            newObject.poste !== oldObject.poste ||
            newObject.phone !== oldObject.phone ||
            newObject.email !== oldObject.email );
    }

    //cast object callback notification
    getCallbackAlertObject = (type, title, msg) => {
        return {
            type: type,
            title: title, 
            message: msg
        }
    }

    submitLabelIcon = () => {
        return <><i className='pi pi-check-circle'/> &nbsp; submit</>
    }

}
const Helper = new helper();
export { Helper };