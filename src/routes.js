import Main from './components/Main.vue'
import AddBlog from './components/AddBlog.vue'
import Person from './components/Person.vue'
import Article from './components/Article.vue'
import SingleBlog from './components/SingleBlog.vue'
import EditBlog from './components/EditBlog.vue'
import SingleStudent from './components/SingleStudent.vue'
import MajorIntro from './components/MajorIntro.vue'

export default[
    {path:"/",component:Main},
    {path:"/person",component:Person},
    {path:"/article",component:Article},
    {path:"/majorintro",component:MajorIntro},

    {path:"/article/add",component:AddBlog},
    {path:"/blog/:id",component:SingleBlog},
    {path:"/blog/edit/:id",component:EditBlog},
    {path:"/person/student/:id",component:SingleStudent},

]