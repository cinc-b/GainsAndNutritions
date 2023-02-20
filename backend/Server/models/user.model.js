import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const storageSchema = new Schema({
    id: {
      type: Number,
      required: true
    },
    location: {
        type: String,
        required: true,
        trim: true,
        default: "Home"
    },
    storedFood: []
},{ _id : false });

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 6
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },
    gender: {
        type: String,
        required: true,
        trim: true,
        enum: ["male", "female"]
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    age: {
        type: Number,
        required: true,
        min: 18
    },
    weight: {
        type: Number,
        required: true,
        min: 40
    },
    height: {
        type: Number,
        required: true,
        min: 150
    },
    targetWeight: {
        type: Number,
        required: function() {
                    return this.weight < this.targetWeight;
                }
    },
    goal: {
        type: String,
        required: true,
        trim: true,
        enum: ["lose", "stay", "gain"]
    },
    calorieGoal: {
        type: Number,
        required: true,
    },
    carbs: {
        type: Number,
        required: true,
    },
    protein: {
        type: Number,
        required: true,
    },
    fat: {
        type: Number,
        required: true,
    },
    storage: {
        type: [storageSchema],
        required: true,
        default: {id: 0, location: "Home", storedFood: []}
    },
    extraMeals: {
        type: [{
            type: String,
            trim: true
        }]
    }
});

//doc gibts erst wenns in da database is
/*userSchema.post('save', (doc, next) => {
    console.log('new user was created & saved', doc);
    next();
})*/

//hier KEINE ARROW-Function weil man sonst nicht "this" benutzen kann, doc gibts noch nicht und das heißt
//man hätte kein zugriff auf des Objekt, welches man speichern will
//this - local instants of user before we saved it
//wir brauchen auch async weil bcrypt.genSalt() async is und man await setzen muss
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)

    next();
})

const User = mongoose.model('User', userSchema);

export default User;