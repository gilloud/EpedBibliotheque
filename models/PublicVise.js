var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * PostCategory Model
 * ==================
 */

var PublicVise = new keystone.List('PublicVise', {
	autokey: { from: 'name', path: 'key', unique: true }
});

PublicVise.add({
	name: { type: String, required: true }
});

PublicVise.relationship({ref: 'Livre', path: 'public'});

PublicVise.register();
