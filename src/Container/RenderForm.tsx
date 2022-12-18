import * as React from 'react';
import FormFieldInterface from './FieldInterface';
//import styles from './../styles.module.css'

interface RenderFormProps {
  formValue:any,
  config: FormFieldInterface[]
}

export const RenderForm = (props: RenderFormProps) => {
  const { config } = props;

  const renderFormFields = () => {
    return config.map((fieldItem, index) => {
      console.log(fieldItem)
      return (
        <div key={index} className='input-wrapper'>
          text
        </div>
      )
    })
  }

  return (
    <div className='render-dinamic-form'>
      <form className='form-wrapper'>
        {renderFormFields()}
      </form>
    </div>
  )
}
