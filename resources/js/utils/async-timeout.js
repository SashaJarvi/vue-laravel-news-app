export const asyncTimeout = async (ms) => {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}
