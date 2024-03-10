import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

import { Task } from "./components/Models/Task";
import { Priority } from "./components/Models/Priority";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Task>({
    id: uuidv4(),
    name: "",
    description: "",
    createdDate: new Date().toISOString(),
    status: false,
    priority: Priority.Low,
  });

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get<Task[]>("api/Task");
    setTasks(response.data);
  };

  const addTask = async () => {
    await axios.post<Task>("api/Task", newTask);
    setTasks([...tasks, newTask]);
    setNewTask({
      id: uuidv4(),
      name: "",
      description: "",
      createdDate: new Date().toISOString(),
      status: false,
      priority: Priority.Low,
    });
    setShowCreateModal(false);
  };

  const deleteTask = async (id: string) => {
    await axios.delete(`api/Task/${id}`);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (task: Task) => {
    setEditingTask({ ...task });
    setShowEditModal(true);
  };

  const updateTask = async () => {
    if (editingTask) {
      await axios.put(`api/Task/${editingTask.id}`, editingTask);
      setTasks(tasks.map((t) => (t.id === editingTask.id ? editingTask : t)));
      setEditingTask(null);
      setShowEditModal(false);
    }
  };

  return (
    <Container>
      <h1>Tasks</h1>

      <Button variant="primary" onClick={() => setShowCreateModal(true)}>
        Create Task
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Created Date</th>
            <th>Status</th>
            <th>Priority</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.name}</td>
              <td>{new Date(task.createdDate).toLocaleDateString()}</td>
              <td>{task.status ? "Completed" : "In Progress"}</td>
              <td>{Priority[task.priority]}</td>
              <td>
                <Button variant="secondary" onClick={() => editTask(task)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => deleteTask(task.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={newTask.name}
                onChange={(e) =>
                  setNewTask({ ...newTask, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Status"
                checked={newTask.status}
                onChange={(e) =>
                  setNewTask({ ...newTask, status: e.target.checked })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Priority</Form.Label>
              <Form.Control
                as="select"
                value={newTask.priority}
                onChange={(e) =>
                  setNewTask({ ...newTask, priority: parseInt(e.target.value) })
                }
              >
                <option value={Priority.Low}>Low</option>
                <option value={Priority.Medium}>Medium</option>
                <option value={Priority.High}>High</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={addTask}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={editingTask?.name || ""}
                onChange={(e) =>
                  setEditingTask({ ...editingTask, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editingTask?.description || ""}
                onChange={(e) =>
                  setEditingTask({
                    ...editingTask,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Status"
                checked={editingTask?.status || false}
                onChange={(e) =>
                  setEditingTask({ ...editingTask, status: e.target.checked })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Priority</Form.Label>
              <Form.Control
                as="select"
                value={editingTask?.priority || Priority.Low}
                onChange={(e) =>
                  setEditingTask({
                    ...editingTask,
                    priority: parseInt(e.target.value),
                  })
                }
              >
                <option value={Priority.Low}>Low</option>
                <option value={Priority.Medium}>Medium</option>
                <option value={Priority.High}>High</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={updateTask}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default App;
