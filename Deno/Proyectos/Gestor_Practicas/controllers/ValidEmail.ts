export const isValidEmail = (email: string): boolean => {
    // Check if email ends with @nebrija.es
    const regex = /^[^\s@]+@\nebrija\.es$/i;
    console.log('Email:',email);
    console.log('Regex test result:',regex.test(email));
    return regex.test(email);
};
