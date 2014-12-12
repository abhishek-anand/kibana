define(function (require) {
  var _ = require('lodash');
  describe('AggConfig Filters', function () {
    describe('filters', function () {
      var AggConfig;
      var indexPattern;
      var Vis;
      var createFilter;

      beforeEach(module('kibana'));
      beforeEach(inject(function (Private) {
        Vis = Private(require('components/vis/vis'));
        AggConfig = Private(require('components/vis/_agg_config'));
        indexPattern = Private(require('fixtures/stubbed_logstash_index_pattern'));
        createFilter = Private(require('components/agg_types/buckets/create_filter/filters'));
      }));

      it('should return a filters filter', function () {
        var vis = new Vis(indexPattern, {
          type: 'histogram',
          aggs: [
            {
              type: 'filters',
              schema: 'segment',
              params: {
                filters: [
                  { query: { query_string: { query: '_type:apache' } } },
                  { query: { query_string: { query: '_type:nginx' } } }
                ]
              }
            }
          ]
        });

        var aggConfig = vis.aggs.byTypeName.filters[0];
        var filter = createFilter(aggConfig, '_type:nginx');
        expect(filter).to.be(aggConfig.params.filters[1]);
        expect(filter.meta).to.have.property('index', indexPattern.id);

      });

    });
  });
});