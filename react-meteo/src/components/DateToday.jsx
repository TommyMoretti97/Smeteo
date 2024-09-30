


const DateToday =() =>{
    var giorniSettimana = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
    var oggi = new Date();// data di oggi

    // assegno nome del giorno, numero giorno, numero mese e numero anno
    var giorno = oggi.getDate();
    var nomeGiorno = giorniSettimana[oggi.getDay()];
    var mese = oggi.getMonth() + 1;
    var anno = oggi.getFullYear();

   //assegno tutti i dati a una variabile
    var dataFormattata = nomeGiorno + ', ' + giorno + '/' + mese + '/' + anno;

    return (
        <>
        <p>{dataFormattata}</p> 
        </>
    )
}
export default DateToday;