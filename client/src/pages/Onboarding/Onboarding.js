import React, { useState, useEffect } from 'react';
import API from '../../utils/API';
import { useAuth } from '../../utils/auth';
import Badge from '../../components/Badge/Badge';
import { toast } from 'react-toastify';
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

const tutoringInfoFields = [
  {
    name: 'timeFrame',
    label: 'Time Frame',
    type: 'select',
    options: [
      { key: 'on-going', label: 'on-going' },
      { key: 'one-time', label: 'one-time' }
    ]
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
  { name: 'price', label: 'Price ($/hr)', inputType: 'number' }
];

function Onboarding() {
  toast.configure();
  const [step, setStep] = useState({
    currentStep: 1,
    progressPercent: 25
  });
  const { user } = useAuth();
  const [subjectNames, setSubjectNames] = useState([]);
  const [subjects, setSubjects] = useState(categories);
  // const [userInfo, setUserInfo] = useState({
  //   subjects: subjectNames,
  //   bio: bio,
  //   timeFrame: timeFrame,
  //   image: image,
  //   minGroupSize: minGroupSize,
  //   maxGroupSize: maxGroupSize,
  //   price: price,
  //   age: age
  // });
  const [bio, setBio] = useState();
  const [timeFrame, setTimeFrame] = useState([]);
  const [image, setImage] = useState();
  const [minGroupSize, setMinGroupSize] = useState();
  const [maxGroupSize, setMaxGroupSize] = useState();
  const [price, setPrice] = useState();
  const [age, setAge] = useState();
  const [education, setEducation] = useState();

  const userInfo = {
    subjects: subjectNames,
    bio: bio,
    timeFrame: timeFrame,
    image: image,
    minGroupSize: minGroupSize,
    maxGroupSize: maxGroupSize,
    price: price,
    age: age,
    education: education
  };

  function toggleSelected(e, cat, subcat) {
    const categoryIndex = subjects.findIndex((category) => {
      return category.header === cat;
    });

    const subCatIndex = subjects[categoryIndex].subcat.findIndex(
      (subCategory) => {
        return subCategory.text === subcat;
      }
    );
    if (categories[categoryIndex].subcat[subCatIndex].selected === true) {
      setSubjects([
        ...subjects,
        (categories[categoryIndex].subcat[subCatIndex].selected = false)
      ]);
      setSubjectNames(
        subjectNames.filter((name) => {
          return name !== categories[categoryIndex].subcat[subCatIndex].text;
        })
      );
    } else {
      setSubjects([
        ...subjects,
        (categories[categoryIndex].subcat[subCatIndex].selected = true)
      ]);
      setSubjectNames([
        ...subjectNames,
        categories[categoryIndex].subcat[subCatIndex].text
      ]);
    }
  }

  useEffect(() => {
    console.log(subjectNames);
  }, [subjectNames]);

  function selectCurrentStep() {
    switch (step.currentStep) {
      case 1:
        return renderSubjects();
      case 2:
        return renderTutoringInfo(tutoringInfoFields);
      case 3:
        return;
      case 4:
        return;
    }
  }

  function renderSubjects() {
    return categories.map((cat) => {
      return (
        <div key={cat.type}>
          <h2>{cat.header}</h2>
          {cat.subcat.map((subcat) => {
            return (
              <div
                key={subcat.key}
                className='u-m-r disp-inline-b'
                onClick={(e) => {
                  toggleSelected(e, cat.header, subcat.text);
                }}
              >
                <Badge
                  selected={subcat.selected}
                  type={subcat.selected ? 'Badge_wrapper' : 'outline'}
                >
                  {subcat.text}
                </Badge>
              </div>
            );
          })}
        </div>
      );
    });
  }
  function saveSubjects(e) {
    e.persist();
    API.updateUser(userInfo)
      .then((res) => {
        toast.success(`New info saved!`, {
          position: toast.POSITION.TOP_CENTER
        });
        if (e.target.id === 'next') {
          setStep({
            currentStep: step.currentStep + 1,
            progressPercent: step.progressPercent + 25
          });
        }
      })

      .catch((err) => {
        console.log(err);
      });
  }

  function renderTutoringInfo(tutoringInfoFields) {
    return (
      <Form>
        {tutoringInfoFields.map((field) => {
          return determineFieldType(field);
        })}
      </Form>
    );
  }
  function checkboxFields(value) {
    const timeFrameCopy = [...timeFrame];
    const index = timeFrame.indexOf(value);
    index < 0 ? timeFrameCopy.push(value) : timeFrameCopy.splice(index, 1);
    return timeFrameCopy;
  }
  function determineFieldType(field) {
    switch (field.name) {
      case 'timeFrame':
        return field.options.map((option) => {
          return (
            <Checkbox
              className='u-m-r'
              key={option.label}
              label={option.label}
              control='input'
              name={field.name}
              checked={timeFrame.includes(option.label)}
              onChange={(event, data) =>
                setTimeFrame(checkboxFields(option.label))
              }
            />
          );
        });
      case 'minGroupSize':
        return (
          <div key={field.name}>
            <label>{field.label}</label>
            <div>
              <Input
                name={field.name}
                onChange={(event) => {
                  setMinGroupSize(event.target.value);
                }}
                type='number'
                min={field.min}
                defaultValue={1}
                required={field.required}
              ></Input>
            </div>
          </div>
        );
      case 'maxGroupSize':
        return (
          <div key={field.name}>
            <label>{field.label}</label>
            <div>
              <Input
                name={field.name}
                defaultValue={1}
                onChange={(event) => setMaxGroupSize(event.target.value)}
                type={field.inputType}
                min={field.min}
                // required={field.required}
              ></Input>
            </div>
          </div>
        );
      case 'age':
        return (
          <div key={field.name}>
            <label>{field.label}</label>
            <div>
              <Input
                name={field.name}
                defaultValue={1}
                onChange={(event) => setAge(event.target.value)}
                type={field.inputType}
                min={field.min}
                // required={field.required}
              ></Input>
            </div>
          </div>
        );
    }
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
          <Button.Content id='next' onClick={(e) => saveSubjects(e)} visible>
            Next
          </Button.Content>
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
