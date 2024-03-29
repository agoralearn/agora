import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/PageHeader/PageHeader';
import TutorCard from '../../components/TutorCard/TutorCard';
import Button from '../../components/Button/Button';
import API from '../../utils/API';
import { Container, Form, Dropdown, Accordion, Icon } from 'semantic-ui-react';
import './Search.scss';
import { subjects, education } from '../../utils/categoryData';
import { useHistory } from 'react-router-dom';
import Tutorial from '../../components/Helpers/Tutorial';

const INITIAL_SEARCH_STATE = {
  subject: 'All Subjects',
  education: 'All Levels',
  groupSize: '1',
  rating: '3',
  price: 'Any'
};

const searchSubjects = [
  {
    key: 'All Subjects',
    text: 'All Subjects',
    value: 'All Subjects'
  },
  ...subjects
];

const searchEducations = [
  {
    key: 'All Levels',
    text: 'All Levels',
    value: 'All Levels'
  },
  ...education
];

function Search() {
  const [tutors, setTutors] = useState([]);
  const [search, setSearch] = useState(INITIAL_SEARCH_STATE);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [helperVisible, setHelperVisible] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (history.location && history.location.state) {
      setHelperVisible(history.location.state.firstVisit);
    }
  }, [history.location]);

  const prices = [
    { key: 'Any', value: 'Any', text: 'Any Price' },
    { key: '10', value: '10', text: '$10/hr' },
    { key: '20', value: '20', text: '$20/hr' },
    { key: '50', value: '50', text: '$50/hr' },
    { key: '75', value: '75', text: '$75/hr' },
    { key: '100', value: '100', text: '$100/hr' }
  ];

  const groupSizeArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'];

  const groupSizes = groupSizeArray.map((size) => ({
    key: size,
    value: size.replace(/\D/g, ''),
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

  const handleReset = (event) => {
    setSearch(INITIAL_SEARCH_STATE);
  };

  const handleFiltersOpen = () => {
    setFiltersOpen(!filtersOpen);
  };

  const includeTutor = (tutor) => {
    if (tutor.rating < search.rating) {
      return false;
    }
    if (tutor.maxGroupSize < search.groupSize) {
      return false;
    }
    if (tutor.price !== 'Any' && tutor.price > search.price) {
      return false;
    }
    if (
      search.subject !== 'All Subjects' &&
      !tutor.subjects.includes(search.subject)
    ) {
      return false;
    }
    if (
      search.education !== 'All Levels' &&
      !tutor.education.includes(search.education)
    ) {
      return false;
    }

    return true;
  };

  const filterTutors = () => {
    return tutors.filter((tutor) => {
      return includeTutor(tutor);
    });
  };

  const renderTutors = () => {
    const filteredTutors = filterTutors();

    if (filteredTutors.length > 0) {
      return filteredTutors.map((tutor) => (
        <TutorCard
          key={tutor._id}
          id={tutor._id}
          {...tutor}
          name={{ firstName: tutor.firstName, lastName: tutor.lastName }}
          profileImg={tutor.image}
        />
      ));
    } else {
      return <p className='No-results'>No Matching Tutors...</p>;
    }
  };

  return (
    <Container>
      {helperVisible && (
        <Tutorial setHelperVisible={(option) => setHelperVisible(option)} />
      )}
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
            value={search.subject}
            options={searchSubjects}
            onChange={handleChange}
          />
        </Form.Field>
        <Accordion as={Form.Field}>
          <Accordion.Title active={filtersOpen} onClick={handleFiltersOpen}>
            <Icon name='dropdown' />
            More Filters
          </Accordion.Title>
          <Accordion.Content active={filtersOpen}>
            <Form.Group widths='equal'>
              <Form.Field>
                <label htmlFor='education'>Education Level</label>
                <Dropdown
                  id='education'
                  name='education'
                  placeholder='Select Education'
                  fluid
                  selection
                  value={search.education}
                  options={searchEducations}
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
                  value={search.price}
                  options={prices}
                  onChange={handleChange}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths={2} unstackable>
              <Form.Field>
                <label htmlFor='group'>Group Size</label>
                <Dropdown
                  id='group'
                  name='groupSize'
                  fluid
                  selection
                  value={search.groupSize}
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
                  value={search.rating}
                  options={ratings}
                  onChange={handleChange}
                />
              </Form.Field>
            </Form.Group>
          </Accordion.Content>
        </Accordion>
        <Button type='reset' className='btn btn-primary' onClick={handleReset}>
          Reset
        </Button>
      </Form>
      <div className='Search-results'>{renderTutors()}</div>
    </Container>
  );
}

export default Search;
