const express = require('express')
const app = express()
const articleRouter = require('./routes/articles')
const mongoose = require('mongoose')
const Article = require('./models/article')
const methodOverride = require('method-override')
const port = process.env.PORT || 3000

mongoose.connect('mongodb://localhost:27017/blogdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
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