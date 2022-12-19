import * as React from 'react';
import { Input, Select } from '../Components/index';
import { FormFieldInterface } from './FieldInterface';
import { getStateValueDeep } from './../utill';

import styles from './../styles.module.css'

interface RenderFormProps {
  formValue: any,
  onFormFieldChange: Function,
  config: FormFieldInterface[]
  cols?: any,
  optionList: any
}

const textBoxConstants = ["TEXT", "PASSWORD", "EMAIL", "NUMBER"];

export const RenderForm = (props: RenderFormProps) => {
  const { config, formValue } = props;

  const renderFormFields = () => {
    return config.map((fieldItem, index) => {
      const formFldValue = getStateValueDeep(formValue, fieldItem.stateKey);
      if (textBoxConstants.includes(fieldItem.type && fieldItem.type.toUpperCase())) {
        return (
          <Input
            type={fieldItem.type.toLowerCase()}
            input_key={fieldItem.stateKey}
            label={fieldItem.label}
            value={formFldValue}
            handleOnChange={(evt: any, value: any) => props.onFormFieldChange(evt, value, fieldItem)} />
        )
      } else if (fieldItem.type && fieldItem.type.toUpperCase() === "SELECT") {
        const options = getStateValueDeep(props.optionList, fieldItem.optionListPath);
        //console.log(formFldValue)
        return (
          <Select
            option={options}
            type={fieldItem.type.toLowerCase()}
            input_key={fieldItem.stateKey}
            label={fieldItem.label}
            value={formFldValue}
            searchable={fieldItem.searchable || false}
            handleOnChange={(evt: any, value: any) => props.onFormFieldChange(evt, value, fieldItem)} />
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
