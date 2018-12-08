var chai = require('chai'),
    chaiHttp = require('chai-http'),
    expect = chai.expect,
    app = require('../app.js');

chai.use(chaiHttp);
chai.use( require('chai-integer') );
chai.use( require('chai-integer') );

describe('GET all Tax type /tax', () => {
    it('should get all data tax type', (done) => {
      chai.request(app)
      .get('/tax')
      .end((err,res)=>{
        expect(res.body).to.be.an('array')
        expect(res.body[0]).to.have.property('tax_code');
        expect(res.body[0]).to.have.property('tax_type');
        expect(res.body[0]).to.have.property('refundable');
        done()
      })
    })
  })

describe('GET all bill /bill', () => {
      it('should get all bill', (done) => {
        chai.request(app)
        .get('/bill')
        .end((err,res)=>{
          expect(res.body.data[0]).to.have.property('taxCode');
          expect(res.body.data[0]).to.have.property('taxType');
          expect(res.body.data[0]).to.have.property('refundable');
          expect(res.body.data[0]).to.have.property('name');
          expect(res.body.data[0]).to.have.property('price');
          expect(res.body.data[0]).to.have.property('tax');
          expect(res.body.data[0]).to.have.property('amount');
          expect(res.body).to.have.property('priceSubTotal');
          expect(res.body).to.have.property('taxSubTotal');
          expect(res.body).to.have.property('grandTotal');
          done()
        })
      })
    })

describe('GET one bill /bill/:id', () => {
      it('should get one bill', (done) => {
        chai.request(app)
        .get('/bill/5')
        .end((err,res)=>{
          expect(res.body.data[0]).to.have.property('taxCode');
          expect(res.body.data[0]).to.have.property('refundable');
          expect(res.body.data[0]).to.have.property('name');
          expect(res.body.data[0]).to.have.property('price');
          expect(res.body.data[0]).to.have.property('tax');
          expect(res.body.data[0]).to.have.property('amount');
          expect(res.body).to.have.property('priceSubTotal');
          expect(res.body).to.have.property('taxSubTotal');
          expect(res.body).to.have.property('grandTotal');
          done()
        })
      })
})

describe('POST tax object /product', ()=>{
  it('should create tax object',(done)=>{
    chai.request(app)
    .post('/product')
    .send({
      'product_name': 'pizza',
      'tax_code': '2',
      'product_price': 1000
    })
    .end((err,res)=>{
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('product_name');
      expect(res.body.product_name).to.be.a('string');
      expect(res.body).to.have.property('tax_code');
      expect(res.body.tax_code).to.be.a('string');
      expect(res.body).to.have.property('product_price');
      expect(res.body.product_price).to.be.an.integer();
      expect(res.body.product_price).to.be.gt(1);
      done()
    })
  })
})
