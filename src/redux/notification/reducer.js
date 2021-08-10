const initialState = true
const noticationReducer = (state = initialState, action)=>{
    switch(action.type){
        case "NOTIFICATION" :
            const {data} = action.payload
            return{
                data : data
            }
        default :
            return{
                data : initialState
            }
    }
}

export default noticationReducer