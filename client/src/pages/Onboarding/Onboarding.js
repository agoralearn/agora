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
import { education } from '../../utils/categoryData';
import { categories } from '../../utils/subjectData';
// import Button from '../../components/Button/Button';
import PageHeader from '../../components/PageHeader/PageHeader';

function Onboarding() {
  const [step, setStep] = useState({
    currentStep: 'subjects',
    progressPercent: 25
  });

  const [subjects, setSubjects] = useState(categories);

  function toggleSelected(e, cat, subcat) {
    console.log(cat, subcat);
    const categoryIndex = subjects.findIndex((category) => {
      console.log(category.header + '-' + cat);
      return category.header === cat;
    });
    console.log(categoryIndex);
    console.log(subjects);
    const subCatIndex = subjects[categoryIndex].subcat.findIndex(
      (subCategory) => {
        return subCategory.text === subcat;
      }
    );
    console.log(categories[categoryIndex].subcat[subCatIndex].selected);
  }

  function selectCurrentStep() {
    switch (step.currentStep) {
      case 'subjects':
        return renderSubjects();
      case 'tutoring-info':
        return;
      case 'bio':
        return;
      case 'image':
        return;
    }
  }

  function renderSubjects() {
    return categories.map((cat) => {
      return (
        <div key={cat.type}>
          <h2>{cat.header}</h2>
          {cat.subcat.map((subcat) => {
            console.log(cat.header);
            return (
              <div
                key={subcat.key}
                className='u-m-r disp-inline-b'
                onClick={(e) => {
                  toggleSelected(e, cat.header, subcat.text);
                }}
              >
                <Badge selected={subcat.selected} type='outline'>
                  {subcat.text}
                </Badge>
              </div>
            );
          })}
        </div>
      );
    });
  }

  return (
    <div>
      <PageHeader>
        <h2>Profile Setup</h2>
      </PageHeader>
      <Container>
        {selectCurrentStep()}
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
