import * as React from 'react'
import { RenderForm } from './Container/RenderForm';
import FormFieldInterface from  './Container/FieldInterface';
import './assets/styles/style.scss';

interface Props {
  config:FormFieldInterface[]
  formValue:any,
}

export const RenderDinamicForm = (props:Props) => {
  return <RenderForm formValue={props.formValue} config={props.config}/>
}
