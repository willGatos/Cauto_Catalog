// orderService.ts
import baseService from './baseService';

const createOrder = async (orderData: any) => {
 try {
    const response = await baseService.post('orders', orderData);
    return response.data;
 } catch (error) {
    console.error(error);
    throw error;
 }
};

const getOrder = async (id: number) => {
 try {
    const response = await baseService.get(`orders/${id}`);
    return response.data;
 } catch (error) {
    console.error(error);
    throw error;
 }
};

const updateOrder = async (id: number, orderData: any) => {
 try {
    const response = await baseService.put(`orders/${id}`, orderData);
    return response.data;
 } catch (error) {
    console.error(error);
    throw error;
 }
};

export { createOrder, getOrder, updateOrder };