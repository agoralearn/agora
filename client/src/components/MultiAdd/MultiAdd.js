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
          setSearchResults(res.data);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setFormError(false);
        });
    } else {
      setFormError('Minimum of 1 characters');
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
          <Image
            avatar
            src='https://react.semantic-ui.com/images/avatar/small/rachel.png'
          />
          <List.Content>
            {student.name}
            {student.selected && (
              <Icon
                className='u-m-l'
                name='remove circle'
                onClick={(event) => {
                  removeHandler(event, student);
                }}
              />
            )}
          </List.Content>
        </List.Item>
      );
    });
  }
  return (
    <Container>
      <Form error={formError}>
        <Form.Group>
          <Input
            placeholder='Search for students...'
            onChange={(event) => setInputValue(event.target.value)}
          />
          <Button icon='search' onClick={inputSubmitHandler} />
        </Form.Group>
        {searchResults.length > 0 && (
          <p>Select the students you want to invite</p>
        )}
        <Form.Field>
          <List>{renderListItems(selectedStudents, searchResults)}</List>
        </Form.Field>
        <Message error header='Whoops!' content={formError} />
      </Form>
    </Container>
  );
}
