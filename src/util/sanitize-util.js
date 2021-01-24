const emailSanitization = email => {
    if(email.includes('@')) {
        let sanitized = email.split(' ').join(',');
        
        return {
            value: sanitized,
            status: true,
            msg: null
        };

    } else {
        return {
            value: email,
            status: false,
            msg: 'Invalid email address'
        };
    }
}

const passwordSanitization = password => {
    let regex = new RegExp('^(?=.*[a-z])(?=.*[0-9])(?=.{7,})');
    return regex.test(password);
}

export {
    emailSanitization,
    passwordSanitization
}