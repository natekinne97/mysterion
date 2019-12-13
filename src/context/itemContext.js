import React, { Component } from 'react';

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
        items: [],
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
       
        this.setItems([
            items,
            ...this.state.items,
        ])
    }

    removeItem = id =>{
        let newItemsArray = this.state.items.filter(items => Number(items.id) !== Number(id) );
      
        this.setItems(newItemsArray);
        this.getNumberOfItems();
    }

    getNumberOfItems = ()=>{
        this.setState({
            numberOfItems: this.state.items.length
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