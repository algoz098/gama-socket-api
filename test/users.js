// console.log = jest.fn()

const server = require("../src/index");
const request = require("supertest");

const mongoose = require('../app/model/index.js')
const User = require('../app/model/user.js')

var auth = null
beforeAll(async ()=>{
  var response = await request(server).post("/web/v1/login").send({email: 'suporte@rhizatech.com', password: '102040'})
  auth = response.res.text
})

describe("Routes: Users", () => {
  it("List should block unathourized", async (done) => {
    var response = await request(server).get("/web/v1/users/");

    expect(response.status).toEqual(401);

    expect(response.type).toEqual("text/plain");

    expect(response.error.text).toEqual("Erro de autenticação");
    
    done()
  });

  it("List should shown the collection", async (done) => {
    var response = await request(server).get("/web/v1/users/").set('auth', auth)

    expect(response.status).toEqual(200);

    expect(response.type).toEqual("application/json");

    expect(response.res.text).toContain("suporte@rhizatech.com");
    
    done()
  });
  
  it("Item should block unathourized", async (done) => {
    var {_id} = await User.findOne({}).exec()
    var response = await request(server).get(`/web/v1/users/${_id}`)
    
    expect(response.status).toEqual(401);

    expect(response.type).toEqual("text/plain");

    expect(response.error.text).toEqual("Erro de autenticação");
    
    done()
  });
  
  it("Item should be returned without password", async (done) => {
    var user = await User.findOne({}, {password: false}).exec()
    var response = await request(server).get(`/web/v1/users/${user._id}`).set('auth', auth)
    
    expect(response.status).toEqual(200);

    expect(response.type).toEqual("application/json");

    expect(response.res.text).toEqual(JSON.stringify(user));
    
    done()
  });
  
  it("Item's deletion should be blocked if unathourized", async (done) => {
    var {_id} = await User.findOne({}).exec()
    var response = await request(server).get(`/web/v1/users/${_id}/delete`)
    
    expect(response.status).toEqual(401);

    expect(response.type).toEqual("text/plain");

    expect(response.error.text).toEqual("Erro de autenticação");
    
    done()
  });
  
  it("Item should be deletable", async (done) => {
    var user = await User.findOne({deletedAt: null}).exec()

    var response = await request(server).get(`/web/v1/users/${user._id}/delete`).set('auth', auth)
    
    expect(response.status).toEqual(200);

    expect(response.type).toEqual("application/json");

    expect(JSON.parse(response.res.text).deleted).toBe(true);
    
    done()
  });
  
  it("Item should be restored", async (done) => {
    var user = await User.findOne({deletedAt: { $ne: null }}).exec()

    var response = await request(server).get(`/web/v1/users/${user._id}/delete`).set('auth', auth)
    
    expect(response.status).toEqual(200);

    expect(response.type).toEqual("application/json");

    expect(JSON.parse(response.res.text).deleted).toBe(false);
    
    done()
  });
  
  it("Save should be authenticated", async (done) => {
    var response = await request(server).post(`/web/v1/users/`)
    
    expect(response.status).toEqual(401);

    expect(response.type).toEqual("text/plain");

    expect(response.error.text).toEqual("Erro de autenticação");
    
    done()
  });
  
  it("Save should be joi validated", async (done) => {
    var response = await request(server).post(`/web/v1/users/`).set('auth', auth).send({})

    expect(response.status).toEqual(403);

    expect(response.type).toEqual("application/json");

    expect(response.error.text).toContain('"isJoi":true');
    
    done()
  });
  
  it("Save should work", async (done) => {
    var data = {
      name: 'teste',
      email: 'teste@teste.com',
      password: null,
      phone: '(11) 11111-1111',
      birthdate: '11/11/1990',
      admin: false,
      cards: [
        {
            number: 111111,
            type: 'black',
            active: 0
        },
      ]
    }
    
    var response = await request(server).post(`/web/v1/users/`).send(data).set('auth', auth)

    expect(response.status).toEqual(200);

    expect(response.type).toEqual("application/json");

    var user = await User.findOne({name: 'teste'}).exec()

    expect(user.email).toBe(data.email);
    
    done()
  });
  
  it("Register should not be authenticated", async (done) => {
    var response = await request(server).post(`/web/v1/users/register`)
    
    expect(response.status).not.toEqual(401);

    expect(response.type).not.toEqual("text/plain");

    expect(response.error.text).not.toEqual("Erro de autenticação");
    
    done()
  });
  
  it("Register should be joi validated", async (done) => {
    var response = await request(server).post(`/web/v1/users/register`).send({})

    expect(response.status).toEqual(403);

    expect(response.type).toEqual("application/json");

    expect(response.error.text).toContain('"isJoi":true');
    
    done()
  });
  
  it("Register should be active the card", async (done) => {
    var data = {number: 888555, birthdate: '11/11/1990', email: 'teste@teste.com', phone: '(11) 11111-1111'}
    var response = await request(server).post(`/web/v1/users/register`).send(data)

    expect(response.status).toEqual(200);

    expect(response.type).toEqual("application/json");

    expect(response.res.text).toContain('"active":1');
    
    done()
  });
});