import Backbone from 'backbone';
import template from './template';

const ArtistModel = Backbone.Model.extend({
    defaults: {
        title: 'base title',
        link: 'base link',
        image: 'base image',
        description: ''
    }
});

const ArtistView = Backbone.View.extend({
    template
});

export {ArtistModel, ArtistView}