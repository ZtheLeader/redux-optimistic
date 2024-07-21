import { createSlice } from '@reduxjs/toolkit'

type TypeListState = {
  value: number
}

const initialState: TypeListState = {
  value: 0
}

const counterSlice = createSlice({
  name: 'counter',
  initialState: initialState,
  reducers: {
    incremented: state => {
      state.value += 1
    },
    decremented: state => {
      state.value -= 1
    }
  }
})

export const { incremented, decremented } = counterSlice.actions