const puppeteer = require('puppeteer');
const rootPage = "http://www.policlinicagipuzkoa.com/buscar-nacimiento/page/";



let scrape = async (index) => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(rootPage+index,{timeout:0});
    const result = await page.evaluate(() => {
        
        let elements = document.querySelectorAll('.datos-nacimientos'); 
        let data = [];
        for (var element of elements){ 
            let nombre = element.children[0].innerText;
            let fecha = element.children[1].innerText;
            data.push({nombre,fecha}); 
        }

        return data; 
    });

    browser.close();
    return result; 
};



  
    

    for(i=0;i<8;i++){
        scrape(i).then((value) => {
            console.log(value); 
        
        })
    }