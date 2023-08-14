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

const queryResponse = g.type('ModelColumnType', {
  context: g.json().optional(),
  type: g.string().optional(),
  columnNames: g.string().optional().list().optional(),
  data: g.json().optional(),
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

const table = g.type('Table', {
  name: g.string().optional(),
  type: g.string().optional(),
})

const view = g.type('View', {
  id: g.int().optional(),
  name: g.string().optional(),
  query: g.string().optional(),
})

export {
    project,
    model,
    table,
    view,
    database,
    queryResponse,
    describeModel,
    column_importances,
    accuracies,
    db_parameters
}
