function clock(lang) {
	this.currentYear = null;
	this.currentMonth = null;
	this.currentDay = null;
	this.currentHour = null;
	this.currentMinute = null;
	this.currentSecond = null;
	this.currentWeek = null;
	this.lang = lang ? lang : 'cn';

	/* 将当前时间数据初始化为null,性能考虑，每次使用完变量后将其置为null,避免存储浪费，类似垃圾回收机制 */

	this.init = function() {
		var self = this;
		self.currentYear = null;
		self.currentMonth = null;
		self.currentDay = null;
		self.currentHour = null;
		self.currentMinute = null;
		self.currentSecond = null;
		self.currentWeek = null;
	};
	/* 更新当前时间数据，可更新其一使用变量名，默认更新全部，多个数组 */

	this.update = function(name) {
		var self = this;
		if (name instanceof Array) {
			for (var i of name) {
				if (typeof i == 'string') {
					judgeName(i.toLocaleLowerCase());
				}
			}
		} else {
			judgeName(name);
		}

		/* 检测更新变量 */
		function judgeName(name) {
			switch (name) {
				case 'year':
					self.currentYear = new Date().getFullYear() + '';
					break;
				case 'month':
					self.currentMonth = new Date().getMonth();
					break;
				case 'day':
					self.currentDay = new Date().getDate();
					break;
				case 'hour':
					self.currentHour = new Date().getHours();
					break;
				case 'minute':
					self.currentMinute = new Date().getMinutes();
					break;
				case 'second':
					self.currentSecond = new Date().getSeconds();
					break;
				case 'week':
					self.currentWeek = new Date().getDay();
					break;
				default:
					self.currentYear = new Date().getFullYear() + '';
					self.currentMonth = new Date().getMonth();
					self.currentDay = new Date().getDate();
					self.currentHour = new Date().getHours();
					self.currentMinute = new Date().getMinutes();
					self.currentSecond = new Date().getSeconds();
					self.currentWeek = new Date().getDay();
					break;
			}
		}

		self.currentMonth = current.getMonth();
		self.currentDay = current.getDate();
		self.currentHour = current.getHours();
		self.currentMinute = current.getMinutes();
		self.currentSecond = current.getSeconds();
		self.currentWeek = current.getDay();
	};

	/* 获取年份 */

	this.year = function(type) {
		var self = this;
		self.init();
		var result = type == 'y' ? self.currentYear.substr(2) : self.currentYear;
		return result;
	};
	/* 获取月份 */

	this.month = function(lang, long) {
		var self = this;
		self.init();
		var long = long ? long : false;
		if (long) {
			return judgeLang(lang, long);
		} else {
			switch (typeof lang) {
				case 'string':
					return judgeLang(lang, long);
					break;
				case 'boolean':
					return defaults(lang);
					break;
				default:
					return defaults(false);
					break;
			}
		}
		function judgeLang(lang, long) {
			switch (lang) {
				case 'cn':
					return chinese(long);
					break;
				case 'en':
					return english(long);
					break;
				default:
					return defaults(long);
					break;
			}
		}
		/* 中文处理 */
		function chinese(long) {
			var monthMax = [
				'一月',
				'二月',
				'三月',
				'四月',
				'五月',
				'六月',
				'七月',
				'八月',
				'九月',
				'十月',
				'十一月',
				'十二月'
			];
			var monthMin = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
			var result = long ? monthMax[self.currentMonth - 1] : monthMin[self.currentMonth - 1];
			return result;
		}
		/* 英文处理 */
		function english(long) {
			var monthMax = [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'Octorber',
				'November',
				'December',
			];
			var monthMin = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
			var result = long ? monthMax[self.currentMonth - 1] : monthMin[self.currentMonth - 1];
			return result;
		}
		/* 默认处理 */
		function defaults(long) {
			var result = long
				? self.currentMonth > 10
					? self.currentMonth + ''
					: '0' + self.currentMonth
				: self.currentMonth + '';
			return result;
		}
	};
}
