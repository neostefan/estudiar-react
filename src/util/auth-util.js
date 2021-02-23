const checkAuthStatus = (token, expiresIn) => {
    let today = new Date();
    let expirationDate = new Date(expiresIn);

    if(token) {
        if(expirationDate > today) {
            return true
        } else {
            return false
        }
    } else {
        return false;
    }
}

export default checkAuthStatus;