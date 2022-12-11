//2
import mongoose from "mongoose"

const personSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number
        },
        favoriteFoods : {
            type: Array 
        }
       
    }
)


export default mongoose.model('personschema', personSchema)