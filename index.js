const puppeteer = require('puppeteer-extra');
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha');
const { faker } = require('@faker-js/faker');

puppeteer.use(
    RecaptchaPlugin({
      provider: { id: '2captcha', token: '65c70134a166e867634da3c3082f437e' }
    })
);


(async ()=>{
    const browser = await puppeteer.launch({headless: false, slowMo: 250});
    const page = await browser.newPage();

    console.log('start');
    await page.goto('https://accounts.google.com/signup');

    const { solved, error } = await page.solveRecaptchas();
    if(solved) {
        console.log('The captcha has been solved');
    }

    let password = faker.internet.password();

    await page.type('input[name=Passwd]',password)
    await page.type('input[name=ConfirmPasswd]',password)

    await page.type('input[name=firstName]', faker.name.firstName());
    await page.type('input[name=lastName]', faker.name.lastName());
    await page.type('input[type=email]', faker.internet.userName()+"15463");
   
    
    const btn = await page.$('.VfPpkd-LgbsSe-OWXEXe-k8QpJ');
    await btn.evaluate( b => b.click() );

    // For go ahead i need twillio or vonage account to recieve the G-code and continue creating the gmail account 

    //await browser.close();
    console.log('end');
})().catch(err => {
    console.error(err.message);
})