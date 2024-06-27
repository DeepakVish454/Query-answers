import mongoose from 'mongoose'

mongoose
  .connect('mongodb://localhost:27017',)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(() => {
    console.log('Error connecting to MongoDB')
  })

  const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    reply: {
        type: Array,
        required: false
    },
})

const collection = new mongoose.model('users', schema);

export default collection;
