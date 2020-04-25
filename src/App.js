import React, {useState, UseEffect} from 'react';
import firebase from './firebase';
import {Button, Row, Container,Col,Form, Table} from 'react-bootstrap';
import NavBar from 'react-bootstrap/NavBar';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [updateTask, setUpdateTask] = useState('');

  React.useEffect(()=> {
    const fetchData = async () => {
      const db = firebase.firestore();
      db.collection("task")
        .onSnapshot(function(data){
          console.log(data)
          setTasks(data.docs.map(doc => ({...doc.data(), id:doc.id})))
        });
    };
    fetchData();
  }, [])

  const onCreate = () => {
    const db = firebase.firestore();
    db.collection('task').add({ name : newTask});
  }

  const onDelete = (id) => {
    const db = firebase.firestore();
    db.collection('task').doc(id).delete()
  }

  const onUpdate = (id) => {
    const db = firebase.firestore();
    db.collection('task').doc(id).set({name : updateTask})
  }

  return (
    <>
      <NavBar bg="dark" variant="dark">
        <NavBar.Brand href="#">
          YEE
        </NavBar.Brand>
      </NavBar>
      <br></br>
      <Container>
        <Row>
          <Col>
            <h2>Add new Note</h2>
            <Form>
              <Form.Group controlId="formBasicCheckBox">
                <Form.Control type="text" value={newTask} onChange={e => setNewTask(e.target.value)}></Form.Control>
              </Form.Group>
              <Button variant="primary" onClick={onCreate}>Create Task</Button>
            </Form>
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col>
            <Table striped bordered variant="dark" hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Task Name</th>
                  <th>Delete Task</th>
                  <th>Update Task</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(spell => (
                  <tr key={spell.id}>
                    <td>{spell.name}</td>
                    <td><Button variant="danger" onClick={()=> onDelete(spell.id)}>Delete Task</Button></td>
                    <td>
                      <input type="text" className="" placeholder={spell.name} onChange={e => setUpdateTask(e.target.value)}></input>
                      <Button className="text-white ml-4" variant="warning" onClick={()=> onUpdate(spell.id)}>Update Task</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      
    </>
  );
}

export default App;
