// userService.ts
import baseService from './baseService';

const signInUser = async (email: string, password: string) => {
 try {
    const response = await baseService.post('users/signin', { email, password });
    return response.data;
 } catch (error) {
    console.error(error);
    throw error;
 }
};

export { signInUser };