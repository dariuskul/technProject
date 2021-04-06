
import { login, register } from "../../api/user";

export const loginAction = (payload,history) => async (dispatch) =>{
    try {
        const user = await login(payload);
        localStorage.setItem('currentUser',JSON.stringify(user))
        dispatch({type: 'LOGIN', payload: user}) 
        history.push('/')
        
    } catch (error) {
        
    }
}

export const registerAction = (payload) => async (dispatch) => {
    try {
        const user = await register(payload);
        dispatch({type: 'REGISTER', payload: user})
        
    } catch (error) {
        
    }
}

export const logOut = (history) => (dispatch) => {
    localStorage.removeItem('currentUser')
    dispatch({type: 'LOGOUT'})
    window.location.reload();
}