import { createSlice } from "@reduxjs/toolkit";

const pollSlice = createSlice({
    name: 'poll',
    initialState: {
        activePoll: null,
        results: [],
    },
    reducers: {
        setActivePoll: (state, action) => {
            state.activePoll = action.payload;
        },
        setResults: (state, action) => {
            state.results = action.payload;
        }
    }
});

export const {setActivePoll, setResults} = pollSlice.actions;
export default pollSlice.reducer;