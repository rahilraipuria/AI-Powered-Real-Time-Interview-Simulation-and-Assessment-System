import { create } from 'zustand';
import {getScheduledInterviews,getCompletedInterviews,getPendingInterviews} from '../services/api.js';

const useStore = create((set) => ({
  users: [],
  interviews: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true });
    try {
      const response = await fetchUsers();
      set({ users: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addUser: async (newUser) => {
    set({ loading: true });
    try {
      const response = await addUser(newUser);
      set((state) => ({
        users: [...state.users, response.data],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  
  fetchScheduledInterviews: async () => {
    set({ loading: true });
    try {
      const response = await getScheduledInterviews();
      console.log(response)
      set({ interviews: response.scheduledInterviews, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  fetchPendingInterviews: async () => {
    set({ loading: true });
    try {
      const response = await getPendingInterviews();
      console.log(response)
      set({ interviews: response.pendingInterviews, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

fetchCompletedInterviews: async () => {
  set({ loading: true });
  try {
    const response = await getCompletedInterviews();
    console.log(response);
    set({ interviews: response.completedInterviews, loading: false }); 
  } catch (error) {
    set({ error: error.message, loading: false });
  }
},

  /*addInterview: async (newInterview) => {
    set({ loading: true });
    try {
      const response = await addInterview(newInterview);
      set((state) => ({
        interviews: [...state.interviews, response.data],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Actions to set users and interviews directly
  setUsers: (users) => set({ users }),
  setInterviews: (interviews) => set({ interviews }),
  setError: (error) => set({ error }),*/
}));

export default useStore
