import React, { Component } from 'react';
import {addItemToStorage, getLocalStorageItems, setItems} from '../services/addItemToLocalStorage'

const itemContext = new React.createContext({
    // data
    items: [],
    numberOfItems: 0,

    // change items
    setItems: ()=>{},
    addItems: ()=>{},
    removeItem: ()=>{},

    // number of items
    getNumberOfItems: ()=>{},

});


export default itemContext;

export class ItemProvider extends Component{

    state = {
        items: getLocalStorageItems(),
        numberOfItems: 0
    }

    setItems = item=>{
        
      this.setState({
          items: item
      }, ()=>{
        this.getNumberOfItems();
      })
     
    }

    addItems = items =>{
       addItemToStorage(items)
        this.setItems([
            items,
            ...this.state.items,
        ])
    }

    removeItem = item =>{
        let newItemsArray = this.state.items.filter(items => items.font !== item.font);
        localStorage.removeItem('items')
        this.setItems(newItemsArray);
        setItems(newItemsArray)
        this.getNumberOfItems();
    }

    getNumberOfItems = ()=>{
        const numberOfItems = this.state.items.length || getLocalStorageItems()?.length
        this.setState({
            numberOfItems: numberOfItems
        });
    }

    render(){
        const value = {
            // data
            items: this.state.items,
            numberOfItems: this.state.numberOfItems,

            // items services
            setItems: this.setItems,
            addItems: this.addItems,
            removeItem: this.removeItem,

            // number of items
            getNumberOfItems: this.getNumberOfItems

        }
        return(
            <itemContext.Provider value={value}>
                {this.props.children}
            </itemContext.Provider>
        )
    }
}