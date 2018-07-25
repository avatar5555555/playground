import { find, identity, propEq } from 'ramda'

const findByEq = (id) => find(propEq('id', id))

const resolvers = {
  Query: {
    video: async (_, { id }, { db }) => {
      const video = db.videos(findByEq(id))

      return video
    },

    videos: (_, __, { db }) => {
      const videos = db.videos(identity)

      return videos
    }
  }
}

export default resolvers
