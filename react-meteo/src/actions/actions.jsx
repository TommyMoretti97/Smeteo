export const SET_RATING = 'SET_RATING';

export const setRating = (newRating) => ({
    type: SET_RATING,
    payload: newRating,
  });
  // questa è l'azione che tramite il dispatch può aggiornare lo stato e mandarlo direttamente nello store