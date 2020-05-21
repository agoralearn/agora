import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';
import Hero from '../../components/Hero/Hero';
import PageHeader from '../../components/PageHeader/PageHeader';
import Section from '../../components/Section/Section';
import TutorCard from '../../components/TutorCard/TutorCard';
import Button from '../../components/Button/Button';
import API from '../../utils/API';
import { Loader } from 'semantic-ui-react';

import {
  SearchIcon,
  MeetIcon,
  RequestIcon
} from '../../components/Icons/Icons';

export default function Home() {
  const [state, setState] = useState({
    value: [],
    error: null,
    loading: true
  });

  useEffect(() => {
    let isSubscribed = true;

    API.getTutors()
      .then(({ data }) => {
        return (
          isSubscribed && setState({ value: data, error: null, loading: false })
        );
      })
      .catch((err) => {
        return (
          isSubscribed && setState({ value: [], error: err, loading: false })
        );
      });

    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <div className='Home_wrapper'>
      {/* Hero Component */}
      <Hero>
        <Hero.Content>
          <div className='Hero_content-text'>
            <h1 className='Hero_content-text-lg color-white'>
              A New Way to Learn
            </h1>
            <div>
              <hr
                style={{
                  background: 'white',
                  border: '0px',
                  height: '2px',
                  outline: 'none'
                }}
              ></hr>
            </div>

            <p className='color-white f-w-b'>
              Receive one on one tutoring or find a tutor for your group from
              our many talented tutors
            </p>
          </div>

          <div>
            <h3 className='color-white u-m-t'>Sign Up As A...</h3>
            <div>
              <div className='Home_Hero-btns'>
                <Link
                  to={{
                    pathname: '/signup',
                    role: 'tutor'
                  }}
                >
                  <Button className='btn btn-secondary'>TUTOR</Button>
                </Link>
                <Link
                  to={{
                    pathname: '/signup',
                    role: 'student'
                  }}
                >
                  <Button className='btn btn-secondary'>STUDENT</Button>
                </Link>
              </div>
            </div>
            <Link to='/tutors'>
              <Button.Link className='color-white'>
                <span className='color-secondary'>Browse </span>All Tutors
              </Button.Link>
            </Link>
          </div>
        </Hero.Content>
      </Hero>

      {/* How It works */}
      <Section>
        <PageHeader>
          <h2>How It Works</h2>
        </PageHeader>
        <h4 className='u-m text-center'>Search For A Tutor</h4>
        <div className='text-center'>
          <SearchIcon />
        </div>
        <h4 className='u-m text-center'>Request A Session</h4>
        <div className='text-center'>
          <RequestIcon />
        </div>
        <h4 className='u-m text-center'>Virtually Meet Your Tutor</h4>
        <div className='text-center'>
          <MeetIcon />
        </div>
      </Section>

      {/* Top Tutors Section */}
      <Section>
        <PageHeader>
          <h2>Top Rated Tutors</h2>
        </PageHeader>
        <div>
          {!state.loading ? (
            state.value.map((tutor) => {
              return (
                <TutorCard
                  key={tutor._id}
                  subjects={tutor.subjects}
                  profileImg={tutor.image}
                  name={{
                    firstName: tutor.firstName,
                    lastName: tutor.lastName
                  }}
                  rating={tutor.rating}
                  bio={tutor.bio}
                  price={tutor.price}
                  id={tutor._id}
                />
              );
            })
          ) : (
            <Loader inline='centered' active>
              Loading
            </Loader>
          )}
        </div>
      </Section>
    </div>
  );
}
