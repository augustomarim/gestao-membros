import axios from 'axios';
import type { Member, MemberRequest } from '../types/Member';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export const memberService = {
  findAll: async (): Promise<Member[]> => {
    const { data } = await api.get('/members');
    return data;
  },

  findById: async (id: number): Promise<Member> => {
    const { data } = await api.get(`/members/${id}`);
    return data;
  },

  create: async (member: MemberRequest): Promise<Member> => {
    const { data } = await api.post('/members', member);
    return data;
  },

  update: async (id: number, member: MemberRequest): Promise<Member> => {
    const { data } = await api.put(`/members/${id}`, member);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/members/${id}`);
  },
};