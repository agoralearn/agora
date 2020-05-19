import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/PageHeader/PageHeader';
import TutorCard from '../../components/TutorCard/TutorCard';
import API from '../../utils/API';
import { Container, Form, Dropdown } from 'semantic-ui-react';
import './Search.scss';

function Search() {
  const [tutors, setTutors] = useState([]);
  const [search, setSearch] = useState({
    subject: 'All',
    education: '',
    groupSize: 1,
    rating: 3,
    price: null
  });

  const subjectArray = [
    'All',
    'english',
    'world history',
    'grammar',
    'algebra',
    'geometry',
    'trigonometry',
    'computer science',
    'web development',
    'chemistry',
    'physics',
    'biology',
    'Earth Science',
    'calculus',
    'art',
    'art history',
    'spanish'
  ];

  const subjects = subjectArray.map((subject) => ({
    key: subject,
    value: subject,
    text: subject
  }));

  const educationArray = [
    'All',
    'high school',
    'undergraduate',
    'masters',
    'doctorate'
  ];

  const educations = educationArray.map((education) => ({
    key: education,
    value: education,
    text: education
  }));

  const prices = [
    { key: 'All', value: 'All', text: 'Any' },
    { key: '10', value: '10', text: '$10/hr' },
    { key: '20', value: '20', text: '$20/hr' },
    { key: '50', value: '50', text: '$50/hr' },
    { key: '75', value: '75', text: '$75/hr' },
    { key: '100', value: '100', text: '$100/hr' }
  ];

  const groupSizeArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'];

  const groupSizes = groupSizeArray.map((size) => ({
    key: size,
    value: size,
    text: size
  }));

  const ratings = [
    { key: '1', value: '1', text: '1+' },
    { key: '2', value: '2', text: '2+' },
    { key: '3', value: '3', text: '3+' },
    { key: '4', value: '4', text: '4+' },
    { key: '5', value: '5', text: '5+' }
  ];

  useEffect(() => {
    API.getTutors()
      .then((res) => setTutors(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e, { name, value }) => {
    setSearch({
      ...search,
      [name]: value
    });
  };

  const renderTutors = () => {
    return tutors.map((tutor) => (
      <TutorCard
        key={tutor._id}
        {...tutor}
        name={`${tutor.firstName} ${tutor.lastName}`}
        profileImg={tutor.image}
      />
    ));
  };

  return (
    <Container>
      <PageHeader>
        <h2>Browse Tutors</h2>
      </PageHeader>
      <Form>
        <Form.Field>
          <label htmlFor='subject'>Subject</label>
          <Dropdown
            id='subject'
            name='subject'
            placeholder='Select Subject'
            fluid
            selection
            options={subjects}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Group widths='equal'>
          <Form.Field>
            <label htmlFor='education'>Education Level</label>
            <Dropdown
              id='education'
              name='education'
              placeholder='Select Education'
              fluid
              selection
              options={educations}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor='price'>Max Price</label>
            <Dropdown
              id='price'
              name='price'
              placeholder='Select Price'
              fluid
              selection
              options={prices}
              onChange={handleChange}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths='4'>
          <Form.Field>
            <label htmlFor='group'>Group Size</label>
            <Dropdown
              id='group'
              name='groupSize'
              fluid
              selection
              defaultValue='1'
              options={groupSizes}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor='rating'>Rating</label>
            <Dropdown
              id='rating'
              name='rating'
              fluid
              selection
              defaultValue='3'
              options={ratings}
              onChange={handleChange}
            />
          </Form.Field>
        </Form.Group>
      </Form>
      <div className='Search-results'>{renderTutors()}</div>
    </Container>
  );
}

export default Search;
