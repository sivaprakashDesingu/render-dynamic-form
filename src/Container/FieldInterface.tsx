interface FormFieldInterface {
    searchable?: boolean,
    optionListPath?: any
    type:string,
    label:string,
    stateKey:string,
    rules:Object
}

interface InputInterface {
    type?:string,
    label:string,
    Placeholder?:string,
    value:any,
    handleOnChange:Function,
    input_key?:string,
    readOnly?:false|true,
    handleOnFocus?:Function
}


interface SelectInterface {
    type?:string,
    label:string,
    Placeholder?:string,
    value:any,
    handleOnChange:Function,
    input_key?:string,
    readOnly?:false|true,
    searchable?:false | true
    option:any,
}

interface DatePickerInterface {
    label:string,
    value:any,
    minValue?:any,
    maxValue?:any,
    handleOnChange:Function
}
 
interface DateList {
    value:Date,
    isDisabled:false | true
}

interface CheckBoxProps {
    value:any ,
    label: string,
    checked?:boolean,
    disabled?: false | true,
    readOnly?: false | true,
    handleOnChange:Function
}

export{
    FormFieldInterface,
    InputInterface,
    SelectInterface,
    DatePickerInterface,
    DateList,
    CheckBoxProps
}
