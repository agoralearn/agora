import React from 'react';
import './Home.scss';
import Hero from '../../components/Hero/Hero';
import PageHeader from '../../components/PageHeader/PageHeader';

export default function Home() {
  return (
    <div className='Home_wrapper'>
      {/* Hero Component */}
      <Hero>
        <Hero.Content>
          <PageHeader>
            <h1 className='color-primary f-w-l'>A New Way To Learn</h1>
          </PageHeader>
          <p className='color-primary f-w-l'>
            Receive one on one tutoring or find a tutor for your group from our
            many talented tutors
          </p>
        </Hero.Content>
      </Hero>
    </div>
  );
}
