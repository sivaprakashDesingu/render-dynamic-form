import React from 'react'
import { RenderDinamicForm, deepSetObject } from 'render-dynamic-form';
import 'render-dynamic-form/dist/index.css'


const countyList = ["India", "USA", "UK"];
const stateList = [{ label: "TAMILNADU", value: "TN" }, { label: "ANDRA", value: "AN" }];

const config = [
  {
    type: "TEXT",
    label: "Name",
    stateKey: "form.name",
    rules: {
      required: true,
      readonly: true,
    }
  },
  {
    type: "password",
    label: "Password",
    stateKey: "form.name",
    rules: {
      required: true,
      readonly: true,
    }
  },
  {
    type: "Select",
    label: "Select Country",
    stateKey: "form.country",
    optionListPath: 'countryList',
    rules: {
      required: true,
    }
  },
  {
    type: "select",
    label: "State",
    stateKey: "form.state",
    optionListPath: 'stateList',
    searchable: true,
    rules: {
      required: true,
    }
  },
  {
    type:"DATETIME",
    label: "State",
    stateKey: "form.state",
    optionListPath: 'stateList',
    searchable: true,
    rules: {
      required: true,
    }
  },
  {
    type:"Checkbox",
    label: "State",
    stateKey: "form.isAsia",
    disabled: false,
    rules: {
      required: true,
    }
  }
]


const initalState = {
  form: {
    name: "text",
    pasword: "text",
    country: "India",
    state: { label: "TAMILNADU", value: "TN" },
    isAsia: false,
    KnowLanguage: ["TAMIL,ENGLISH"],
    KnowStack: [
      { label: "React", value: "React" },
      { label: "Angular", value: "Angular" },
    ]
  }
}
const App = () => {
  const [state, setState] = React.useState(initalState);

  const onFormFieldChange = (evt: any, value: any, field: any) => {
    evt.preventDefault();
    //console.log(value, field)
    const localState = { ...state }
    deepSetObject(localState, field.stateKey, value);
    setState(localState)
  }
  const optionList = {
    countryList: countyList,
    stateList: stateList
  }
  return (
    <RenderDinamicForm
      optionList={optionList}
      cols={2}
      onFormFieldChange={onFormFieldChange}
      formValue={state}
      config={config} />
  )
}

export default App
