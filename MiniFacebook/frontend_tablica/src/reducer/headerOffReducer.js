export const HeaderOffReducer = (state = false, action) => {
if(action.type === 'ON') return !state
else return state
}
export default HeaderOffReducer