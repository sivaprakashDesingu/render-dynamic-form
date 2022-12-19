import React from "react";
import styles from './../styles.module.css';
//import downarrrow from '../assets/images/down-arrow.png';

import { SelectInterface } from "../Container/FieldInterface";

export const Select = (props: SelectInterface) => {
    const textInput = React.useRef(null);
    const listRefs = React.useRef(null);
    const [isOpened, setIsOpened] = React.useState(false);
    const [isFloated, setIsFloated] = React.useState(false);
    const [filterValue, setFilterValue] = React.useState('');
    const [tempvalue, setTempvalue] = React.useState('');
    const { label, input_key, searchable, option } = props;

    const handleFocus = (event: any) => {
        setTempvalue(event.target.id)
        setIsOpened(true);
    }
    const handleFloatLabel = (flag: boolean) => {
        setIsFloated(flag);
    }


    const renderOption = (_option:any, _tempvalue:any, _filterValue:any, _searchable:any) => {
        let notfound = 0;
        if (_option.length >= 1 && typeof (_option[0]) === 'object') {
            
            return _option.map((item:any, i:number) => {
                /*if (!filter && filterValue.includes(item.value)) {
                    return null;
                } else*/ if (_searchable && filterValue.trim().length >= 1) {
                    if (item.value.toUpperCase().includes(filterValue.toUpperCase())) {
                        return (
                            <li
                                key={'select' + i}
                                onClick={(e) => props.handleOnChange(e, item.value)}
                                className={`${styles.material_custom_select_item} ${_tempvalue === item.value ? styles.active_item : ''}`}
                                data-index={i + 1}>{item.label}</li>
                        )
                    }else {
                        notfound++;
                        if (notfound === _option.length) {
                            return (
                                <li  className={`${styles.material_custom_select_item}`}>
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
                            onClick={(e) => props.handleOnChange(e, item.value)}
                            className={`${styles.material_custom_select_item} ${_tempvalue === item.value ? styles.active_item : ''}`}
                            data-index={i + 1}>{item.label}</li>
                    );
                }
                
            });
        } else {
            return _option.map((item:any, i:number) => {
                
                /*if (!filter && filterValue.includes(item)) {
                    return null;
                } else*/ if (_searchable && filterValue.trim().length >= 1) {
                    if (item.toUpperCase().includes(filterValue.toUpperCase())) {
                        return (
                            <li
                            key={'select' + i}
                            onClick={(e) => props.handleOnChange(e, item)}
                            className={`${styles.material_custom_select_item} ${_tempvalue === item ? styles.active_item : ''}`}
                            data-index={i + 1}>{item}</li>
                        );
                    } else {
                        notfound++;
                        if (notfound === _option.length) {
                            return (
                                <li  className={`${styles.material_custom_select_item}`}>
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
                        onClick={(e) => props.handleOnChange(e, item)}
                        className={`${styles.material_custom_select_item} ${_tempvalue === item ? styles.active_item : ''}`}
                        data-index={i + 1}>{item}</li>
                    );
                }
            });
        }
    }
   

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

