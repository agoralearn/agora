import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/PageHeader/PageHeader';
import TutorCard from '../../components/TutorCard/TutorCard';
import API from '../../utils/API';
import { Container, Header } from 'semantic-ui-react';

function Search() {
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    API.getTutors()
      .then((res) => setTutors(res.data))
      .catch((err) => console.log(err));
  }, []);

  const renderTutors = () => {
    return tutors.map((tutor) => (
      <TutorCard
        {...tutor}
        name={`${tutor.firstName} ${tutor.lastName}`}
        profileImg={tutor.image}
      />
    ));
  };

  return (
    <Container>
      <PageHeader>
        <h2>Search for Tutors</h2>
      </PageHeader>
      {renderTutors()}
    </Container>
  );
}

export default Search;
