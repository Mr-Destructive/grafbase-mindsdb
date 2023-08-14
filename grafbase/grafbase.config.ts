import { g, config } from '@grafbase/sdk'

const db_parameters = g.type('Parameters',{
    database: g.string().optional(),
    user: g.string().optional(),
    password: g.string().optional(),
    host: g.string().optional(),
    port: g.int().optional(),
})

const accuracies = g.type('Accuracies', {
  r2Score: g.float().optional(),
})

const column_importances = g.type('ColumnImportances', {
  daysOnMarket: g.float().optional(),
  location: g.float().optional(),
  neighborhood: g.float().optional(),
  numberOfBathrooms: g.float().optional(),
  numberOfRooms: g.float().optional(),
  sqft: g.float().optional(),
})

const describeModel = g.type('DescribeModel', {
    accuracies: g.ref(accuracies).optional(),
    columnImportances: g.ref(column_importances).optional(),
    inputs: g.string().optional().list().optional(),
    outputs: g.string().optional().list().optional(),
    model: g.string(),
})

const database = g.type('Database', {
  name: g.string().optional(),
  type: g.string().optional(),
  engine: g.string().optional(),
})

const project = g.type('Project', {
  name: g.string(),
})

const model = g.type('Model', {
    name: g.string(),
    status: g.string(),
    active: g.boolean(),
    prediction: g.string().optional(),
    trainingTime: g.string().optional(),
    accuracy: g.float().optional(),
    createdAt: g.string().optional(),
    error: g.string().optional(),
    fetchDataQuery: g.string().optional(),
    mindsdbVersion: g.string().optional(),
    update: g.string().optional(),
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

const modelCreateInput = g.input('ModelCreateInput', {
  name: g.string(),
  engine: g.string(),
  predictColumn: g.string(),
  parameters: g.json(),
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

g.query('projects', {
    args: {input: g.inputRef(mindsdbAuth)},
    resolver: 'projects/list',
    returns: g.ref(project).optional().list().optional(),
})

g.query('project', {
    args: {input: g.inputRef(mindsdbAuth), name: g.string()},
    resolver: 'projects/get',
    returns: g.ref(project).optional(),
})

g.query('projectModels', {
    args: {input: g.inputRef(mindsdbAuth), projectName: g.string()},
    resolver: 'models/list',
    returns: g.ref(model).optional().list().optional(),
})

g.query('Model', {
    args: {input: g.inputRef(mindsdbAuth), projectName: g.string(), modelName: g.string()},
    resolver: 'models/get',
    returns: g.ref(model).optional(),
})

g.query('ModelDescribe', {
    args: {input: g.inputRef(mindsdbAuth), projectName: g.string(), modelName: g.string()},
    resolver: 'models/describe',
    returns: g.ref(describeModel).optional(),
})

g.mutation('modelCreate', {
  args: { auth: g.inputRef(mindsdbAuth), projectName: g.string(), modelData: g.inputRef(modelCreateInput) },
  resolver: 'models/create',
  returns: g.ref(model).optional(),
})

g.mutation('modelDelete', {
  args: { auth: g.inputRef(mindsdbAuth), projectName: g.string(), modelName: g.string() },
  resolver: 'models/delete',
  returns: g.string().optional(),
})

export default config({
  schema: g
})

