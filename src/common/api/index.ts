import axios from 'axios';

const api = axios.create({
  baseURL: 'https://swapi.dev/api/',
});


export const getPersons = async (page: string | null, search?: string | null) => {
  const res = await api.get('people', { params: { page, search } });
  return res.data;
};

export const getPerson = async (id: string) => {
  const res = await api.get(`people/${id}`);
  return res.data;
};
