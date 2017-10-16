import Backbone from 'backbone';
import template from './template';

const PagePostModel = Backbone.Model.extend({
    defaults: {
        title: 'base title',
        link: 'base link'
    }
});

const PagePostView = Backbone.View.extend({
    template
});

export {PagePostModel, PagePostView}