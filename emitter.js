// module: emitter.js
// author: Ben Riegel
// overview: declares and exports the Emitter class. The class has methods
// for adding and removing event listeners. It also has a method for
// broadcasting an event (i.e. notifying the listeners for a particular
// event that that event has occurred).


//----- export code block ------------------------------------------------------

export default class Emitter{

  //----- private code block -----

  #listeners;

  //----- public api -----

  constructor(){
    this.#listeners = {};
  }

  //method for registered an event listener.
  addEventListener(eventName, callback){
    if (this.#listeners[eventName]){
      this.#listeners[eventName].push(callback);
    } else {
      this.#listeners[eventName] = [callback];
    }
  }

  //method for removing an event listener
  removeEventListener(eventName, callback){
    if (this.#listeners[eventName]){
      const listenersList = this.#listeners[eventName];
      const filteredList = listenersList.filter( listener => {
        return (listener !== callback);
      });
      if (filteredList.length > 0){
        this.#listeners[eventName] = filteredList;
      } else {
        delete this.#listeners[eventName]
      }
    }
  }

  //notifies the listeners for a specified event that the event has occurred
  broadcast(eventName, ...args){
    const listeners = this.#listeners[eventName];
    if (listeners){
      for (let listener of listeners){
        listener(eventName, ... args);
      }
    }
  }

}
