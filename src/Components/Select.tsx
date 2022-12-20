import React, { useEffect, useRef } from "react";
import styles from './../styles.module.css';
//import downarrrow from '../assets/images/down-arrow.png';

import { SelectInterface } from "../Container/FieldInterface";

export const Select = (props: SelectInterface) => {
    const textInput = useRef<HTMLInputElement | null>(null);
    const listRefs = useRef<HTMLUListElement | null>(null);
    const [isOpened, setIsOpened] = React.useState(false);
    const [isFloated, setIsFloated] = React.useState(false);
    const [filterValue, setFilterValue] = React.useState('');
    //const [propsValue, setPropsValue] = React.useState('');
    let [tempvalue, setTempvalue] = React.useState('');
    const { label, input_key, searchable, option, value } = props;

    const handleFocus = (event: any) => {
        //setTempvalue(event.target.id)
        event.preventDefault();
        setIsOpened(true);
    }
    const handleFloatLabel = (flag: boolean) => {
        setIsFloated(flag);
    }

    useEffect(() => {
        //let _value = typeof value === "object" ? value.value : value;
        let _label = typeof value === "object" ? value.label : value;
        //setPropsValue(_value);
        setFilterValue(_label)
    }, [value])

    useEffect(() => {

        const handleClickOutside = (e: any) => {
            if (isOpened && listRefs.current && !listRefs.current.contains(e.target)) {
                if (tempvalue === null) {
                    handleFloatLabel(false)
                }
                setIsOpened(false);
            } else if (e.target && e.target.id && !isOpened && textInput && textInput.current
                && e.target.id === textInput.current.id) {
                setIsOpened(true);
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    })

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }

    });

    const handleOnChange = (evt: any, value: any) => {
        setIsOpened(false);
        setTempvalue('');
        textInput.current?.blur();
        props.handleOnChange(evt, value);
    }

    const handleKeyDown = (e: any) => {
        const keyCodes = [40, 38, 13, 9]
        const { keyCode } = e;
        const option = [...props.option];
        let _tempvalue = tempvalue;
        let values = [];
        let asObject = false;
        if (option.length >= 1 && typeof (option[0]) === 'object') {
            values = option.map((item: any) => item.value);
            asObject = true;
        } else {
            values = option
        }

        if (isOpened && keyCodes.includes(keyCode)) {
            if ((keyCode === 38 || keyCode === 40) && _tempvalue === null) {
                _tempvalue = values[0]
            } else if (keyCode === 40) {
                let index = values.indexOf(_tempvalue)
                _tempvalue = index === (values.length - 1) ? values[0] : values[index + 1];
            } else if (keyCode === 38) {
                let index = values.indexOf(_tempvalue)
                _tempvalue = index === 0 ? values[values.length - 1] : values[index - 1];
            } else if (keyCode === 13) {
                setIsOpened(false);
                textInput.current?.blur();
                if (asObject)
                    props.handleOnChange(e, option[values.indexOf(_tempvalue)]);
                else
                    props.handleOnChange(e, _tempvalue);
            } else if (keyCode === 9) {
                if (_tempvalue === null) {
                    handleFloatLabel(false);
                }
                setIsOpened(false);
            }
        }
        setTempvalue(_tempvalue);
    }




    const renderOption = (_option: any, _tempvalue: any, _filterValue: any, _searchable: any) => {
        let notfound = 0;
        //console.log(_tempvalue)
        if (_option.length >= 1 && typeof (_option[0]) === 'object') {

            return _option.map((item: any, i: number) => {
                /*if (!filter && filterValue.includes(item.value)) {
                    return null;
                } else*/ if (_searchable && filterValue.trim().length >= 1) {
                    if (item.label.toUpperCase().includes(filterValue.toUpperCase())) {
                        return (
                            <li
                                key={'select' + i}
                                onClick={(e) => handleOnChange(e, item)}
                                className={`${styles.material_custom_select_item} ${_tempvalue === item.value ? styles.active_item : ''}`}
                                data-index={i + 1}>{item.label}</li>
                        )
                    } else {
                        notfound++;
                        if (notfound === _option.length) {
                            return (
                                <li className={`${styles.material_custom_select_item}`}>
                                    <span>{"Not Found"}</span>
                                </li>
                            );
                        } else {

                            return null;
                        }
                    }
                } else {
                    return (
                        <li
                            key={'select' + i}
                            onClick={(e) => handleOnChange(e, item)}
                            className={`${styles.material_custom_select_item} ${_tempvalue === item.value ? styles.active_item : ''}`}
                            data-index={i + 1}>{item.label}</li>
                    );
                }

            });
        } else {
            return _option.map((item: any, i: number) => {

                /*if (!filter && filterValue.includes(item)) {
                    return null;
                } else*/ if (_searchable && filterValue.trim().length >= 1) {
                    if (item.toUpperCase().includes(filterValue.toUpperCase())) {
                        return (
                            <li
                                key={'select' + i}
                                onClick={(e) => handleOnChange(e, item)}
                                className={`${styles.material_custom_select_item} ${_tempvalue === item ? styles.active_item : ''}`}
                                data-index={i + 1}>{item}</li>
                        );
                    } else {
                        notfound++;
                        if (notfound === _option.length) {
                            return (
                                <li className={`${styles.material_custom_select_item}`}>
                                    <span>{"Not Found"}</span>
                                </li>
                            );
                        } else {

                            return null;
                        }
                    }
                } else {
                    return (
                        <li
                            key={'select' + i}
                            onClick={(e) => handleOnChange(e, item)}
                            className={`${styles.material_custom_select_item} ${_tempvalue === item ? styles.active_item : ''}`}
                            data-index={i + 1}>{item}</li>
                    );
                }
            });
        }
    }

    //console.log(isOpened, isFloated, "isOpened")
    return (
        <div className={`${styles.input_wrapper} ${styles.select_wrapper_material} ${isOpened ? styles.opened : ''} ${isFloated ? styles.floated : ''}`}>
            <div className={`${styles.iner_sel_wrpr}`}>

                <label
                    htmlFor={input_key ? input_key : "id"}
                    className={styles.select_label}
                ><span className="label-text">{label}</span><span className={styles.down_arrow}>
                        {/* <img src={downarrrow} width={15} height={15} alt="Down arrow" /> */}
                    </span></label>
                <input type="text"
                    value={filterValue}
                    id={input_key}
                    ref={textInput}
                    autoComplete={`new-off`}
                    onFocus={(event: any) => [
                        event.target.setAttribute('autocomplete', 'off'),
                        handleFocus(event),
                        handleFloatLabel(true)]}
                    readOnly={!searchable}
                    onChange={
                        searchable
                            ? e => setFilterValue(e.target.value)
                            : () => console.log()
                    }
                    className={`${styles.combo_input}`} />
            </div>

            <ul
                ref={listRefs}
                className={styles.material_custom_select}>
                {renderOption(option, tempvalue, filterValue, searchable)}
            </ul>

        </div>
    )
}

