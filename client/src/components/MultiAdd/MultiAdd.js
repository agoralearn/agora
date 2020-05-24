import React, { useState } from 'react';
import {
  Input,
  Form,
  Button,
  Message,
  List,
  Image,
  Container,
  Icon
} from 'semantic-ui-react';
import API from '../../utils/API';
import { unionWith } from 'lodash/array';
// match max number of students to add to max number of students tutor will take

export default function MultiAdd({ selectedStudents, setSelectedStudents }) {
  const [searchResults, setSearchResults] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [formError, setFormError] = useState(false);

  function inputSubmitHandler() {
    if (inputValue.trim().length > 0) {
      API.getStudentByName({ name: inputValue })
        .then((res) => {
          if (res.data.length < 1) {
            setFormError('No students found...');
          } else {
            setSearchResults(res.data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setFormError('Please Enter at least 2 characters');
    }
  }
  function selectStudentHandler(event, student) {
    student.selected = true;

    setSelectedStudents([...selectedStudents, student]);
  }
  function removeHandler(event, student) {
    event.stopPropagation();

    student.selected = false;
    const newSelection = selectedStudents.filter(
      (selStudent) => student._id !== selStudent._id
    );
    setSelectedStudents(newSelection);
  }
  function renderListItems(selectedStudents, searchResults) {
    const students = unionWith(
      selectedStudents,
      searchResults,
      (a, b) => a._id === b._id
    );

    return students.map((student) => {
      return (
        <List.Item
          key={student._id}
          onClick={(event) => selectStudentHandler(event, student)}
        >
          <List.Content>
            <Image
              avatar
              src='https://react.semantic-ui.com/images/avatar/small/rachel.png'
            />

            {student.name}
            {student.selected ? (
              <Icon
                className='u-m-l'
                name='remove circle'
                color='red'
                onClick={(event) => {
                  removeHandler(event, student);
                }}
              />
            ) : (
              <Icon
                className='u-m-l'
                name='add circle'
                color='green'
                onClick={(event) => selectStudentHandler(event, student)}
              />
            )}
          </List.Content>
        </List.Item>
      );
    });
  }

  function inputChangeHandler(event) {
    setFormError(false);
    setInputValue(event.target.value);
  }
  return (
    <Container>
      <Form error={formError}>
        <Message error header='Whoops!' content={formError} />

        <Form.Group>
          <div style={{ width: '100%', display: 'flex' }}>
            <Input
              placeholder='Search for students...'
              onChange={inputChangeHandler}
              style={{ flex: 1 }}
            />
            <Button icon='search' onClick={inputSubmitHandler} />
          </div>
        </Form.Group>
        {searchResults.length > 0 && (
          <>
            <h4>Select participants you want to invite</h4>
            <p>You can select from the list and then search again.</p>
          </>
        )}
        <Form.Field>
          <List>{renderListItems(selectedStudents, searchResults)}</List>
        </Form.Field>
      </Form>
    </Container>
  );
}
