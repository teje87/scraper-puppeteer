const puppeteer = require('puppeteer');
const rootPage = "http://es.surf-forecast.com/breaks/Playade-Gros/forecasts/latest";



let scrape = async () => {
    
    //Abrir pagina 
    const browser = await puppeteer.launch({args: ['--no-sandbox']});
    const page = await browser.newPage();
    await page.goto(rootPage);
    
    //Seleccionar elementos
    const result = await page.evaluate(() => {
        let elements = document.querySelectorAll('#target-for-range-tabs > tbody > tr.lar.hea.table-start.class_name'); 
        let horas = document.querySelectorAll('#target-for-range-tabs > tbody > tr.hea1.table-end.lar.class_name > td');
        let swells = document.querySelectorAll('.swell-icon-val');
        let swellDirections = document.querySelectorAll('#target-for-range-tabs > tbody > tr:nth-child(4) > td')
        let data = [];
        
        //DIAS
        for (var element of elements){ 
        
            let firstDay = element.childNodes[1].innerText;
            let secondDay = element.childNodes[2].innerText;
            let thirdDay = element.childNodes[3].innerText;

            
            data.push({firstDay,secondDay,thirdDay}); 
        }

        //HORAS
        for (var hora of horas){ 
        
            let horaexacta = hora.innerText;    
            data.push({horaexacta}); 
        }

        //SWELL
        for( var swell of swells){
            let measure = swell.childNodes[0].nodeValue;
            data.push({measure});
        }

        //SWELL DIRECTION
        for( var swellDirection of swellDirections){
            let direction = swellDirection.childNodes[2].nodeValue;
            data.push({direction});
        }


        return data; 
    });

    browser.close();
    return result; 
};

scrape().then((value) => {
    console.log(value); 
});
