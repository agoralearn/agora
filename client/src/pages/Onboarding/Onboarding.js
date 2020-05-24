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
  const [timeFrame, setTimeFrame] = useState();
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
        return renderTutoringInfo();
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

  function renderTutoringInfo() {}

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
