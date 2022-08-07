import "./logo.svg";
import { React } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./app/store";
import { Provider } from "react-redux";
import SignUp from "./pages/Register";
import Login from "./pages/Login";
import EditTodo from "./pages/EditTodo";
import TodosList from "./pages/TodosList";
import UserHome from "./pages/UserHome";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="todo/:id" element={<EditTodo />} />
          <Route path="todo" element={<EditTodo />} />
          <Route path="todos-list" element={<TodosList />} />
          <Route path="user-home" element={<UserHome />} />
          <Route path="register" element={<SignUp />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
