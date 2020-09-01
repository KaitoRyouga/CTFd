(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["graphs"],{

/***/ "./CTFd/themes/core/assets/js/graphs.js":
/*!**********************************************!*\
  !*** ./CTFd/themes/core/assets/js/graphs.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.createGraph = createGraph;\nexports.updateGraph = updateGraph;\n\nvar _jquery = _interopRequireDefault(__webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\"));\n\nvar _echartsEn = _interopRequireDefault(__webpack_require__(/*! echarts/dist/echarts-en.common */ \"./node_modules/echarts/dist/echarts-en.common.js\"));\n\nvar _moment = _interopRequireDefault(__webpack_require__(/*! moment */ \"./node_modules/moment/moment.js\"));\n\nvar _utils = __webpack_require__(/*! ./utils */ \"./CTFd/themes/core/assets/js/utils.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar graph_configs = {\n  score_graph: {\n    format: function format(type, id, name, _account_id, responses) {\n      var option = {\n        title: {\n          left: \"center\",\n          text: \"Score over Time\"\n        },\n        tooltip: {\n          trigger: \"axis\",\n          axisPointer: {\n            type: \"cross\"\n          }\n        },\n        legend: {\n          type: \"scroll\",\n          orient: \"horizontal\",\n          align: \"left\",\n          bottom: 0,\n          data: [name]\n        },\n        toolbox: {\n          feature: {\n            saveAsImage: {}\n          }\n        },\n        grid: {\n          containLabel: true\n        },\n        xAxis: [{\n          type: \"category\",\n          boundaryGap: false,\n          data: []\n        }],\n        yAxis: [{\n          type: \"value\"\n        }],\n        series: []\n      };\n      var times = [];\n      var scores = [];\n      var solves = responses[0].data;\n      var awards = responses[2].data;\n      var total = solves.concat(awards);\n      total.sort(function (a, b) {\n        return new Date(a.date) - new Date(b.date);\n      });\n\n      for (var i = 0; i < total.length; i++) {\n        var date = (0, _moment.default)(total[i].date);\n        times.push(date.toDate());\n\n        try {\n          scores.push(total[i].challenge.value);\n        } catch (e) {\n          scores.push(total[i].value);\n        }\n      }\n\n      times.forEach(function (time) {\n        option.xAxis[0].data.push(time);\n      });\n      option.series.push({\n        name: window.stats_data.name,\n        type: \"line\",\n        label: {\n          normal: {\n            show: true,\n            position: \"top\"\n          }\n        },\n        areaStyle: {\n          normal: {\n            color: (0, _utils.colorHash)(name + id)\n          }\n        },\n        itemStyle: {\n          normal: {\n            color: (0, _utils.colorHash)(name + id)\n          }\n        },\n        data: (0, _utils.cumulativeSum)(scores)\n      });\n      return option;\n    }\n  },\n  category_breakdown: {\n    format: function format(type, id, name, account_id, responses) {\n      var option = {\n        title: {\n          left: \"center\",\n          text: \"Category Breakdown\"\n        },\n        tooltip: {\n          trigger: \"item\"\n        },\n        toolbox: {\n          show: true,\n          feature: {\n            saveAsImage: {}\n          }\n        },\n        legend: {\n          orient: \"horizontal\",\n          bottom: 0,\n          data: []\n        },\n        series: [{\n          name: \"Category Breakdown\",\n          type: \"pie\",\n          radius: [\"30%\", \"50%\"],\n          avoidLabelOverlap: false,\n          label: {\n            show: false,\n            position: \"center\"\n          },\n          itemStyle: {\n            normal: {\n              label: {\n                show: true,\n                formatter: function formatter(data) {\n                  return \"\".concat(data.name, \" - \").concat(data.value, \" (\").concat(data.percent, \"%)\");\n                }\n              },\n              labelLine: {\n                show: true\n              }\n            },\n            emphasis: {\n              label: {\n                show: true,\n                position: \"center\",\n                textStyle: {\n                  fontSize: \"14\",\n                  fontWeight: \"normal\"\n                }\n              }\n            }\n          },\n          emphasis: {\n            label: {\n              show: true,\n              fontSize: \"30\",\n              fontWeight: \"bold\"\n            }\n          },\n          labelLine: {\n            show: false\n          },\n          data: []\n        }]\n      };\n      var solves = responses[0].data;\n      var categories = [];\n\n      for (var i = 0; i < solves.length; i++) {\n        categories.push(solves[i].challenge.category);\n      }\n\n      var keys = categories.filter(function (elem, pos) {\n        return categories.indexOf(elem) == pos;\n      });\n      var counts = [];\n\n      for (var _i = 0; _i < keys.length; _i++) {\n        var count = 0;\n\n        for (var x = 0; x < categories.length; x++) {\n          if (categories[x] == keys[_i]) {\n            count++;\n          }\n        }\n\n        counts.push(count);\n      }\n\n      keys.forEach(function (category, index) {\n        option.legend.data.push(category);\n        option.series[0].data.push({\n          value: counts[index],\n          name: category,\n          itemStyle: {\n            color: (0, _utils.colorHash)(category)\n          }\n        });\n      });\n      return option;\n    }\n  },\n  solve_percentages: {\n    format: function format(type, id, name, account_id, responses) {\n      var solves_count = responses[0].data.length;\n      var fails_count = responses[1].meta.count;\n      var option = {\n        title: {\n          left: \"center\",\n          text: \"Solve Percentages\"\n        },\n        tooltip: {\n          trigger: \"item\"\n        },\n        toolbox: {\n          show: true,\n          feature: {\n            saveAsImage: {}\n          }\n        },\n        legend: {\n          orient: \"horizontal\",\n          bottom: 0,\n          data: [\"Fails\", \"Solves\"]\n        },\n        series: [{\n          name: \"Solve Percentages\",\n          type: \"pie\",\n          radius: [\"30%\", \"50%\"],\n          avoidLabelOverlap: false,\n          label: {\n            show: false,\n            position: \"center\"\n          },\n          itemStyle: {\n            normal: {\n              label: {\n                show: true,\n                formatter: function formatter(data) {\n                  return \"\".concat(data.name, \" - \").concat(data.value, \" (\").concat(data.percent, \"%)\");\n                }\n              },\n              labelLine: {\n                show: true\n              }\n            },\n            emphasis: {\n              label: {\n                show: true,\n                position: \"center\",\n                textStyle: {\n                  fontSize: \"14\",\n                  fontWeight: \"normal\"\n                }\n              }\n            }\n          },\n          emphasis: {\n            label: {\n              show: true,\n              fontSize: \"30\",\n              fontWeight: \"bold\"\n            }\n          },\n          labelLine: {\n            show: false\n          },\n          data: [{\n            value: fails_count,\n            name: \"Fails\",\n            itemStyle: {\n              color: \"rgb(207, 38, 0)\"\n            }\n          }, {\n            value: solves_count,\n            name: \"Solves\",\n            itemStyle: {\n              color: \"rgb(0, 209, 64)\"\n            }\n          }]\n        }]\n      };\n      return option;\n    }\n  }\n};\n\nfunction createGraph(graph_type, target, data, type, id, name, account_id) {\n  var cfg = graph_configs[graph_type];\n\n  var chart = _echartsEn.default.init(document.querySelector(target));\n\n  chart.setOption(cfg.format(type, id, name, account_id, data));\n  (0, _jquery.default)(window).on(\"resize\", function () {\n    if (chart != null && chart != undefined) {\n      chart.resize();\n    }\n  });\n}\n\nfunction updateGraph(graph_type, target, data, type, id, name, account_id) {\n  var cfg = graph_configs[graph_type];\n\n  var chart = _echartsEn.default.init(document.querySelector(target));\n\n  chart.setOption(cfg.format(type, id, name, account_id, data));\n}\n\n//# sourceURL=webpack:///./CTFd/themes/core/assets/js/graphs.js?");

/***/ })

}]);