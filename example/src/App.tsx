import React from 'react'
import { RenderDinamicForm } from 'render-dynamic-form'
import 'render-dynamic-form/dist/index.css'

const config = [
  {
    type: "TEXT",
    label: "Name",
    stateKey: "from.name",
    rules: {
      required: true,
      readonly: true,
    }
  },
  {
    type: "password",
    label: "Password",
    stateKey: "from.password",
    rules: {
      required: true,
    }
  },
  {
    type: "Select",
    label: "Select Country",
    stateKey: "from.country",
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
    isAsia:false,
    KnowLanguage:["TAMIL,ENGLISH"],
    KnowStack:[
      { label: "React", value: "React" },
      { label: "Angular", value: "Angular" },
    ]
  }
}
const App = () => {
  const [state,setState] = React.useState(initalState);
  return <RenderDinamicForm formValue={state} config={config} />
}

export default App
