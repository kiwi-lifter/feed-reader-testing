/* feedreader.js
 *
 * Tests placed within the $() function - since some tests require DOM elements -
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    describe('RSS Feeds', function() {
		
        // Test that the allFeeds variable has been defined and that it is not empty.
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('each feed has a defined URL and the URL is not an empty string', function() {
            for (var i = 0, len = allFeeds.length; i < len; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        /* Test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('each feed has a defined name and the name is not an empty string', function() {
            for (var i = 0, len = allFeeds.length; i < len; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });

    });

    describe('The menu', function() {
		
        // Test that ensures the menu element is hidden by default.
        it('on first page load is hidden', function() {
            $(document).ready(function() {
                expect($('body').hasClass('menu-hidden')).toBeTruthy();
            });
        });

        /* Test the menu changes visibility when the menu icon is clicked -
         *  does the menu display when clicked and does it hide when clicked again.
         */

        it('changes visibility when hamburger icon is clicked', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBeFalsy();
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBeTruthy();

        });

    });

    describe('Initial Entries', function() {

        /* Tests that the loadFeed function is called and on completion there is at least
         * a single .entry element within the .feed container.
         */

        // loadFeed() is asynchronous so needs to be handled with a beforeEeach and callback function done().
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('loads minimum of 1 .entry element to the .feed container', function(done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });

    });

    describe('New Feed Selection', function() {

        // When a new feed is loaded by the loadFeed function test that the content actually changes.
      
        // Vars for the original and new feeds to be compared for changes.
        var firstFeed;
        var secondFeed;

        // loadFeed() is asynchronous so needs to be handled with a beforeEeach and callback function done().
        beforeEach(function(done) {
            loadFeed(0, function() {
                firstFeed = $('.feed').html();
                loadFeed(1, function() {
                    secondFeed = $('.feed').html();
                    done();
                });
            });
        });

        it('changes the content when new feed is loaded', function(done) {
            expect(firstFeed != secondFeed).toBe(true);
            done();
        });
		
    });
	
}());