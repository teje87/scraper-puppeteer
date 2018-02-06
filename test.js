const puppeteer = require('puppeteer');
const rootPage = "http://es.surf-forecast.com/breaks/Hendaye-Plage/forecasts/latest";



let scrape = async () => {
    
    //Abrir pagina 
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(rootPage,{timeout:0});
    
    //Seleccionar elementos
    const result = await page.evaluate(() => {
        let elements = document.querySelectorAll('#target-for-range-tabs > tbody > tr.lar.hea.table-start.class_name'); 
        let horas = document.querySelectorAll('#target-for-range-tabs > tbody > tr.hea1.table-end.lar.class_name > td');
        let data = [];
        for (var element of elements){ 
            /* let dia = element.childNodes[1].nodeName; */
            let firstDay = element.childNodes[1].innerText;
            let secondDay = element.childNodes[2].innerText;
            let thirdDay = element.childNodes[3].innerText;

            
            data.push({firstDay,secondDay,thirdDay}); 
        }

        for (var hora of horas){ 
        
            let horaexacta = hora.innerText;    
            data.push({horaexacta}); 
        }

        return data; 
    });

    browser.close();
    return result; 
};

scrape().then((value) => {
    console.log(value); 
});
