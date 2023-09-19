const router = require('express').Router()
const Person = require('../models/Person')
// rotas da API & Create- criaçao de dados
router.post('/', async (req, res) => {
    const { name, salary, approved } = req.body

    if (!name) {
    res.status(422).json({erro: 'o nome é obrigatorio'})
    return
    }
  
    const person = {
      name,
      salary,
      approved,
    }
  
    try {
        // criando dados
      await Person.create(person)
      
       // temos que enviar um status http de sucesso
      res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  }) 

  // Red leitura de dados

  router.get('/', async (req, res)=> {

    try {
        const people = await Person.find()
        res.status(200).json(people)
        
    } catch (error) {
        res.status(500).json({ erro: error })
    }
  }) 

  router.get('/:id', async (req,res)=> {
    const id = req.params.id

    try {
        const person = await Person.findOne({ _id: id})

        if(!person) {
            res.status(422).json({message: 'Usuario nao encontrado'})
            return
        }
        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({ erro: error })
        
    }
  }) 

  // Update atualizaçao de dados (PUT, PATCH)
  // Usando o PATCH porque ele significa uma atualizaçao parcial

  router.patch('/:id', async (req, res) => {
    const id = req.params.id
  
    const { name, salary, approved } = req.body
  
    const person = {
      name,
      salary,
      approved,
    }
  
    try {
      const updatedPerson = await Person.updateOne({ _id: id }, person)
  
      if (updatedPerson.matchedCount === 0) {
        res.status(422).json({ message: 'Usuário não encontrado!' })
        return
      }
  
      res.status(200).json(person)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  }) 
  
  // DELETE- deletar dados
  router.delete('/:id', async (req, res) => {
    const id = req.params.id
  
    const person = await Person.findOne({ _id: id })
  
    if (!person) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }
  
    try {
      await Person.deleteOne({ _id: id })
  
      res.status(200).json({ message: 'Usuário removido com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  

  module.exports = router