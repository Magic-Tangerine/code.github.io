import Main from './components/Main.vue'
import AddBlog from './components/AddBlog.vue'
import Person from './components/Person.vue'
import Article from './components/Article.vue'
import SingleBlog from './components/SingleBlog.vue'
export default[
    {path:"/",component:Main},
    {path:"/add",component:AddBlog},
    {path:"/person",component:Person},
    {path:"/article",component:Article},
    {path:"/blog/:id",component:SingleBlog}
]