import { g, config } from '@grafbase/sdk'

const db_parameters = g.type('Parameters',{
    database: g.string().optional(),
    user: g.string().optional(),
    password: g.string().optional(),
    host: g.string().optional(),
    port: g.int().optional(),
})

const database = g.type('Database', {
  name: g.string(),
  type: g.string(),
  engine: g.string().optional(),
})

const databaseCreateInput = g.input('DatabaseCreateInput', {
  name: g.string(),
  engine: g.string(),
  database: g.string().optional(),
  user: g.string().optional(),
  password: g.string().optional(),
  host: g.string().optional(),
  port: g.int().optional(),
})

const mindsdbAuth = g.input('Auth', {
    email: g.email(),
    password: g.string(),
    host: g.string().optional(),
    managed: g.boolean().optional(),
})

g.query('databases', {
    args: {input: g.inputRef(mindsdbAuth)},
    resolver: 'databases/list',
    returns: g.ref(database).optional().list().optional(),
})

g.mutation('databaseCreate', {
  args: { auth: g.inputRef(mindsdbAuth), input: g.inputRef(databaseCreateInput) },
  resolver: 'databases/create',
  returns: g.ref(database).optional(),
})

export default config({
  schema: g
})

