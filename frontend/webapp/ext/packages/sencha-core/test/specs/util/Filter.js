describe("Ext.util.Filter", function() {
    var filter;

    describe("construction", function() {
        var createFilter = function(config) {
            return function() {
                new Ext.util.Filter(config);
            };
        };

        it("should accept a property and value", function() {
            expect(createFilter({property: 'test', value: 'a'})).not.toThrow();
        });

        it("should accept a false", function() {
            expect(createFilter({property: 'test', value: false})).not.toThrow();
        });

        it("should accept a 0", function() {
            expect(createFilter({property: 'test', value: 0})).not.toThrow();
        });

        it("should accept a ''", function() {
            expect(createFilter({property: 'test', value: ''})).not.toThrow();
        });

        it("should accept a filter function", function() {
            expect(createFilter({filterFn: Ext.emptyFn})).not.toThrow();
        });

        it("should require at least a filter function or a property/value combination", function() {
            expect(createFilter()).toThrow();
        });
    });

    describe("disableOnEmpty", function() {
        var filter;

        function makeFilter(v) {
            filter = new Ext.util.Filter({
                disableOnEmpty: true,
                property: 'foo',
                value: v
            });
        }

        it("should disable when the value is ''", function() {
            makeFilter('');
            expect(filter.getDisabled()).toBe(true);
        });

        it("should disable when the value is null", function() {
            makeFilter(null);
            expect(filter.getDisabled()).toBe(true);
        });
    });

    describe("creating filter functions", function() {
        var edRecord     = {name: 'Ed'},
            tedRecord    = {name: 'Ted'},
            abeRecord    = {name: 'Abe'},
            edwardRecord = {name: 'Edward'};

        it("should honor a simple property matcher", function() {
            filter = new Ext.util.Filter({
                property: 'name',
                value   : 'Ed'
            });
            
            var fn = filter.getFilterFn(); 

            expect(fn(edRecord)).toBe(true);
            expect(fn(edwardRecord)).toBe(true);
            expect(fn(tedRecord)).toBe(false);
            expect(fn(abeRecord)).toBe(false);
        });

        it("should honor anyMatch", function() {
            filter = new Ext.util.Filter({
                anyMatch: true,
                property: 'name',
                value   : 'Ed'
            });

            var fn = filter.getFilterFn(); 
            
            expect(fn(edRecord)).toBe(true);
            expect(fn(edwardRecord)).toBe(true);
            expect(fn(tedRecord)).toBe(true);
            expect(fn(abeRecord)).toBe(false);
        });

        it("should honor exactMatch", function() {
            filter = new Ext.util.Filter({
                exactMatch: true,
                property  : 'name',
                value     : 'Ed'
            });
            
            var fn = filter.getFilterFn(); 

            expect(fn(edRecord)).toBe(true);
            expect(fn(edwardRecord)).toBe(false);
            expect(fn(tedRecord)).toBe(false);
            expect(fn(abeRecord)).toBe(false);
        });

        it("should honor case sensitivity", function() {
            filter = new Ext.util.Filter({
                caseSensitive: true,
                property     : 'name',
                value        : 'Ed'
            });
            
            var fn = filter.getFilterFn(); 

            expect(fn(edRecord)).toBe(true);
            expect(fn(edwardRecord)).toBe(true);
            expect(fn(tedRecord)).toBe(false);
        });

        it("should honor case sensitivity and anyMatch", function() {
            filter = new Ext.util.Filter({
                caseSensitive: true,
                anyMatch     : true,
                property     : 'name',
                value        : 'ed'
            });
            
            var fn = filter.getFilterFn(); 

            expect(fn(tedRecord)).toBe(true);
            expect(fn(edRecord)).toBe(false);
            expect(fn(edwardRecord)).toBe(false);
        });

        it("should honor the root property", function() {
            var users = [{
                data: {name: 'Ed'}
            }, {
                data: {name: 'Ted'}
            }, {
                data: {name: 'Edward'}
            }, {
                data: {name: 'Abe'}
            }];

            var filter = new Ext.util.Filter({
                root    : 'data',
                property: 'name',
                value   : 'Ed'
            });
            
            var fn = filter.getFilterFn(); 

            expect(fn(users[0])).toBe(true);
            expect(fn(users[2])).toBe(true);
            expect(fn(users[1])).toBe(false);
            expect(fn(users[3])).toBe(false);
        });
    });
});
