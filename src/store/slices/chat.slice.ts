import  {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface Author {
    id: string;
    avatar: string;
    username: string;
}

export interface Message {
    author: Author;
    content: string;
    id: string;
    timestamp: string;
}

interface InitialState {
    loading: boolean,
    data: Message[]
}

const initialState: InitialState = {
    loading: false,
    data: []
};
const chatSlice = createSlice({
    name: 'chat',
    initialState: initialState,
    reducers: {
        setChats: (state: InitialState, action: PayloadAction<Message[]>) => {
            state.data = [...action.payload];
        }
    }
})


export const chatAction = {
    ...chatSlice.actions
}

export const chatReducer = chatSlice.reducer;