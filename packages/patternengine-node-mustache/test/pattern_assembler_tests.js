(function () {
	"use strict";

	var pa = require('../builder/pattern_assembler');
  var of = require('../builder/object_factory');

	exports['pattern_assembler'] = {
		'find_pattern_partials finds partials' : function(test){
      test.expect(3);

			//setup current pattern from what we would have during execution
			var currentPattern = new of.oPattern(
        '/home/fakeuser/pl/source/_patterns/01-molecules/00-testing/00-test-mol.mustache', // abspath
        '01-molecules\\00-testing', // subdir
        '00-test-mol.mustache', // filename,
        null // data
      );
      currentPattern.template = "<h1>{{> molecules-comment-header}}</h1><div>{{> molecules-single-comment(description: 'A life is like a garden. Perfect moments can be had, but not preserved, except in memory.') }}</div>";

			var results = currentPattern.findPartials();
			test.equals(results.length, 2);
			test.equals(results[0], '{{> molecules-comment-header}}');
			test.equals(results[1], '{{> molecules-single-comment(description: \'A life is like a garden. Perfect moments can be had, but not preserved, except in memory.\') }}');

			test.done();
		},

		'find_pattern_partials finds verbose partials' : function(test){
      test.expect(3);

			//setup current pattern from what we would have during execution
      var currentPattern = new of.oPattern(
        '/home/fakeuser/pl/source/_patterns/01-molecules/00-testing/00-test-mol.mustache', // abspath
        '01-molecules\\00-testing', // subdir
        '00-test-mol.mustache', // filename,
        null // data
      );
      currentPattern.template = "<h1>{{> 01-molecules/06-components/03-comment-header.mustache }}</h1><div>{{> 01-molecules/06-components/02-single-comment(description: 'A life is like a garden. Perfect moments can be had, but not preserved, except in memory.') }}</div>";

			var results = currentPattern.findPartials();
			test.equals(results.length, 2);
			test.equals(results[0], '{{> 01-molecules/06-components/03-comment-header.mustache }}');
			test.equals(results[1], '{{> 01-molecules/06-components/02-single-comment(description: \'A life is like a garden. Perfect moments can be had, but not preserved, except in memory.\') }}');
			test.done();
		},

		'find_pattern_partials_with_style_modifiers finds style modifiers' : function(test){
      test.expect(2);

			//setup current pattern from what we would have during execution

      var currentPattern = new of.oPattern(
        '/home/fakeuser/pl/source/_patterns/01-molecules/00-testing/00-test-mol.mustache', // abspath
        '01-molecules\\00-testing', // subdir
        '00-test-mol.mustache', // filename,
        null // data
      );
			currentPattern.template = "<h1>{{> molecules-comment-header}}</h1><div>{{> molecules-single-comment:foo }}</div>";

			var results = currentPattern.findPartialsWithStyleModifiers();
			test.equals(results.length, 1);
			test.equals(results[0], '{{> molecules-single-comment:foo }}');

			test.done();
		},

		'find_pattern_partials_with_style_modifiers finds style modifiers with parameters present too' : function(test){
      test.expect(2);

			//setup current pattern from what we would have during execution

      var currentPattern = new of.oPattern(
        '/home/fakeuser/pl/source/_patterns/01-molecules/00-testing/00-test-mol.mustache', // abspath
        '01-molecules\\00-testing', // subdir
        '00-test-mol.mustache', // filename,
        null // data
      );
			currentPattern.template = "<h1>{{> molecules-comment-header}}</h1><div>{{> molecules-single-comment:foo(bar:'baz') }}</div>";

			var results = currentPattern.findPartialsWithStyleModifiers();
			test.equals(results.length, 1);
			test.equals(results[0], "{{> molecules-single-comment:foo(bar:'baz') }}");

			test.done();
		},

		'find_pattern_partials_with_style_modifiers finds style modifiers with verbose partials' : function(test){
      test.expect(2);

			//setup current pattern from what we would have during execution
      var currentPattern = new of.oPattern(
        '/home/fakeuser/pl/source/_patterns/01-molecules/00-testing/00-test-mol.mustache', // abspath
        '01-molecules\\00-testing', // subdir
        '00-test-mol.mustache', // filename,
        null // data
      );
			currentPattern.template = "<h1>{{> 01-molecules/06-components/molecules-comment-header}}</h1><div>{{> 01-molecules/06-components/molecules-single-comment:foo }}</div>";

			var results = currentPattern.findPartialsWithStyleModifiers();
			test.equals(results.length, 1);
			test.equals(results[0], '{{> 01-molecules/06-components/molecules-single-comment:foo }}');

			test.done();
		},

		'find_pattern_partials_with_style_modifiers finds no style modifiers when only partials present' : function(test){
      test.expect(1);

			//setup current pattern from what we would have during execution
      var currentPattern = new of.oPattern(
        '/home/fakeuser/pl/source/_patterns/01-molecules/00-testing/00-test-mol.mustache', // abspath
        '01-molecules\\00-testing', // subdir
        '00-test-mol.mustache', // filename,
        null // data
      );
			currentPattern.template = "<h1>{{> molecules-comment-header}}</h1><div>{{> molecules-single-comment }}</div>";

      var results = currentPattern.findPartialsWithStyleModifiers();
			test.equals(results, null);

			test.done();
		},

		'find_pattern_partials_with_style_modifiers finds no style modifiers when only partials with pattern parameters present' : function(test){
      test.expect(1);

			//setup current pattern from what we would have during execution
      var currentPattern = new of.oPattern(
        '/home/fakeuser/pl/source/_patterns/01-molecules/00-testing/00-test-mol.mustache', // abspath
        '01-molecules\\00-testing', // subdir
        '00-test-mol.mustache', // filename,
        null // data
      );
			currentPattern.template = "<h1>{{> molecules-comment-header}}</h1><div>{{> molecules-single-comment(foo: 'bar') }}</div>";

      var results = currentPattern.findPartialsWithStyleModifiers();
			test.equals(results, null);

			test.done();
		},

		'find_pattern_partials_with_parameters finds parameters' : function(test){
      test.expect(2);

			//setup current pattern from what we would have during execution
      var currentPattern = new of.oPattern(
        '/home/fakeuser/pl/source/_patterns/01-molecules/00-testing/00-test-mol.mustache', // abspath
        '01-molecules\\00-testing', // subdir
        '00-test-mol.mustache', // filename,
        null // data
      );
			currentPattern.template = "<h1>{{> molecules-comment-header}}</h1><div>{{> molecules-single-comment(bar:'baz') }}</div>";

      var results = currentPattern.findPartialsWithPatternParameters();
			test.equals(results.length, 1);
			test.equals(results[0], "{{> molecules-single-comment(bar:'baz') }}");

			test.done();

		},

		'find_pattern_partials_with_parameters finds parameters when stylemodifiers present too' : function(test){
      test.expect(2);

			//setup current pattern from what we would have during execution
      var currentPattern = new of.oPattern(
        '/home/fakeuser/pl/source/_patterns/01-molecules/00-testing/00-test-mol.mustache', // abspath
        '01-molecules\\00-testing', // subdir
        '00-test-mol.mustache', // filename,
        null // data
      );
			currentPattern.template = "<h1>{{> molecules-comment-header}}</h1><div>{{> molecules-single-comment:foo(bar:'baz') }}</div>";

      var results = currentPattern.findPartialsWithPatternParameters();
			test.equals(results.length, 1);
			test.equals(results[0], "{{> molecules-single-comment:foo(bar:'baz') }}");

			test.done();
		},

		'find_pattern_partials_with_parameters finds parameters with verbose partials' : function(test){
      test.expect(2);

			//setup current pattern from what we would have during execution
      var currentPattern = new of.oPattern(
        '/home/fakeuser/pl/source/_patterns/01-molecules/00-testing/00-test-mol.mustache', // abspath
        '01-molecules\\00-testing', // subdir
        '00-test-mol.mustache', // filename,
        null // data
      );
			currentPattern.template = "<h1>{{> 01-molecules/06-components/molecules-comment-header}}</h1><div>{{> 01-molecules/06-components/molecules-single-comment(bar:'baz') }}</div>";

      var results = currentPattern.findPartialsWithPatternParameters();
			test.equals(results.length, 1);
			test.equals(results[0], "{{> 01-molecules/06-components/molecules-single-comment(bar:'baz') }}");

			test.done();
		},

		'find_pattern_partials_with_parameters finds no style modifiers when only partials present' : function(test){
      test.expect(1);

			//setup current pattern from what we would have during execution
      var currentPattern = new of.oPattern(
        '/home/fakeuser/pl/source/_patterns/01-molecules/00-testing/00-test-mol.mustache', // abspath
        '01-molecules\\00-testing', // subdir
        '00-test-mol.mustache', // filename,
        null // data
      );
			currentPattern.template = "<h1>{{> molecules-comment-header}}</h1><div>{{> molecules-single-comment }}</div>";

      var results = currentPattern.findPartialsWithPatternParameters();
			test.equals(results, null);

			test.done();
		},

		'find_pattern_partials_with_parameters finds no style modifiers when only partials with style modifiers present' : function(test){
      test.expect(1);

			//setup current pattern from what we would have during execution
      var currentPattern = new of.oPattern(
        '/home/fakeuser/pl/source/_patterns/01-molecules/00-testing/00-test-mol.mustache', // abspath
        '01-molecules\\00-testing', // subdir
        '00-test-mol.mustache', // filename,
        null // data
      );
			currentPattern.template = "<h1>{{> molecules-comment-header}}</h1><div>{{> molecules-single-comment:foo }}</div>";

      var results = currentPattern.findPartialsWithPatternParameters();
			test.equals(results, null);

			test.done();
		},

		'process_pattern_recursive recursively includes partials' : function(test){
      test.expect(3);

			//tests inclusion of partial that will be discovered by diveSync later in iteration than parent
			//prepare to diveSync
			var diveSync = require('diveSync');
			var fs = require('fs-extra');
			var pattern_assembler = new pa();
			var patterns_dir = './test/files/_patterns';
			var patternlab = {};
			patternlab.config = fs.readJSONSync('./config.json');
			patternlab.config.patterns = {source: patterns_dir};
			patternlab.data = fs.readJSONSync('./source/_data/data.json');
			patternlab.listitems = fs.readJSONSync('./source/_data/listitems.json');
			patternlab.header = fs.readFileSync('./source/_patternlab-files/pattern-header-footer/header.html', 'utf8');
			patternlab.footer = fs.readFileSync('./source/_patternlab-files/pattern-header-footer/footer.html', 'utf8');
			patternlab.patterns = [];
			patternlab.data.link = {};
			patternlab.partials = {};

			//diveSync once to perform iterative populating of patternlab object
			diveSync(patterns_dir,
				{
					filter: function(path, dir){
						if(dir){
							var remainingPath = path.replace(patterns_dir, '');
							var isValidPath = remainingPath.indexOf('/_') === -1;
							return isValidPath;
						}
						return true;
					}
				},
				function(err, file){
					//log any errors
					if(err){
						console.log(err);
						return;
					}

					pattern_assembler.process_pattern_iterative(file.substring(2), patternlab);
				}
			);

			//diveSync again to recursively include partials, filling out the
			//extendedTemplate property of the patternlab.patterns elements
			diveSync(patterns_dir,
				{
					filter: function(path, dir){
						if(dir){
							var remainingPath = path.replace(patterns_dir, '');
							var isValidPath = remainingPath.indexOf('/_') === -1;
							return isValidPath;
						}
						return true;
					}
				},
				function(err, file){
					//log any errors
					if(err){
						console.log(err);
						return;
					}

					pattern_assembler.process_pattern_recursive(file.substring(2), patternlab);
				}
			);

			//get test output for comparison
			var foo = fs.readFileSync(patterns_dir + '/00-test/00-foo.mustache', 'utf8').trim();
			var bar = fs.readFileSync(patterns_dir + '/00-test/01-bar.mustache', 'utf8').trim();
			var fooExtended;

			//get extended pattern
			for(var i = 0; i < patternlab.patterns.length; i++){
				if(patternlab.patterns[i].fileName === '00-foo'){
					fooExtended = patternlab.patterns[i].extendedTemplate.trim();
					break;
				}
			}

			//check initial values
			test.equals(foo, '{{> test-bar }}');
			test.equals(bar, 'bar');
			//test that 00-foo.mustache included partial 01-bar.mustache
			test.equals(fooExtended, 'bar');

			test.done();
		},

    'isPatternFile correctly identifies pattern files and rejects non-pattern files': function(test){
      var pattern_assembler = new pa();

      // each test case
      var filenames = {
        '00-comment-thread.mustache': true,
        '00-comment-thread.fakeextthatdoesntexist': false,
        '00-comment-thread': false,
        '_00-comment-thread.mustache': false,
        '.00-comment-thread.mustache': false,
        '00-comment-thread.json': false,
        '00-homepage~emergency.json': false
      };
      // expect one test per test case
      test.expect(Object.keys(filenames).length);

      // loop over each test case and test it
      Object.keys(filenames).forEach(function (filename) {
        var expectedResult = filenames[filename],
            actualResult = pattern_assembler.is_pattern_file(filename),
            testMessage = 'isPatternFile should return ' + expectedResult + ' for ' + filename;
        test.strictEqual(actualResult, expectedResult, testMessage);
      });

      // done
			test.done();
		}
	};
}());
