import { always, append, find, map, merge, pipe, propEq, when } from 'ramda'
import * as shortid from 'shortid'

import { users } from '../../services/db'

const findBy = (prop, value) => find(propEq(prop, value))

export class GraphqlAuthenticationLowAdapter {
  public findUserById(_, id) {
    return users(findBy('id', id))
  }
  public findUserByEmail(_, email) {
    const user = users(findBy('email', email))

    return user
  }
  public async userExistsByEmail(_, email) {
    const user = this.findUserByEmail(_, email)

    return !!user
  }

  // the _createUser and _updateUser methods are just helper methods, they are not used by graphql-authentication.
  public _createUser(_, data) {
    const newUser = merge({ id: shortid.generate(), isSuper: false }, data)
    users.write(append(newUser))

    return newUser
  }

  public _updateUser(_, userId, data) {
    const findUser = findBy('id', userId)

    const user = users(findUser)
    const updatedUser = merge(user, data)

    const updater = map(when(propEq('id', userId), always(updatedUser)))

    users.write(updater)

    return updatedUser
  }

  public createUserBySignup(ctx, data) {
    return this._createUser(ctx, data)
  }
  public createUserByInvite(ctx, data) {
    return this._createUser(ctx, data)
  }
  public updateUserConfirmToken(ctx, userId, data) {
    return this._updateUser(ctx, userId, data)
  }
  public updateUserLastLogin(ctx, userId, data) {
    return this._updateUser(ctx, userId, data)
  }
  public updateUserPassword(ctx, userId, data) {
    return this._updateUser(ctx, userId, data)
  }
  public updateUserResetToken(ctx, userId, data) {
    return this._updateUser(ctx, userId, data)
  }
  public updateUserInfo(ctx, userId, data) {
    return this._updateUser(ctx, userId, data)
  }
  public updateUserCompleteInvite(ctx, userId, data) {
    return this._updateUser(ctx, userId, data)
  }
}
