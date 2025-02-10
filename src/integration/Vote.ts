import { api } from '@/services/BaseApi';

interface IVote {
  vote: string;
}

interface ICity {
  name: string;
  vote: string;
}

export const monsterAttack = async (codRoom: string, data: string) => {
  try {
    const response = await api.post(`/Jogo/monstro-atacar/${codRoom}`, data, {
      headers: {
        'Content-Type': 'application/json', // Define que é JSON puro
      },
    });
    return response;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Erro ao atacar com o monstro', error);
    }
    throw error;
  }
};

export const angelSave = async (codRoom: string, data: IVote) => {
  try {
    const response = await api.post(`/Jogo/anjo-salvar/${codRoom}`, data, {
      headers: {
        'Content-Type': 'application/json', // Define que é JSON puro
      },
    });
    return response;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Erro ao salvar com o anjo', error);
    }
    throw error;
  }
};

export const detectiveAccuse = async (codRoom: string, data: string) => {
  try {
    const response = await api.post(
      `/Jogo/detetive-acusar/${codRoom}`,
      { value: data },
      {
        headers: {
          'Content-Type': 'application/json', // Define que é JSON puro
        },
      }
    );
    return response;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Erro ao acusar com o detetive', error);
    }
    throw error;
  }
};

export const cityVote = async (codRoom: string, data: ICity) => {
  try {
    const response = await api.post(`/Jogo/cidade-votar/${codRoom}`, data, {
      headers: {
        'Content-Type': 'application/json', // Define que é JSON puro
      },
    });
    return response;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Erro ao cidade votar', error);
    }
    throw error;
  }
};

export const processTurn = async (codRoom: string) => {
  try {
    const response = await api.post(`/Jogo/processar-turno/${codRoom}`);
    return response;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Erro ao processar turno', error);
    }
    throw error;
  }
};

export const countVotes = async (codRoom: string) => {
  try {
    const response = await api.post(`/Jogo/apurar-votos/${codRoom}`);
    return response;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Erro ao contar votos', error);
    }
    throw error;
  }
};
