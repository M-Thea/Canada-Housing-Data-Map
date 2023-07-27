import { useState, useEffect } from 'react';
import StatsCanMapChart from './components/StatsCanMapChart'
import SelectData from './components/SelectData';
import sortBy from "lodash/sortBy";
import Grid from '@mui/material/Grid';
import DisplayCard from './components/CityDataCard';
import MlsMapChart from './components/MlsMapChart';
/*
**idk why calgary isnt showing up
**tooltip for mlsMapChart kinda messed up 
** add ability to change to empty map when none is selected from data type
1. better data display
2. title and better layout
3. Two separate baseMaps, one for city, one for region. 
4. data from MLS HPI (https://stats.crea.ca/en-CA/)
  - need to get new map to display region: 
    - regions are not consistent. need to manually find geojson for each region and combine them? 
    - https://findthatpostcode.uk/tools/merge-geojson can maybe combine them with this
    - initial display of this map will be current HPI (select one index from MLS file), 
        and onclick load rest of MLS data for that region. 
  - info about HPI: https://www.rebgv.org/content/rebgv-org/news-archive/mls-home-price-index-explained.html
  - geographic boundaries of region, colour coded by affordability
  - onClick display same as cities
  - When this data is displayed, show option to show historic data (percent increase, graph)
*/
function App() {
  const [statsCanRentData, setStatsCanRentData] = useState([]);
  const [statsCanMortgageData, setStatsCanMortgageData] = useState([]);
  const [mlsData, setMlsData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [cardData, setCardData] = useState ([])  
  const [tooltipContent, setTooltipContent] = useState("");

  useEffect(() => {
    fetch('https://housing-data-app.s3.us-west-2.amazonaws.com/rentData.json')
    .then(response => response.json())
    .then((city) => {
      const sortedRentCities = sortBy(city, (o) => -o.price)
      setStatsCanRentData(sortedRentCities)
    })
  },[]);

  useEffect(() => {
    fetch('https://housing-data-app.s3.us-west-2.amazonaws.com/mortgageData.json')
    .then(response => response.json())
    .then((city) => {
      const sortedMortgageCities = sortBy(city, (o) => -o.price)
      setStatsCanMortgageData(sortedMortgageCities)
    })
  },[]);

  useEffect(() => {
    fetch('https://housing-data-app.s3.us-west-2.amazonaws.com/mlsHpiRegionsNameComposite+copy.json')
    .then(response => response.json())
    .then((mls) => {setMlsData(mls)})
  },[]);

  return (
    <div className="App">
      <SelectData 
        statsCanRentData={statsCanRentData} statsCanMortgageData={statsCanMortgageData}
        mlsData={mlsData} setCurrentData={setCurrentData} cardData={cardData} setCardData={setCardData}/>
      <Grid container spacing={1}>
        <Grid item xs={8}>
          {cardData[0] === "Rent" || cardData[0] === "Mortgage" || !cardData[0] ? 
            <StatsCanMapChart setTooltipContent={setTooltipContent} tooltipContent={tooltipContent}
              statsCanRentData={statsCanRentData} statsCanMortgageData={statsCanMortgageData}
              currentData={currentData} cardData={cardData} setCardData={setCardData}/> :
            <MlsMapChart setTooltipContent={setTooltipContent} tooltipContent={tooltipContent} 
              cardData={cardData} setCardData={setCardData} mlsData={mlsData}/>}
        </Grid>
        <Grid item xs={4}>
          <DisplayCard cardData={cardData}/>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
