import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    todoUrl: "https://api-nodejs-todolist.herokuapp.com",
    token: JSON.parse(localStorage.getItem("token")),
    todos: JSON.parse(localStorage.getItem("todos")),
    loading: false,
  },
  reducers: {
    register: (state, actions) => {
      axios.post(`${state.todoUrl}/user/register`, actions.payload);
    },
    login: (state, actions) => {
      axios
        .post(`${state.todoUrl}/user/login`, actions.payload)
        .then((res) =>
          localStorage.setItem("token", JSON.stringify(res.data.token))
        );
    },
    logout: (state) => {
      axios
        .post(`${state.todoUrl}/user/logout`, {
          headers: { Authorization: `Bearer ${state.token}` },
        })
        .then((res) => console.log(res.data));
    },
    addTodo: (state, actions) => {
      axios
        .post(`${state.todoUrl}/task`, actions.payload, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        })
        .then((res) => console.log(res.data));
    },
    getAllTodos: (state) => {
      axios
        .get(`${state.todoUrl}/task`, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        })
        .then((res) =>
          localStorage.setItem("todos", JSON.stringify(res.data.data))
        );
    },
    deleteTodo: (state, actions) => {
      axios.delete(`${state.todoUrl}/task/${actions.payload}`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
    },
    editTodo: (state, actions) => {
      const todo = actions.payload;
      axios
        .put(
          `${state.todoUrl}/task/${todo._id}`,
          { description: todo.desc, completed: todo.comp },
          { headers: { Authorization: `Bearer ${state.token}` } }
        )
        .then((res) => console.log(res.data));
    },
    asyncLoad: (state, actions) => {
      state.loading = actions.payload;
    },
  },
});

export const {
  register,
  login,
  logout,
  addTodo,
  deleteTodo,
  getAllTodos,
  editTodo,
  asyncLoad,
} = userSlice.actions;

export default userSlice.reducer;
