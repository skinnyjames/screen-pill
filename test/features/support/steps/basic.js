const { Given, When, Then, And } = require('cucumber')
const chai = require('chai')
chai.use(require('chai-as-promised'))
const expect = chai.expect
const BasicPage = require('./../pages/basic')

Given(/I visit basic/, async function() {
  return this.visit(BasicPage)
})

Then(/I can use basic accessors/, async function() {
  return this.on(BasicPage, async (page) => {
    await page.h1Element.waitUntilPresent()
    
    let h1 = await page.h1Element.get()
    expect(h1).to.eql('h1')

    let h2 = await page.h2Element.get()
    expect(h2).to.eql('h2')

    let h3 = await page.h3Element.get()
    expect(h3).to.eql('h3')

    let h4 = await page.h4Element.get()
    expect(h4).to.eql('h4')

    let h5 = await page.h5Element.get()
    expect(h5).to.eql('h5')

    let h6 = await page.h6Element.get()
    expect(h6).to.eql('h6')

    let div = await page.divElement.get()
    expect(div).to.eql('div')

    let span = await page.spanElement.get()
    expect(span).to.eql('span')
    
    let strong = await page.strongElement.get()
    expect(strong).to.eql('strong')

    let em = await page.emElement.get()
    expect(em).to.eql('em')

    let ul = await page.ulElement.get()
    expect(ul).to.eql('list')

    let ulLi = await page.ulLiElement.get()
    expect(ulLi).to.eql('list')

    let ol = await page.olElement.get()
    expect(ol).to.eql('list')

    let olLi = await page.olLiElement.get()
    expect(olLi).to.eql('list')

    let table = await page.tableElement.get()
    expect(table).to.eql('table')

    let tr = await page.trElement.get()
    expect(tr).to.eql('table')

    let td = await page.tdElement.get()
    expect(td).to.eql('table')
  })
})
