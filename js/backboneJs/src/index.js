import $ from 'jquery'
import _ from 'underscore'
import Backbone from 'backbone'
import PostTemplate from './templates/post'

// model for posts 
const Post = Backbone.Model.extend({
    defaults: {
        title: 'base title',
        link: '#base link',
        checked: false
    }
})

// collection of posts 
const PostList = Backbone.Collection.extend({
    // wil hold objects of model post 
    model: Post
})

// prefill collection
const Posts = new PostList([
    new Post({ title: 'first post', link: '#postLink' }),
    new Post({ title: 'second post', link: '#postLink' })
])

// print posts
const PostsView = Backbone.View.extend({
    template: PostTemplate,
    events: {
        'click .like': 'updateLike'
    },
    updateLike: function() {

        console.log('click ', this.model)

    },
    initialize: function() {

        this.listenTo(this.model, 'change', this.render)

    },
    render() {

        this.$el.html(this.template({ title: this.model.get('title'), link: this.model.get('link') }))
        return this

    }
})

const App = Backbone.View.extend({
    el: '#app',
    initialize: function() {

        this.list = $('#list')

        this.listenTo(Posts, 'change', this.render)
        Posts.each(function(post) {

            const view = new PostsView({ model: post })
            this.list.append(view.render().el)

        }, this)

    }
})

const Application = new App()
console.log(Application)