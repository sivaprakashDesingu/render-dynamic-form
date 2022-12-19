import React from "react";
import { InputInterface } from "../Container/FieldInterface";
import styles from './../styles.module.css';


export const Input = (props: InputInterface) => {

    function renderSubClass(value: any) {
        if (typeof value === 'string' || typeof value === 'number') {
            if ((String(value)).length >= 1) {
                return 'has_content';
            } else {
                return ''
            }
        } else {
            value = value.trim();
            if (value.length >= 1) {
                return 'has_content';
            } else {
                return '';
            }
        }
    }
    const type = props.type

    return (
        <div className={`dinamic-from input-wrapper ${styles.input_wrapper}`}>
            <label htmlFor={`inpt-${props.input_key}`} className={styles.inp_label}>{props.label}</label>
            <input
                id={`inpt-${props.input_key}`}
                className={`${styles.input_fld} ${styles[renderSubClass(props.value)]}`}
                type={type === "password" ? "password" : type === "email" ? "email" : 'text'}
                value={props.value}
                placeholder={''}
                onChange={(e: any) => props.handleOnChange(e, e.target.value)}
                readOnly={props.readOnly || false} />

        </div>
    )
}

