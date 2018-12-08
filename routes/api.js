const Tax = require('../models/Tax');
const Product = require('../models/Product');

module.exports = router => {

    router.get('/', async (req, res) => {
      res.json('Hai, you are in root')
    })

    router.get('/tax', async (req, res) => {
      const allTax = await Tax.query()
      res.send(allTax)
    })

    router.get('/bill', async (req, res) => {
      const allProduct = await Product.query()
      const allTax = await Tax.query()

      if(allProduct.length === 0 || allTax.length === 0){
          throw new Error('Product or tax data is empty')
      }

      let objData = []
      let result = {}
      let priceSubTotal, taxSubTotal, grandTotal;

      for(val of allProduct){
          let findCode = allTax.filter(el => el.tax_code === val.tax_code)
          if(findCode.length === 0){
              throw new Error('Invalid tax code')
          }
          let findCodeObj = Object.assign({}, ...findCode)

          let tax
          let productPrice = Number(val.product_price)
          if(val.tax_code === '1'){
              tax = productPrice * (10/100)
          }else if(val.tax_code === '2'){
              tax = 10 + (productPrice * (2/100))
          }else if (val.tax_code === '3') {
              tax = productPrice > 0 && productPrice < 100 ? 0 : (productPrice - 100) * (1/100)
          }

          objData.push({
              id: val.id,
              name: val.product_name,
              taxCode: val.tax_code,
              taxType: findCodeObj.tax_type,
              refundable: findCodeObj.refundable === true ? 'Yes' : 'No',
              price: productPrice || 0,
              tax: tax || 0,
              amount: productPrice + tax || 0
          })
      }
      priceSubTotal = objData.reduce((curValue, nextValue) => Number(curValue) + Number(nextValue.price), 0)
      taxSubTotal = objData.reduce((curValue, nextValue) => Number(curValue) + Number(nextValue.tax), 0)
      grandTotal = objData.reduce((curValue, nextValue) => Number(curValue) + Number(nextValue.amount), 0)

      result = {
          data: objData,
          priceSubTotal: priceSubTotal,
          taxSubTotal: taxSubTotal,
          grandTotal: grandTotal
      }

      res.send(result)
    })

    router.get('/bill/:id', async (req, res) => {
        const findOneBill = await Product.query().findById(req.params.id);
        const findOneTax = await Tax.query().where('tax_code', '=', findOneBill.tax_code)
        console.log(findOneTax);

        if(findOneBill === undefined || findOneTax === undefined){
            throw new Error('Product or tax data not found')
        }

        let objData = []
        let results = {}
        let tax
        let productPrice = Number(findOneBill.product_price)
        if(findOneBill.tax_code === '1'){
            tax = productPrice * (10/100)
        }else if(findOneBill.tax_code === '2'){
            tax = 10 + (productPrice * (2/100))
        }else if (findOneBill.tax_code === '3') {
            tax = productPrice > 0 && productPrice < 100 ? 0 : (productPrice - 100) * (1/100)
        }
        objData.push({
            id: findOneBill.id,
            name: findOneBill.product_name,
            taxCode: findOneBill.tax_code,
            taxType: findOneTax[0].tax_type,
            refundable: findOneTax[0].refundable === true ? 'Yes' : 'No',
            price: productPrice || 0,
            tax: tax || 0,
            amount: productPrice + tax || 0
        })

        results = {
            data: objData,
            priceSubTotal: productPrice,
            taxSubTotal: tax,
            grandTotal: productPrice + tax || 0
        }

        res.send(results)
    })

    router.post('/product', async (req, res) => {
        let reqBody = req.body
        const taxCode = await Tax.query().where('tax_code', '=', reqBody.tax_code)
        if(taxCode.length === 0){
            throw new Error('Tax code not found')
        }

        if (reqBody.product_name === '' || reqBody.product_name === null) {
            throw new Error('Invalid name input')
        }else if(reqBody.product_price <= 0){
            throw new Error('Price should be greater than 0')
        }

        const newProduct = await Product.query()
                                        .insert({
                                                product_name: reqBody.product_name,
                                                tax_code: reqBody.tax_code,
                                                product_price: reqBody.product_price
                                            })

        res.send(newProduct)
    })

}
