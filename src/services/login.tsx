import { api } from "../api";

export const login = async (email: string, password: string): Promise<boolean> => {
    try {
        const data: any = await api;

        // Verificar se o email fornecido corresponde aos dados da API
        if (email !== data.email) {
            return false;
        }

        // Verificar se a senha fornecida corresponde aos dados da API
        if (password !== data.password) {
            return false;
        }

        // Se ambos email e senha corresponderem, retornar true
        return true;
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        return false;
    }
};
