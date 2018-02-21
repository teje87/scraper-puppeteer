const puppeteer = require('puppeteer');
const rootPage = "http://es.surf-forecast.com/breaks/Playade-Gros/forecasts/latest";

// (TODO) Make an array of webpages of different spots 


let scrape = async () => {
    
    //OPEN PAGE
    const browser = await puppeteer.launch({args: ['--no-sandbox'], timeout:0});
    const page = await browser.newPage();
    await page.goto(rootPage);
    
    //SELECT ITEMS
    const result = await page.evaluate(() => {
        let elements = document.querySelectorAll('#target-for-range-tabs > tbody > tr.lar.hea.table-start.class_name'); 
        let horas = document.querySelectorAll('#target-for-range-tabs > tbody > tr.hea1.table-end.lar.class_name > td');
        let swells = document.querySelectorAll('.swell-icon-val');
        let swellDirections = document.querySelectorAll('#target-for-range-tabs > tbody > tr:nth-child(4) > td')

        
        let horasArr = [];
        let swellArr = [];
        let swellDirArr = [];
        let daysArr = [];

        
        //DAYS
        for (var element of elements){ 
        
            let firstDay = element.childNodes[1].innerText;
            let secondDay = element.childNodes[2].innerText;
            let thirdDay = element.childNodes[3].innerText;

            
            data.push({firstDay,secondDay,thirdDay}); 
        }

        //HOURS
        for (var hora of horas){ 
        
            let time = hora.innerText;    
            horasArr.push({time}); 
        }

        //SWELL
        for( var swell of swells){
            let measure = swell.childNodes[0].nodeValue;
            swellArr.push({measure});
        }

        //SWELL DIRECTION
        for( var swellDirection of swellDirections){
            let direction = swellDirection.childNodes[2].nodeValue;
            swellDirArr.push({direction});
        }

        //COMPLETE CHART (HOUR, SWELL, DIRECTION)
        var chart = horasArr.map((hora,i)=>{
            return  newChart = {...hora, ...swellArr[i],...swellDirArr[i]} 
        })

        return chart; 
    });


    browser.close();
    return result; 
};

//SCRAPE FORECAST
scrape().then((value) => {
    console.log(value); 
});
