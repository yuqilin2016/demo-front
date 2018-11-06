import user from './user'
import personal from './personal'
import role from './role'
import manager from './manager'
import member from './member'
import source from './source'
import report from './report'
import task from './task'
import project from './project'

export default {
  parse(url, params) {
    let tmp = url
    Object.keys(params).forEach(key => {
      tmp = tmp.replace(new RegExp(`{${key}}`, 'gm'), params[key])
    })
    return tmp
  },
  user,
  personal,
  role,
  manager,
  member,
  source,
  report,
  task,
  project
}
