
import React from "react";
import styles from './../styles.module.css';
import { CheckBoxProps } from "../Container/FieldInterface";


export const CheckBox = (props: CheckBoxProps) => {
    const { value, label, disabled,checked } = props;
    //keys, handleOnChange, valueToBeReturned,
    const effect = 'effect_1';
    return (

        <div className={styles.checkbox_wrapper}>
            <div className={styles[effect]}>
                <label className={styles.pure_material_checkbox} >
                    <input
                        disabled={disabled}
                        checked={checked}
                        onChange={(e) => props.handleOnChange(e.target.value)}
                        className={`${styles.checkbox_input} ${value ? styles.cbChecked : null}`}
                        type="checkbox" />
                    <span className={styles.checkbox_span}>{label}</span>
                </label>
            </div>
            {/* {effect === 'effect_1' ?
                <div className={styles[effect]}>
                    <label className={styles.pure_material_checkbox} >
                        <input
                            disabled={disabled}
                            checked={value}
                            onChange={(e) => handleOnChange(valueToBeReturned)}
                            className={`${styles.checkbox_input} ${value ? styles.cbChecked : null}`}
                            type="checkbox" />
                        <span className={styles.checkbox_span}>{label}</span>
                    </label>
                </div>
                : effect === 'effect_2' ?
                    <div className={styles[effect]}>
                        <label className={styles.pure_material_checkbox}>
                            <input
                                type="checkbox"
                                disabled={disabled}
                                checked={value}
                                onChange={(e) => handleOnChange(valueToBeReturned)}
                                id={keys}
                                className={`${styles.checkbox_input} ${value ? styles.cbChecked : null}`}
                            />
                            <span class={styles.checkbox_material}>
                                <span class={styles.check}></span>
                            </span>
                            <span className={styles.label_text}>{label}</span>
                        </label>
                    </div> : <p>You have passed invalid effect value</p>} */}
        </div>

    )
}