import 'underscore'
import 'jquery'
import Backbone from 'backbone'

const AppView = Backbone.View.extend({
    el: '#app',
    initialize: function() {

        this.render()

    },

    render: function() {

        this.$el.html('hello world')

    }

})

const view = new AppView()
console.log('start:', view)
