export const isValidEmail = (email: string): boolean => {
    // Check if email ends with @nebrija.es
    const regex = /^[^\s@]+@[^\s@]+\.(nebrija\.es)$/;
    return regex.test(email);
};
