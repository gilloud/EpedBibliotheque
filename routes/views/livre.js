var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Init locals
    locals.section = 'livre';
	locals.filters = {
        categorie: req.params.categorie
	};
	locals.data = {
        livres: [],
		categories: []
	};
	
	// Load all categories
	view.on('init', function(next) {
		
        keystone.list('Categorie').model.find().sort('name').exec(function(err, results) {
			
			if (err || !results.length) {
				return next(err);
			}
			
			locals.data.categories = results;
			
			// Load the counts for each category
			async.each(locals.data.categories, function(category, next) {
				
                keystone.list('Livre').model.count().where('categories').in([category.id]).exec(function(err, count) {
                    category.livreCount = count;
					next(err);
				});
				
			}, function(err) {
				next(err);
			});
			
		});
		
	});
	
	// Load the current category filter
	view.on('init', function(next) {
		
        if (req.params.categorie) {
            keystone.list('Categorie').model.findOne({key: locals.filters.categorie}).exec(function(err, result) {
                locals.data.categorie = result;
				next(err);
			});
		} else {
			next();
		}
		
	});
	
	// Load the posts
	view.on('init', function(next) {
		
        var q = keystone.list('Livre').paginate({
				page: req.query.page || 1,
				perPage: 10,
				maxPages: 10
			})
			.sort('-publishedDate')
                .populate('categories public proprietaire');
		
        if (locals.data.categorie) {
            q.where('categories').in([locals.data.categorie]);
		}
		
		q.exec(function(err, results) {
            locals.data.livres = results;
			next(err);
		});
		
	});
	
	// Render the view
    view.render('livre');
	
};
