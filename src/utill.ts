const deepSetObject = (stateObject: any, path: any, val: any) => {
    const obj = {...stateObject}
    const keys = path.split(".");
    const lastKey = keys.pop();
    const lastObj = keys.reduce((obj: any, key: any) => obj[key] = obj[key] || {}, obj);
    lastObj[lastKey] = val;
    return lastObj;
};

const getStateValueDeep = (stateObject:any,path:any) => {
    const obj = {...stateObject}
    const keys = path.split(".");
    let lastKey = keys.pop();
    const lastObj = keys.reduce((accObj:any,key:any) => accObj = accObj[key] || {},obj) 
    return lastObj[lastKey];
}

export {
    deepSetObject,
    getStateValueDeep
}