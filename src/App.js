import React, { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import Task from "./components/Task";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { map, size } from "lodash";
import firebase from "./utils/firebase";
import "firebase/firestore";

import "./App.scss";

const db = firebase.firestore(firebase);

export default function App() {
  const [tasks, setTasks] = useState(null);
  const [reloadTask, setReloadTask] = useState(false);

  useEffect(() => {
    db.collection("tasks")
      .orderBy("completed")
      .get()
      .then((response) => {
        const arrayTask = [];
        map(response.docs, (task) => {
          const data = task.data();
          data.id = task.id;
          arrayTask.push(data);
        });
        setTasks(arrayTask);
        console.log(arrayTask);
      });
    setReloadTask(false);
  }, [reloadTask]);

  return (
    <Container fluid className="app">
      <div className="title">
        <h1>To-Do List</h1>
      </div>

      <Row className="todo">
        <Col
          className="todo__title"
          xs={{ span: 10, offset: 1 }}
          md={{ span: 6, offset: 3 }}
        >
          <h2>Today</h2>
        </Col>
        <Col
          className="todo__list"
          xs={{ span: 10, offset: 1 }}
          md={{ span: 6, offset: 3 }}
        >
          {!tasks ? (
            <div className="loading">
              <Spinner animation="border" />
              <span>Cargando...</span>
            </div>
          ) : size(tasks) == 0 ? (
            <h3>No hay Tareas</h3>
          ) : (
            map(tasks, (task, index) => (
              <Task key={index} task={task} setReloadTask={setReloadTask} />
            ))
          )}
        </Col>
        <Col
          className="todo__input"
          xs={{ span: 10, offset: 1 }}
          md={{ span: 6, offset: 3 }}
        >
          <AddTask setReloadTask={setReloadTask} />
        </Col>
      </Row>
    </Container>
  );
}
