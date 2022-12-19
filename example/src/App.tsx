import React from 'react'
import { RenderDinamicForm, deepSetObject } from 'render-dynamic-form';
import 'render-dynamic-form/dist/index.css'

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
    stateKey: "from.country",
    rules: {
      required: true,
    }
  },
  {
    type: "select",
    label: "State",
    stateKey: "from.state",
    rules: {
      required: true,
    }
  },
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

  const onFormFieldChange = (value: any, field: any) => {
    const localState = { ...state }
    deepSetObject(localState, field.stateKey, value);
    setState(localState)
  }

  return <RenderDinamicForm cols={2} onFormFieldChange={onFormFieldChange} formValue={state} config={config} />
}

export default App
