export const logReducer = (state = null, action) => {
    if(action.type === 'LOGIN') return {...action.payload}
   
    else if(action.type === "LOGOUT") return null
    else return state
}
export default logReducer