import React, { useState, useEffect } from 'react';
import API from '../../utils/API';
import { Link } from 'react-router-dom';
import { useAuth } from '../../utils/auth';
import PageHeader from '../../components/PageHeader/PageHeader';
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import { Input, Form, Dropdown, TextArea, Checkbox } from 'semantic-ui-react';
import { subjects, education } from './subjects';
import Button from '../../components/Button/Button';

const editableFields = [
  {
    name: 'subjects',
    label: 'Subjects',
    type: 'dropdownSelect',
    options: subjects
  },
  {
    name: 'timeFrame',
    label: 'Time Frame',
    type: 'select',
    options: [{ label: 'on-going' }, { label: 'one-time' }]
  },
  {
    name: 'education',
    label: 'Education',
    type: 'dropdownSelect',
    options: education
  },
  { name: 'email', label: 'Email', required: true },
  { name: 'firstName', label: 'First Name', required: true },
  { name: 'lastName', label: 'Last Name', required: true },
  { name: 'bio', label: 'Bio', type: 'textarea', placeholder: 'About Me...' },
  {
    name: 'minGroupSize',
    label: 'Min Group Size',
    inputType: 'number',
    min: 1
  },
  {
    name: 'maxGroupSize',
    label: 'Max Group Size',
    inputType: 'number',
    min: 1
  },
  { name: 'age', label: 'Age', inputType: 'number', required: true, min: 1 },
  { name: 'price', label: 'Price', inputType: 'number' }
];

function Profile() {
  const { user, logout } = useAuth();
  const [userInfo, setUserInfo] = useState({});
  const [editing, setEditing] = useState(false);
  const [fields, setFields] = useState();

  function checkboxFields(current, value, checked) {
    const currentCopy = [...current];
    let index = current.indexOf(value);
    index < 0 ? currentCopy.push(value) : currentCopy.splice(index, 1);
    return currentCopy;
  }

  function determineFieldType(field) {
    switch (field.type) {
      case 'dropdownSelect':
        return (
          <Dropdown
            placeholder={field.label}
            fluid
            multiple
            selection
            defaultValue={userInfo[field.name]}
            options={field.options}
            onChange={(event, { value }) => {
              setUserInfo({ ...userInfo, [field.name]: value });
            }}
          />
        );

      case 'select':
        return (
          // <Form.Checkbox onChange={(event, { value }) => console.log(value)}>
          field.options.map((option) => {
            return (
              <Checkbox
                key={option.label}
                label={option.label}
                control='input'
                name={field.name}
                checked={userInfo.timeFrame.includes(option.label)}
                onChange={(event, data) =>
                  setUserInfo({
                    ...userInfo,
                    [field.name]: checkboxFields(
                      userInfo[field.name],
                      option.label,
                      data.checked
                    )
                  })
                }
              />
            );
          })
          // </Form.Checkbox>
        );

      case 'textarea':
        return (
          <TextArea
            placeholder={field.placeholder}
            value={userInfo[field.name]}
            onChange={(event, { value }) =>
              setUserInfo({ ...userInfo, [field.name]: value })
            }
          />
        );
      default:
        return (
          <Input
            key={field.name}
            name={field.name}
            value={userInfo[field.name]}
            onChange={(event) =>
              setUserInfo({ ...userInfo, [field.name]: event.target.value })
            }
            type={field.inputType}
            min={field.min}
            required={field.required}
          ></Input>
        );
    }
  }

  function renderComponents(editableFields) {
    const fields = editableFields.map((field, index) => {
      if (editing) {
        return (
          <Form.Field key={index}>
            <label>{field.label}</label>

            {determineFieldType(field)}
          </Form.Field>
        );
      } else {
        return (
          <p key={field.name} onClick={() => setEditing(true)}>
            {userInfo[field.name]}
          </p>
        );
      }
    });

    setFields(fields);
  }

  useEffect(() => {
    renderComponents(editableFields);
  }, [editing, userInfo]);

  useEffect(() => {
    API.getUser(user.id)
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch((err) => console.log(err));
  }, [user]);

  function formSubmitHandler(event) {
    event.preventDefault();
    setEditing(!editing);
    API.updateUser(userInfo)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className='container Profile'>
      <PageHeader>
        <h2>Profile Settings</h2>
      </PageHeader>

      <ProfileImage profileImg={userInfo.image} />
      <Button className='btn-primary' onClick={() => setEditing(!editing)}>
        Edit
      </Button>

      <p>Email:</p>
      <Form onSubmit={formSubmitHandler}>
        {fields}

        {editing && (
          <Button className='btn-primary' type='submit'>
            Save
          </Button>
        )}
      </Form>
    </div>
  );
}

export default Profile;

/**
 * FIELDS TO EDIT
 * bio
 * age
 *
 * favorites
 * firstName
 * lastName
 * maxGroupSize
 * minGroupSize
 * price
 * subjects
 * timeFrame
 * tutorSessions
 *
 *
 * FIELDS TO SHOW
 * rating
 * createdAt(member since)
 *
 */
