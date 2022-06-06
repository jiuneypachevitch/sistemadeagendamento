
import mongoose from 'mongoose';
export default mongoose.connect('mongodb+srv://sistemadeagendamento:<suasenhaaqui>@cluster0.tdlad.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true 
});
