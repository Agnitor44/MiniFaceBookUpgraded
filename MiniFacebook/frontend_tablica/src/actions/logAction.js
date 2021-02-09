export const Islogged = (data) => {
    return {
        type: 'LOGIN',
        payload: data
    }
}
export const isLoggedOut = () => {
    return {
        type: 'LOGOUT'
    }
}