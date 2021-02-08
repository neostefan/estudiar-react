const checkAuthStatus = (token, expiresIn) => {
    let today = new Date();
    let expirationDate = new Date(expiresIn);

    console.log(expirationDate);
    console.log(today);

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