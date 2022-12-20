import * as React from 'react'
import { RenderForm } from './Container/RenderForm';
import { Input, Select } from './Components/index';
import { deepSetObject } from './utill';
import { FormFieldInterface } from  './Container/FieldInterface';
import './assets/styles/style.scss';

interface Props {
  config:FormFieldInterface[],
  onFormFieldChange:Function,
  formValue:any,
  cols?:any,
  optionList:any
}

const RenderDinamicForm = (props:Props) => {
  return <RenderForm cols={`col_${props.cols || 1}`} optionList={props.optionList} onFormFieldChange={props.onFormFieldChange} formValue={props.formValue} config={props.config}/>
}
export {
  deepSetObject,
  RenderDinamicForm,
  Input,
  Select
}