// api.js
import axios from 'axios';

const baseUrl = 'http://localhost:3001/users';

const getUsers = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter a lista de usuários:', error);
    throw error;
  }
};

const saveUser = async (user) => {
  const method = user.id ? 'put' : 'post';
  const url = user.id ? `${baseUrl}/${user.id}` : baseUrl;

  try {
    const response = await axios[method](url, user);
    return response.data;
  } catch (error) {
    console.error('Erro ao salvar usuário:', error);
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${baseUrl}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    throw error;
  }
};

export { getUsers, saveUser, deleteUser };
