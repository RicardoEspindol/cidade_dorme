import { api } from '../services/BaseApi';

interface ICreateRoom {
  nome: string;
  senha: string;
  quantidadeJogadores: number;
}

interface IJoinRoom {
  nomeJogador: string;
  senha: string;
}

export const createRoom = async (data: ICreateRoom) => {
  try {
    const response = await api.post('/Jogo/criar-sala', data);
    return response;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Erro ao criar mentor', error);
    }
    throw error;
  }
};

interface IJoinRoom {
  nomeJogador: string;
  senha: string;
}

export const joinRoom = async (roomId: string, data: IJoinRoom) => {
  try {
    const response = await api.post(`/Jogo/entrar-sala/${roomId}`, data);
    return response;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Erro ao entrar na sala', error);
    }
    throw error;
  }
};
export const getRooms = async () => {
  try {
    const response = await api({
      method: 'GET',
      url: `/Jogo/todas-as-salas`,
    });
    return response.data;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Erro ao buscar produtos', error);
    }
    throw error;
  }
};

export const getRoomId = async (roomId: string) => {
  try {
    const response = await api({
      method: 'GET',
      url: `/Jogo/sala/${roomId}`,
    });
    return response.data;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Erro ao buscar jogadores', error);
    }
    throw error;
  }
};

export const initGame = async (codRoom: string) => {
  try {
    const response = await api.post(`/Jogo/iniciar-jogo/${codRoom}`, {});
    return response;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Erro ao entrar na sala', error);
    }
    throw error;
  }
};

export const destroyRoom = async (codRoom: string) => {
  try {
    const response = await api.delete(`/Jogo/destruir-sala/${codRoom}`, {});
    return response;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Erro ao destruir sala', error);
    }
    throw error;
  }
};
