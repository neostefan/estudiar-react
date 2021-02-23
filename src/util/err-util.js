const checkServerErrorType = err => {
    if(err.response) {
        if(err.response.data) {
            console.log(err.message);
            console.log(err.response.data);
            return err.response.data.msg;
        } else {
            console.log(err.message);
            return err.message;
        }
    } else if(err.request) {
        return err.request.data;
    } else {
        return err.message;
    }
}

export {
    checkServerErrorType
}