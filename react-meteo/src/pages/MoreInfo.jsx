import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import SpinnerWait from "../components/SpinnerWait";

function MoreInfo (){
    //inizializzazione stati
    const [city1,setCity1] = useState([]) ;
    const [wind1, setWind1] = useState([]) ;
    const [cloud, setCloud] = useState([]) ;
    const [temp, setTemp] = useState([]) ;
    const [loading, setLoading] = useState(true);


    const {cityname } = useParams(); // parametro passato con router dom
    const url3 = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&APPID={API_KEY}&lang=it`; //nuovo url con il dato passato

    useEffect(() => {
        setTimeout(() => {
            setLoading(false); 

            fetch(url3)
            .then((resp) => resp.json())
            .then((data3) =>{
                setCity1(data3);  
                setWind1(data3.wind);
                setCloud(data3.clouds);
                setTemp(data3.main);
            })
            .catch((err) => console.error(err)); 
         }, 2000); // setto un ritardo di 2 secondi per la fetch per visualizzare lo spinner
   
    },[]) //fetch nuovi dati con useEffect [] per farlo triggerare 1 sola volta

    

    return (
        <>
        <Link to={'/'}> <h3>Ritorna alla pagina Principale</h3> </Link>
        {loading ?(
            <div className="text-center">
            <SpinnerWait />
            </div>
        ):(
            <>
        <div>
            <h1 className="text-center">{city1.name}</h1>
        </div>
        <Row className=" justify-content-around mx-0" id="row-responsive" >
            <Col xs={11} md={5} lg={3} className="card-meteo d-flex mx-2 mb-5">
                <Col xs={4} className="m-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-compass-fill" viewBox="0 0 16 16">
                <path d="M15.5 8.516a7.5 7.5 0 1 1-9.462-7.24A1 1 0 0 1 7 0h2a1 1 0 0 1 .962 1.276 7.5 7.5 0 0 1 5.538 7.24m-3.61-3.905L6.94 7.439 4.11 12.39l4.95-2.828 2.828-4.95z"/>
                </svg>
                </Col>
                <Col xs={8} className="flex-column m-auto">
                    <h1>Direzione Vento:</h1>
                    <br />
                    <h3>{ wind1.deg} °</h3>
                </Col>
                
            </Col>
            <Col xs={11} md={5} lg={3} className="card-meteo d-flex mx-2 mb-5">
                <Col xs={4} className="m-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-cloud-fill" viewBox="0 0 16 16">
                <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383"/>
                </svg>
                </Col>
                <Col xs={8} className="flex-column m-auto">
                    <h1>Nuvolosità:</h1>
                    <br />
                    <h3>{ cloud.all} %</h3>
                </Col>
                
            </Col>
            <Col xs={11} md={5} lg={3} className="card-meteo d-flex mx-2 mb-5">
                <Col xs={4} className="m-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-cloud-fog2-fill" viewBox="0 0 16 16">
                <path d="M8.5 3a5 5 0 0 1 4.905 4.027A3 3 0 0 1 13 13h-1.5a.5.5 0 0 0 0-1H1.05a3.5 3.5 0 0 1-.713-1H9.5a.5.5 0 0 0 0-1H.035a3.5 3.5 0 0 1 0-1H7.5a.5.5 0 0 0 0-1H.337a3.5 3.5 0 0 1 3.57-1.977A5 5 0 0 1 8.5 3"/>
                </svg>
                </Col>
                <Col xs={8} className="flex-column m-auto">
                    <h1>Visibilità</h1>
                    <br />
                    <h3>{ city1.visibility} m</h3>
                </Col>
                
            </Col>
            <Col xs={11} md={5} lg={3} className="card-meteo d-flex mx-2 mb-5">
                <Col xs={4} className="m-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-thermometer-high" viewBox="0 0 16 16">
                    <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V2.5a.5.5 0 0 1 1 0v8.585a1.5 1.5 0 0 1 1 1.415"/>
                    <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1"/>
                    </svg>
                </Col>
                <Col xs={8} className="flex-column m-auto">
                    <h1>Temperatura Massima:</h1>
                    <br />
                    <h3>{(temp.temp_max -273.15).toFixed(0) } °C</h3> 
                </Col>
                
            </Col>
            <Col xs={11} md={5} lg={3} className="card-meteo d-flex mx-2 mb-5">
                <Col xs={4} className="m-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-thermometer-low" viewBox="0 0 16 16">
                <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V9.5a.5.5 0 0 1 1 0v1.585a1.5 1.5 0 0 1 1 1.415"/>
                <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1"/>
                </svg>
                </Col>
                <Col xs={8} className="flex-column m-auto">
                    <h1>Temperatura Minima:</h1>
                    <br />
                    <h3>{(temp.temp_min -273.15).toFixed(0) }  °C</h3>
                </Col>
                
            </Col>
            <Col xs={11} md={5} lg={3} className="card-meteo d-flex mx-2 mb-5">
                <Col xs={4} className="m-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-water" viewBox="0 0 16 16">
                <path d="M.036 3.314a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0L.314 3.964a.5.5 0 0 1-.278-.65m0 3a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0L.314 6.964a.5.5 0 0 1-.278-.65m0 3a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0L.314 9.964a.5.5 0 0 1-.278-.65m0 3a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.757-.703a.5.5 0 0 1-.278-.65"/>
                </svg>
                </Col>
                <Col xs={8} className="flex-column m-auto">
                    <h1>Pressione atmosferica livello mare:</h1>
                    <br />
                    <h3>{ temp.sea_level} hPa</h3>
                </Col>
                
            </Col>
        </Row>
        </>
        )};
        </>
    )
}

export default MoreInfo;