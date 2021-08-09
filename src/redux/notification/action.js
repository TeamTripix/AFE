const notificationAction = (data) => {
    return {
        type : 'NOTIFICATION',
        payload : {
            data : data
        }
    }
}

export default notificationAction