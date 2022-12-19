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
    readOnly?:false|true 
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
export{
    FormFieldInterface,
    InputInterface,
    SelectInterface
}