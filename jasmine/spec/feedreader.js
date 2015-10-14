/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // test that loops through each feed
        it('URL defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
            });
        });

        // added length to make sure it does not pass if empty string  
        // Changed from not.toBe(0) to .toBeGreaterThan(0)
        it('URL is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url.length).toBeGreaterThan(0);
            });
        });
        // test that loops through each feed
        // updated the name to feed.name
        it('name defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
            });
        });
        // added length to make sure it does not pass if empty string  
        // Changed from not.toBe(0) to .toBeGreaterThan(0)
        it('name is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name.length).toBeGreaterThan(0);
            });
        });

    });
    //test suite named "The menu" to make sure menu hides by default when clicked
    describe('The Menu', function() {
        it('hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBeDefined();
        });
    });
    //test that ensures the menu changes visibility when the menu icon is clicked. 
    it('changes visibility when menu clicked', function() {
        $('.menu-icon-link').trigger('click');
        expect($('body').hasClass('menu-hidden')).toBe(false);
        $('.menu-icon-link').trigger('click');
        //added second expectation to make sure Menu changes when clicked
        expect($('body').hasClass('menu-hidden')).toBe(true);
    });
    //test suite named "Initial Entries" 
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        //this test ensures when the loadFeed is asynchronous
        it('there is at least a single entry element in feed container', function() {
            var entry = $('.feed a').children('.entry');
            expect(entry.length).toBeGreaterThan(0);
        });
    });
    //test suite named "New Feed Selection"
    //changed code to the .empty() per reviewer's recommendation and added the second loadfeed to make test more secure
    //Changed this around again still not testing properly
    describe('New Feed Selection', function() {
        var entry1, entry2;
        beforeEach(function(done) {
            $('feed').empty();
            loadFeed(0, function() {
                //added the `.html()` to extract the html content from the jQuery object.
                entry1 = $('.feed .entry').html(); 
                loadFeed(1, function() {
                //added the `.html()` to extract the html content from the jQuery object.
                entry2 = $('.feed .entry').html(); 
                done();
                });
            });
        });
        //test that ensures when a new feed is loaded 
        //calling old entry not to be the same as the new entry
        it('the content changes when a new feed is loaded', function() {
            expect(entry1).not.toBe(entry2);
        });
        afterAll(function(done) {
            loadFeed(0, done);
        });

    });
}());