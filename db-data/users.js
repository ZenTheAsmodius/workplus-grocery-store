const { USER_TYPES } = require('../src/types')
const DEFAULT_PASSWORD = 'password123'

const USERS = [
  {
    username: 'pera_peric',
    full_name: 'Pera Peric',
    password: DEFAULT_PASSWORD,
    role: USER_TYPES.Manager,
    department: 'Srbija'
  },
  {
    username: 'mile_kitic',
    full_name: 'Mile Kitic',
    password: DEFAULT_PASSWORD,
    role: USER_TYPES.Employee,
    department: 'Srbija'
  },
  {
    username: 'mitar_miric',
    full_name: 'Mitar Miric',
    password: DEFAULT_PASSWORD,
    role: USER_TYPES.Employee,
    department: 'Novi Sad'
  },
  {
    username: 'bebi_dol',
    full_name: 'Bebi Dol',
    password: DEFAULT_PASSWORD,
    role: USER_TYPES.Manager,
    department: 'Grad Beograd'
  },
  {
    username: 'sandra',
    full_name: 'Sandra Despotovic',
    password: DEFAULT_PASSWORD,
    role: USER_TYPES.Employee,
    department: 'Grad Beograd'
  },
  {
    username: 'milica_zavetnica',
    full_name: 'Milica Zavetnica',
    password: DEFAULT_PASSWORD,
    role: USER_TYPES.Manager,
    department: 'Vracar'
  },
  {
    username: 'branko_krsmanovic',
    full_name: 'Branko Krsmanovic',
    password: DEFAULT_PASSWORD,
    role: USER_TYPES.Manager,
    department: 'Neimar'
  },
  {
    username: 'lepi_mica',
    full_name: 'Lepi Mica',
    password: DEFAULT_PASSWORD,
    role: USER_TYPES.Employee,
    department: 'Radnja 7'
  },
]

module.exports = USERS
