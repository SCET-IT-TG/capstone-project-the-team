import express from 'express';  
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { nanoid } from 'nanoid';
dotenv.config();




const app = express();

app.use(cors());
app.use(express.json());

//database connection

mongoose.connect(process.env.DATABASE_URL).then(() => {
    console.log('Database connected successfully');
}).catch((err) => {     
    console.log('Database connection failed', err);
});

const urlSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    clicks: { type: Number, default: 0 },  
});

const Url = mongoose.model('Url', urlSchema);

// Routes
app.post('/api/short', async (req, res) => {
    console.log(req.body);
    const { originalUrl } = req.body;
    const shortUrl = nanoid(6); // Generate a unique short URL
    if (!originalUrl) {
        return res.status(400).json({ error: 'Original URL is required' });
    }

    try {
        const newUrl = new Url({ originalUrl, shortUrl });
        await newUrl.save();
        res.status(201).json({ originalUrl, shortUrl });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create short URL' });
    }
}
);

app.get('/:shortUrl', async (req, res) => {
    try{
        const { shortUrl } = req.params;
        const url= await Url.findOne({ shortUrl });
        if(url){
            url.clicks++;
            await url.save();
            return res.redirect(url.originalUrl);
        }
        else{
            return res.status(404).json({ error: 'URL not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to redirect' });
    }
}); 


app.get('/', function (req, res)  {   
    res.send("Hello from the 'root' URL")
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});