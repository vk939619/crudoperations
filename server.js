const express = require('express')
const app = express()
const articleRouter = require('./routes/articles')
const mongoose = require('mongoose')
const Article = require('./models/article')
const methodOverride = require('method-override')
const port = process.env.PORT || 3000
const DB = "mongodb+srv://vk939619:Redhat@12345@cluster0.mu1ez.mongodb.net/blogdbb?retryWrites=true&w=majority"

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log(`connection successful`);
}).catch((err) => console.log(`no connection`))

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))


app.set('view engine', 'ejs')
app.get('/', async(req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })

    res.render("articles/index", { articles: articles })
})
app.use('/articles', articleRouter)
app.listen(port, () => {
    console.log(`running at ${port}`)
})