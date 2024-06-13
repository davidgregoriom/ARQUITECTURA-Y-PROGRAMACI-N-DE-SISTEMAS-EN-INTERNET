export const isValidPassword = (password: string): boolean => {
    // Check password length
    if (password.length < 8) {
        return false;
    }

    // Check for at least one number, one lowercase and one uppercase letter
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return regex.test(password);
};
