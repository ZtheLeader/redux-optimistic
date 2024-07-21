import { createSlice } from '@reduxjs/toolkit'
import { TypeArticlesListState } from '../types';



const initialState: TypeArticlesListState = {
  articles: []
}

export const listSlice = createSlice({
  name: 'articleSlice',
  initialState: initialState,
  reducers: {
    addArticle: (state, action) => {
      state.articles.push(action.payload);
    },
    addArticlesAtIndex: (state, action) => {
      const { articles, index } = action.payload;
      state.articles.splice(index, 0, ...articles);
    },
    deleteArticle: (state, action) => {
      const index = state.articles.findIndex(article => article.id === action.payload);
      if (index !== -1) {
        state.articles.splice(index, 1);
      }
    },
    updateArticle: (state, action) => {
      const { id, article } = action.payload;
      const index = state.articles.findIndex(a => a.id === id);
      if (index !== -1) {
        state.articles[index] = { ...state.articles[index], ...article };
      }
    }
  }
});

export const { addArticle, deleteArticle, updateArticle, addArticlesAtIndex } = listSlice.actions