import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  editTodo,
  asyncLoad,
  getAllTodos,
} from "../features/user/userSlice";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../features/Navigation/Header";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

function EditTodo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [description, setDescription] = useState("");
  const [selected, setSelected] = useState(false);
  const todos = useSelector((state) => state.user.todos);
  const loading = useSelector((state) => state.user.loading);

  useEffect(() => {
    dispatch(getAllTodos());
    if (params.id) {
      const todo = todos.find((item) => item._id === params.id);
      if (todo) {
        setDescription(todo.description);
        setSelected(todo.completed);
      }
    }
  }, [dispatch, todos, params]);

  const toasting = (dest) => {
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
      navigate(dest);
    }, 2000);
  };

  const submitInput = () => {
    let ids = params.id;
    if (description === "") {
      alert("Please enter a description");
    } else {
      if (ids) {
        dispatch(editTodo({ _id: ids, desc: description, comp: selected }));
      } else {
        const todo = {
          description: description,
          completed: selected,
        };
        dispatch(addTodo(todo));
      }
      toasting("/todos-list");
    }
  };

  return (
    <div>
      <Navbar />
      <ToastContainer theme="colored" />
      <button
        onClick={() => toasting("/todos-list")}
        disabled={loading}
        className="btn btn-secondary floatLeft"
      >
        Back
      </button>
      <div>
        <h6 className="nameLeft">Name</h6>
        <input
          type="text"
          placeholder="Name Here"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
        />
      </div>
      <div>
        <h6 className="finLeft">Finished</h6>
        {[
          { id: "1", value: "yes" },
          { id: "2", value: "no" },
        ].map((item) => (
          <span key={item.id}>
            <input
              type="radio"
              id={item._id}
              name="choose"
              value={item.value}
              onChange={(e) => setSelected(e.target.value === "yes")}
              className="form-check-input"
              checked={(selected ? "yes" : "no") === item.value}
              disabled={loading}
            />
            <label htmlFor={item.id} className="label">
              {item.value === "yes" ? "Yes" : "No"}
            </label>
          </span>
        ))}
      </div>
      <div>
        <ToastContainer theme="colored" />
        <button
          onClick={submitInput}
          disabled={loading}
          className="btn btn-outline-primary"
        >
          {loading ? "Loading..." : params.id ? "Edit" : "Add"}
        </button>
      </div>
    </div>
  );
}

export default EditTodo;
