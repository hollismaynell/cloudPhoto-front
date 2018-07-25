// function getData(){
//     $.get('/cloudPhoto-web/queryBatTxnTimeout', function(data){
//         console.log("Data Loaded:" + data);
//     })
// }
function getData() {
    let xmlhttp;
	if (window.XMLHttpRequest)
	{
		//  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
		xmlhttp=new XMLHttpRequest();
	}
	else
	{
		// IE6, IE5 浏览器执行代码
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			console.log('Data Loaded:' + xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET","/cloudPhoto-web/queryBatTxnTimeout",true);
	xmlhttp.send();
}

export default getData