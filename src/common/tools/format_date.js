export default new class formatDate {
    constructor() {
    }

    convertTimestamp(timestamp) {
        var d = new Date(timestamp * 1000),	// Convert the passed timestamp to milliseconds
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
            dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
            sec = ('0' + d.getSeconds()).slice(-2),		// Add leading 0.
            ampm = 'AM',
            timezone_offset = -d.getTimezoneOffset()/60,
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh == 0) {
            h = 12;
        }
        timezone_offset = timezone_offset > 0 ? ('+'+timezone_offset) : timezone_offset;

        // ie: 2018-01-16 9:48:00 PM (UTC +8)
        time = yyyy + '-' + mm + '-' + dd + ' ' + h + ':' + min + ':' + sec +' ' + ampm + ' (UTC '+timezone_offset+')';

        return time;
    }

    //距离现在多少秒
    distanceNow(timestamp) {
        var now = new Date().getTime() / 1000;
        return ((now-timestamp)).toFixed(0);
    }

    showTime(timestamp) {
        var distance = this.distanceNow(timestamp);
        //小于60秒 > xx secs ago
        //小于1小时 > xx mins ago
        //大于一天 > xx days ago
        if(distance < 60) {
            return "> " + distance + " secs ago";
        }else if(distance >= 60 && distance < 3600){
            return "> " + Math.floor(distance / 60) + " mins ago";
        }else if(distance > 3600 && distance < 86400) {
            return "> " + Math.floor(distance / 3600) + " hours ago";
        }else {
            return "> " + Math.floor(distance / 86400) + " days ago";
        }
    }
}
