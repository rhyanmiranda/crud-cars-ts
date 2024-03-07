import { Router, Request, Response } from "express";
import { db, Car } from "../database/db";

export const router = Router()

router.get('/cars', (req: Request, res: Response) => {
  res.status(200).send(db)
})

router.get('/cars/:id', (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params
  const car = db.find(car => car.id == id)
  if(car){
    res.send(car)
  }else {
    res.status(404).send('Car not found')
  }
})

router.post('/cars', (req: Request, res: Response) => {
  const { model, plate } = req.body
  const id = (db.length + 1).toString() 

  const newCar: Car = {
    id,
    model,
    plate
  }

  db.push(newCar)

  res.status(201).send('Created').json({newCar})
})

router.put('/cars/:id', (req: Request, res: Response) => {
  const { id } = req.params
  const { model, plate } = req.body

  const carIndex = db.findIndex(car => car.id == id)

  if(carIndex== -1){
    return res.status(404).send('Car not found')
  }

 // Pode trocar um ou outro
  if (model) {
    db[carIndex].model = model;
  }
  if (plate) {
    db[carIndex].plate = plate;
  }
  
  res.status(200).send('Updated. Car : ' + carIndex)
})

router.delete('/cars/:id', (req: Request, res: Response) => {
  const { id } = req.params

  const carIndex = db.findIndex(car => car.id == id)

  db.splice(carIndex, 1)

  res.status(200).send('Car removed successfully! id: ' + id)

})