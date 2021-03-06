'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sortBy2 = require('lodash/sortBy');

var _sortBy3 = _interopRequireDefault(_sortBy2);

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _range2 = require('lodash/range');

var _range3 = _interopRequireDefault(_range2);

var _throttle2 = require('lodash/throttle');

var _throttle3 = _interopRequireDefault(_throttle2);

var _isNil2 = require('lodash/isNil');

var _isNil3 = _interopRequireDefault(_isNil2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Surface = require('../container/Surface');

var _Surface2 = _interopRequireDefault(_Surface);

var _Layer = require('../container/Layer');

var _Layer2 = _interopRequireDefault(_Layer);

var _Tooltip = require('../component/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _Legend = require('../component/Legend');

var _Legend2 = _interopRequireDefault(_Legend);

var _Curve = require('../shape/Curve');

var _Curve2 = _interopRequireDefault(_Curve);

var _Cross = require('../shape/Cross');

var _Cross2 = _interopRequireDefault(_Cross);

var _Sector = require('../shape/Sector');

var _Sector2 = _interopRequireDefault(_Sector);

var _Dot = require('../shape/Dot');

var _Dot2 = _interopRequireDefault(_Dot);

var _Rectangle = require('../shape/Rectangle');

var _Rectangle2 = _interopRequireDefault(_Rectangle);

var _ReactUtils = require('../util/ReactUtils');

var _CartesianAxis = require('../cartesian/CartesianAxis');

var _CartesianAxis2 = _interopRequireDefault(_CartesianAxis);

var _Brush = require('../cartesian/Brush');

var _Brush2 = _interopRequireDefault(_Brush);

var _DOMUtils = require('../util/DOMUtils');

var _DataUtils = require('../util/DataUtils');

var _ChartUtils = require('../util/ChartUtils');

var _PolarUtils = require('../util/PolarUtils');

var _PureRender = require('../util/PureRender');

var _Events = require('../util/Events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ORIENT_MAP = {
  xAxis: ['bottom', 'top'],
  yAxis: ['left', 'right']
};

var originCoordinate = { x: 0, y: 0 };

var generateCategoricalChart = function generateCategoricalChart(_ref) {
  var _class, _temp, _initialiseProps;

  var chartName = _ref.chartName,
      GraphicalChild = _ref.GraphicalChild,
      _ref$eventType = _ref.eventType,
      eventType = _ref$eventType === undefined ? 'axis' : _ref$eventType,
      axisComponents = _ref.axisComponents,
      legendContent = _ref.legendContent,
      formatAxisMap = _ref.formatAxisMap,
      defaultProps = _ref.defaultProps,
      propTypes = _ref.propTypes;
  var CategoricalChartWrapper = (_temp = _class = function (_Component) {
    _inherits(CategoricalChartWrapper, _Component);

    function CategoricalChartWrapper(props) {
      _classCallCheck(this, CategoricalChartWrapper);

      var _this = _possibleConstructorReturn(this, (CategoricalChartWrapper.__proto__ || Object.getPrototypeOf(CategoricalChartWrapper)).call(this, props));

      _initialiseProps.call(_this);

      var defaultState = _this.constructor.createDefaultState(props);
      var updateId = 0;
      _this.state = _extends({}, defaultState, { updateId: 0
      }, _this.updateStateOfAxisMapsOffsetAndStackGroups(_extends({ props: props }, defaultState, { updateId: updateId })));

      _this.uniqueChartId = (0, _isNil3.default)(props.id) ? (0, _DataUtils.uniqueId)('recharts') : props.id;

      if (props.throttleDelay) {
        _this.triggeredAfterMouseMove = (0, _throttle3.default)(_this.triggeredAfterMouseMove, props.throttleDelay);
      }
      return _this;
    }

    /* eslint-disable  react/no-did-mount-set-state */


    /**
     * Returns default, reset state for the categorical chart.
     * @param {Object} props Props object to use when creating the default state
     * @return {Object} Whole new state
     */


    _createClass(CategoricalChartWrapper, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (!(0, _isNil3.default)(this.props.syncId)) {
          this.addListener();
        }
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var _props = this.props,
            data = _props.data,
            children = _props.children,
            width = _props.width,
            height = _props.height,
            layout = _props.layout,
            stackOffset = _props.stackOffset,
            margin = _props.margin;
        var updateId = this.state.updateId;


        if (nextProps.data !== data || nextProps.width !== width || nextProps.height !== height || nextProps.layout !== layout || nextProps.stackOffset !== stackOffset || !(0, _PureRender.shallowEqual)(nextProps.margin, margin)) {
          var defaultState = this.constructor.createDefaultState(nextProps);
          this.setState(_extends({}, defaultState, { updateId: updateId + 1
          }, this.updateStateOfAxisMapsOffsetAndStackGroups(_extends({ props: nextProps }, defaultState, { updateId: updateId + 1 }))));
        } else if (!(0, _ReactUtils.isChildrenEqual)(nextProps.children, children)) {
          // update configuration in chilren
          var hasGlobalData = !(0, _isNil3.default)(nextProps.data);
          var newUpdateId = hasGlobalData ? updateId : updateId + 1;
          var _state = this.state,
              dataStartIndex = _state.dataStartIndex,
              dataEndIndex = _state.dataEndIndex;
          // Don't update brush

          var _defaultState = _extends({}, this.constructor.createDefaultState(nextProps), { dataEndIndex: dataEndIndex, dataStartIndex: dataStartIndex
          });

          this.setState(_extends({}, _defaultState, {
            updateId: newUpdateId
          }, this.updateStateOfAxisMapsOffsetAndStackGroups(_extends({
            props: nextProps
          }, _defaultState, {
            updateId: newUpdateId
          }))));
        }
        // add syncId
        if ((0, _isNil3.default)(this.props.syncId) && !(0, _isNil3.default)(nextProps.syncId)) {
          this.addListener();
        }
        // remove syncId
        if (!(0, _isNil3.default)(this.props.syncId) && (0, _isNil3.default)(nextProps.syncId)) {
          this.removeListener();
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (!(0, _isNil3.default)(this.props.syncId)) {
          this.removeListener();
        }
        if (typeof this.triggeredAfterMouseMove.cancel === 'function') {
          this.triggeredAfterMouseMove.cancel();
        }
      }
      /**
      * Get the configuration of all x-axis or y-axis
      * @param  {Object} props          Latest props
      * @param  {String} axisType       The type of axis
      * @param  {Array}  graphicalItems The instances of item
      * @param  {Object} stackGroups    The items grouped by axisId and stackId
      * @param {Number} dataStartIndex  The start index of the data series when a brush is applied
      * @param {Number} dataEndIndex    The end index of the data series when a brush is applied
      * @return {Object}          Configuration
      */

    }, {
      key: 'getAxisMap',
      value: function getAxisMap(props, _ref2) {
        var _ref2$axisType = _ref2.axisType,
            axisType = _ref2$axisType === undefined ? 'xAxis' : _ref2$axisType,
            AxisComp = _ref2.AxisComp,
            graphicalItems = _ref2.graphicalItems,
            stackGroups = _ref2.stackGroups,
            dataStartIndex = _ref2.dataStartIndex,
            dataEndIndex = _ref2.dataEndIndex;
        var children = props.children;

        var axisIdKey = axisType + 'Id';
        // Get all the instance of Axis
        var axes = (0, _ReactUtils.findAllByType)(children, AxisComp);

        var axisMap = {};

        if (axes && axes.length) {
          axisMap = this.getAxisMapByAxes(props, { axes: axes, graphicalItems: graphicalItems, axisType: axisType, axisIdKey: axisIdKey,
            stackGroups: stackGroups, dataStartIndex: dataStartIndex, dataEndIndex: dataEndIndex });
        } else if (graphicalItems && graphicalItems.length) {
          axisMap = this.getAxisMapByItems(props, {
            Axis: AxisComp,
            graphicalItems: graphicalItems, axisType: axisType, axisIdKey: axisIdKey, stackGroups: stackGroups, dataStartIndex: dataStartIndex, dataEndIndex: dataEndIndex });
        }

        return axisMap;
      }
      /**
       * Get the configuration of axis by the options of axis instance
       * @param  {Object} props         Latest props
       * @param {Array}  axes           The instance of axes
       * @param  {Array} graphicalItems The instances of item
       * @param  {String} axisType      The type of axis, xAxis - x-axis, yAxis - y-axis
       * @param  {String} axisIdKey     The unique id of an axis
       * @param  {Object} stackGroups   The items grouped by axisId and stackId
       * @param {Number} dataStartIndex The start index of the data series when a brush is applied
       * @param {Number} dataEndIndex   The end index of the data series when a brush is applied
       * @return {Object}      Configuration
       */

    }, {
      key: 'getAxisMapByAxes',
      value: function getAxisMapByAxes(props, _ref3) {
        var _this2 = this;

        var axes = _ref3.axes,
            graphicalItems = _ref3.graphicalItems,
            axisType = _ref3.axisType,
            axisIdKey = _ref3.axisIdKey,
            stackGroups = _ref3.stackGroups,
            dataStartIndex = _ref3.dataStartIndex,
            dataEndIndex = _ref3.dataEndIndex;
        var layout = props.layout,
            children = props.children,
            stackOffset = props.stackOffset;

        var isCategorial = (0, _ChartUtils.isCategorialAxis)(layout, axisType);

        // Eliminate duplicated axes
        var axisMap = axes.reduce(function (result, child) {
          var _child$props = child.props,
              type = _child$props.type,
              dataKey = _child$props.dataKey,
              allowDataOverflow = _child$props.allowDataOverflow,
              allowDuplicatedCategory = _child$props.allowDuplicatedCategory,
              scale = _child$props.scale,
              ticks = _child$props.ticks;

          var axisId = child.props[axisIdKey];
          var displayedData = _this2.constructor.getDisplayedData(props, {
            graphicalItems: graphicalItems.filter(function (item) {
              return item.props[axisIdKey] === axisId;
            }),
            dataStartIndex: dataStartIndex,
            dataEndIndex: dataEndIndex
          });
          var len = displayedData.length;

          if (!result[axisId]) {
            var domain = void 0,
                duplicateDomain = void 0,
                categoricalDomain = void 0;

            if (dataKey) {
              domain = (0, _ChartUtils.getDomainOfDataByKey)(displayedData, dataKey, type);

              if (type === 'category' && isCategorial) {
                var duplicate = (0, _DataUtils.hasDuplicate)(domain);

                if (allowDuplicatedCategory && duplicate) {
                  duplicateDomain = domain;
                  // When category axis has duplicated text, serial numbers are used to generate scale
                  domain = (0, _range3.default)(0, len);
                } else if (!allowDuplicatedCategory) {
                  // remove duplicated category
                  domain = (0, _ChartUtils.parseDomainOfCategoryAxis)(child.props.domain, domain, child).reduce(function (finalDomain, entry) {
                    return finalDomain.indexOf(entry) >= 0 ? finalDomain : [].concat(_toConsumableArray(finalDomain), [entry]);
                  }, []);
                }
              } else if (type === 'category') {
                if (!allowDuplicatedCategory) {
                  domain = (0, _ChartUtils.parseDomainOfCategoryAxis)(child.props.domain, domain, child).reduce(function (finalDomain, entry) {
                    return finalDomain.indexOf(entry) >= 0 || entry === '' || (0, _isNil3.default)(entry) ? finalDomain : [].concat(_toConsumableArray(finalDomain), [entry]);
                  }, []);
                } else {
                  // eliminate undefined or null or empty string
                  domain = domain.filter(function (entry) {
                    return entry !== '' && !(0, _isNil3.default)(entry);
                  });
                }
              } else if (type === 'number') {
                var errorBarsDomain = (0, _ChartUtils.parseErrorBarsOfAxis)(displayedData, graphicalItems.filter(function (item) {
                  return item.props[axisIdKey] === axisId && !item.props.hide;
                }), dataKey, axisType);

                if (errorBarsDomain) {
                  domain = errorBarsDomain;
                }
              }

              if (isCategorial && (type === 'number' || scale !== 'auto')) {
                categoricalDomain = (0, _ChartUtils.getDomainOfDataByKey)(displayedData, dataKey, 'category');
              }
            } else if (isCategorial) {
              domain = (0, _range3.default)(0, len);
            } else if (stackGroups && stackGroups[axisId] && stackGroups[axisId].hasStack && type === 'number') {
              // when stackOffset is 'expand', the domain may be calculated as [0, 1.000000000002]
              domain = stackOffset === 'expand' ? [0, 1] : (0, _ChartUtils.getDomainOfStackGroups)(stackGroups[axisId].stackGroups, dataStartIndex, dataEndIndex);
            } else {
              domain = (0, _ChartUtils.getDomainOfItemsWithSameAxis)(displayedData, graphicalItems.filter(function (item) {
                return item.props[axisIdKey] === axisId && !item.props.hide;
              }), type, true);
            }
            if (type === 'number') {
              // To detect wether there is any reference lines whose props alwaysShow is true
              domain = (0, _ChartUtils.detectReferenceElementsDomain)(children, domain, axisId, axisType, ticks);

              if (child.props.domain) {
                domain = (0, _ChartUtils.parseSpecifiedDomain)(child.props.domain, domain, allowDataOverflow);
              }
            }

            return _extends({}, result, _defineProperty({}, axisId, _extends({}, child.props, {
              axisType: axisType,
              domain: domain,
              categoricalDomain: categoricalDomain,
              duplicateDomain: duplicateDomain,
              originalDomain: child.props.domain,
              isCategorial: isCategorial,
              layout: layout
            })));
          }

          return result;
        }, {});
        return axisMap;
      }
      /**
       * Get the configuration of axis by the options of item,
       * this kind of axis does not display in chart
       * @param  {Object} props         Latest props
       * @param  {Array} graphicalItems The instances of item
       * @param  {ReactElement} Axis    Axis Component
       * @param  {String} axisType      The type of axis, xAxis - x-axis, yAxis - y-axis
       * @param  {String} axisIdKey     The unique id of an axis
       * @param  {Object} stackGroups   The items grouped by axisId and stackId
       * @param {Number} dataStartIndex The start index of the data series when a brush is applied
       * @param {Number} dataEndIndex   The end index of the data series when a brush is applied
       * @return {Object}               Configuration
       */

    }, {
      key: 'getAxisMapByItems',
      value: function getAxisMapByItems(props, _ref4) {
        var graphicalItems = _ref4.graphicalItems,
            Axis = _ref4.Axis,
            axisType = _ref4.axisType,
            axisIdKey = _ref4.axisIdKey,
            stackGroups = _ref4.stackGroups,
            dataStartIndex = _ref4.dataStartIndex,
            dataEndIndex = _ref4.dataEndIndex;
        var layout = props.layout,
            children = props.children;

        var displayedData = this.constructor.getDisplayedData(props, {
          graphicalItems: graphicalItems, dataStartIndex: dataStartIndex, dataEndIndex: dataEndIndex
        });
        var len = displayedData.length;
        var isCategorial = (0, _ChartUtils.isCategorialAxis)(layout, axisType);
        var index = -1;

        // The default type of x-axis is category axis,
        // The default contents of x-axis is the serial numbers of data
        // The default type of y-axis is number axis
        // The default contents of y-axis is the domain of data
        var axisMap = graphicalItems.reduce(function (result, child) {
          var axisId = child.props[axisIdKey];

          if (!result[axisId]) {
            index++;
            var domain = void 0;

            if (isCategorial) {
              domain = (0, _range3.default)(0, len);
            } else if (stackGroups && stackGroups[axisId] && stackGroups[axisId].hasStack) {
              domain = (0, _ChartUtils.getDomainOfStackGroups)(stackGroups[axisId].stackGroups, dataStartIndex, dataEndIndex);
              domain = (0, _ChartUtils.detectReferenceElementsDomain)(children, domain, axisId, axisType);
            } else {
              domain = (0, _ChartUtils.parseSpecifiedDomain)(Axis.defaultProps.domain, (0, _ChartUtils.getDomainOfItemsWithSameAxis)(displayedData, graphicalItems.filter(function (item) {
                return item.props[axisIdKey] === axisId && !item.props.hide;
              }), 'number'), Axis.defaultProps.allowDataOverflow);
              domain = (0, _ChartUtils.detectReferenceElementsDomain)(children, domain, axisId, axisType);
            }

            return _extends({}, result, _defineProperty({}, axisId, _extends({
              axisType: axisType
            }, Axis.defaultProps, {
              hide: true,
              orientation: ORIENT_MAP[axisType] && ORIENT_MAP[axisType][index % 2],
              domain: domain,
              originalDomain: Axis.defaultProps.domain,
              isCategorial: isCategorial,
              layout: layout
              // specify scale when no Axis
              // scale: isCategorial ? 'band' : 'linear',
            })));
          }

          return result;
        }, {});

        return axisMap;
      }
    }, {
      key: 'getActiveCoordinate',
      value: function getActiveCoordinate(tooltipTicks, activeIndex, rangeObj) {
        var layout = this.props.layout;

        var entry = tooltipTicks.find(function (tick) {
          return tick && tick.index === activeIndex;
        });

        if (entry) {
          if (layout === 'horizontal') {
            return { x: entry.coordinate, y: rangeObj.y };
          } else if (layout === 'vertical') {
            return { x: rangeObj.x, y: entry.coordinate };
          } else if (layout === 'centric') {
            var _angle = entry.coordinate;
            var _radius = rangeObj.radius;

            return _extends({}, rangeObj, (0, _PolarUtils.polarToCartesian)(rangeObj.cx, rangeObj.cy, _radius, _angle), {
              angle: _angle, radius: _radius
            });
          }

          var radius = entry.coordinate;
          var angle = rangeObj.angle;

          return _extends({}, rangeObj, (0, _PolarUtils.polarToCartesian)(rangeObj.cx, rangeObj.cy, radius, angle), {
            angle: angle, radius: radius
          });
        }

        return originCoordinate;
      }
      /**
       * Get the information of mouse in chart, return null when the mouse is not in the chart
       * @param  {Object} event    The event object
       * @return {Object}          Mouse data
       */

    }, {
      key: 'getMouseInfo',
      value: function getMouseInfo(event) {
        if (!this.container) {
          return null;
        }

        var containerOffset = (0, _DOMUtils.getOffset)(this.container);
        var e = (0, _DOMUtils.calculateChartCoordinate)(event, containerOffset);
        var rangeObj = this.inRange(e.chartX, e.chartY);
        if (!rangeObj) {
          return null;
        }

        var _state2 = this.state,
            xAxisMap = _state2.xAxisMap,
            yAxisMap = _state2.yAxisMap;


        if (eventType !== 'axis' && xAxisMap && yAxisMap) {
          var xScale = (0, _DataUtils.getAnyElementOfObject)(xAxisMap).scale;
          var yScale = (0, _DataUtils.getAnyElementOfObject)(yAxisMap).scale;
          var xValue = xScale && xScale.invert ? xScale.invert(e.chartX) : null;
          var yValue = yScale && yScale.invert ? yScale.invert(e.chartY) : null;

          return _extends({}, e, { xValue: xValue, yValue: yValue });
        }

        var _state3 = this.state,
            ticks = _state3.orderedTooltipTicks,
            axis = _state3.tooltipAxis,
            tooltipTicks = _state3.tooltipTicks;

        var pos = this.calculateTooltipPos(rangeObj);
        var activeIndex = (0, _ChartUtils.calculateActiveTickIndex)(pos, ticks, tooltipTicks, axis);

        if (activeIndex >= 0 && tooltipTicks) {
          var activeLabel = tooltipTicks[activeIndex] && tooltipTicks[activeIndex].value;
          var activePayload = this.getTooltipContent(activeIndex, activeLabel);
          var activeCoordinate = this.getActiveCoordinate(ticks, activeIndex, rangeObj);

          return _extends({}, e, {
            activeTooltipIndex: activeIndex,
            activeLabel: activeLabel, activePayload: activePayload, activeCoordinate: activeCoordinate
          });
        }

        return null;
      }
      /**
       * Get the content to be displayed in the tooltip
       * @param  {Number} activeIndex    Active index of data
       * @param  {String} activeLabel    Active label of data
       * @return {Array}                 The content of tooltip
       */

    }, {
      key: 'getTooltipContent',
      value: function getTooltipContent(activeIndex, activeLabel) {
        var _state4 = this.state,
            graphicalItems = _state4.graphicalItems,
            tooltipAxis = _state4.tooltipAxis;

        var displayedData = this.constructor.getDisplayedData(this.props, this.state);

        if (activeIndex < 0 || !graphicalItems || !graphicalItems.length || activeIndex >= displayedData.length) {
          return null;
        }

        // get data by activeIndex when the axis don't allow duplicated category
        return graphicalItems.reduce(function (result, child) {
          var hide = child.props.hide;


          if (hide) {
            return result;
          }

          var _child$props2 = child.props,
              dataKey = _child$props2.dataKey,
              name = _child$props2.name,
              unit = _child$props2.unit,
              formatter = _child$props2.formatter,
              data = _child$props2.data;

          var payload = void 0;

          if (tooltipAxis.dataKey && !tooltipAxis.allowDuplicatedCategory) {
            // graphic child has data props
            payload = (0, _DataUtils.findEntryInArray)(data || displayedData, tooltipAxis.dataKey, activeLabel);
          } else {
            payload = displayedData[activeIndex];
          }

          if (!payload) {
            return result;
          }
          return [].concat(_toConsumableArray(result), [_extends({}, (0, _ReactUtils.getPresentationAttributes)(child), {
            dataKey: dataKey, unit: unit, formatter: formatter,
            name: name || dataKey,
            color: (0, _ChartUtils.getMainColorOfGraphicItem)(child),
            value: (0, _ChartUtils.getValueByDataKey)(payload, dataKey),
            payload: payload
          })]);
        }, []);
      }
    }, {
      key: 'getFormatItems',
      value: function getFormatItems(props, currentState) {
        var _this3 = this;

        var graphicalItems = currentState.graphicalItems,
            stackGroups = currentState.stackGroups,
            offset = currentState.offset,
            updateId = currentState.updateId,
            dataStartIndex = currentState.dataStartIndex,
            dataEndIndex = currentState.dataEndIndex;
        var barSize = props.barSize,
            layout = props.layout,
            barGap = props.barGap,
            barCategoryGap = props.barCategoryGap,
            globalMaxBarSize = props.maxBarSize;

        var _getAxisNameByLayout = this.getAxisNameByLayout(layout),
            numericAxisName = _getAxisNameByLayout.numericAxisName,
            cateAxisName = _getAxisNameByLayout.cateAxisName;

        var hasBar = this.constructor.hasBar(graphicalItems);
        var sizeList = hasBar && (0, _ChartUtils.getBarSizeList)({ barSize: barSize, stackGroups: stackGroups });
        var formatedItems = [];

        graphicalItems.forEach(function (item, index) {
          var displayedData = _this3.constructor.getDisplayedData(props, { dataStartIndex: dataStartIndex, dataEndIndex: dataEndIndex }, item);
          var _item$props = item.props,
              dataKey = _item$props.dataKey,
              childMaxBarSize = _item$props.maxBarSize;

          var numericAxisId = item.props[numericAxisName + 'Id'];
          var cateAxisId = item.props[cateAxisName + 'Id'];
          var axisObj = axisComponents.reduce(function (result, entry) {
            var _extends4;

            var axisMap = currentState[entry.axisType + 'Map'];
            var id = item.props[entry.axisType + 'Id'];
            var axis = axisMap && axisMap[id];

            return _extends({}, result, (_extends4 = {}, _defineProperty(_extends4, entry.axisType, axis), _defineProperty(_extends4, entry.axisType + 'Ticks', (0, _ChartUtils.getTicksOfAxis)(axis)), _extends4));
          }, {});
          var cateAxis = axisObj[cateAxisName];
          var cateTicks = axisObj[cateAxisName + 'Ticks'];
          var stackedData = stackGroups && stackGroups[numericAxisId] && stackGroups[numericAxisId].hasStack && (0, _ChartUtils.getStackedDataOfItem)(item, stackGroups[numericAxisId].stackGroups);
          var bandSize = (0, _ChartUtils.getBandSizeOfAxis)(cateAxis, cateTicks);
          var maxBarSize = (0, _isNil3.default)(childMaxBarSize) ? globalMaxBarSize : childMaxBarSize;
          var barPosition = hasBar && (0, _ChartUtils.getBarPosition)({
            barGap: barGap, barCategoryGap: barCategoryGap, bandSize: bandSize, sizeList: sizeList[cateAxisId], maxBarSize: maxBarSize
          });
          var componsedFn = item && item.type && item.type.getComposedData;

          if (componsedFn) {
            var _extends5;

            formatedItems.push({
              props: _extends({}, componsedFn(_extends({}, axisObj, { displayedData: displayedData, props: props, dataKey: dataKey, item: item, bandSize: bandSize,
                barPosition: barPosition, offset: offset, stackedData: stackedData, layout: layout, dataStartIndex: dataStartIndex, dataEndIndex: dataEndIndex,
                onItemMouseLeave: (0, _ChartUtils.combineEventHandlers)(_this3.handleItemMouseLeave, null, item.props.onMouseLeave),
                onItemMouseEnter: (0, _ChartUtils.combineEventHandlers)(_this3.handleItemMouseEnter, null, item.props.onMouseEnter)
              })), (_extends5 = {
                key: item.key || 'item-' + index
              }, _defineProperty(_extends5, numericAxisName, axisObj[numericAxisName]), _defineProperty(_extends5, cateAxisName, axisObj[cateAxisName]), _defineProperty(_extends5, 'animationId', updateId), _extends5)),
              childIndex: (0, _ReactUtils.parseChildIndex)(item, props.children),
              item: item
            });
          }
        });

        return formatedItems;
      }
    }, {
      key: 'getCursorRectangle',
      value: function getCursorRectangle() {
        var layout = this.props.layout;
        var _state5 = this.state,
            activeCoordinate = _state5.activeCoordinate,
            offset = _state5.offset,
            tooltipAxisBandSize = _state5.tooltipAxisBandSize;

        var halfSize = tooltipAxisBandSize / 2;

        return {
          stroke: 'none',
          fill: '#ccc',
          x: layout === 'horizontal' ? activeCoordinate.x - halfSize : offset.left + 0.5,
          y: layout === 'horizontal' ? offset.top + 0.5 : activeCoordinate.y - halfSize,
          width: layout === 'horizontal' ? tooltipAxisBandSize : offset.width - 1,
          height: layout === 'horizontal' ? offset.height - 1 : tooltipAxisBandSize
        };
      }
    }, {
      key: 'getCursorPoints',
      value: function getCursorPoints() {
        var layout = this.props.layout;
        var _state6 = this.state,
            activeCoordinate = _state6.activeCoordinate,
            offset = _state6.offset;

        var x1 = void 0,
            y1 = void 0,
            x2 = void 0,
            y2 = void 0;

        if (layout === 'horizontal') {
          x1 = activeCoordinate.x;
          x2 = x1;
          y1 = offset.top;
          y2 = offset.top + offset.height;
        } else if (layout === 'vertical') {
          y1 = activeCoordinate.y;
          y2 = y1;
          x1 = offset.left;
          x2 = offset.left + offset.width;
        } else if (!(0, _isNil3.default)(activeCoordinate.cx) || !(0, _isNil3.default)(activeCoordinate.cy)) {
          if (layout === 'centric') {
            var cx = activeCoordinate.cx,
                cy = activeCoordinate.cy,
                innerRadius = activeCoordinate.innerRadius,
                outerRadius = activeCoordinate.outerRadius,
                angle = activeCoordinate.angle;

            var innerPoint = (0, _PolarUtils.polarToCartesian)(cx, cy, innerRadius, angle);
            var outerPoint = (0, _PolarUtils.polarToCartesian)(cx, cy, outerRadius, angle);
            x1 = innerPoint.x;
            y1 = innerPoint.y;
            x2 = outerPoint.x;
            y2 = outerPoint.y;
          } else {
            var _cx = activeCoordinate.cx,
                _cy = activeCoordinate.cy,
                radius = activeCoordinate.radius,
                startAngle = activeCoordinate.startAngle,
                endAngle = activeCoordinate.endAngle;

            var startPoint = (0, _PolarUtils.polarToCartesian)(_cx, _cy, radius, startAngle);
            var endPoint = (0, _PolarUtils.polarToCartesian)(_cx, _cy, radius, endAngle);

            return {
              points: [startPoint, endPoint],
              cx: _cx, cy: _cy, radius: radius, startAngle: startAngle, endAngle: endAngle
            };
          }
        }

        return [{ x: x1, y: y1 }, { x: x2, y: y2 }];
      }
    }, {
      key: 'getAxisNameByLayout',
      value: function getAxisNameByLayout(layout) {
        if (layout === 'horizontal') {
          return { numericAxisName: 'yAxis', cateAxisName: 'xAxis' };
        } else if (layout === 'vertical') {
          return { numericAxisName: 'xAxis', cateAxisName: 'yAxis' };
        } else if (layout === 'centric') {
          return { numericAxisName: 'radiusAxis', cateAxisName: 'angleAxis' };
        }

        return { numericAxisName: 'angleAxis', cateAxisName: 'radiusAxis' };
      }
    }, {
      key: 'calculateTooltipPos',
      value: function calculateTooltipPos(rangeObj) {
        var layout = this.props.layout;


        if (layout === 'horizontal') {
          return rangeObj.x;
        }
        if (layout === 'vertical') {
          return rangeObj.y;
        }
        if (layout === 'centric') {
          return rangeObj.angle;
        }

        return rangeObj.radius;
      }
    }, {
      key: 'inRange',
      value: function inRange(x, y) {
        var layout = this.props.layout;


        if (layout === 'horizontal' || layout === 'vertical') {
          var offset = this.state.offset;

          var isInRange = x >= offset.left && x <= offset.left + offset.width && y >= offset.top && y <= offset.top + offset.height;

          return isInRange ? { x: x, y: y } : null;
        }

        var _state7 = this.state,
            angleAxisMap = _state7.angleAxisMap,
            radiusAxisMap = _state7.radiusAxisMap;


        if (angleAxisMap && radiusAxisMap) {
          var angleAxis = (0, _DataUtils.getAnyElementOfObject)(angleAxisMap);

          return (0, _PolarUtils.inRangeOfSector)({ x: x, y: y }, angleAxis);
        }

        return null;
      }
    }, {
      key: 'parseEventsOfWrapper',
      value: function parseEventsOfWrapper() {
        var children = this.props.children;

        var tooltipItem = (0, _ReactUtils.findChildByType)(children, _Tooltip2.default);
        var tooltipEvents = tooltipItem && eventType === 'axis' ? {
          onMouseEnter: this.handleMouseEnter,
          onMouseMove: this.handleMouseMove,
          onMouseLeave: this.handleMouseLeave,
          onTouchMove: this.handleTouchMove,
          onTouchStart: this.handleTouchStart,
          onTouchEnd: this.handleTouchEnd
        } : {};
        var outerEvents = (0, _ReactUtils.filterEventAttributes)(this.props, this.handleOuterEvent);

        return _extends({}, outerEvents, tooltipEvents);
      }
      /**
       * The AxisMaps are expensive to render on large data sets
       * so provide the ability to store them in state and only update them when necessary
       * they are dependent upon the start and end index of
       * the brush so it's important that this method is called _after_
       * the state is updated with any new start/end indices
       *
       * @param {Object} props          The props object to be used for updating the axismaps
       * @param {Number} dataStartIndex The start index of the data series when a brush is applied
       * @param {Number} dataEndIndex   The end index of the data series when a brush is applied
       * @param {Number} updateId       The update id
       * @return {Object} state New state to set
       */

    }, {
      key: 'updateStateOfAxisMapsOffsetAndStackGroups',
      value: function updateStateOfAxisMapsOffsetAndStackGroups(_ref5) {
        var _this4 = this;

        var props = _ref5.props,
            dataStartIndex = _ref5.dataStartIndex,
            dataEndIndex = _ref5.dataEndIndex,
            updateId = _ref5.updateId;

        if (!(0, _ReactUtils.validateWidthHeight)({ props: props })) {
          return null;
        }

        var children = props.children,
            layout = props.layout,
            stackOffset = props.stackOffset,
            data = props.data,
            reverseStackOrder = props.reverseStackOrder;

        var _getAxisNameByLayout2 = this.getAxisNameByLayout(layout),
            numericAxisName = _getAxisNameByLayout2.numericAxisName,
            cateAxisName = _getAxisNameByLayout2.cateAxisName;

        var graphicalItems = (0, _ReactUtils.findAllByType)(children, GraphicalChild);
        var stackGroups = (0, _ChartUtils.getStackGroupsByAxisId)(data, graphicalItems, numericAxisName + 'Id', cateAxisName + 'Id', stackOffset, reverseStackOrder);
        var axisObj = axisComponents.reduce(function (result, entry) {
          var name = entry.axisType + 'Map';

          return _extends({}, result, _defineProperty({}, name, _this4.getAxisMap(props, _extends({}, entry, {
            graphicalItems: graphicalItems,
            stackGroups: entry.axisType === numericAxisName && stackGroups,
            dataStartIndex: dataStartIndex,
            dataEndIndex: dataEndIndex
          }))));
        }, {});

        var offset = this.calculateOffset(_extends({}, axisObj, { props: props, graphicalItems: graphicalItems }));

        Object.keys(axisObj).forEach(function (key) {
          axisObj[key] = formatAxisMap(props, axisObj[key], offset, key.replace('Map', ''), chartName);
        });
        var cateAxisMap = axisObj[cateAxisName + 'Map'];
        var ticksObj = this.tooltipTicksGenerator(cateAxisMap);

        var formatedGraphicalItems = this.getFormatItems(props, _extends({}, axisObj, { dataStartIndex: dataStartIndex, dataEndIndex: dataEndIndex, updateId: updateId,
          graphicalItems: graphicalItems, stackGroups: stackGroups, offset: offset
        }));

        return _extends({
          formatedGraphicalItems: formatedGraphicalItems, graphicalItems: graphicalItems, offset: offset, stackGroups: stackGroups
        }, ticksObj, axisObj);
      }

      /* eslint-disable  no-underscore-dangle */

    }, {
      key: 'addListener',
      value: function addListener() {
        _Events.eventCenter.on(_Events.SYNC_EVENT, this.handleReceiveSyncEvent);

        if (_Events.eventCenter.setMaxListeners && _Events.eventCenter._maxListeners) {
          _Events.eventCenter.setMaxListeners(_Events.eventCenter._maxListeners + 1);
        }
      }
    }, {
      key: 'removeListener',
      value: function removeListener() {
        _Events.eventCenter.removeListener(_Events.SYNC_EVENT, this.handleReceiveSyncEvent);

        if (_Events.eventCenter.setMaxListeners && _Events.eventCenter._maxListeners) {
          _Events.eventCenter.setMaxListeners(_Events.eventCenter._maxListeners - 1);
        }
      }
      /**
       * Calculate the offset of main part in the svg element
       * @param  {Object} props          Latest props
       * @param  {Array}  graphicalItems The instances of item
       * @param  {Object} xAxisMap       The configuration of x-axis
       * @param  {Object} yAxisMap       The configuration of y-axis
       * @return {Object} The offset of main part in the svg element
       */

    }, {
      key: 'calculateOffset',
      value: function calculateOffset(_ref6) {
        var props = _ref6.props,
            graphicalItems = _ref6.graphicalItems,
            _ref6$xAxisMap = _ref6.xAxisMap,
            xAxisMap = _ref6$xAxisMap === undefined ? {} : _ref6$xAxisMap,
            _ref6$yAxisMap = _ref6.yAxisMap,
            yAxisMap = _ref6$yAxisMap === undefined ? {} : _ref6$yAxisMap;
        var width = props.width,
            height = props.height,
            children = props.children;

        var margin = props.margin || {};
        var brushItem = (0, _ReactUtils.findChildByType)(children, _Brush2.default);
        var legendItem = (0, _ReactUtils.findChildByType)(children, _Legend2.default);

        var offsetH = Object.keys(yAxisMap).reduce(function (result, id) {
          var entry = yAxisMap[id];
          var orientation = entry.orientation;

          if (!entry.mirror && !entry.hide) {
            return _extends({}, result, _defineProperty({}, orientation, result[orientation] + entry.width));
          }

          return result;
        }, { left: margin.left || 0, right: margin.right || 0 });

        var offsetV = Object.keys(xAxisMap).reduce(function (result, id) {
          var entry = xAxisMap[id];
          var orientation = entry.orientation;

          if (!entry.mirror && !entry.hide) {
            return _extends({}, result, _defineProperty({}, orientation, result[orientation] + entry.height));
          }

          return result;
        }, { top: margin.top || 0, bottom: margin.bottom || 0 });

        var offset = _extends({}, offsetV, offsetH);

        var brushBottom = offset.bottom;

        if (brushItem) {
          offset.bottom += brushItem.props.height || _Brush2.default.defaultProps.height;
        }

        if (legendItem && this.legendInstance) {
          var legendBox = this.legendInstance.getBBox();

          offset = (0, _ChartUtils.appendOffsetOfLegend)(offset, graphicalItems, props, legendBox);
        }

        return _extends({
          brushBottom: brushBottom
        }, offset, {
          width: width - offset.left - offset.right,
          height: height - offset.top - offset.bottom
        });
      }
      /**
       * The handler of mouse entering chart
       * @param  {Object} e              Event object
       * @return {Null}                  null
       */

      /**
       * The handler of mouse entering a scatter
       * @param {Object} el     The active scatter
       * @return {Object} no return
       */

      /**
       * The handler of mouse leaving a scatter
       * @return {Object} no return
       */

      /**
       * The handler of mouse moving in chart
       * @param  {Object} e        Event object
       * @return {Null} no return
       */

      /**
       * The handler if mouse leaving chart
       * @param {Object} e Event object
       * @return {Null} no return
       */

    }, {
      key: 'triggerSyncEvent',
      value: function triggerSyncEvent(data) {
        var syncId = this.props.syncId;


        if (!(0, _isNil3.default)(syncId)) {
          _Events.eventCenter.emit(_Events.SYNC_EVENT, syncId, this.uniqueChartId, data);
        }
      }
    }, {
      key: 'filterFormatItem',
      value: function filterFormatItem(item, displayName, childIndex) {
        var formatedGraphicalItems = this.state.formatedGraphicalItems;


        for (var i = 0, len = formatedGraphicalItems.length; i < len; i++) {
          var entry = formatedGraphicalItems[i];

          if (entry.item === item || entry.props.key === item.key || displayName === (0, _ReactUtils.getDisplayName)(entry.item.type) && childIndex === entry.childIndex) {
            return entry;
          }
        }

        return null;
      }
    }, {
      key: 'renderAxis',

      /**
       * Draw axis
       * @param {Object} axisOptions The options of axis
       * @param {Object} element      The axis element
       * @param {String} displayName  The display name of axis
       * @param {Number} index        The index of element
       * @return {ReactElement}       The instance of x-axes
       */
      value: function renderAxis(axisOptions, element, displayName, index) {
        var _props2 = this.props,
            width = _props2.width,
            height = _props2.height;


        return _react2.default.createElement(_CartesianAxis2.default, _extends({}, axisOptions, {
          className: 'recharts-' + axisOptions.axisType + ' ' + axisOptions.axisType,
          key: element.key || displayName + '-' + index,
          viewBox: { x: 0, y: 0, width: width, height: height },
          ticksGenerator: this.axesTicksGenerator
        }));
      }
      /**
       * Draw grid
       * @param  {ReactElement} element the grid item
       * @return {ReactElement} The instance of grid
       */

    }, {
      key: 'renderLegend',

      /**
       * Draw legend
       * @return {ReactElement}            The instance of Legend
       */
      value: function renderLegend() {
        var _this5 = this;

        var formatedGraphicalItems = this.state.formatedGraphicalItems;
        var _props3 = this.props,
            children = _props3.children,
            width = _props3.width,
            height = _props3.height;

        var margin = this.props.margin || {};
        var legendWidth = width - (margin.left || 0) - (margin.right || 0);
        var legendHeight = height - (margin.top || 0) - (margin.bottom || 0);
        var props = (0, _ChartUtils.getLegendProps)({
          children: children, formatedGraphicalItems: formatedGraphicalItems, legendWidth: legendWidth, legendHeight: legendHeight, legendContent: legendContent
        });

        if (!props) {
          return null;
        }

        var item = props.item,
            otherProps = _objectWithoutProperties(props, ['item']);

        return (0, _react.cloneElement)(item, _extends({}, otherProps, {
          chartWidth: width,
          chartHeight: height,
          margin: margin,
          ref: function ref(legend) {
            _this5.legendInstance = legend;
          },
          onBBoxUpdate: this.handleLegendBBoxUpdate
        }));
      }
      /**
       * Draw Tooltip
       * @return {ReactElement}  The instance of Tooltip
       */

    }, {
      key: 'renderTooltip',
      value: function renderTooltip() {
        var children = this.props.children;

        var tooltipItem = (0, _ReactUtils.findChildByType)(children, _Tooltip2.default);

        if (!tooltipItem) {
          return null;
        }

        var _state8 = this.state,
            isTooltipActive = _state8.isTooltipActive,
            activeCoordinate = _state8.activeCoordinate,
            activePayload = _state8.activePayload,
            activeLabel = _state8.activeLabel,
            offset = _state8.offset;


        return (0, _react.cloneElement)(tooltipItem, {
          viewBox: _extends({}, offset, { x: offset.left, y: offset.top }),
          active: isTooltipActive,
          label: activeLabel,
          payload: isTooltipActive ? activePayload : [],
          coordinate: activeCoordinate
        });
      }
    }, {
      key: 'renderActiveDot',
      value: function renderActiveDot(option, props) {
        var dot = void 0;

        if ((0, _react.isValidElement)(option)) {
          dot = (0, _react.cloneElement)(option, props);
        } else if ((0, _isFunction3.default)(option)) {
          dot = option(props);
        } else {
          dot = _react2.default.createElement(_Dot2.default, props);
        }

        return _react2.default.createElement(
          _Layer2.default,
          { className: 'recharts-active-dot', key: props.key },
          dot
        );
      }
    }, {
      key: 'renderActivePoints',
      value: function renderActivePoints(_ref7) {
        var item = _ref7.item,
            activePoint = _ref7.activePoint,
            basePoint = _ref7.basePoint,
            childIndex = _ref7.childIndex,
            isRange = _ref7.isRange;

        var result = [];
        var key = item.props.key;
        var _item$item$props = item.item.props,
            activeDot = _item$item$props.activeDot,
            dataKey = _item$item$props.dataKey;

        var dotProps = _extends({
          index: childIndex,
          dataKey: dataKey,
          cx: activePoint.x,
          cy: activePoint.y,
          r: 4,
          fill: (0, _ChartUtils.getMainColorOfGraphicItem)(item.item),
          strokeWidth: 2,
          stroke: '#fff',
          payload: activePoint.payload,
          value: activePoint.value,
          key: key + '-activePoint-' + childIndex
        }, (0, _ReactUtils.getPresentationAttributes)(activeDot), (0, _ReactUtils.filterEventAttributes)(activeDot));

        result.push(this.renderActiveDot(activeDot, dotProps, childIndex));

        if (basePoint) {
          result.push(this.renderActiveDot(activeDot, _extends({}, dotProps, {
            cx: basePoint.x,
            cy: basePoint.y,
            key: key + '-basePoint-' + childIndex
          }), childIndex));
        } else if (isRange) {
          result.push(null);
        }

        return result;
      }
    }, {
      key: 'render',
      value: function render() {
        var _this6 = this;

        if (!(0, _ReactUtils.validateWidthHeight)(this)) {
          return null;
        }

        var _props4 = this.props,
            children = _props4.children,
            className = _props4.className,
            width = _props4.width,
            height = _props4.height,
            style = _props4.style,
            compact = _props4.compact,
            others = _objectWithoutProperties(_props4, ['children', 'className', 'width', 'height', 'style', 'compact']);

        var attrs = (0, _ReactUtils.getPresentationAttributes)(others);
        var map = {
          CartesianGrid: { handler: this.renderGrid, once: true },
          ReferenceArea: { handler: this.renderReferenceElement },
          ReferenceLine: { handler: this.renderReferenceElement },
          ReferenceDot: { handler: this.renderReferenceElement },
          XAxis: { handler: this.renderXAxis },
          YAxis: { handler: this.renderYAxis },
          Brush: { handler: this.renderBrush, once: true },
          Bar: { handler: this.renderGraphicChild },
          Line: { handler: this.renderGraphicChild },
          Area: { handler: this.renderGraphicChild },
          Radar: { handler: this.renderGraphicChild },
          RadialBar: { handler: this.renderGraphicChild },
          Scatter: { handler: this.renderGraphicChild },
          Pie: { handler: this.renderGraphicChild },
          Tooltip: { handler: this.renderCursor, once: true },
          PolarGrid: { handler: this.renderPolarGrid, once: true },
          PolarAngleAxis: { handler: this.renderPolarAxis },
          PolarRadiusAxis: { handler: this.renderPolarAxis }
        };

        // The "compact" mode is mainly used as the panorama within Brush
        if (compact) {
          return _react2.default.createElement(
            _Surface2.default,
            _extends({}, attrs, { width: width, height: height }),
            (0, _ReactUtils.renderByOrder)(children, map)
          );
        }

        var events = this.parseEventsOfWrapper();
        return _react2.default.createElement(
          'div',
          _extends({
            className: (0, _classnames2.default)('recharts-wrapper', className),
            style: _extends({}, style, { position: 'relative', cursor: 'default', width: width, height: height })
          }, events, {
            ref: function ref(node) {
              _this6.container = node;
            }
          }),
          _react2.default.createElement(
            _Surface2.default,
            _extends({}, attrs, { width: width, height: height }),
            (0, _ReactUtils.renderByOrder)(children, map)
          ),
          this.renderLegend(),
          this.renderTooltip()
        );
      }
    }]);

    return CategoricalChartWrapper;
  }(_react.Component), _class.displayName = chartName, _class.propTypes = _extends({
    syncId: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    compact: _propTypes2.default.bool,
    width: _propTypes2.default.number,
    height: _propTypes2.default.number,
    data: _propTypes2.default.arrayOf(_propTypes2.default.object),
    layout: _propTypes2.default.oneOf(['horizontal', 'vertical']),
    stackOffset: _propTypes2.default.oneOf(['sign', 'expand', 'none', 'wiggle', 'silhouette']),
    throttleDelay: _propTypes2.default.number,
    margin: _propTypes2.default.shape({
      top: _propTypes2.default.number,
      right: _propTypes2.default.number,
      bottom: _propTypes2.default.number,
      left: _propTypes2.default.number
    }),
    barCategoryGap: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
    barGap: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
    barSize: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
    maxBarSize: _propTypes2.default.number,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
    onClick: _propTypes2.default.func,
    onMouseLeave: _propTypes2.default.func,
    onMouseEnter: _propTypes2.default.func,
    onMouseMove: _propTypes2.default.func,
    onMouseDown: _propTypes2.default.func,
    onMouseUp: _propTypes2.default.func,
    reverseStackOrder: _propTypes2.default.bool,
    id: _propTypes2.default.string
  }, propTypes), _class.defaultProps = _extends({
    layout: 'horizontal',
    stackOffset: 'none',
    barCategoryGap: '10%',
    barGap: 4,
    margin: { top: 5, right: 5, bottom: 5, left: 5 },
    reverseStackOrder: false
  }, defaultProps), _class.createDefaultState = function (props) {
    var children = props.children;

    var brushItem = (0, _ReactUtils.findChildByType)(children, _Brush2.default);
    var startIndex = brushItem && brushItem.props && brushItem.props.startIndex || 0;
    var endIndex = brushItem && brushItem.props && brushItem.props.endIndex || props.data && props.data.length - 1 || 0;
    return {
      chartX: 0,
      chartY: 0,
      dataStartIndex: startIndex,
      dataEndIndex: endIndex,
      activeTooltipIndex: -1,
      isTooltipActive: false
    };
  }, _class.hasBar = function (graphicalItems) {
    if (!graphicalItems || !graphicalItems.length) {
      return false;
    }

    return graphicalItems.some(function (item) {
      var name = (0, _ReactUtils.getDisplayName)(item && item.type);

      return name && name.indexOf('Bar') >= 0;
    });
  }, _class.getDisplayedData = function (props, _ref8, item) {
    var graphicalItems = _ref8.graphicalItems,
        dataStartIndex = _ref8.dataStartIndex,
        dataEndIndex = _ref8.dataEndIndex;

    var itemsData = (graphicalItems || []).reduce(function (result, child) {
      var itemData = child.props.data;

      if (itemData && itemData.length) {
        return [].concat(_toConsumableArray(result), _toConsumableArray(itemData));
      }

      return result;
    }, []);
    if (itemsData && itemsData.length > 0) {
      return itemsData;
    }

    if (item && item.props && item.props.data && item.props.data.length > 0) {
      return item.props.data;
    }

    var data = props.data;


    if (data && data.length && (0, _DataUtils.isNumber)(dataStartIndex) && (0, _DataUtils.isNumber)(dataEndIndex)) {
      return data.slice(dataStartIndex, dataEndIndex + 1);
    }

    return [];
  }, _initialiseProps = function _initialiseProps() {
    var _this7 = this;

    this.handleLegendBBoxUpdate = function (box) {
      if (box && _this7.legendInstance) {
        var _state9 = _this7.state,
            dataStartIndex = _state9.dataStartIndex,
            dataEndIndex = _state9.dataEndIndex,
            updateId = _state9.updateId;


        _this7.setState(_this7.updateStateOfAxisMapsOffsetAndStackGroups({
          props: _this7.props, dataStartIndex: dataStartIndex, dataEndIndex: dataEndIndex, updateId: updateId
        }));
      }
    };

    this.handleReceiveSyncEvent = function (cId, chartId, data) {
      var _props5 = _this7.props,
          syncId = _props5.syncId,
          layout = _props5.layout;
      var updateId = _this7.state.updateId;


      if (syncId === cId && chartId !== _this7.uniqueChartId) {
        var dataStartIndex = data.dataStartIndex,
            dataEndIndex = data.dataEndIndex;


        if (!(0, _isNil3.default)(data.dataStartIndex) || !(0, _isNil3.default)(data.dataEndIndex)) {
          _this7.setState(_extends({
            dataStartIndex: dataStartIndex,
            dataEndIndex: dataEndIndex
          }, _this7.updateStateOfAxisMapsOffsetAndStackGroups({ props: _this7.props, dataStartIndex: dataStartIndex, dataEndIndex: dataEndIndex, updateId: updateId })));
        } else if (!(0, _isNil3.default)(data.activeTooltipIndex)) {
          var chartX = data.chartX,
              chartY = data.chartY,
              activeTooltipIndex = data.activeTooltipIndex;
          var _state10 = _this7.state,
              offset = _state10.offset,
              tooltipTicks = _state10.tooltipTicks;

          if (!offset) {
            return;
          }
          var viewBox = _extends({}, offset, { x: offset.left, y: offset.top });
          // When a categotical chart is combined with another chart, the value of chartX
          // and chartY may beyond the boundaries.
          var validateChartX = Math.min(chartX, viewBox.x + viewBox.width);
          var validateChartY = Math.min(chartY, viewBox.y + viewBox.height);
          var activeLabel = tooltipTicks[activeTooltipIndex] && tooltipTicks[activeTooltipIndex].value;
          var activePayload = _this7.getTooltipContent(activeTooltipIndex);
          var activeCoordinate = tooltipTicks[activeTooltipIndex] ? {
            x: layout === 'horizontal' ? tooltipTicks[activeTooltipIndex].coordinate : validateChartX,
            y: layout === 'horizontal' ? validateChartY : tooltipTicks[activeTooltipIndex].coordinate
          } : originCoordinate;

          _this7.setState(_extends({}, data, { activeLabel: activeLabel, activeCoordinate: activeCoordinate, activePayload: activePayload }));
        } else {
          _this7.setState(data);
        }
      }
    };

    this.handleBrushChange = function (_ref9) {
      var startIndex = _ref9.startIndex,
          endIndex = _ref9.endIndex;

      // Only trigger changes if the extents of the brush have actually changed
      if (startIndex !== _this7.state.dataStartIndex || endIndex !== _this7.state.dataEndIndex) {
        var updateId = _this7.state.updateId;


        _this7.setState(function () {
          return _extends({
            dataStartIndex: startIndex,
            dataEndIndex: endIndex
          }, _this7.updateStateOfAxisMapsOffsetAndStackGroups({ props: _this7.props, dataStartIndex: startIndex, dataEndIndex: endIndex, updateId: updateId }));
        });

        _this7.triggerSyncEvent({
          dataStartIndex: startIndex,
          dataEndIndex: endIndex
        });
      }
    };

    this.handleMouseEnter = function (e) {
      var onMouseEnter = _this7.props.onMouseEnter;

      var mouse = _this7.getMouseInfo(e);

      if (mouse) {
        var nextState = _extends({}, mouse, { isTooltipActive: true });
        _this7.setState(nextState);
        _this7.triggerSyncEvent(nextState);

        if ((0, _isFunction3.default)(onMouseEnter)) {
          onMouseEnter(nextState, e);
        }
      }
    };

    this.triggeredAfterMouseMove = function (e) {
      var onMouseMove = _this7.props.onMouseMove;

      var mouse = _this7.getMouseInfo(e);
      var nextState = mouse ? _extends({}, mouse, { isTooltipActive: true }) : { isTooltipActive: false };

      _this7.setState(nextState);
      _this7.triggerSyncEvent(nextState);

      if ((0, _isFunction3.default)(onMouseMove)) {
        onMouseMove(nextState, e);
      }
    };

    this.handleItemMouseEnter = function (el) {
      _this7.setState(function () {
        return {
          isTooltipActive: true,
          activeItem: el,
          activePayload: el.tooltipPayload,
          activeCoordinate: el.tooltipPosition || { x: el.cx, y: el.cy }
        };
      });
    };

    this.handleItemMouseLeave = function () {
      _this7.setState(function () {
        return {
          isTooltipActive: false
        };
      });
    };

    this.handleMouseMove = function (e) {
      if (e && (0, _isFunction3.default)(e.persist)) {
        e.persist();
      }
      _this7.triggeredAfterMouseMove(e);
    };

    this.handleMouseLeave = function (e) {
      var onMouseLeave = _this7.props.onMouseLeave;

      var nextState = { isTooltipActive: false };

      _this7.setState(nextState);
      _this7.triggerSyncEvent(nextState);

      if ((0, _isFunction3.default)(onMouseLeave)) {
        onMouseLeave(nextState, e);
      }
    };

    this.handleOuterEvent = function (e) {
      var eventName = (0, _ReactUtils.getReactEventByType)(e);

      if (eventName && (0, _isFunction3.default)(_this7.props[eventName])) {
        var mouse = _this7.getMouseInfo(e);
        var handler = _this7.props[eventName];

        handler(mouse, e);
      }
    };

    this.handleClick = function (e) {
      var onClick = _this7.props.onClick;


      if ((0, _isFunction3.default)(onClick)) {
        var mouse = _this7.getMouseInfo(e);

        onClick(mouse, e);
      }
    };

    this.handleMouseDown = function (e) {
      var onMouseDown = _this7.props.onMouseDown;


      if ((0, _isFunction3.default)(onMouseDown)) {
        var mouse = _this7.getMouseInfo(e);

        onMouseDown(mouse, e);
      }
    };

    this.handleMouseUp = function (e) {
      var onMouseUp = _this7.props.onMouseUp;


      if ((0, _isFunction3.default)(onMouseUp)) {
        var mouse = _this7.getMouseInfo(e);

        onMouseUp(mouse, e);
      }
    };

    this.handleTouchMove = function (e) {
      if (e.changedTouches != null && e.changedTouches.length > 0) {
        _this7.handleMouseMove(e.changedTouches[0]);
      }
    };

    this.handleTouchStart = function (e) {
      if (e.changedTouches != null && e.changedTouches.length > 0) {
        _this7.handleMouseDown(e.changedTouches[0]);
      }
    };

    this.handleTouchEnd = function (e) {
      if (e.changedTouches != null && e.changedTouches.length > 0) {
        _this7.handleMouseUp(e.changedTouches[0]);
      }
    };

    this.verticalCoordinatesGenerator = function (_ref10) {
      var xAxis = _ref10.xAxis,
          width = _ref10.width,
          height = _ref10.height,
          offset = _ref10.offset;
      return (0, _ChartUtils.getCoordinatesOfGrid)(_CartesianAxis2.default.getTicks(_extends({}, _CartesianAxis2.default.defaultProps, xAxis, {
        ticks: (0, _ChartUtils.getTicksOfAxis)(xAxis, true),
        viewBox: { x: 0, y: 0, width: width, height: height }
      })), offset.left, offset.left + offset.width);
    };

    this.horizontalCoordinatesGenerator = function (_ref11) {
      var yAxis = _ref11.yAxis,
          width = _ref11.width,
          height = _ref11.height,
          offset = _ref11.offset;
      return (0, _ChartUtils.getCoordinatesOfGrid)(_CartesianAxis2.default.getTicks(_extends({}, _CartesianAxis2.default.defaultProps, yAxis, {
        ticks: (0, _ChartUtils.getTicksOfAxis)(yAxis, true),
        viewBox: { x: 0, y: 0, width: width, height: height }
      })), offset.top, offset.top + offset.height);
    };

    this.axesTicksGenerator = function (axis) {
      return (0, _ChartUtils.getTicksOfAxis)(axis, true);
    };

    this.tooltipTicksGenerator = function (axisMap) {
      var axis = (0, _DataUtils.getAnyElementOfObject)(axisMap);
      var tooltipTicks = (0, _ChartUtils.getTicksOfAxis)(axis, false, true);

      return {
        tooltipTicks: tooltipTicks,
        orderedTooltipTicks: (0, _sortBy3.default)(tooltipTicks, function (o) {
          return o.coordinate;
        }),
        tooltipAxis: axis,
        tooltipAxisBandSize: (0, _ChartUtils.getBandSizeOfAxis)(axis)
      };
    };

    this.renderCursor = function (element) {
      var _state11 = _this7.state,
          isTooltipActive = _state11.isTooltipActive,
          activeCoordinate = _state11.activeCoordinate,
          activePayload = _state11.activePayload,
          offset = _state11.offset;


      if (!element || !element.props.cursor || !isTooltipActive || !activeCoordinate) {
        return null;
      }
      var layout = _this7.props.layout;

      var restProps = void 0;
      var cursorComp = _Curve2.default;

      if (chartName === 'ScatterChart') {
        restProps = activeCoordinate;
        cursorComp = _Cross2.default;
      } else if (chartName === 'BarChart') {
        restProps = _this7.getCursorRectangle();
        cursorComp = _Rectangle2.default;
      } else if (layout === 'radial') {
        var _getCursorPoints = _this7.getCursorPoints(),
            cx = _getCursorPoints.cx,
            cy = _getCursorPoints.cy,
            radius = _getCursorPoints.radius,
            startAngle = _getCursorPoints.startAngle,
            endAngle = _getCursorPoints.endAngle;

        restProps = {
          cx: cx, cy: cy, startAngle: startAngle, endAngle: endAngle, innerRadius: radius, outerRadius: radius
        };
        cursorComp = _Sector2.default;
      } else {
        restProps = { points: _this7.getCursorPoints() };
        cursorComp = _Curve2.default;
      }
      var key = element.key || '_recharts-cursor';
      var cursorProps = _extends({
        stroke: '#ccc'
      }, offset, restProps, (0, _ReactUtils.getPresentationAttributes)(element.props.cursor), {
        payload: activePayload,
        key: key,
        className: 'recharts-tooltip-cursor'
      });

      return (0, _react.isValidElement)(element.props.cursor) ? (0, _react.cloneElement)(element.props.cursor, cursorProps) : (0, _react.createElement)(cursorComp, cursorProps);
    };

    this.renderPolarAxis = function (element, displayName, index) {
      var axisType = element.type.axisType;
      var axisMap = _this7.state[axisType + 'Map'];
      var axisOption = axisMap[element.props[axisType + 'Id']];

      return (0, _react.cloneElement)(element, _extends({}, axisOption, {
        className: axisType,
        key: element.key || displayName + '-' + index,
        ticks: (0, _ChartUtils.getTicksOfAxis)(axisOption, true)
      }));
    };

    this.renderXAxis = function (element, displayName, index) {
      var xAxisMap = _this7.state.xAxisMap;

      var axisObj = xAxisMap[element.props.xAxisId];

      return _this7.renderAxis(axisObj, element, displayName, index);
    };

    this.renderYAxis = function (element, displayName, index) {
      var yAxisMap = _this7.state.yAxisMap;

      var axisObj = yAxisMap[element.props.yAxisId];

      return _this7.renderAxis(axisObj, element, displayName, index);
    };

    this.renderGrid = function (element) {
      var _state12 = _this7.state,
          xAxisMap = _state12.xAxisMap,
          yAxisMap = _state12.yAxisMap,
          offset = _state12.offset;
      var _props6 = _this7.props,
          width = _props6.width,
          height = _props6.height;

      var xAxis = (0, _DataUtils.getAnyElementOfObject)(xAxisMap);
      var yAxis = (0, _DataUtils.getAnyElementOfObject)(yAxisMap);
      var props = element.props || {};

      return (0, _react.cloneElement)(element, {
        key: element.key || 'grid',
        x: (0, _DataUtils.isNumber)(props.x) ? props.x : offset.left,
        y: (0, _DataUtils.isNumber)(props.y) ? props.y : offset.top,
        width: (0, _DataUtils.isNumber)(props.width) ? props.width : offset.width,
        height: (0, _DataUtils.isNumber)(props.height) ? props.height : offset.height,
        xAxis: xAxis,
        yAxis: yAxis,
        offset: offset,
        chartWidth: width,
        chartHeight: height,
        verticalCoordinatesGenerator: _this7.verticalCoordinatesGenerator,
        horizontalCoordinatesGenerator: _this7.horizontalCoordinatesGenerator
      });
    };

    this.renderPolarGrid = function (element) {
      var _state13 = _this7.state,
          radiusAxisMap = _state13.radiusAxisMap,
          angleAxisMap = _state13.angleAxisMap;

      var radiusAxis = (0, _DataUtils.getAnyElementOfObject)(radiusAxisMap);
      var angleAxis = (0, _DataUtils.getAnyElementOfObject)(angleAxisMap);
      var cx = angleAxis.cx,
          cy = angleAxis.cy,
          innerRadius = angleAxis.innerRadius,
          outerRadius = angleAxis.outerRadius;


      return (0, _react.cloneElement)(element, {
        polarAngles: (0, _ChartUtils.getTicksOfAxis)(angleAxis, true).map(function (entry) {
          return entry.coordinate;
        }),
        polarRadius: (0, _ChartUtils.getTicksOfAxis)(radiusAxis, true).map(function (entry) {
          return entry.coordinate;
        }),
        cx: cx, cy: cy, innerRadius: innerRadius, outerRadius: outerRadius,
        key: element.key || 'polar-grid'
      });
    };

    this.renderBrush = function (element) {
      var _props7 = _this7.props,
          margin = _props7.margin,
          data = _props7.data;
      var _state14 = _this7.state,
          offset = _state14.offset,
          dataStartIndex = _state14.dataStartIndex,
          dataEndIndex = _state14.dataEndIndex,
          updateId = _state14.updateId;

      // TODO: update brush when children update

      return (0, _react.cloneElement)(element, {
        key: element.key || '_recharts-brush',
        onChange: (0, _ChartUtils.combineEventHandlers)(_this7.handleBrushChange, null, element.props.onChange),
        data: data,
        x: (0, _DataUtils.isNumber)(element.props.x) ? element.props.x : offset.left,
        y: (0, _DataUtils.isNumber)(element.props.y) ? element.props.y : offset.top + offset.height + offset.brushBottom - (margin.bottom || 0),
        width: (0, _DataUtils.isNumber)(element.props.width) ? element.props.width : offset.width,
        startIndex: dataStartIndex,
        endIndex: dataEndIndex,
        updateId: 'brush-' + updateId
      });
    };

    this.renderReferenceElement = function (element, displayName, index) {
      if (!element) {
        return null;
      }
      var _state15 = _this7.state,
          xAxisMap = _state15.xAxisMap,
          yAxisMap = _state15.yAxisMap,
          offset = _state15.offset;
      var _element$props = element.props,
          xAxisId = _element$props.xAxisId,
          yAxisId = _element$props.yAxisId;


      return (0, _react.cloneElement)(element, {
        key: element.key || displayName + '-' + index,
        xAxis: xAxisMap[xAxisId],
        yAxis: yAxisMap[yAxisId],
        viewBox: {
          x: offset.left,
          y: offset.top,
          width: offset.width,
          height: offset.height
        }
      });
    };

    this.renderGraphicChild = function (element, displayName, index) {
      var item = _this7.filterFormatItem(element, displayName, index);
      if (!item) {
        return null;
      }

      var graphicalItem = (0, _react.cloneElement)(element, item.props);
      var _state16 = _this7.state,
          isTooltipActive = _state16.isTooltipActive,
          tooltipAxis = _state16.tooltipAxis,
          activeTooltipIndex = _state16.activeTooltipIndex,
          activeLabel = _state16.activeLabel;
      var children = _this7.props.children;

      var tooltipItem = (0, _ReactUtils.findChildByType)(children, _Tooltip2.default);
      var _item$props2 = item.props,
          points = _item$props2.points,
          isRange = _item$props2.isRange,
          baseLine = _item$props2.baseLine;
      var _item$item$props2 = item.item.props,
          activeDot = _item$item$props2.activeDot,
          hide = _item$item$props2.hide;

      var hasActive = !hide && isTooltipActive && tooltipItem && activeDot && activeTooltipIndex >= 0;

      if (hasActive) {
        var activePoint = void 0,
            basePoint = void 0;

        if (tooltipAxis.dataKey && !tooltipAxis.allowDuplicatedCategory) {
          activePoint = (0, _DataUtils.findEntryInArray)(points, 'payload.' + tooltipAxis.dataKey, activeLabel);
          basePoint = isRange && baseLine && (0, _DataUtils.findEntryInArray)(baseLine, 'payload.' + tooltipAxis.dataKey, activeLabel);
        } else {
          activePoint = points[activeTooltipIndex];
          basePoint = isRange && baseLine && baseLine[activeTooltipIndex];
        }

        if (!(0, _isNil3.default)(activePoint)) {
          return [graphicalItem].concat(_toConsumableArray(_this7.renderActivePoints({
            item: item, activePoint: activePoint, basePoint: basePoint, childIndex: activeTooltipIndex,
            isRange: isRange
          })));
        }
      }

      if (isRange) {
        return [graphicalItem, null, null];
      }

      return [graphicalItem, null];
    };
  }, _temp);


  return CategoricalChartWrapper;
};

exports.default = generateCategoricalChart;