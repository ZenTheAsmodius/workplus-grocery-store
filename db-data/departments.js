const { DEPARTMENT_TYPES } = require("../src/types")

const DEPARTMENTS = [
  {
    name: 'Srbija',
    type: DEPARTMENT_TYPES.Office,
    parent: null,
    ancestors: []
  },
  {
    name: 'Vojvodina',
    type: DEPARTMENT_TYPES.Office,
    parent: 'Srbija',
    ancestors: ['Srbija']
  },
  {
    name: 'Severnobacki okrug',
    type: DEPARTMENT_TYPES.Office,
    parent: 'Vojvodina',
    ancestors: ['Srbija', 'Vojvodina']
  },
  {
    name: 'Subotica',
    type: DEPARTMENT_TYPES.Office,
    parent: 'Vojvodina',
    ancestors: ['Srbija', 'Vojvodina', 'Severnobacki okrug']
  },
  {
    name: 'Radnja 1',
    type: DEPARTMENT_TYPES.Store,
    parent: 'Vojvodina',
    ancestors: ['Srbija', 'Vojvodina', 'Severnobacki okrug', 'Subotica']
  },
  {
    name: 'Juznobacki okrug',
    type: DEPARTMENT_TYPES.Office,
    parent: 'Vojvodina',
    ancestors: ['Srbija', 'Vojvodina']
  },
  {
    name: 'Novi Sad',
    type: DEPARTMENT_TYPES.Office,
    parent: 'Vojvodina',
    ancestors: ['Srbija', 'Vojvodina', 'Juznobacki okrug']
  },
  {
    name: 'Detelinara',
    type: DEPARTMENT_TYPES.Office,
    parent: 'Vojvodina',
    ancestors: ['Srbija', 'Vojvodina', 'Juznobacki okrug', 'Novi Sad']
  },
  {
    name: 'Radnja 2',
    type: DEPARTMENT_TYPES.Store,
    parent: 'Vojvodina',
    ancestors: ['Srbija', 'Vojvodina', 'Juznobacki okrug', 'Novi Sad', 'Detelinara']
  },
  {
    name: 'Radnja 3',
    type: DEPARTMENT_TYPES.Store,
    parent: 'Vojvodina',
    ancestors: ['Srbija', 'Vojvodina', 'Juznobacki okrug', 'Novi Sad', 'Detelinara']
  },
  {
    name: 'Liman',
    type: DEPARTMENT_TYPES.Office,
    parent: 'Vojvodina',
    ancestors: ['Srbija', 'Vojvodina', 'Juznobacki okrug', 'Novi Sad']
  },
  {
    name: 'Radnja 4',
    type: DEPARTMENT_TYPES.Store,
    parent: 'Vojvodina',
    ancestors: ['Srbija', 'Vojvodina', 'Juznobacki okrug', 'Novi Sad', 'Liman']
  },
  {
    name: 'Radnja 5',
    type: DEPARTMENT_TYPES.Store,
    parent: 'Vojvodina',
    ancestors: ['Srbija', 'Vojvodina', 'Juznobacki okrug', 'Novi Sad', 'Liman']
  },
  {
    name: 'Grad Beograd',
    type: DEPARTMENT_TYPES.Office,
    parent: 'Srbija',
    ancestors: ['Srbija']
  },
  {
    name: 'Novi Beograd',
    type: DEPARTMENT_TYPES.Office,
    parent: 'Srbija',
    ancestors: ['Srbija', 'Grad Beograd']
  },
  {
    name: 'Bezanija',
    type: DEPARTMENT_TYPES.Office,
    parent: 'Srbija',
    ancestors: ['Srbija', 'Grad Beograd', 'Novi Beograd']
  },
  {
    name: 'Radnja 6',
    type: DEPARTMENT_TYPES.Store,
    parent: 'Srbija',
    ancestors: ['Srbija', 'Grad Beograd', 'Novi Beograd', 'Bezanija']
  },
  {
    name: 'Vracar',
    type: DEPARTMENT_TYPES.Office,
    parent: 'Srbija',
    ancestors: ['Srbija', 'Grad Beograd']
  },
  {
    name: 'Neimar',
    type: DEPARTMENT_TYPES.Office,
    parent: 'Srbija',
    ancestors: ['Srbija', 'Grad Beograd', 'Vracar']
  },
  {
    name: 'Radnja 7',
    type: DEPARTMENT_TYPES.Store,
    parent: 'Srbija',
    ancestors: ['Srbija', 'Grad Beograd', 'Vracar', 'Neimar']
  },
  {
    name: 'Crveni krst',
    type: DEPARTMENT_TYPES.Office,
    parent: 'Srbija',
    ancestors: ['Srbija', 'Grad Beograd', 'Vracar']
  },
  {
    name: 'Radnja 8',
    type: DEPARTMENT_TYPES.Store,
    parent: 'Srbija',
    ancestors: ['Srbija', 'Grad Beograd', 'Vracar', 'Crveni krst']
  },
  {
    name: 'Radnja 9',
    type: DEPARTMENT_TYPES.Store,
    parent: 'Srbija',
    ancestors: ['Srbija', 'Grad Beograd', 'Vracar', 'Crveni krst']
  }
]

module.exports = DEPARTMENTS
