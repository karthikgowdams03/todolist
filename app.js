const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const app = express();
const _ =require('lodash');
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect('mongodb+srv://karthikgowdams27:test123@cluster-todolist.6lrdlcq.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true })


// Items Schema And Model
const itemSchema = new mongoose.Schema({
    name: String
});


const Item = mongoose.model('Item', itemSchema);

const item1 = new Item({
    name: 'welcome to todolist!'
});

const item2 = new Item({
    name: 'save using + button'
});

const item3 = new Item({
    name: '<-- hit this to delete an item'
});

const defaultItems = [item1, item2, item3];


// List Schema
const listSchema = new mongoose.Schema({
    name: String,
    items: [itemSchema]
});

const List = mongoose.model('List', listSchema);

// async callback because find is asynchronous function
app.get('/', async (req, res) => {

    const data = await Item.find({});
    if (data.length === 0) {
        Item.insertMany(defaultItems);
        res.redirect('/');
    }
    else {
        res.render('list', { listTitle: 'Today', newitem: data }); // {ejs:js}
    }
    // console.log(data);
});


// app.post('/', async (req, res) => {
//     const listname=req.body.list;
    
//     // console.log(listname);

//     const itemName = req.body.newitem;
//     const item = new Item({
//         name: itemName
//     });

//     if(listname==="Today")
//     {
//         await item.save();
//         res.redirect('/');
//     }
//     else{
//        const found=await List.findOne({name:listname}).exec();
//        found.items.push(item);
//        found.save();
//        res.redirect('/'+listname);
//     }
// });

// app.get('/:ListName', async (req, res) => {
//     const ListName = _.capitalize(req.params.ListName);
//     // console.log(ListName);

//     const found=await List.findOne({name:ListName}).exec();
//     // console.log(typeof(found));
//     if (!found) {
//         // console.log("doesn't exists");
//         const list = new List({
//             name: ListName,
//             items: defaultItems
//         });
//         list.save();
//         res.redirect('/'+ListName);
//     }
//     else{
//         // console.log("exists");
//         res.render('List',{listTitle:found.name,newitem:found.items});  
//     }
// });

// app.post('/delete', async (req, res) => {
//    const itemid = req.body.checkbox;
//    const listname=req.body.listname;
//     // console.log(listname);
//    if(listname==="Today")
//    {
//     // console.log(itemid);
//     await Item.findByIdAndRemove(itemid).exec();
//     res.redirect('/');
//    }

//    else{
//     // console.log(itemid);
//     await List.findOneAndUpdate({name:listname},{$pull:{items:{_id:itemid}}}).exec();
//     res.redirect('/'+listname);
//    }
    
// });

app.get("/about", (req, res) => {
    res.render('about');
});



app.listen(port, () => {
    console.log(`listening at port ${port}`);
});


