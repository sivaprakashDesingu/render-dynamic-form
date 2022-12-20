const deepSetObject = (stateObject: any, path: any, val: any) => {
    const obj = { ...stateObject }
    const keys = path.split(".");
    const lastKey = keys.pop();
    const lastObj = keys.reduce((obj: any, key: any) => obj[key] = obj[key] || {}, obj);
    lastObj[lastKey] = val;
    return lastObj;
};

const getStateValueDeep = (stateObject: any, path: any) => {

    const obj = { ...stateObject }
    const keys = path.split(".");
    let lastKey = keys.pop();
    const lastObj = keys.reduce((accObj: any, key: any) => accObj = accObj[key] || {}, obj)
    return lastObj[lastKey];
}

const getAllDaysInMonth = (year: any, month: any,isDisabled:boolean,slectedDate:Date=new Date()) => {
    const dates = [];
    const date = new Date(year, month, 1);
    while (date.getMonth() === month) {
        let isSelected = false
        if(new Date(date).getDate() === slectedDate.getDate() 
        && new Date(date).getFullYear() === slectedDate.getFullYear()
        && new Date(date).getMonth() === slectedDate.getMonth()
        ){
            isSelected = true;
        }
        const object = {
            value: new Date(date),
            isDisabled: isDisabled,
            isSelected
        }
        dates.push(object);
        date.setDate(date.getDate() + 1);
    }

    return dates;
}

function getdisabledPrevNextMonthDates(fistDate: any) {
    const { value } = fistDate;
    const dateObj = new Date(value);
    const prevmonth = dateObj.getMonth() === 0 ? 11 : dateObj.getMonth() - 1;
    const prevYear = dateObj.getMonth() === 0 ? dateObj.getFullYear() - 1 : dateObj.getFullYear();
    const nextMonth = dateObj.getMonth() === 11 ? 0 : dateObj.getMonth() + 1;
    const nextYear = dateObj.getMonth() === 11 ? dateObj.getFullYear() + 1 : dateObj.getFullYear();
    const prevMothList = getAllDaysInMonth(prevYear, prevmonth,false);
    const nextMonthList = getAllDaysInMonth(nextYear, nextMonth,false);
    return {prevMothList,nextMonthList}
}
const getMonths = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
export {
    deepSetObject,
    getStateValueDeep,
    getAllDaysInMonth,
    getdisabledPrevNextMonthDates,
    getMonths
}