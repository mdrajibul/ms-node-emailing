/**
 * Validate a email address
 * @param email - Email address to validate  
 * @returns boolean
 */
export const isValidEmail = (email: string): boolean => {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
}

/**
 * Trim text after checking nullable or undefined 
 * @param text 
 * @returns string 
 */
export const trim = (text: string): string => {
    if (!text) return '';
    return text.trim();
}
