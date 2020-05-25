import React, { useState } from 'react';
import './MultiAdd.scss';
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
import { useAuth } from '../../utils/auth';
// match max number of students to add to max number of students tutor will take

export default function MultiAdd({
  selectedStudents,
  setSelectedStudents,
  tutorId
}) {
  const [searchResults, setSearchResults] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [formError, setFormError] = useState('');
  const { user } = useAuth();

  function inputSubmitHandler() {
    if (inputValue.trim().length > 0) {
      API.getStudentByName({ name: inputValue })
        .then((res) => {
          const availableStudents = res.data.filter(
            (student) => student._id !== user.id && student._id !== tutorId
          );
          if (availableStudents.length < 1) {
            setFormError('No students found...');
            setSearchResults([]);
          } else {
            setSearchResults(availableStudents);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setFormError('Please Enter at least 2 characters');
      setSearchResults([]);
    }
  }

  function selectStudentHandler(event, student) {
    student.selected = !student.selected;

    if (student.selected) {
      setSelectedStudents([...selectedStudents, student]);
    } else {
      setSelectedStudents(
        selectedStudents.filter((stu) => stu._id !== student._id)
      );
    }
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
            <div className='MultiAdd-student'>
              <Image avatar src={student.image} />
              {student.name}{' '}
              {student.selected ? (
                <Icon className='u-m-l' name='remove circle' color='red' />
              ) : (
                <Icon className='u-m-l' name='add circle' color='green' />
              )}
            </div>
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
      <Form error={formError ? true : false}>
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
