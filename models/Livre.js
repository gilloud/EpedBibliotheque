var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Livre = new keystone.List('Livre', {
    map: {name: 'titre'},
	autokey: { path: 'slug', from: 'title', unique: true }
});

Livre.add({
    titre: {type: String, required: true, initial: true},
    auteur: {type: String, index: true, required: true, initial: true},
    resume: {type: Types.Html, wysiwyg: true, height: 150, required: true, initial: true},
    nb_pages: {type: Number, required: false, initial: true},
    categories: {type: Types.Relationship, ref: 'Categorie', many: true, initial: true},
    public: {type: Types.Relationship, ref: 'PublicVise', many: true, initial: true},
    proprietaire: {type: Types.Relationship, ref: 'User', many: false, initial: true},

});


Livre.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Livre.register();
