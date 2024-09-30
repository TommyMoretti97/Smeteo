import { SET_RATING } from '../actions/actions'

const initialState = {
    rating: 0, // inizializzo lo stato su 0 ma potrei anche metterlo a null
  };
  
  const ratingReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_RATING:
        return {
          ...state,
          rating: action.payload,
        };
      default:
        return state;
    }
  };
  //  funzione pura che specifica come lo stato dell'applicazione deve cambiare in risposta a un'azione inviata allo store
  // il default Se l'azione non corrisponde a nessun caso nel tuo switch, la funzione reducer restituirà semplicemente lo stato corrente senza alcuna modifica.
  // Quando arriva un'azione di tipo SET_RATING, il reducer restituisce un nuovo stato in cui il valore di rating è aggiornato con il valore presente nell'azione
  export default ratingReducer;