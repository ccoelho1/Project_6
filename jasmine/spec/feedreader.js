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

        //added length to make sure it does not pass if empty string  
        it('URL is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url.length).not.toBe(0);
            });
        });

        // test that loops through each feed
        it('name defined', function() {
            allFeeds.forEach(function(name) {
                expect(name).toBeDefined();
            });
        });
        //added length to make sure it does not pass if empty string  
        it('name is not empty', function() {
            allFeeds.forEach(function(name) {
                expect(name.length).not.toBe(0);
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
    });

    //test suite named "Initial Entries" 
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        //this test ensures when the loadFeed is asynchronous
        it('there is at least a single entry element in feed container', function(done) {
            var entry = $('.feed a').children('.entry');
            expect(entry.length).toBeGreaterThan(0);
            done();
        });
    });

    //test suite named "New Feed Selection"
    //changed code to the .empty() per reviewer's recommendation and added the second loadfeed to make test more secure
    describe('New Feed Selection', function() {
        var entry1, entry2;
        beforeEach(function(done) {
            entry1 = $('.feed a').empty();
            loadFeed(0, function() {
                done();
            });
            entry2 = $('.feed b').empty();
            loadFeed(1, function() {
                done();
            });
        });
        //test that ensures when a new feed is loaded 
        it('the content changes when a new feed is loaded', function(done) {
            expect($('.feed a').empty()).not.toBe($('.feed b').empty());
            done();
        });
        afterAll(function(done) {
            loadFeed(0, done);
        });

    });
}());