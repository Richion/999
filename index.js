var linebot = require('linebot');
var request = require('request');

var cheerio = require('cheerio');
	




var url = 'https://oursogo.com/forum-174-1.html';

function demo(callbcak){
	request.get(url,function(err,req,body){
	
	var $ = cheerio.load(body);
	var txt = []
	$('th.new > a.xst').each(function(){
		
		txt.push($(this).attr('href'));
		
		
	
		
	});
	//console.log(txt)
	
	for(i=0;i<txt.length;i++){
		request.get(txt[i],function(err,res,body){
			
			var $ = cheerio.load(body)
			var msg = [];
			$('.zoom').each(function(req,res){
				
				msg.push($(this).attr('zoomfile'))
				
				
				
				
			});
			//console.log(msg);
			
			
			callbcak(err,msg)
		})
		
		
		
		
	}
	
		
	
	
	
	
	
	
});	
}
module.exports = demo;


//demo(function(req,res){
	
	
	//console.log(res)
	
	
//})




// 填入辨識Line Channel的資訊

var bot = linebot({
  channelId: '1655189233',
  channelSecret: 'b6657925a6344cdae0f0cd9263b16142',
  channelAccessToken: 'VgWXWX4q7uA4WjGaZPM47YUDkABofwitC5b1aa0rGVw4F2YOdc7fS0Oy0bk8LDi88uuZVCHAR2kVWJ4rjYBcCZGarHx+yZQrdvIEJsp3wAdPYkydhDrm4YSFnPrse/wbJBZUXW/RqIZxbX55i+yWTAdB04t89/1O/w1cDnyilFU='
});

bot.on('message',function (event) { 
	if(event.message.text==="抽"){
		demo(function(req,img){
			x = Math.floor(Math.random()*img.length);
			var url = 'https://oursogo.com/'
			var msg = [{
			type: 'image',
			originalContentUrl: url + img[x],
			previewImageUrl: url +img[x]
		}];
			
		event.reply(msg);	
	})
		
		
		
		
		
		//console.log(x);
		
		//console.log(msg.length);
			
	}
	if(event.message.text==="sexy"){
		demo(function(req,res){
			
			bot.push(`${event.source.userId}`, msg);
			
			
		})
		
		
		
	}
		
	






});

/*
bot.on('message', function(event) {
   var myReply='';
   
   if (event.message.text === 'text') {
      myReply=processText(event.message.text);
   }
  
   if (event.message.text === 'sticker') {
		 var msg = event.reply({
		type: 'image',
		originalContentUrl: 'https://example.com/original.jpg',
		previewImageUrl: 'https://example.com/preview.jpg'
		});
		bot.push(`${event.source.userId}`, msg);
	
   }
   if (event.message.text === 'image') {
      myReply='這照片好帥！';
	  var myReply = demo(function(req,res){
		
		bot.push(`${event.source.userId}`, [res]);
		
		});
	
   }
   
   event.reply(myReply).then(function(data) {
      // success 
      console.log('訊息已傳送！');
   }).catch(function(error) {
      // error 
      console.log('error');
   });
});

*/
// 當有人傳送訊息給Bot時

/*
function intervalFunc() {
 setTimeout(function () {
    var userId = 'U0750078411b8196d99206e5474e10511';
    var sendMsg = demo(function(req,res){
		
		bot.push(userId, [res]);
		
	});
    bot.push(userId, [sendMsg]);
    console.log('userId: ' + userId);
    console.log('send: ' + sendMsg);
	}, 3000);
}


setInterval(intervalFunc, 1500);
*/
/*
bot.on('message', function (event) {
    // event.message.text是使用者傳給bot的訊息
    // 準備要回傳的內容
    var replyMsg = `Hello你剛才說的是:${event.source.userId}`;
	console.log(`${event.source.userId}`);
    // 透過event.reply(要回傳的訊息)方法將訊息回傳給使用者
    event.reply(replyMsg).then(function (data) {
        // 當訊息成功回傳後的處理
    }).catch(function (error) {
        // 當訊息回傳失敗後的處理
    });
});
*/

// Bot所監聽的webhook路徑與port



bot.listen('/linewebhook', 8080, function () {
    console.log('[BOT已準備就緒]');
});
