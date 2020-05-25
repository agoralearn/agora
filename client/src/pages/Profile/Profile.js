/* eslint-disable */
import React, { useState, useEffect } from 'react';
import API from '../../utils/API';
import { useAuth } from '../../utils/auth';
import './Profile.scss';
import { toast } from 'react-toastify';
import Badge from '../../components/Badge/Badge';
import PageHeader from '../../components/PageHeader/PageHeader';
// import ProfileImage from '../../components/ProfileImage/ProfileImage';
import {
  Input,
  Form,
  Dropdown,
  TextArea,
  Checkbox,
  Container,
  Image
} from 'semantic-ui-react';
import { subjects, education } from '../../utils/categoryData';
import Button from '../../components/Button/Button';
import GoBack from '../../components/GoBack/GoBack';

const editableFields = [
  { name: 'firstName', label: 'First Name', required: true },
  { name: 'lastName', label: 'Last Name', required: true },
  { name: 'email', label: 'Email', required: true },
  { name: 'image', label: 'Image URL' },
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
  { name: 'price', label: 'Price ($/hr)', inputType: 'number' },
  { name: 'bio', label: 'Bio', type: 'textarea', placeholder: 'About Me...' }
];

const studentFields = [
  'firstName',
  'lastName',
  'email',
  'image',
  'education',
  'age'
];

function Profile() {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState();
  const [userInfoCopy, setUserInfoCopy] = useState();
  const [editing, setEditing] = useState(false);
  const [fields, setFields] = useState();
  toast.configure();

  function checkboxFields(current, value, checked) {
    const currentCopy = [...current];
    const index = current.indexOf(value);
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
        return field.options.map((option) => {
          return (
            <Checkbox
              className='u-m-r'
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
        });

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

  function displayOptions(field) {
    switch (field.name) {
      case 'firstName':
        return (
          <div
            key={field.label}
            className='u-m-b u-m-r disp-inline-b'
            // style={{ maxWidth: '200px', marginRight: '0px !important' }}
          >
            <div className='u-m-b-sm'>
              <h5>{field.label}</h5>
            </div>
            <div>
              {
                <p key={field.name} onClick={() => setEditing(true)}>
                  {userInfo[field.name]}
                </p>
              }
            </div>
          </div>
        );
      case 'lastName':
        return (
          <div
            key={field.label}
            className='u-m-b u-m-l disp-inline-b'
            // style={{ maxWidth: '80px' }}
          >
            <div className='u-m-b-sm'>
              <h5>{field.label}</h5>
            </div>
            <div>
              {
                <p key={field.name} onClick={() => setEditing(true)}>
                  {userInfo[field.name]}
                </p>
              }
            </div>
          </div>
        );
      case 'email':
        return (
          <div key={field.label} className='u-m-b'>
            <div className='u-m-b-sm'>
              <h5>{field.label}</h5>
            </div>
            <div>
              {
                <p key={field.name} onClick={() => setEditing(true)}>
                  {userInfo[field.name]}
                </p>
              }
            </div>
          </div>
        );
      case 'image':
        return (
          <div key={field.label} className='u-m-b'>
            <div className='u-m-b-sm'>
              <h5>{field.label}</h5>
            </div>
            <div>
              {
                <p
                  key={field.name}
                  onClick={() => setEditing(true)}
                  style={{
                    wordWrap: 'break-word'
                  }}
                >
                  {userInfo[field.name]}
                </p>
              }
            </div>
          </div>
        );
      case 'subjects':
        if (user.role === 'tutor') {
          return (
            <div key={field.label} className='u-m-b'>
              <div className='u-m-b-sm'>
                <h5>{field.label}</h5>
              </div>
              {userInfo.subjects.map((subject) => (
                <div key={subject} className='u-m-r disp-inline-b'>
                  <Badge>{subject}</Badge>
                </div>
              ))}
            </div>
          );
        }
        break;
      case 'timeFrame':
        if (user.role === 'tutor') {
          return (
            <div key={field.label} className='u-m-b'>
              <div className='u-m-b-sm'>
                <h5>{field.label}</h5>
              </div>
              <div>
                {userInfo.timeFrame.map((timeBlock) => (
                  <div key={timeBlock} className='u-m-r disp-inline-b'>
                    <Badge>{timeBlock}</Badge>
                  </div>
                ))}
              </div>
            </div>
          );
        }
        break;
      case 'education':
        return (
          <div key={field.label} className='u-m-b'>
            <div className='u-m-b-sm'>
              <h5>{field.label}</h5>
            </div>
            <div>
              {userInfo.education.map((level) => (
                <div key={level} className='u-m-r disp-inline-b'>
                  <Badge>{level}</Badge>
                </div>
              ))}
            </div>
          </div>
        );
      case 'minGroupSize':
      case 'maxGroupSize':
      case 'price':
        if (user.role === 'tutor') {
          return (
            <div key={field.label} className='u-m-b u-m-r disp-inline-b'>
              <div className='u-m-b-sm'>
                <h5>{field.label}</h5>
              </div>
              <div>
                {
                  <p key={field.name} onClick={() => setEditing(true)}>
                    {userInfo[field.name]}
                  </p>
                }
              </div>
            </div>
          );
        }
        break;
      case 'age':
        return (
          <div key={field.label} className='u-m-b u-m-r disp-inline-b'>
            <div className='u-m-b-sm'>
              <h5>{user.role === 'tutor' ? 'Age of students' : 'Your Age'}</h5>
            </div>
            <div>
              {
                <p key={field.name} onClick={() => setEditing(true)}>
                  {user.role === 'tutor'
                    ? userInfo[field.name] + '+'
                    : userInfo[field.name]}
                </p>
              }
            </div>
          </div>
        );

      case 'bio':
        if (user.role === 'tutor') {
          return (
            <div key={field.label} className='u-m-b'>
              <div className='u-m-b-sm'>
                <h5>{field.label}</h5>
              </div>
              <div>
                {
                  <p key={field.name} onClick={() => setEditing(true)}>
                    {userInfo[field.name]}
                  </p>
                }
              </div>
            </div>
          );
        }
        break;
    }
  }

  function renderComponents(editableFields, studentFields) {
    let userEditableFields = [];
    if (user.role === 'student') {
      editableFields.filter((field) => {
        if (studentFields.includes(field.name)) {
          userEditableFields.push(field);
        }
      });
    } else {
      userEditableFields = editableFields;
    }
    const fields = userEditableFields.map((field, index) => {
      if (editing) {
        return (
          <Form.Field key={index}>
            <label>{field.label}</label>

            {determineFieldType(field)}
          </Form.Field>
        );
      } else if (!editing && userInfo) {
        return <span key={index + index}>{displayOptions(field)}</span>;
      }
    });

    setFields(fields);
  }

  useEffect(() => {
    // if (!editing) {
    renderComponents(editableFields, studentFields);
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing, userInfo]);

  useEffect(() => {
    API.getUser(user.id)
      .then((res) => {
        setUserInfo(res.data);
        setUserInfoCopy(res.data);
      })
      .catch((err) => console.log(err));
  }, [user]);

  function formSubmitHandler(event) {
    event.preventDefault();
    setEditing(!editing);
    API.updateUser(userInfo)
      .then((res) => {
        toast.success(`New info saved!`, {
          position: toast.POSITION.TOP_CENTER
        });
      })
      .catch((err) => {
        console.log(err);
      });
    setUserInfoCopy(userInfo);
  }
  function cancel() {
    setUserInfo(userInfoCopy);
    setEditing(!editing);
    toast.warn(`Edit cancelled!`, {
      position: toast.POSITION.TOP_CENTER
    });
  }
  return (
    <div
      className='container Profile Profile_container'
      style={{ marginBottom: '400px' }}
    >
      <div className='u-m-l'>
        <GoBack />
      </div>
      <PageHeader>
        <h2>Profile Settings</h2>
      </PageHeader>
      {userInfo && (
        <Container>
          <div>
            <Image
              src={editing ? userInfoCopy.image : userInfo.image}
              circular
              wrapped
              style={{
                width: '200px',
                height: '200px',
                backgroundPosition: 'center',
                marginBottom: '10px'
              }}
            />
            {!editing ? (
              <Button
                style={{ display: 'block' }}
                className='btn-primary'
                // onClick={() => setEditing(!editing)}
                onClick={(event) => {
                  setEditing(true);
                }}
              >
                Edit
              </Button>
            ) : (
              <div>
                <Button
                  className='btn-secondary disp-inline-b u-m-r'
                  onClick={() => cancel()}
                >
                  Cancel
                </Button>
                <Button
                  className='btn-primary disp-inline-b u-m-l'
                  // type='submit'
                  // style={{ float: 'right' }}
                  onClick={formSubmitHandler}
                >
                  Save
                </Button>
              </div>
            )}
          </div>

          <div className='Profile_Form-div'>
            <Form onSubmit={formSubmitHandler}>
              {fields}

              {editing && (
                <Button className='btn-primary' type='submit'>
                  Save
                </Button>
              )}
            </Form>
          </div>
        </Container>
      )}
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
