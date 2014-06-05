$(function(){
	var app ={}
	var bestScore = 0;
	function initGame(){
		if (localStorage.getItem("papaBest")) {
			bestScore = localStorage.getItem("papaBest");
		}else{
			bestScore = 0;
			localStorage.setItem("papaBest",bestScore);
		}
		$(".start-button").click(function(){
			reStartGame();
		})
		$(".grid-cell").click(function(){
			if (!app.canClick) {
				return;
			}else{
				if ($(this).find(".innercell").hasClass("fanmian")) {
					
					return;
				}
				var sound = new Howl({
  urls: ['pibian.mp3']
}).play();
				var row = $(this).parent().index()+1;
				var col = $(this).index()+1;
				var sound = new Howl({
  urls: ['sound.mp3']
}).play();
				checkNext(row,col,$(this));
			}
		})
		$(".paButton").click(function(){
			$(".gameInfo").removeClass("display");
			if (app.nowin=="papaBefore") {
				gopapaView();
			};
			if (app.nowin=="gameover") {
				reStartGame();
			};
			if (app.nowin =="next") {
				loadNext();
			};
			
		})
		$(".subInfo").click(function(){
			$(".gameInfo").removeClass("display");
			if (app.nowin=="papaBefore") {
				gopapaView();
			};
			if (app.nowin=="gameover") {
				reStartGame();
			};
			if (app.nowin =="next") {
				loadNext();
			};
		})
		$(window).keyup(function(e){
			console.log(e.which);
			if (e.which==32) {
				soonDo();
			};
		})
		if (bestScore) {
			$(".bestScore").html(bestScore);
		}else{
			bestScore = 0;
			$(".bestScore").html(bestScore);
		}

	}
	function loadNext(){
		loadGuankaType1();
	}
	function checkNext(row,col,cell){
		var key = "r"+row+"c"+col;
		var number = app.fangkuaiValue[key];
		if (!number) {
			gameover()
			return ;
		}
		if (number!=app.numberArray[0]) {
			gameover()
			return;
		};
		cell.find(".innercell").addClass("fanmian");
		cell.find(".innercell").animate({
		            "opacity":"1"
		        },200);
		app.numberArray.splice(0,1);
		if (app.numberArray.length==0) {
			goNextPlay();
		};

	}
	function goNextPlay(){
		var scoreadd = app.thisGuanka.num*(app.thisGuanka.timeLeft+1);
		addScore(scoreadd);
		$(".gameInfo").addClass("display");
		$(".papaInfo").html("你干的不错，继续点击进行一关吧");
		$(".top1").html("请记住这些数字的大小和位置,记住后点击空格，剩余时间可加分");
		$(".paButton").html("继续");
		app.nowin="next";
		app.canClick = false;
	}
	function gameover(){
		showAllCell();
		$(".gameInfo").addClass("display");
		$(".papaInfo").html("游戏结束，你选择错误");
		$(".paButton").html("重新开始");
		app.nowin="gameover";
	}
	function showAllCell(){
		$('.innercell').animate({
		            "opacity":"1"
		        });
	}
	function gopapaView(){
		
		app.canClick = true;
	}
	function reStartGame(){
		app={};
		// loadGuanka(4,1,10);
		app.nownandu = [5,1,10];
		app.score = 0;
		setScore(0);
		$(".top1").html("请记住这些数字的大小和位置,记住后点击空格，剩余时间可加分");
		loadGuankaType1();
	}
	function setScore(num){
		app.score = num;
		$(".nowScore").html(app.score);
	}
	function setBest(num){
		bestScore = num;
		$(".bestScore").html(bestScore);
		localStorage.setItem("papaBest",bestScore);
	}
	function addScore(num){
		app.score +=num
		if (app.score>bestScore) {
			setBest(app.score);
		};
		$(".nowScore").html(app.score);
	}
	function soonBegin(){
		
		 clearTimeout(app.timer);
		 $('.innercell').animate({
		            "opacity":"0"
		        });
		 pleasePapa();
	}
	function loadGuanka(number,small,big){

	}
	function loadFangkuais(fangkuaiArray){
		//
		$(".grid-cell").html("");
		app.fangkuaiValue = {};
		app.numberArray = [];
		app.thisGuanka = {};
		
		for (var i = 0; i < fangkuaiArray.length; i++) {
			var fangkuai = fangkuaiArray[i];
			var row = fangkuai[0];
			var col = fangkuai[1];
			var number = fangkuai[2];
			var key = "r"+row+"c"+col;
			app.fangkuaiValue[key] = number;
			app.numberArray.push(number);
			loadAFangkuai(row,col,number);
		};
		app.numberArray = _.sortBy(app.numberArray);
		out = app.numberArray;
		makeTimer(5);
		app.nowin = "jiyiIn";
		
		app.thisGuanka.num = fangkuaiArray.length;
	}
	function soonDo(){
		if (app.nowin=="jiyiIn") {
			soonBegin();
			return;
		};
		if(app.nowin =="fightIn"){
			return;
		};
		if (app.nowin=="papaBefore") {
			$(".gameInfo").removeClass("display");
				gopapaView();
				return;
			};
			if (app.nowin=="gameover") {
				$(".gameInfo").removeClass("display");
				reStartGame();
				return;
			};
			if (app.nowin =="next") {
				$(".gameInfo").removeClass("display");
				loadNext();
				return;
			};

	}
	function makeTimer(number){
		app.thisGuanka.timeLeft = number;
		if (number>0) {
			if (number==2) {
				$('.innercell').animate({
		            "opacity":"0"
		        },2000);
			}
		  app.timer = 	setTimeout(function(){
			makeTimer(number-1);
			},1000)
			return;
		}else{
			pleasePapa();
		}
		
	}
	function pleasePapa(){
		$(".gameInfo").addClass("display");
		$(".papaInfo").html("请按照从小到大的顺序点击，越快加分越多");
		$(".top1").html("请按照从小到大的顺序点击，越快加分越多");
		$(".paButton").html("开始");
		app.nowin = "papaBefore";
	}
	function loadAFangkuai(row,col,number){
		var $row = $(".grid-row").eq(row-1);
		var $gezi = $row.find(".grid-cell").eq(col-1);
		
	
		var html = "<div class='innercell'>"+number+"</div>";
		$gezi.html(html);
		// $gezi.html(number);
	}
	//关卡策略1
	function loadGuankaType1(){
		var nowNandu = app.nownandu;
		var randomNum = nowNandu[0];
		var small = nowNandu[1];
		var biggest = nowNandu[2];
		var newNandu =[];
		if (biggest<16) {
			biggest+=1;
			newNandu =[randomNum,small,biggest];
			app.nownandu = newNandu;
		}else{
			newNandu =[randomNum+1,small,9];
			app.nownandu = newNandu;
		}
		if (randomNum>=16) {
			alert("你已经战胜了开发者了！");
		};
		// var nandu = [5,1,10];
		var randomArray = makeRandomCell(newNandu);
		console.log(randomArray);
		loadFangkuais(randomArray);
	}
	function loadGuankaType2(){
		var nandu = [6,1,10];
		var randomArray = makeRandomCell(nandu);
		console.log(randomArray);
		loadFangkuais(randomArray);
	}
	function makeRandomCell(nandu){
		var num = nandu[0];
		var outArray = [];
		var oneto16 = [1, 2, 3, 4, 5, 6,7,8,9,10,11,12,13,14,15,16];
		var newArray =  _.shuffle(oneto16);
		var newArray = _.first(newArray,num);
		for (var i = 0; i < num; i++) {
			var xuhao = newArray[i];
			var row = parseInt((xuhao -0.5)/4)+1;
			var col = xuhao%4;
			if (col==0) {
				col =4;
			};
			var arandom = _.random(nandu[1], nandu[2]);
			outArray.push([row,col,arandom]);

		};
		return outArray;
	}
	//关卡策略1end

	initGame();
})