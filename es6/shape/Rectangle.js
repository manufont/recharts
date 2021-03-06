var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @fileOverview Rectangle
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Animate from 'react-smooth';
import pureRender from '../util/PureRender';
import { PRESENTATION_ATTRIBUTES, EVENT_ATTRIBUTES, getPresentationAttributes, filterEventAttributes } from '../util/ReactUtils';

var getRectangePath = function getRectangePath(x, y, width, height, radius) {
  var maxRadius = Math.min(Math.abs(width) / 2, Math.abs(height) / 2);
  var sign = height >= 0 ? 1 : -1;
  var clockWise = height >= 0 ? 1 : 0;
  var path = void 0;

  if (maxRadius > 0 && radius instanceof Array) {
    var newRadius = [];
    for (var i = 0, len = 4; i < len; i++) {
      newRadius[i] = radius[i] > maxRadius ? maxRadius : radius[i];
    }

    path = 'M' + x + ',' + (y + sign * newRadius[0]);

    if (newRadius[0] > 0) {
      path += 'A ' + newRadius[0] + ',' + newRadius[0] + ',0,0,' + clockWise + ',' + (x + newRadius[0]) + ',' + y;
    }

    path += 'L ' + (x + width - newRadius[1]) + ',' + y;

    if (newRadius[1] > 0) {
      path += 'A ' + newRadius[1] + ',' + newRadius[1] + ',0,0,' + clockWise + ',\n        ' + (x + width) + ',' + (y + sign * newRadius[1]);
    }
    path += 'L ' + (x + width) + ',' + (y + height - sign * newRadius[2]);

    if (newRadius[2] > 0) {
      path += 'A ' + newRadius[2] + ',' + newRadius[2] + ',0,0,' + clockWise + ',\n        ' + (x + width - newRadius[2]) + ',' + (y + height);
    }
    path += 'L ' + (x + newRadius[3]) + ',' + (y + height);

    if (newRadius[3] > 0) {
      path += 'A ' + newRadius[3] + ',' + newRadius[3] + ',0,0,' + clockWise + ',\n        ' + x + ',' + (y + height - sign * newRadius[3]);
    }
    path += 'Z';
  } else if (maxRadius > 0 && radius === +radius && radius > 0) {
    var _newRadius = Math.min(maxRadius, radius);

    path = 'M ' + x + ',' + (y + sign * _newRadius) + '\n            A ' + _newRadius + ',' + _newRadius + ',0,0,' + clockWise + ',' + (x + _newRadius) + ',' + y + '\n            L ' + (x + width - _newRadius) + ',' + y + '\n            A ' + _newRadius + ',' + _newRadius + ',0,0,' + clockWise + ',' + (x + width) + ',' + (y + sign * _newRadius) + '\n            L ' + (x + width) + ',' + (y + height - sign * _newRadius) + '\n            A ' + _newRadius + ',' + _newRadius + ',0,0,' + clockWise + ',' + (x + width - _newRadius) + ',' + (y + height) + '\n            L ' + (x + _newRadius) + ',' + (y + height) + '\n            A ' + _newRadius + ',' + _newRadius + ',0,0,' + clockWise + ',' + x + ',' + (y + height - sign * _newRadius) + ' Z';
  } else {
    path = 'M ' + x + ',' + y + ' h ' + width + ' v ' + height + ' h ' + -width + ' Z';
  }

  return path;
};

var Rectangle = pureRender(_class = (_temp2 = _class2 = function (_Component) {
  _inherits(Rectangle, _Component);

  function Rectangle() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Rectangle);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Rectangle.__proto__ || Object.getPrototypeOf(Rectangle)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      totalLength: -1
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Rectangle, [{
    key: 'componentDidMount',


    /* eslint-disable  react/no-did-mount-set-state */
    value: function componentDidMount() {
      if (this.node && this.node.getTotalLength) {
        try {
          var totalLength = this.node.getTotalLength();

          if (totalLength) {
            this.setState({
              totalLength: totalLength
            });
          }
        } catch (err) {
          // calculate total length error
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          x = _props.x,
          y = _props.y,
          width = _props.width,
          height = _props.height,
          radius = _props.radius,
          className = _props.className;
      var totalLength = this.state.totalLength;
      var _props2 = this.props,
          animationEasing = _props2.animationEasing,
          animationDuration = _props2.animationDuration,
          animationBegin = _props2.animationBegin,
          isAnimationActive = _props2.isAnimationActive,
          isUpdateAnimationActive = _props2.isUpdateAnimationActive;


      if (x !== +x || y !== +y || width !== +width || height !== +height || width === 0 || height === 0) {
        return null;
      }

      var layerClass = classNames('recharts-rectangle', className);

      if (!isUpdateAnimationActive) {
        return React.createElement('path', _extends({}, getPresentationAttributes(this.props), filterEventAttributes(this.props), {
          className: layerClass,
          d: getRectangePath(x, y, width, height, radius)
        }));
      }

      return React.createElement(
        Animate,
        {
          canBegin: totalLength > 0,
          from: { width: width, height: height, x: x, y: y },
          to: { width: width, height: height, x: x, y: y },
          duration: animationDuration,
          animationEasing: animationEasing,
          isActive: isUpdateAnimationActive
        },
        function (_ref2) {
          var currWidth = _ref2.width,
              currHeight = _ref2.height,
              currX = _ref2.x,
              currY = _ref2.y;
          return React.createElement(
            Animate,
            {
              canBegin: totalLength > 0,
              from: '0px ' + (totalLength === -1 ? 1 : totalLength) + 'px',
              to: totalLength + 'px 0px',
              attributeName: 'strokeDasharray',
              begin: animationBegin,
              duration: animationDuration,
              isActive: isAnimationActive,
              easing: animationEasing
            },
            React.createElement('path', _extends({}, getPresentationAttributes(_this2.props), filterEventAttributes(_this2.props), {
              className: layerClass,
              d: getRectangePath(currX, currY, currWidth, currHeight, radius),
              ref: function ref(node) {
                _this2.node = node;
              }
            }))
          );
        }
      );
    }
  }]);

  return Rectangle;
}(Component), _class2.displayName = 'Rectangle', _class2.propTypes = _extends({}, PRESENTATION_ATTRIBUTES, EVENT_ATTRIBUTES, {
  className: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  radius: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
  isAnimationActive: PropTypes.bool,
  isUpdateAnimationActive: PropTypes.bool,
  animationBegin: PropTypes.number,
  animationDuration: PropTypes.number,
  animationEasing: PropTypes.oneOf(['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'])
}), _class2.defaultProps = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  // The radius of border
  // The radius of four corners when radius is a number
  // The radius of left-top, right-top, right-bottom, left-bottom when radius is an array
  radius: 0,
  isAnimationActive: false,
  isUpdateAnimationActive: false,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: 'ease'
}, _temp2)) || _class;

export default Rectangle;