import MainComponents from "../components/MainComponents";
import NavbarComponents from "../components/NavbarComponents";
import { useState, useEffect } from "react";


function HomePage (){

    const [backgroundImage, setBackgroundImage] = useState('https://img.freepik.com/free-vector/beautiful-clear-blue-sky-background_1308-10550.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1702425600&semt=ais');
    const [textColor, setTextColor] = useState('black');
    const [backgroundSize, setBackgroundSize] = useState('contain');

    const handleBackgroundChange = (weather) => {
        switch (weather) {
            case 'Rain':
                setBackgroundImage('../src/img/raindrop-trails.webp');
                setTextColor('white');
                break;
            case 'Drizzle':
                setBackgroundImage('../src/img/raindrop-trails.webp');
                setTextColor('white');
                break;
            case 'Sun':
                setBackgroundImage('https://www.bergamonews.it/photogallery_new/images/2023/04/cielo-sereno-sole-741535.large.jpg');
                setBackgroundSize('cover');
                break;
            case 'Clear':
                setBackgroundImage('../src/img/pexels-francesco-ungaro-281260.jpg');
                setBackgroundSize('cover');
                break;
            case 'Clouds':
                setBackgroundImage('https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmFibWRsY3J3NzM4d3JlNHQwM3o1dDJpMWZjdDczcGhiOGpseWkxayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qq5gwamAHVofm/giphy.webp');
                setBackgroundSize('140%');
                setTextColor('black');
                break;
            case 'Mist':
                setBackgroundImage('https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3VldnI4dDA5bG1mejgxd3AyOXpzbjV1c2I1OHp6ZmhnbWtmbmhmZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yhZr5Wx7CBFbq/giphy.webp');
                setTextColor('black');
                break;
            case 'Haze':
                setBackgroundImage('https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3VldnI4dDA5bG1mejgxd3AyOXpzbjV1c2I1OHp6ZmhnbWtmbmhmZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yhZr5Wx7CBFbq/giphy.webp');
                setTextColor('black');
                break;
            case 'Fog':
                setBackgroundImage('https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3VldnI4dDA5bG1mejgxd3AyOXpzbjV1c2I1OHp6ZmhnbWtmbmhmZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yhZr5Wx7CBFbq/giphy.webp');
                setTextColor('black');
                break;
            case 'Smoke':
                setBackgroundImage('https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3VldnI4dDA5bG1mejgxd3AyOXpzbjV1c2I1OHp6ZmhnbWtmbmhmZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yhZr5Wx7CBFbq/giphy.webp');
                setTextColor('black');
                break;
            case 'Dust':
                setBackgroundImage('https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWM5cWxuajE1NGR6NGtzM3l0c3drMnpodmY2M3VjazRxOXVsY3BqOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/y2o7O2HsUmozm/giphy.webp');
                setTextColor('black');
                break;
            case 'Sand':
                setBackgroundImage('https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWM5cWxuajE1NGR6NGtzM3l0c3drMnpodmY2M3VjazRxOXVsY3BqOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/y2o7O2HsUmozm/giphy.webp');
                setTextColor('black');
                break;
            case 'Thunderstorm':
                setBackgroundImage('https://i0.wp.com/www.salussolanews.it/wp-content/uploads/2022/07/PhotoFunia-1657745458.gif?resize=640%2C452&ssl=1');
                setTextColor('white');
                break;
            case 'Snow':
                setBackgroundImage('https://i.pinimg.com/originals/41/9e/97/419e974e5b946cc9854be1d8d3ec8513.gif');
                setTextColor('black');
                break;
            default:
                setBackgroundImage('https://img.freepik.com/free-vector/beautiful-clear-blue-sky-background_1308-10550.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1702425600&semt=ais'); // Imposta un'immagine di default se nessuna condizione è soddisfatta
                setBackgroundSize('cover');
                setTextColor('black');
                break;
        }
    };
       
    useEffect(() => { 
        localStorage.setItem('backgroundImage', backgroundImage); 
    
     },[handleBackgroundChange])
  
    
    return (
        <>
        <div id="background-container" style={{ backgroundImage: `url(${backgroundImage})`, backgroundRepeat: 'repeat', 
                    backgroundSize: `${backgroundSize}`, color: `${textColor}`}}>
        <NavbarComponents></NavbarComponents>
        <MainComponents backgroundImageHomepage={handleBackgroundChange}></MainComponents>
        </div>
        </>
    )
}

export default HomePage;