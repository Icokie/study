import 'bootstrap'
import 'jquery'
import _ from 'underscore'
import Backbone from 'backbone'

const App = Backbone.View.extend({
    el:'#app',
    template: _.template('<article class="card"><header class="card-body"><a class="card-title" href="#">Thomas Newman - Dead Already</a></header></article>'),
    initialize: function() {

        this.render()

    },
    render: function() {

        this.$el.html(this.template())

    }
})

const layout = new App()
console.log(layout)
