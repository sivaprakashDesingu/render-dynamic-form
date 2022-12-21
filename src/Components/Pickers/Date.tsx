import React, { useEffect } from "react";
import { DatePickerInterface } from "../../Container/FieldInterface";
import { getAllDaysInMonth, getMonths } from './../../utill';
import { Input } from "../Input";
import styles from './../../styles.module.css';


const initalState = {
    dateToProcessed: new Date(),
    isYearPanelOpened: false,
    selectedMonthList: [{}]
}



export const DatePicker = (props: DatePickerInterface) => {
    let { label, value } = props;
    const [state, setState] = React.useState(initalState);
    console.log(label, value);

    useEffect(() => {
        const localState = { ...state }
        //GET CURRENT MONTH LIST
        let list = getAllDaysInMonth(state.dateToProcessed.getFullYear(), state.dateToProcessed.getMonth(), false, state.dateToProcessed);
        //GET PREV AND CURRENT AND FILL THE DISABLED DATES
        if (list.length >= 2) {
            let filterPrevList: any = [];
            let filternextList: any = [];
            const firstdateObj = new Date(list[0].value);
            const lasdateObj = new Date(list[list.length - 1].value);
            if (firstdateObj.getDay() !== 0) {
                const prvIndCount = firstdateObj.getDay();
                const prevmonth = firstdateObj.getMonth() === 0 ? 11 : firstdateObj.getMonth() - 1;
                const prevYear = firstdateObj.getMonth() === 0 ? firstdateObj.getFullYear() - 1 : firstdateObj.getFullYear();
                const prevMonthList = getAllDaysInMonth(prevYear, prevmonth, true).reverse();
                filterPrevList = prevMonthList.slice(0, prvIndCount).reverse();
            }
            if (lasdateObj.getDay() !== 6) {
                const nxtIndCount = 6 - lasdateObj.getDay();
                const nextMonth = lasdateObj.getMonth() === 11 ? 0 : lasdateObj.getMonth() + 1;
                const nextYear = lasdateObj.getMonth() === 11 ? lasdateObj.getFullYear() + 1 : lasdateObj.getFullYear();
                const nextMonthList = getAllDaysInMonth(nextYear, nextMonth, true);
                filternextList = nextMonthList.slice(0, nxtIndCount);
            }

            list = filterPrevList.concat(list);
            list = list.concat(filternextList);
            localState.selectedMonthList = list;
            setState(localState)
        }
    }, [state.dateToProcessed])


    function hanldeOnChange(dateObj: any) {
        if (!dateObj.isDisabled && !dateObj.isSelected) {
            const localState = { ...state }
            localState.dateToProcessed = new Date(dateObj.value);
            setState(localState)
        }

    }


    const renderDays = () => {
        const listofDates = [...state.selectedMonthList];
        return listofDates.map((day: any, index: number) => {
            const dayStatus = day.isDisabled ? 'disabled_days' : 'enabled_days'
            const selectedFlag = day.isSelected ? 'selected_day' : 'not_selected_day'
            return (
                <li onClick={() => hanldeOnChange(day)} key={`day=${index}`} className={`week_days ${styles.week_days} ${styles[dayStatus]} ${styles[selectedFlag]}`}>{new Date(day.value).getDate()}</li>
            )
        })
    }

    const hanndleYeanPanel = (evt: any) => {
        evt.stopPropagation();
        const localState = { ...state }
        localState.isYearPanelOpened = !localState.isYearPanelOpened;
        setState(localState)
    }

    const handleYearClick = (evt: any, curYear: any) => {
        evt.stopPropagation();
        curYear = evt.target.getAttribute("data-year");
        const date = new Date(curYear, state.dateToProcessed.getMonth(), state.dateToProcessed.getDate());
        const localState = { ...state }
        localState.isYearPanelOpened = false;
        localState.dateToProcessed = date;
        setState(localState);
    }

    const renderYears = (N: number, oprator: string, isCurrentYear: boolean) => {
        let curYear = JSON.parse(JSON.stringify(new Date().getFullYear()));
        let arr = Array.apply(null, { length: N }).map(Number.call, Number);
        let selectedClass = isCurrentYear ? 'selectedYear' : 'notSelected';
        const list = arr.map((_: any, i: any) => {
            if (oprator === "-")
                curYear--;
            else if (oprator === "+")
                curYear++
            return (
                <li data-year={curYear} onClick={(e) => handleYearClick(e, curYear)} key={"prev" + i + curYear} className={`week_days ${styles.year_chip} ${styles[selectedClass]}`}>{curYear}</li>
            )
        });
        if (oprator === "-")
            return list.reverse();
        else
            return list;

    }

    const handleChangeMonth = (evt: any, action: string) => {
        evt.preventDefault();
        const localState = { ...state };
        const dateObj = state.dateToProcessed;
        if (action === "PREV") {
            const prevmonth = dateObj.getMonth() === 0 ? 11 : dateObj.getMonth() - 1;
            const prevYear = dateObj.getMonth() === 0 ? dateObj.getFullYear() - 1 : dateObj.getFullYear();
            const date = new Date(prevYear, prevmonth, dateObj.getDate());
            localState.dateToProcessed = date
        } else {
            const nextMonth = dateObj.getMonth() === 11 ? 0 : dateObj.getMonth() + 1;
            const nextYear = dateObj.getMonth() === 11 ? dateObj.getFullYear() + 1 : dateObj.getFullYear();
            const date = new Date(nextYear, nextMonth, dateObj.getDate());
            localState.dateToProcessed = date;
        }
        setState(localState);
    }



    //console.log(state)
    return (
        <div className={`mkbys_data_picker-cmpt ${styles.mkbys_data_picker_cmpt}`}>
            <Input Placeholder="MM:DD:YYY" label="Select Date(MM:DD:YYY)" value={"text"} readOnly={false} handleOnChange={() => console.log()} />
            <div className={`mkbys_data_picker ${styles.mkbys_data_picker}`}>
                <div className={`calendar_month ${styles.calendar_month}`}>
                    <div className={`arrow_btn_container ${styles.arrow_btn_container}`}>
                        <a onClick={(e) => handleChangeMonth(e, "PREV")} className={`arrow_btn left ${styles.arrow_btn} ${styles.left}`} href="#202">

                            <span className="material_icons icon fontawesome_angle_right">
                                {/* <img src={ChevronLeft} alt="chevron_right" /> */}
                            </span>
                        </a>
                        <h2 onClick={hanndleYeanPanel} className={`titular ${styles.titular}`}>{getMonths[state.dateToProcessed.getMonth()].toUpperCase()} {state.dateToProcessed.getFullYear()}</h2>
                        <a onClick={(e) => handleChangeMonth(e, "NEXT")} className={`arrow_btn right ${styles.arrow_btn} ${styles.right}`} href="#202">

                            {/* <span className="material_icons icon fontawesome_angle_right"><img src={ChevronLeft} alt="chevron_right" /></span> */}
                        </a>
                    </div>
                    {!state.isYearPanelOpened ?
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
                        </div> : <div className={`year_panele ${styles.yearPanelWrp}`}>
                            <ul className={`days_week ${styles.yearSec}`}>
                                {renderYears(122, "-", false)}
                                {renderYears(1, "=", true)}
                                {renderYears(77, "+", false)}
                            </ul>
                        </div>}
                </div>

            </div>
        </div>

    )
}

