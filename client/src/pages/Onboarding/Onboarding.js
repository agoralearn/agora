import React, { useState } from 'react';
import API from '../../utils/API';
import { useAuth } from '../../utils/auth';
import { Link, useHistory } from 'react-router-dom';
import Badge from '../../components/Badge/Badge';
import {
  Input,
  Form,
  Dropdown,
  TextArea,
  Checkbox,
  Container,
  // Grid,
  Progress,
  Icon,
  Button as SemanticButton
} from 'semantic-ui-react';
import { education } from '../../utils/categoryData';
import { categories } from '../../utils/subjectData';
import Button from '../../components/Button/Button';
import PageHeader from '../../components/PageHeader/PageHeader';
import ProfileImage from '../../components/ProfileImage/ProfileImage';

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
  { name: 'price', label: 'Price ($/hr)', inputType: 'number' },
  { name: 'bio', label: 'Bio', type: 'textarea', placeholder: 'About Me...' },
  { name: 'image', label: 'Image URL' },
  {
    name: 'education',
    label: 'Education',
    type: 'dropdownSelect',
    options: education
  }
];

function Onboarding() {
  const { user } = useAuth();
  const history = useHistory();

  const [step, setStep] = useState({
    currentStep: 5,
    progressPercent: 0
  });
  const [subjectNames, setSubjectNames] = useState([]);
  const [subjects, setSubjects] = useState(categories);
  const [bio, setBio] = useState();
  const [timeFrame, setTimeFrame] = useState([]);
  const [image, setImage] = useState();
  const [minGroupSize, setMinGroupSize] = useState();
  const [maxGroupSize, setMaxGroupSize] = useState();
  const [price, setPrice] = useState();
  const [age, setAge] = useState();
  const [savedEducation, setSavedEducation] = useState([]);

  const userInfo = {
    subjects: subjectNames,
    bio: bio,
    timeFrame: timeFrame,
    image: image,
    minGroupSize: minGroupSize,
    maxGroupSize: maxGroupSize,
    price: price,
    age: age,
    education: savedEducation
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

  function renderTutoringInfo() {
    return (
      <Form style={{ maxWidth: '500px' }}>
        {tutoringInfoFields.map((field) => {
          return determineFieldType(field);
        })}
      </Form>
    );
  }

  function renderTutorBio() {
    return (
      <Form>
        <div>
          <h2 className='u-m-b'>My Bio</h2>
          <div className='u-m-b-sm'>
            <p>
              This is your opportunity to tell prospective students about
              yourself. In addition to your background and experience, feel free
              to showcase some of your personality!
            </p>
          </div>
        </div>
        <TextArea
          placeholder='About Me...'
          onChange={(event, { value }) => setBio(value)}
          style={{ minHeight: 200 }}
        />
        <div className='u-m-t'>
          <div className='u-m-b-sm'>
            <label>Education:</label>
          </div>
          <Dropdown
            placeholder='Select all that apply'
            fluid
            multiple
            selection
            defaultValue=''
            options={education}
            onChange={(event, { value }) => {
              setSavedEducation(value);
            }}
          />
        </div>
      </Form>
    );
  }

  function renderProfilePic() {
    return (
      <div>
        <div style={{ marginBottom: '10px' }}>
          <ProfileImage
            profileImg={
              image
                ? image
                : 'https://utulsa.edu/wp-content/uploads/2018/08/generic-avatar.jpg'
            }
            style={{ margin: '0 auto' }}
          />
        </div>
        <div className='u-m-b-sm'>
          <label>Profile Image</label>
        </div>
        <div className='u-m-b-sm'>
          <Input
            placeholder='Image url...'
            onChange={(event) => setImage(event.target.value)}
          ></Input>
        </div>
        <p>
          Hint: Paste the link to your professional profile picture in the field
          below. (We recommend grabbing the url from your LinkedIn Image)
        </p>
      </div>
    );
  }

  function renderOnboardComplete() {
    return (
      <>
        <h1>Congratulations!</h1>
        <div className='u-m-b'>
          <p>
            Your profile changes have been saved. You can always update your
            profile by clicking your image in the nav bar and going to settings.
          </p>
        </div>
        <div className='u-m-b-sm'>
          <p>What would you like to do next?</p>
        </div>
        <div>
          <Button className='btn-primary u-m-b-sm'>Take a Tour</Button>
        </div>

        <div>
          <Button
            onClick={() => {
              history.push('/tutorbio/' + user.id);
            }}
            className='btn-primary u-m-b-sm'
          >
            View Bio Page
          </Button>
        </div>
        <div>
          <Link
            to={{
              pathname: '/tutors'
            }}
          >
            <Button className='btn-primary u-m-b-sm'>Browse Tutors</Button>
          </Link>
        </div>
      </>
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
        return (
          <div key={field.name} className='u-m-b'>
            <label>{field.label}</label>
            <div className='u-m-b'>
              {field.options.map((option) => {
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
              })}
            </div>
          </div>
        );
      case 'minGroupSize':
        return (
          <div key={field.name} className='u-m-b u-m-r disp-inline-b'>
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
          <div key={field.name} className='u-m-b u-m-r disp-inline-b'>
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
          <div key={field.name} className='u-m-b u-m-r disp-inline-b'>
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
      case 'price':
        return (
          <div key={field.name} className='u-m-b u-m-r disp-inline-b'>
            <label>{field.label}</label>
            <div>
              <Input
                name={field.name}
                defaultValue={1}
                onChange={(event) => setPrice(event.target.value)}
                type={field.inputType}
                min={field.min}
                // required={field.required}
              ></Input>
            </div>
          </div>
        );
      default:
        return null;
    }
  }

  function selectCurrentStep() {
    switch (step.currentStep) {
      case 1:
        return renderSubjects();
      case 2:
        return renderTutoringInfo();
      case 3:
        return renderTutorBio();
      case 4:
        return renderProfilePic();
      case 5:
        return renderOnboardComplete();
      default:
        return renderSubjects();
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
        {step.currentStep !== 5 && (
          <>
            <SemanticButton animated onClick={(e) => saveSubjects(e)} id='next'>
              <SemanticButton.Content visible id='next'>
                Next
              </SemanticButton.Content>
              <SemanticButton.Content hidden id='next'>
                <Icon name='arrow right' />
              </SemanticButton.Content>
            </SemanticButton>
            <SemanticButton icon labelPosition='left'>
              <Icon name='save outline' />
              Pause
            </SemanticButton>
          </>
        )}
      </Container>
    </div>
  );
}

export default Onboarding;

/* 
Step 0 page "set up profile" or "save for later" options
add instructions to first pick subjects page 
Make a modal for the save changes and finish later button that offers a tutorial, bio, browse
Make funcitonality so that save and finish still does the API call
Redirect link from signup needs to point to onboarding
Makes our own styling for the progress bar, improve next and finish buttons
-MAYBE animate progress bar
*/
