import { g, config } from '@grafbase/sdk'

const databaseFilterInput = g.input('DatabaseFilterInput', {
  name: g.string().optional(),
  engine: g.string().optional(),
  type: g.string().optional(),
})

const databaseCreateInput = g.input('DatabaseCreateInput', {
  name: g.string(),
  engine: g.string(),
  parameters: g.json().optional(),
})

const databaseUpdateInput = g.input('DatabaseUpdateInput', {
  engine: g.string().optional(),
  parameters: g.json().optional(),
})

const modelCreateInput = g.input('ModelCreateInput', {
  name: g.string(),
  engine: g.string(),
  predictColumn: g.string(),
  parameters: g.json(),
})

const modelQueryInput = g.input('ModelQueryInput', {
    projectName: g.string(),
    modelName: g.string(),
    data: g.json(),
})

const tableCreateInput = g.input('TableCreateInput', {
  name: g.string(),
  replace: g.boolean(),
  select: g.string(),
})

const viewCreateInput = g.input('ViewCreateInput', {
  name: g.string(),
  query: g.string(),
})

const mindsdbAuth = g.input('Auth', {
    email: g.email(),
    password: g.string(),
    host: g.string().optional(),
    managed: g.boolean().optional(),
})

export {
  databaseFilterInput,
  databaseCreateInput,
  databaseUpdateInput,
  modelCreateInput,
  modelQueryInput,
  tableCreateInput,
  viewCreateInput,
  mindsdbAuth
}
