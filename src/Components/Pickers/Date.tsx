import React, { useEffect } from "react";
import { DatePickerInterface } from "../../Container/FieldInterface";
import { getAllDaysInMonth } from './../../utill';
import styles from './../../styles.module.css';


const initalState = {
    dateToProcessed: new Date(),
    selectedMonthList: [{}]
}



export const DatePicker = (props: DatePickerInterface) => {
    let { label, value } = props;
    const [state, setState] = React.useState(initalState);
    console.log(label, value);

    useEffect(() => {
        const localState = { ...state }
        //GET CURRENT MONTH LIST
        let list = getAllDaysInMonth(state.dateToProcessed.getFullYear(), state.dateToProcessed.getMonth(), false);
        //GET PREV AND CURRENT AND FILL THE DISABLED DATES
        if (list.length >= 2) {
            let filterPrevList: any = [];
            const firstdateObj = new Date(list[0].value);
            const lasdateObj = new Date(list[list.length - 1].value);
            if (firstdateObj.getDay() !== 0) {
                const prvIndCount = firstdateObj.getDay();
                const prevmonth = firstdateObj.getMonth() === 0 ? 11 : firstdateObj.getMonth() - 1;
                const prevYear = firstdateObj.getMonth() === 0 ? firstdateObj.getFullYear() - 1 : firstdateObj.getFullYear();
                const prevMonthList = getAllDaysInMonth(prevYear, prevmonth, true).reverse();
                filterPrevList = prevMonthList.slice(0, prvIndCount).reverse();
                //console.log(filterPrevList)
            }
            if (lasdateObj.getDay() !== 6) {
                console.log(firstdateObj.getDay(), lasdateObj.getDay() - 1);
            }

            list = filterPrevList.concat(list);
            localState.selectedMonthList = list;
            setState(localState)
        }
    }, [])



    const renderDays = () => {
        const listofDates = [...state.selectedMonthList];
        return listofDates.map((day: any, index: number) => {
            const dayStatus = day.isDisabled ? 'disabled_days' : 'enabled_days'
            const selectedFlag = day.isSelected ? 'selected_day' : 'not_selected_day'
            return (
                <li key={`day=${index}`} className={`week_days ${styles.week_days} ${styles[dayStatus]} ${styles[selectedFlag]}`}>{new Date(day.value).getDate()}</li>
            )
        })
    }



    //console.log(state)
    return (
        <div className={`mkbys_data_picker ${styles.mkbys_data_picker}`}>
            <div className={`calendar_month ${styles.calendar_month}`}>
                <div className={`arrow_btn_container ${styles.arrow_btn_container}`}>
                    <a className={`arrow_btn left ${styles.arrow_btn} ${styles.left}`} href="#202">

                        <span className="material_icons icon fontawesome_angle_right">
                            {/* <img src={ChevronLeft} alt="chevron_right" /> */}
                        </span>
                    </a>
                    <h2 className={`titular ${styles.titular}`}>APRIL 2013</h2>
                    <a className={`arrow_btn right ${styles.arrow_btn} ${styles.right}`} href="#202">

                        {/* <span className="material_icons icon fontawesome_angle_right"><img src={ChevronLeft} alt="chevron_right" /></span> */}
                    </a>
                </div>
                <div className={`calendar_wrp ${styles.calendar_wrp}`}>
                    <ul className={`days_week ${styles.days_week}`}>
                        <li className={`week_days ${styles.week_days}`}>sun</li>
                        <li className={`week_days ${styles.week_days}`}>Mon</li>
                        <li className={`week_days ${styles.week_days}`}>Tue</li>
                        <li className={`week_days ${styles.week_days}`}>Wed</li>
                        <li className={`week_days ${styles.week_days}`}>Thu</li>
                        <li className={`week_days ${styles.week_days}`}>Fri</li>
                        <li className={`week_days ${styles.week_days}`}>Sat</li>
                    </ul>
                    {state.selectedMonthList.length >= 2 &&
                        <ul className={`days_week ${styles.days_action_wrp} ${styles.days_week}`}>
                            {renderDays()}

                        </ul>}
                </div>
            </div>
        </div>
    )
}

