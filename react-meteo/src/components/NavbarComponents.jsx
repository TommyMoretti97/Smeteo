import { Container, Navbar } from "react-bootstrap";


const NavbarComponents = () => {
   
  

      return(
        <>
        <Navbar className="my-navbar py-1">
        <Container fluid>
          <Navbar className="p-0">
            <img
              alt="Smeteo"
              src="../src/img/Smeteo.png"
              width="40"
              height="40"
              className="d-inline-block align-top"
            />
            <h1 className="my-font pt-2 px-4">Smeteo</h1>
          </Navbar>
        </Container>
      </Navbar>
        <h1 className='text-center title'>Benvenuto nello Smeteo </h1>
        <h3 className='text-center subtitle'>Inserisci la città o nazione per ricevere tutti i dati meteo</h3>
        <img src="" alt="" />
       </>
      )
}

export default NavbarComponents;
