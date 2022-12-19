import * as React from 'react';
import { Input, Select } from '../Components/index';
import { FormFieldInterface } from './FieldInterface';
import { getStateValueDeep } from './../utill';

import styles from './../styles.module.css'

interface RenderFormProps {
  formValue: any,
  onFormFieldChange: Function,
  config: FormFieldInterface[]
  cols?: any
}
const countyList = ["India","USA","UK"];
// const stateList = [{ label: "TAMILNADU", value: "TN" },{ label: "ANDRA", value: "AN" }];
const textBoxConstants = ["TEXT", "PASSWORD", "EMAIL", "NUMBER"];

export const RenderForm = (props: RenderFormProps) => {
  const { config, formValue } = props;

  const renderFormFields = () => {
    return config.map((fieldItem, index) => {
      const formFldValue = getStateValueDeep(formValue, fieldItem.stateKey)
      if (textBoxConstants.includes(fieldItem.type && fieldItem.type.toUpperCase())) {
        return (
          <Input
            type={fieldItem.type.toLowerCase()}
            input_key={fieldItem.stateKey}
            label={fieldItem.label}
            value={formFldValue}
            handleOnChange={(value: any) => props.onFormFieldChange(value, fieldItem)} />
        )
      } else if (fieldItem.type) {
        return (
          // <div key={index} className='input-wrapper'>
            <Select 
              option={countyList}
              type={fieldItem.type.toLowerCase()}
              input_key={fieldItem.stateKey}
              label={fieldItem.label}
              value={formFldValue}
              handleOnChange={(value: any) => props.onFormFieldChange(value, fieldItem)} />
          // </div>
        )
      } else {
        return (
          <div key={index} className='input-wrapper'>
            Type should be mentioned
          </div>
        )
      }

    })
  }

  return (
    <div className={`render-dinamic-form ${styles.textboxwrapper} `} >
      <form autoComplete="new-password" className={`${props.cols} form-wrapper ${styles[props.cols]}`}>
        {renderFormFields()}
      </form>
    </div>
  )
}
