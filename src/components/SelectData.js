import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';


const SelectData = ({cardData, statsCanRentData, statsCanMortgageData, mlsData, setCurrentData, setCardData}) => {
    let displayDataType = cardData;
    const handleChange = (event) => {
        if (cardData.length > 1){
          displayDataType = []
          setCardData(displayDataType)
        }
        if (event.target.value === "Rent"){
          displayDataType[0] = "Rent"
          setCardData(displayDataType)
          setCurrentData(statsCanRentData)}
        if (event.target.value === "Mortgage"){
          displayDataType[0] = "Mortgage"
          setCardData(displayDataType)
          setCurrentData(statsCanMortgageData)}
        if (event.target.value === "MLS"){
          displayDataType[0] = "MLS"
          setCardData(displayDataType)
          setCurrentData(mlsData)}
      }
    
    return (
        <FormControl fullWidth>
          <InputLabel id="select-data-label">Select Data</InputLabel>
          <Select labelId="select-data-label"
            id="data-select"
            defaultValue=""
            label="Data Type"
            onChange={handleChange}>
              <MenuItem value="">
              <em>None</em>
              </MenuItem>
              <MenuItem value={"Rent"}>Stats Can Rent Data</MenuItem>
              <MenuItem value={"Mortgage"}>Stats Can Mortgage Data</MenuItem>
              <MenuItem value={"MLS"}>MLS HPI Data</MenuItem>

          </Select>
      </FormControl>
    )
}
export default SelectData