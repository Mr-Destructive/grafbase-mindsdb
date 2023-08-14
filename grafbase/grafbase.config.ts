import { g, config } from '@grafbase/sdk'
import * as types from './types'
import * as inputs from './inputs'

g.query('databases', {
    args: {auth: g.inputRef(inputs.mindsdbAuth)},
    resolver: 'databases/list',
    returns: g.ref(types.database).optional().list().optional(),
})

g.mutation('databaseCreate', {
  args: { auth: g.inputRef(inputs.mindsdbAuth), input: g.inputRef(inputs.databaseCreateInput) },
  resolver: 'databases/create',
  returns: g.ref(types.database).optional(),
})

g.query('projects', {
    args: {auth: g.inputRef(inputs.mindsdbAuth)},
    resolver: 'projects/list',
    returns: g.ref(types.project).optional().list().optional(),
})

g.query('project', {
    args: {auth: g.inputRef(inputs.mindsdbAuth), name: g.string()},
    resolver: 'projects/get',
    returns: g.ref(types.project).optional(),
})

g.query('projectModels', {
    args: {auth: g.inputRef(inputs.mindsdbAuth), projectName: g.string()},
    resolver: 'models/list',
    returns: g.ref(types.model).list().optional(),
})

g.query('Model', {
    args: {auth: g.inputRef(inputs.mindsdbAuth), projectName: g.string(), modelName: g.string()},
    resolver: 'models/get',
    returns: g.ref(types.model).optional(),
})

g.query('ModelDescribe', {
    args: {auth: g.inputRef(inputs.mindsdbAuth), projectName: g.string(), modelName: g.string()},
    resolver: 'models/describe',
    returns: g.ref(types.describeModel).optional(),
})

g.mutation('modelCreate', {
  args: { auth: g.inputRef(inputs.mindsdbAuth), projectName: g.string(), modelData: g.inputRef(inputs.modelCreateInput) },
  resolver: 'models/create',
  returns: g.ref(types.model).optional(),
})

g.mutation('modelDelete', {
  args: { auth: g.inputRef(inputs.mindsdbAuth), projectName: g.string(), modelName: g.string() },
  resolver: 'models/delete',
  returns: g.string().optional(),
})

g.mutation('modelQuery', {
  args: { auth: g.inputRef(inputs.mindsdbAuth), query: g.inputRef(inputs.modelQueryInput)},
  resolver: 'models/query',
  returns: g.json().optional(),
})

g.mutation('sqlQuery', {
  args: { auth: g.inputRef(inputs.mindsdbAuth), query: g.string() },
  resolver: 'databases/query',
  returns: g.ref(types.queryResponse).optional(),
})

g.query('databaseTables', {
    args: {auth: g.inputRef(inputs.mindsdbAuth), databaseName: g.string()},
    resolver: 'tables/list',
    returns: g.ref(types.table).optional().list().optional(),
})

g.query('databaseTable', {
    args: {auth: g.inputRef(inputs.mindsdbAuth), databaseName: g.string(), tableName: g.string()},
    resolver: 'tables/get',
    returns: g.ref(types.table).optional(),
})

g.mutation('tableCreate', {
  args: { auth: g.inputRef(inputs.mindsdbAuth), databaseName: g.string(), tableData: g.inputRef(inputs.tableCreateInput) },
  resolver: 'tables/create',
  returns: g.ref(types.table).optional(),
})

g.mutation('tableDelete', {
  args: { auth: g.inputRef(inputs.mindsdbAuth), databaseName: g.string(), tableData: g.inputRef(inputs.tableCreateInput) },
  resolver: 'tables/delete',
  returns: g.string().optional(),
})

g.query('projectViews', {
    args: {auth: g.inputRef(inputs.mindsdbAuth), projectName: g.string()},
    resolver: 'views/list',
    returns: g.ref(types.view).list(),
})

g.query('projectView', {
    args: {auth: g.inputRef(inputs.mindsdbAuth), projectName: g.string(), viewName: g.string()},
    resolver: 'views/get',
    returns: g.ref(types.view).optional(),
})

g.mutation('viewCreate', {
  args: { auth: g.inputRef(inputs.mindsdbAuth), projectName: g.string(), viewData: g.inputRef(inputs.viewCreateInput) },
  resolver: 'views/create',
  returns: g.ref(types.view).optional(),
})

g.mutation('viewDelete', {
  args: { auth: g.inputRef(inputs.mindsdbAuth), projectName: g.string(), viewName: g.string() },
  resolver: 'views/delete',
  returns: g.string().optional(),
})

g.mutation('viewUpdate', {
  args: { auth: g.inputRef(inputs.mindsdbAuth), projectName: g.string(), viewData: g.inputRef(inputs.viewCreateInput) },
  resolver: 'views/update',
  returns: g.ref(types.view).optional(),
})

export default config({
  schema: g
})

