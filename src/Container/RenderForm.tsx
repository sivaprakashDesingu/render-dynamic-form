import * as React from 'react';
import { Input, Select, CheckBox, DatePicker } from '../Components/index';
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
            key={index}
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
            key={index}
            option={options}
            type={fieldItem.type.toLowerCase()}
            input_key={fieldItem.stateKey}
            label={fieldItem.label}
            value={formFldValue}
            searchable={fieldItem.searchable || false}
            handleOnChange={(evt: any, value: any) => props.onFormFieldChange(evt, value, fieldItem)} />
        )
      } else if (fieldItem.type && fieldItem.type.toUpperCase() === "DATETIME") {
        return (
          <DatePicker handleOnChange={(evt: any, value: any) => props.onFormFieldChange(evt, value, fieldItem)} key={index} label={fieldItem.label}
            value={formFldValue} />
        )
      } else if (fieldItem.type && fieldItem.type.toUpperCase() === "CHECKBOX") {
        return (
          <div key={index} className='input-wrapper'>
            <CheckBox label='text' checked={false} value={"test"} handleOnChange={(value: any) => console.log(value)} />
          </div>
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
    <div className={`render-dinamic-form ${styles.render_dinamic_form} `} >
      <div className={`${props.cols} form-wrapper ${styles[props.cols]}`}>
        {renderFormFields()}
      </div>
    </div>
  )
}
