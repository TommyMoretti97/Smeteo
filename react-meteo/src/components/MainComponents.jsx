import { useState } from "react";
import { Row, Col, Form, Container } from "react-bootstrap";
import DateToday from "./DateToday";
import TimeToday from "./TimeToday";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { setRating } from '../actions/actions';
import { useDispatch,useSelector } from 'react-redux';
import { Link } from "react-router-dom";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MainComponents = () => {
   
  // Inizializzazione Stati
  const [query, setQuery] = useState("");
  const [temperature, setTemperature] = useState([]);
  const [wind, setWind] = useState ([]);
  const [coord, setCoord] = useState([]);
 const [city, setCity] = useState([]);
 const [weather, setWeather] = useState([]);
 const [sunrise, setSunrise] = useState([]);
 const [sunset, setSunset] = useState([]);
 const [nextDay, setNextDay] = useState([]);
 const [tempNextHours, setTempNextHours] = useState([]);
 const [loading, setLoading] = useState(false);
 
 
 const dispatch = useDispatch();
 const rating = useSelector((state) => state.rating); //seleziona lo stato rating dallo store redux

 const handleRatingChange = (e) => {
  dispatch(setRating(e.target.value));
}; //funzione per ottenere il valore che viene cliccato dalla select

const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=50a797971b643a24558030d56349be65&lang=it`; // url per quasi tutti i dati
const url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${query}&APPID=50a797971b643a24558030d56349be65&lang=it`; // url per coordinate e temperature prossimi giorni

        const handleChange = (e) => {
          setQuery(e.target.value);
        }; // funzione che permette di aggiornare lo stato di query ogni volta che viene digitato qualcosa nel campo input
      
        const handleSubmit = async (e) => {
            e.preventDefault(); // per prevenire il comportamento predefinito associato a quell'evento
        
            try {
              const response = await fetch(url); //fetch weather data
              if (response.ok) {
                const  data  = await response.json();
                setLoading(true);  //quando carica la fetch mostra i dati
                setTemperature(data.main); //Stato per inserire temperature,umidità e pressione atmosferica
                setWind(data.wind); // Stato per inserire velocita vento
                setCity(data); //Stato per inserire il nome città
                setWeather(data.weather[0]);
                 // Stato per inserire tempo atmosferico
                setSunrise(getFormattedTime(data.sys.sunrise)); // Stato per inserire l'alba
                setSunset(getFormattedTime(data.sys.sunset)); //Stato per inserire tramonto 
                
               
              } else {
                alert("Error fetching results"); //se response non è ok
              }
            } catch (error) {
              console.log(error);// se fallisce la fetch console log l'errore
            }
            
            try {
              const response2 = await fetch(url2); //fetch forecast data
              if (response2.ok) {
                const  data2  = await response2.json();
                setLoading(true); //quando carica la fetch mostra i dati
                setCoord(data2.city.coord); // Stato per inserire le coordinate(lang e long)
                
                 // Seleziona i dati dei 5 giorni successivi (un elemento ogni 8 elementi perchè l'API restituisce dati a intervalli di 3 ore)
                const nextDaysData = data2.list.filter((item, index) => index % 8 === 0).slice(0,5);
                setNextDay(nextDaysData); 
                
                setTempNextHours(data2.list);// stato per inserire le temperature nelle prossime ore
                
              } else {
                alert("Error fetching results");
              }
            } catch (error) {
              console.log(error);
            }
          };

          const getFormattedTime = (timestamp) => {
            const date = new Date(timestamp * 1000);
            return date.toLocaleTimeString();
          }; //trasforma i dati sunset,sunrise in orario formato ore:minuti:secondi


          //Creazione Tabella per le temperature nei prossimi 5 giorni
          const options = {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Temperature dei prossimi 5 giorni',
              },
            },
            scales: {
              x: {
                type: 'category',
                labels: nextDay.map((day) => day.dt_txt),
                title: {
                  display: true,
                  text: 'Data',
                },
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Temperature (°C)',
                },
              },
            },
          };

        // Inserimento dati nella tabella
          const data = {
            labels: nextDay.map((day) => day.dt_txt),
            datasets: [
              {
                label: 'Temperature',
                data: nextDay.map((day) => (day.main.temp - 273.15).toFixed(2)),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
              },
            ],
          };

          
          
        
      return(
        <> 
        <Row className="mx-0">
          <Col xs={4} className="px-5">
          <DateToday/>
          </Col>
          <Col xs={6}>
          <Form onSubmit={handleSubmit} className="ms-5 my-form">
            <Form.Control type="search" value={query} onChange={handleChange} placeholder="Scrivi e premi Enter"  className='input-center my-input'/>
          </Form>
          </Col>
        </Row>
        {loading ? (
          <>
        <h1 className="text-center display-2">{city.name}:</h1>
        <div className="container text-end">
            <h3 className="small ">Aggiornamento delle ore = <TimeToday></TimeToday></h3>
        </div>
        
          <Row className=" justify-content-around mx-0" id="row-responsive">
            <Col xs={11} md={5} lg={3} className="card-meteo d-flex mx-2 mb-5">
                <Col xs={4} className="m-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-thermometer-half " viewBox="0 0 16 16">
                        <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415"/>
                        <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1"/>
                    </svg>
                </Col>
                <Col xs={8} className="flex-column m-auto">
                    <h1>Temperatura:</h1>
                    <br />
                    <h3>{(temperature.temp -273.15).toFixed(0) } °C</h3>
                </Col>
                
            </Col>
            <Col xs={11} md={5} lg={3} className="card-meteo d-flex mx-2  mb-5"> 
                <Col xs={4} className="m-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-droplet-half" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M7.21.8C7.69.295 8 0 8 0q.164.544.371 1.038c.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8m.413 1.021A31 31 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10c0 0 2.5 1.5 5 .5s5-.5 5-.5c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z"/>
                        <path fillRule="evenodd" d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87z"/>
                    </svg>
                </Col>
                <Col xs={8} className="flex-column m-auto">
                        <h1>Umidità:</h1>
                        <br />
                        <h3>{temperature.humidity}%</h3>
                </Col>
                
            </Col>
            <Col xs={11} md={5} lg={3} className="card-meteo d-flex mx-2  mb-5">
                <Col xs={4} className="m-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-globe-europe-africa" viewBox="0 0 16 16">
                        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M3.668 2.501l-.288.646a.847.847 0 0 0 1.479.815l.245-.368a.81.81 0 0 1 1.034-.275.81.81 0 0 0 .724 0l.261-.13a1 1 0 0 1 .775-.05l.984.34q.118.04.243.054c.784.093.855.377.694.801-.155.41-.616.617-1.035.487l-.01-.003C8.274 4.663 7.748 4.5 6 4.5 4.8 4.5 3.5 5.62 3.5 7c0 1.96.826 2.166 1.696 2.382.46.115.935.233 1.304.618.449.467.393 1.181.339 1.877C6.755 12.96 6.674 14 8.5 14c1.75 0 3-3.5 3-4.5 0-.262.208-.468.444-.7.396-.392.87-.86.556-1.8-.097-.291-.396-.568-.641-.756-.174-.133-.207-.396-.052-.551a.33.33 0 0 1 .42-.042l1.085.724c.11.072.255.058.348-.035.15-.15.415-.083.489.117.16.43.445 1.05.849 1.357L15 8A7 7 0 1 1 3.668 2.501"/>
                    </svg>
                </Col>
                <Col xs={8} className="flex-column m-auto">
                        <h1>Pressione Atmosferica:</h1>
                        <br />
                        <h3>{temperature.pressure} hPa</h3>
                </Col>
                
                
            </Col>
            <Col xs={11} md={5} lg={3} className="card-meteo d-flex mx-2 mb-5" > 
                <Col xs={4} className="m-auto">
                    <img src= {` https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="" />
                </Col>
                <Col xs={8} className="flex-column m-auto">
                        <h1>Tempo Atmosferico:</h1>
                        <br />
                        <h3 >{weather.description}</h3>
                </Col>
            
            </Col>
            <Col xs={11} md={5} lg={3} className="card-meteo d-flex mx-2 mb-5">
                <Col xs={4} className="m-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-wind" viewBox="0 0 16 16">
                        <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5"/>
                    </svg>
                </Col>
                <Col xs={8} className="flex-column m-auto">
                        <h1>Velocità Vento:</h1>
                        <br />
                        <h3>{wind.speed} km/h</h3>
                </Col>
                    
            </Col>
            <Col xs={11} md={5} lg={3} className="card-meteo d-flex mx-2 mb-5">
                <Col xs={4} className="m-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-compass-fill" viewBox="0 0 16 16">
                        <path d="M15.5 8.516a7.5 7.5 0 1 1-9.462-7.24A1 1 0 0 1 7 0h2a1 1 0 0 1 .962 1.276 7.5 7.5 0 0 1 5.538 7.24m-3.61-3.905L6.94 7.439 4.11 12.39l4.95-2.828 2.828-4.95z"/>
                    </svg>
                 </Col>
                <Col xs={8} className="flex-column m-auto ">
                        <h1>Coordinate:</h1>
                        <br />
                        <h3 >Latitudine: <span className="change-sm">{coord.lat}</span></h3>
                        <h3 >Longitudine: <span className="change-sm">{coord.lon}</span></h3>
                </Col>
            </Col>
          </Row>
        <div className="other-color py-5">
            <h2 className="text-center">{city.name}</h2>
            <h3 className="text-end px-5">Sono attualmente {(temperature.temp -273.15).toFixed(0) } °C</h3>
            <div className="d-flex justify-content-around " id="sun-resp">
                <div className="col-xs-11 col-md-5 card-meteo d-flex sunrise mb-3">
                    <div className="col-sm-3 m-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-sunset-fill" viewBox="0 0 16 16">
                            <path d="M7.646 4.854a.5.5 0 0 0 .708 0l1.5-1.5a.5.5 0 0 0-.708-.708l-.646.647V1.5a.5.5 0 0 0-1 0v1.793l-.646-.647a.5.5 0 1 0-.708.708zm-5.303-.51a.5.5 0 0 1 .707 0l1.414 1.413a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707zm11.314 0a.5.5 0 0 1 0 .706l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zM11.709 11.5a4 4 0 1 0-7.418 0H.5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10m13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
                        </svg>
                    </div>
                    <div className="col-sm-8 m-auto ">
                    <h3 className="display-4">Alba:</h3>
                    <h1>{sunrise}</h1>
                    </div>
                </div>
                <div className="col-xs-11 col-md-5 card-meteo d-flex sunset mb-3">
                    <div className="col-sm-3 m-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-sunrise-fill" viewBox="0 0 16 16">
                        <path d="M7.646 1.146a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 0 1-.708.708L8.5 2.707V4.5a.5.5 0 0 1-1 0V2.707l-.646.647a.5.5 0 1 1-.708-.708zM2.343 4.343a.5.5 0 0 1 .707 0l1.414 1.414a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707m11.314 0a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0M11.709 11.5a4 4 0 1 0-7.418 0H.5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10m13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
                    </svg>
                    </div>
                    <div className="col-sm-8 m-auto">
                    <h3 className="display-4">Tramonto:</h3>
                    <h1>{sunset}</h1>
                    </div>
                </div>
            </div>
           
            
        </div>
        <div>
          <h1 className="text-center mb-4">Temperature nelle prossime ore:</h1>
          
            <Row className=" justify-content-around mx-0" id="row-responsive"> 
              <Col xs={11} md={5} lg={3} className="card-meteo d-flex mx-2 mb-5" > 
                <Col xs={4} className="m-auto">
                    <img src= {` https://openweathermap.org/img/wn/${tempNextHours[0]?.weather[0].icon}@2x.png`} alt="" />
                </Col>
                <Col xs={8} className="flex-column m-auto">
                        <h1>{tempNextHours[0]?.dt_txt}</h1>
                        <br />
                        <h3 >{(tempNextHours[0]?.main.temp -273.15).toFixed(0)}°C</h3>
                        <br />
                        <h3>{tempNextHours[0]?.weather[0].description}</h3>
                </Col>
              </Col>
              <Col xs={11} md={5} lg={3} className="card-meteo d-flex mx-2 mb-5" > 
                <Col xs={4} className="m-auto">
                    <img src= {` https://openweathermap.org/img/wn/${tempNextHours[1]?.weather[0].icon}@2x.png`} alt="" />
                </Col>
                <Col xs={8} className="flex-column m-auto">
                        <h1>{tempNextHours[1]?.dt_txt}</h1>
                        <br />
                        <h3 >{(tempNextHours[1]?.main.temp -273.15).toFixed(0)}°C</h3>
                        <h3>{tempNextHours[1]?.weather[0].description}</h3>
                </Col>
              </Col>
              <Col xs={11} md={5} lg={3} className="card-meteo d-flex mx-2 mb-5" > 
                <Col xs={4} className="m-auto">
                    <img src= {` https://openweathermap.org/img/wn/${tempNextHours[2]?.weather[0].icon}@2x.png`} alt="" />
                </Col>
                <Col xs={8} className="flex-column m-auto">
                        <h1>{tempNextHours[2]?.dt_txt}</h1>
                        <br />
                        <h3 >{(tempNextHours[2]?.main.temp -273.15).toFixed(0)}°C</h3>
                        <h3>{tempNextHours[2]?.weather[0].description}</h3>
                </Col>
              </Col>
              <Col xs={11} md={5} lg={3} className="card-meteo d-flex mx-2 mb-5" > 
                <Col xs={4} className="m-auto">
                    <img src= {` https://openweathermap.org/img/wn/${tempNextHours[3]?.weather[0].icon}@2x.png`} alt="" />
                </Col>
                <Col xs={8} className="flex-column m-auto">
                        <h1>{tempNextHours[3]?.dt_txt}</h1>
                        <br />
                        <h3 >{(tempNextHours[3]?.main.temp -273.15).toFixed(0)}°C</h3>
                        <h3>{tempNextHours[3]?.weather[0].description}</h3>
                </Col>
              </Col>
              <Col xs={11} md={5} lg={3} className="card-meteo d-flex mx-2 mb-5" > 
                <Col xs={4} className="m-auto">
                    <img src= {` https://openweathermap.org/img/wn/${tempNextHours[4]?.weather[0].icon}@2x.png`} alt="" />
                </Col>
                <Col xs={8} className="flex-column m-auto">
                        <h1>{tempNextHours[4]?.dt_txt}</h1>
                        <br />
                        <h3 >{(tempNextHours[4]?.main.temp -273.15).toFixed(0)}°C</h3>
                        <h3>{tempNextHours[4]?.weather[0].description}</h3>
                </Col>
              </Col>
              <Col xs={11} md={5} lg={3} className="card-meteo d-flex mx-2 mb-5" > 
                <Col xs={4} className="m-auto">
                    <img src= {` https://openweathermap.org/img/wn/${tempNextHours[5]?.weather[0].icon}@2x.png`} alt="" />
                </Col>
                <Col xs={8} className="flex-column m-auto">
                        <h1>{tempNextHours[5]?.dt_txt}</h1>
                        <br />
                        <h3 >{(tempNextHours[5]?.main.temp -273.15).toFixed(0)}°C</h3>
                        <h3>{tempNextHours[5]?.weather[0].description}</h3>
                </Col>
              </Col>
              <Col xs={11} md={5} lg={3} className="card-meteo d-flex mx-2 mb-5" > 
                <Col xs={4} className="m-auto">
                    <img src= {` https://openweathermap.org/img/wn/${tempNextHours[6]?.weather[0].icon}@2x.png`} alt="" />
                </Col>
                <Col xs={8} className="flex-column m-auto">
                        <h1>{tempNextHours[6]?.dt_txt}</h1>
                        <br />
                        <h3 >{(tempNextHours[6]?.main.temp -273.15).toFixed(0)}°C</h3>
                        <h3>{tempNextHours[6]?.weather[0].description}</h3>
                </Col>
              </Col>
              <Col xs={11} md={5} lg={3} className="card-meteo d-flex mx-2 mb-5" > 
                <Col xs={4} className="m-auto">
                    <img src= {` https://openweathermap.org/img/wn/${tempNextHours[7]?.weather[0].icon}@2x.png`} alt="" />
                </Col>
                <Col xs={8} className="flex-column m-auto">
                        <h1>{tempNextHours[7]?.dt_txt}</h1>
                        <br />
                        <h3 >{(tempNextHours[7]?.main.temp -273.15).toFixed(0)}°C</h3>
                        <h3>{tempNextHours[7]?.weather[0].description}</h3>
                </Col>
              </Col>
              <Col xs={11} md={5} lg={3} className="card-meteo d-flex mx-2 mb-5" > 
                <Col xs={4} className="m-auto">
                    <img src= {` https://openweathermap.org/img/wn/${tempNextHours[8]?.weather[0].icon}@2x.png`} alt="" />
                </Col>
                <Col xs={8} className="flex-column m-auto">
                        <h1>{tempNextHours[8]?.dt_txt}</h1>
                        <br />
                        <h3 >{(tempNextHours[8]?.main.temp -273.15).toFixed(0)}°C</h3>
                        <h3>{tempNextHours[8]?.weather[0].description}</h3>
                </Col>
              </Col>
            </Row>
            
          
        </div>
        
        <Line options={options} data={data} className="bg-white mx-5 grapich"/>
        
        <div className="text-center  pb-5">
              <Link to={`/more-info/${city.name}`}><button className="btn btn-outline-primary mt-4"><b>Per Ulteriori Dati Clicca Qui</b></button></Link>
            </div>

        
        <div className="d-flex justify-content-center">
          <h2>Dai un voto alla pagina da 1 a 5: </h2>
        <select value={rating} onChange={handleRatingChange} >
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>
               {value}
            </option>
          ))}
        </select>
        
      </div>
      <h2 className="text-center mb-0">Il tuo voto alla pagina è: {rating}</h2>
      </>
      ):(
        <></>
      )}
        </>
      )
}


export default MainComponents;
