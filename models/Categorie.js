var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * PostCategory Model
 * ==================
 */

var Categorie = new keystone.List('Categorie', {
	autokey: { from: 'name', path: 'key', unique: true }
});

Categorie.add({
	name: { type: String, required: true }
});

Categorie.relationship({ref: 'Livre', path: 'categories'});

Categorie.register();
