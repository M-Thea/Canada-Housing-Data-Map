import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import { useState } from 'react';




const DisplayCard = ({cardData}) => {
    const [alert, setAlert] = useState(false)
    const rentText = `Average monthly rent for one bedroom: ${cardData[2]}`
    const mortgageText = `Average monthly mortgage payment: ${cardData[2]}`
    const mlsText = `Benchmark price of composite home: $${cardData[2]}`

    const rentAlert = () => {
        return (<Link href="https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=3410013301">Statistics Canada CMHC 2023</Link> )}
    const mortgageAlert = () => {
        return (<Link href="https://www.cmhc-schl.gc.ca/professionals/housing-markets-data-and-research/housing-data/data-tables/mortgage-and-debt/average-monthly-payment-credit-product-canada-cma">CMHC 2023</Link> )}
    const displaySource = () => {setAlert(true)}
       
    
    if (cardData.length > 1){
    return (
        <Card sx={{ minWidth: 275 }}>
        <CardContent>
            <Typography variant="h3" gutterBottom>
            {cardData[1]}
            </Typography>
            <Typography variant="h5" component="div">
            {cardData[0] === "Rent" ? rentText : cardData[0] === "Mortgage" ? mortgageText : mlsText}
            </Typography>
        </CardContent>
        <CardActions>
        {alert === true ? <Alert severity="info" onClose={() => {setAlert(false)}}>
            {cardData[0] === "Rent" ? rentAlert() : mortgageAlert()}</Alert> :
        <Button size="small" onClick={displaySource}>Source</Button>}
      </CardActions>
        </Card>
    )
    }
}

export default DisplayCard;
