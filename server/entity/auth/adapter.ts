import { always, append, find, map, merge, pipe, propEq, when } from 'ramda'
import * as shortid from 'shortid'

import { users } from '../../services/db'

const findBy = (prop, value) => find(propEq(prop, value))

export class GraphqlAuthenticationLowAdapter {
  findUserById(_, id) {
    return users(findBy('id', id))
  }
  findUserByEmail(_, email) {
    const user = users(findBy('email', email))

    return user
  }
  async userExistsByEmail(_, email) {
    const user = this.findUserByEmail(_, email)

    return !!user
  }

  // the _createUser and _updateUser methods are just helper methods, they are not used by graphql-authentication.
  _createUser(_, data) {
    const newUser = merge({ id: shortid.generate(), isSuper: false }, data)
    users.write(append(newUser))

    return newUser
  }

  _updateUser(_, userId, data) {
    const findUser = findBy('id', userId)

    const user = users(findUser)
    const updatedUser = merge(user, data)

    const updater = map(when(propEq('id', userId), always(updatedUser)))

    users.write(updater)

    return updatedUser
  }

  createUserBySignup(ctx, data) {
    return this._createUser(ctx, data)
  }
  createUserByInvite(ctx, data) {
    return this._createUser(ctx, data)
  }
  updateUserConfirmToken(ctx, userId, data) {
    return this._updateUser(ctx, userId, data)
  }
  updateUserLastLogin(ctx, userId, data) {
    return this._updateUser(ctx, userId, data)
  }
  updateUserPassword(ctx, userId, data) {
    return this._updateUser(ctx, userId, data)
  }
  updateUserResetToken(ctx, userId, data) {
    return this._updateUser(ctx, userId, data)
  }
  updateUserInfo(ctx, userId, data) {
    return this._updateUser(ctx, userId, data)
  }
  updateUserCompleteInvite(ctx, userId, data) {
    return this._updateUser(ctx, userId, data)
  }
}
