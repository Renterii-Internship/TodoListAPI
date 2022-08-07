import { React, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, asyncLoad, getAllTodos } from "../features/user/userSlice";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../features/Navigation/Header";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

function TodosList() {
  sessionStorage.setItem("reloadCount", 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const todos = useSelector((state) => state.user.todos);
  const loading = useSelector((state) => state.user.loading);

  const toasting = useCallback(
    (dest, nav = true) => {
      dispatch(asyncLoad(true));
      toast.info("Loading...", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
      setTimeout(() => {
        dispatch(asyncLoad(false));
        if (nav) navigate(dest);
      }, 2000);
    },
    [dispatch, navigate]
  );

  const printTodos = useCallback(
    (editedTodos) => {
      return editedTodos.map((item) => (
        <dd key={item._id}>
          <div className="row list">
            <div className="column">{item.description}</div>
            <div className="column">{item.completed ? "Yes" : "No"}</div>
            <div className="column">
              <button
                onClick={() => {
                  toasting("", false);
                  setTimeout(() => dispatch(deleteTodo(item._id)), 2000);
                }}
                disabled={loading}
                className="btn btn-danger"
              >
                D
              </button>
              <button
                onClick={() => toasting(`/todo/${item._id}`)}
                disabled={loading}
                className="btn btn-primary"
              >
                E
              </button>
              <ToastContainer theme="colored" />
            </div>
          </div>
        </dd>
      ));
    },
    [dispatch, loading, toasting]
  );

  const renderTodos = useCallback(() => {
    const queryParams = new URLSearchParams(location.search);
    const finished = queryParams.get("finished");
    if (finished === "1") {
      return printTodos(todos.filter((item) => item.completed));
    } else if (finished === "0") {
      return printTodos(todos.filter((item) => !item.completed));
    }
    return printTodos(todos);
  }, [location.search, printTodos, todos]);

  useEffect(() => {
    dispatch(getAllTodos());
    renderTodos();
  }, [dispatch, renderTodos]);

  return (
    <div>
      <Navbar />
      <ToastContainer theme="colored" />
      <button
        onClick={() => toasting("/todo")}
        disabled={loading}
        className="btn btn-warning floatRight"
      >
        New
      </button>
      <dl>
        <div className="row">
          <div className="column">Name</div>
          <div className="column">Finished</div>
          <div className="column">Actions</div>
        </div>
        {renderTodos()}
      </dl>
    </div>
  );
}

export default TodosList;
