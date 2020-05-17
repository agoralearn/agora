import React from 'react';
import './Home.scss';
import Hero from '../../components/Hero/Hero';
import PageHeader from '../../components/PageHeader/PageHeader';
import Section from '../../components/Section/Section';
import TutorCard from '../../components/TutorCard/TutorCard';
import {
  SearchIcon,
  MeetIcon,
  RequestIcon
} from '../../components/Icons/Icons';

export default function Home() {
  return (
    <div className='Home_wrapper'>
      {/* Hero Component */}
      <Hero>
        <Hero.Content>
          <PageHeader>
            <h1 className='color-primary'>A New Way To Learn</h1>
          </PageHeader>
          <p className='color-primary f-w-l'>
            Receive one on one tutoring or find a tutor for your group from our
            many talented tutors
          </p>
          <h3 className='color-primary u-m'>Sign Up As A...</h3>
        </Hero.Content>
      </Hero>

      {/* How It works */}
      <Section>
        <PageHeader>
          <h2>How It Works</h2>
        </PageHeader>
        <h4 className='u-m text-center'>Search For A Tutor</h4>
        <div style={{ textAlign: 'center' }}>
          <SearchIcon />
        </div>
        <h4 className='u-m text-center'>Request A Session</h4>
        <div style={{ textAlign: 'center' }}>
          <RequestIcon />
        </div>
        <h4 className='u-m text-center'>Virtually Meet Your Tutor</h4>
        <div style={{ textAlign: 'center' }}>
          <MeetIcon />
        </div>
      </Section>

      {/* Top Tutors Section */}
      <Section>
        <PageHeader>
          <h2>Top Rated Tutors</h2>
        </PageHeader>
        <div>
          <TutorCard />
        </div>
      </Section>
    </div>
  );
}
