const searchValue = (data)=>{
    return {
        type : 'SEARCH',
        payload : {
            data : data
        }
    }
}

export default searchValue