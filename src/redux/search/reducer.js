const initialState = ""
const searchValue = (state = initialState, action)=>{
    switch(action.type){
        case "SEARCH" :
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

export default searchValue