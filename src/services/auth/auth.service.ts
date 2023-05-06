import { Response } from '../type';
import { LoginRequest, LoginResponse } from './auth.service.type';
import { client } from '../client';

export const authService = {
  login: async (
    loginRequest: LoginRequest
  ): Promise<Response<LoginResponse>> => {
    try {
      const url: string = '/login';
      const response = await client.post(url, loginRequest);
      return response?.data;
    } catch (error) {
      console.log('error:', error);
      throw error;
    }
  },
  logout: async (): Promise<Response<any>> => {
    try {
      const url: string = '/logout';
      const response = await client.get(url);
      return response?.data;
    } catch (error) {
      console.log('error:', error);
      throw error;
    }
  },
};
