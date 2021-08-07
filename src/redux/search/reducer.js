const initialState = ""
const searchValue = (state = initialState, action)=>{
    switch(action.type){
        case "SEARCH" :
            const {data} = action.payload
            // console.log(data)
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