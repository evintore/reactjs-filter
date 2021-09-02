import './App.css';
import 'antd/dist/antd.css';
import { Checkbox, Row, Col } from 'antd';
import { YemekData } from './data';
import { useState } from 'react';

function App() {
  const [filtre, setFiltre] = useState([]);

  function handleChange(value){
    setFiltre(value)
  }

  return (
    <div className="App">
      <Filter change={handleChange} />
      <YemekList filtre={filtre} />
    </div>
  );
} 

function Filter(props){
  const YemekTurFiltre = ['Vejeteryan', 'Glutensiz', 'Etli', 'Vegan', 'Laktozsuz', 'Deniz Mahsulü'];
  
  return <Checkbox.Group options={YemekTurFiltre} onChange={props.change} />
}

function YemekList(props){
  let filtreSonuc = []

  if (props.filtre && props.filtre.length === 0){
    filtreSonuc = YemekData.map(data => {
      return <Col span={8}> {data.TITLE} </Col> 
    })
  }
  else{
    filtreSonuc = YemekData.filter( 
      yemek => {
        let Uygun = false
        if((props.filtre.includes('Vejeteryan') && yemek.IS_VEGETARIAN) ||
          (props.filtre.includes('Glutensiz') && yemek.IS_GLUTEN_FREE) ||
          (props.filtre.includes('Etli') && yemek.IS_CARNIVORE) ||
          (props.filtre.includes('Vegan') && yemek.IS_VEGAN) ||
          (props.filtre.includes('Laktozsuz') && yemek.IS_LACTOSE_FREE) ||
          (props.filtre.includes('Deniz Mahsulü') && yemek.IS_SEA_FOOD)
        ){ // Filtre dizisindeki değerlerden en az biri seçilen yemek için eşleşiyorsa 
          Uygun = true
        }

        return Uygun 
      }
    ).map(item => {
      return <Col span={8}> {item.TITLE} </Col>
    })
  }

  return <div>
      <br />
      <Row> {filtreSonuc} </Row>
    </div>
}

export default App;