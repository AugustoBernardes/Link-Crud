const Link = require('../models/Link')


const redirect = async (req,res) => {
    
    let title = req.params.title

    try {
        let doc = await Link.findOneAndUpdate({title}, {$inc:{click:1}})
        if(doc){
            res.redirect(doc.url)
        }else{
            res.render('erro', {title})
        }

    } catch (error) {
        res.send(error)
    }
}

const addLink = async (req,res) => {

    let linkTitle = req.body.title

    let linkUrl = req.body.url

    let validation = linkUrl.startsWith('https://')


    // Validating if someone added a card with add name to never happen a error
    if(linkTitle == 'add' || validation === false){
        res.render('erro', {linkTitle,linkUrl, title:null})
    } else{
        // let link = new Link(req.body)

        let link = {
            title:req.body.title.toLowerCase(),
            description:req.body.description,
            url:req.body.url
        }

        link = new Link(link)

        try {
            let doc = await link.save()
            res.setHeader('X-Foo', 'bar');
            res.setHeader('Content-Type', 'text/plain');

            res.redirect('/')
        } catch (error) {
            res.render('add',{ error, body:req.body })
        }
    }

}

const allLinks = async (req,res) => {
    try {
        let docs = await Link.find({});
        res.render('all', {links: docs})
    } catch (error) {
        res.send(error)
    }
}

const deleteLink = async (req,res) => {

    let id = req.params.id
    if(!id){
        id = req.body.id
    }

    try {
      await Link.findByIdAndDelete(id)
      res.redirect('/')
    } catch (error) {
        res.status(404).send(error)
    }

}

const loadLink = async (req,res) => {

    let id = req.params.id

    try {
        let doc = await Link.findById(id)
        res.render('edit', {error:false, body: doc})
    } catch (error) {
        res.status(404).send(error)
    }

}

const editLink = async (req,res) => {


    let link = {
        title : req.body.title.toLowerCase(),
        description : req.body.description,
        url : req.body.url,
    };


    let linkTitle = req.body.title
    let linkUrl = req.body.url

    let validation = linkUrl.startsWith('https://')

    let id = req.params.id
    if(!id){
        id = req.body.id
    }

    if(link.title == 'add' || validation === false){
        res.render('erro', {linkTitle,linkUrl,title:null})
    } else{
        try {
            let doc = await Link.updateOne({_id:id}, link)
            res.setHeader('X-Foo', 'bar');
            res.setHeader('Content-Type', 'text/plain');
    
            res.redirect('/')
        } catch (error) {
            res.render('edit',{ error, body:req.body })
        }
    }   

}

module.exports = { redirect, addLink, allLinks , deleteLink , loadLink, editLink}