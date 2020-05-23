import React, { useState, useEffect } from 'react';
import API from '../../utils/API';
import { useAuth } from '../../utils/auth';
import Badge from '../../components/Badge/Badge';
import {
  Input,
  Form,
  Dropdown,
  TextArea,
  Checkbox,
  Container,
  Grid,
  Progress,
  Icon,
  Button
} from 'semantic-ui-react';
import { subjects, education } from '../../utils/categoryData';
// import Button from '../../components/Button/Button';
import PageHeader from '../../components/PageHeader/PageHeader';

function Onboarding() {
  const [step, setStep] = useState({
    currentStep: 'subjects',
    progressPercent: 25
  });

  function selectCurrentStep() {
    switch (step.currentStep) {
      case '':
        return;
    }
  }

  return (
    <div>
      <PageHeader>
        <h2>Profile Setup</h2>
      </PageHeader>
      <Container>
        {selectCurrentStep}
        <Progress percent={step.progressPercent} progress />
        <Button animated>
          <Button.Content visible>Next</Button.Content>
          <Button.Content hidden>
            <Icon name='arrow right' />
          </Button.Content>
        </Button>
        <Button icon labelPosition='left'>
          <Icon name='save outline' />
          Pause
        </Button>
      </Container>
    </div>
  );
}

export default Onboarding;
