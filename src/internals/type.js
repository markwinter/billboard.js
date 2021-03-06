/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import ChartInternal from "./ChartInternal";
import {isString, isArray, extend} from "./util";

extend(ChartInternal.prototype, {
	setTargetType(targetIds, type) {
		const $$ = this;
		const config = $$.config;

		$$.mapToTargetIds(targetIds).forEach(id => {
			$$.withoutFadeIn[id] = (type === config.data_types[id]);
			config.data_types[id] = type;
		});

		if (!targetIds) {
			config.data_type = type;
		}
	},

	hasType(type, targetsValue) {
		const $$ = this;
		const types = $$.config.data_types;
		const targets = targetsValue || $$.data.targets;
		let has = false;

		if (targets && targets.length) {
			targets.forEach(target => {
				const t = types[target.id];

				if ((t && t.indexOf(type) >= 0) || (!t && type === "line")) {
					has = true;
				}
			});
		} else if (Object.keys(types).length) {
			Object.keys(types).forEach(id => {
				if (types[id] === type) {
					has = true;
				}
			});
		} else {
			has = $$.config.data_type === type;
		}

		return has;
	},

	hasArcType(targets) {
		return this.hasType("pie", targets) ||
			this.hasType("donut", targets) ||
			this.hasType("gauge", targets);
	},

	isLineType(d) {
		const id = isString(d) ? d : d.id;

		return !this.config.data_types[id] ||
			this.isTypeOf(id, ["line", "spline", "area", "area-spline", "step", "area-step"]);
	},

	isTypeOf(d, type) {
		const id = isString(d) ? d : d.id;
		const dataType = this.config.data_types[id];

		return isArray(type) ?
			type.indexOf(dataType) >= 0 : dataType === type;
	},

	isStepType(d) {
		return this.isTypeOf(d, ["step", "area-step"]);
	},

	isSplineType(d) {
		return this.isTypeOf(d, ["spline", "area-spline"]);
	},

	isAreaType(d) {
		return this.isTypeOf(d, ["area", "area-spline", "area-step"]);
	},

	isBarType(d) {
		return this.isTypeOf(d, "bar");
	},

	isBubbleType(d) {
		return this.isTypeOf(d, "bubble");
	},

	isScatterType(d) {
		return this.isTypeOf(d, "scatter");
	},

	isPieType(d) {
		return this.isTypeOf(d, "pie");
	},

	isGaugeType(d) {
		return this.isTypeOf(d, "gauge");
	},

	isDonutType(d) {
		return this.isTypeOf(d, "donut");
	},

	isArcType(d) {
		return this.isPieType(d) ||
			this.isDonutType(d) ||
			this.isGaugeType(d);
	},

	// determine if is 'circle' data point
	isCirclePoint() {
		return this.config.point_type === "circle";
	},

	lineData(d) {
		return this.isLineType(d) ? [d] : [];
	},

	arcData(d) {
		return this.isArcType(d.data) ? [d] : [];
	},

	barData(d) {
		return this.isBarType(d) ? d.values : [];
	},

	// determine if data is line, scatter or bubble type
	lineScatterBubbleData(d) {
		return this.isLineType(d) || this.isScatterType(d) || this.isBubbleType(d) ?
			d.values : [];
	},

	barLineBubbleData(d) {
		return this.isBarType(d) || this.isLineType(d) || this.isBubbleType(d) ?
			d.values : [];
	},

	// https://github.com/d3/d3-shape#curves
	isInterpolationType(type) {
		return [
			"basis",
			"basis-closed",
			"basis-open",
			"bundle",
			"cardinal",
			"cardinal-closed",
			"cardinal-open",
			"catmull-rom",
			"catmull-rom-closed",
			"catmull-rom-open",
			"linear",
			"linear-closed",
			"monotone-x",
			"monotone-y",
			"natural"
		].indexOf(type) >= 0;
	}
});
