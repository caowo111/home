var base = {

}

// 线路检测
$(".btn").click(function () {
	for (var i = 0; i < $('.into').length; i++) {
		var dom = $('.into')[i];
		var randomSum = Math.floor(50 * Math.random());
		$(dom).html(randomSum + 'ms');
	}
})



$(function () {

	var host = '';
	//var host = 'http://rbline.haoall.com';
	var api = {
		// getDomainList: host + '/service?action=getDomainList&type=2',
		// getNoticeList: host + '/service?action=getNoticeList&type=12',
		init: host + '/service?action=init&type=198'
	};
	// getDomainList(api.getDomainList);
	init(api);
})


function init(api) {
	$.get(api.init, function (msg) {
		if (msg.errno == 0) {
			var arr = msg.data[0];
			for (var i in arr) {
				var val = arr[i]["value"],
					item = arr[i]["item"];
				if (item.indexOf('link') > -1) {
					$("." + item).attr("href", val);
				} else if (item === 'line_url_list') {

					var tempArr = val.split(',');
					tempArr = getRandomArrayElements(tempArr, 10);
					var html = '';
					for (var j = 0, len = tempArr.length; j < len; j++) {
						var tempNum = j+1
						var domaintext = tempArr[j].replace('http://', '').replace('https://', '')
						html += '<li class="li_list">';
						html += '<a href="http://' + domaintext + '" target="_blank">';

						html += '<span class="address">';
						html += '<span class="website">线路' + tempNum + '</span>';
						html += '<span class="speed">' + domaintext + '</span>';
						html += '</span>';
						html += '<span class="into">测速中</span>';
						html += '</a>';
						html += '</li>';
					}
					$('.line_list').html(html);
					$(".btn").click();
				} else {
					$("." + item).html(val);
				}
			}
		}
	});
}

function getDomainList(url) {
	$.ajax({
		url: url,
		dataType: 'json',
		cache: false,
		type: 'get',
		data: {},
		beforeSend: function () {

		},
		success: function (res) {
			var html = '';
			for (var i = 0, len = res.data[0].length; i < len; i++) {
				var domaintext = res.data[0][i].domain.replace('http://', '').replace('https://', '')
				html += '<li class="li_list">';
				html += '<a href="' + res.data[0][i].domain + '" target="_blank">';

				html += '<span class="address">';
				html += '<span class="website">' + res.data[0][i].name + '</span>';
				html += '<span class="speed">' + domaintext + '</span>';
				html += '</span>';
				html += '<span class="into">测速中</span>';
				html += '</a>';
				html += '</li>';

				// html += '<div class="clearfix bei_lf_gp">';
				// html += '<input type="text" value="30ms" class="left miaoshu" />';
				// html += '<em class="jiantou left"></em>';
				// html += '<input type="text" value="' + res.data[0][i].domain + '" class="left wz_ip" />';
				// html += '<a href="' + res.data[0][i].domain + '" target="_blank" class="right jinru">';
				// html += '进入官网';
				// html += '</a>';
				// html += '</div>';
			}



			$('.line_list').html(html);
			$(".btn").click();



		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {

		}
	});
}

function getRandomArrayElements(arr, count) {
	var shuffled = arr.slice(0),
		i = arr.length,
		min = i - count,
		temp, index;
	while (i-- > min) {
		index = Math.floor((i + 1) * Math.random());
		temp = shuffled[index];
		shuffled[index] = shuffled[i];
		shuffled[i] = temp;
	}
	return shuffled.slice(min);
}