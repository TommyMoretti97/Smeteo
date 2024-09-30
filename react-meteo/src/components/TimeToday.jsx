const TimeToday = () => {
    const dataCorrente = new Date();
  
    // Estrai le informazioni sull'orario
    const ore = dataCorrente.getHours();
    const minuti = dataCorrente.getMinutes();
    const secondi = dataCorrente.getSeconds();
  
    // Formatta l'orario in un formato ore:minuti:secondi
    const orarioFormattato = `${aggiungiZero(ore)}:${aggiungiZero(minuti)}:${aggiungiZero(secondi)}`;
  
    // Funzione per aggiungere uno zero davanti a numeri inferiori a 10
    function aggiungiZero(numero) {
      return numero < 10 ? "0" + numero : numero.toString();  
    }
  
    
  
    return (
      <>
        {orarioFormattato}
      </>
    );
  };
  
  export default TimeToday;