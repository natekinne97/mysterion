import { isEmpty } from "lodash"

const getItems = ()=> localStorage.getItem('items')
export const setItems = (items)=> localStorage.setItem('items', JSON.stringify(items))

export const addItemToStorage = (item)=>{
    const currentCartItems = getItems()
    if(!currentCartItems){
        setItems([item])
        return [item]
    }
    const items = JSON.parse(currentCartItems)
    items.push(item)
    setItems(items)
    return items
}

export const getLocalStorageItems = ()=>{
    const currentItems = getItems()
    return isEmpty(currentItems) ? [] : JSON.parse(currentItems)
}

export const removeItemFromLocal = (item)=>{
    const currentItems = getLocalStorageItems()
    const newArr = currentItems?.filter(it=> it?.font !== item?.font)
    setItems(newArr)
}