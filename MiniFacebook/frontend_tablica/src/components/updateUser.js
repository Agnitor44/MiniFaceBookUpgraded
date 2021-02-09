export const update = (dispatch, log, action ) => {
   
    fetch('/api/clientData/shouldBeHidden/butItsNot/BcsICantDoThisJustNow/ForgiveMe').then(data => data.json()).then(data => {
        const id = data.findIndex(item => item.id === log.id)
        dispatch(action(data[id]))
      
    })
}

