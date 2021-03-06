$(function(){
    var stageH=$(window).height();
    var stageW=$(window).width();
    var pageNum=0;
    var allowMove=false;
    var isUp=true;
	var isLR = true;
    var nextPageNum;
	var isTouch = true;
    var pageSum=$(".page-move").length;
    $(".page-move").each(function(index){
        if(index>0){
            $(this).css({top:stageH,left:0});
        }

    });
	
	var manifest=[
		{src:"Tpl/Public/images/wave1.png"},
		{src:"Tpl/Public/images/wave2.png"},
		{src:"Tpl/Public/images/wave3.png"},
		{src:"Tpl/Public/images/wave4.png"},
		{src:"Tpl/Public/images/page00_bg.jpg"},
    	{src:"Tpl/Public/images/page2_bg.jpg"},
		{src:"Tpl/Public/images/page3_bg.jpg"},
		{src:"Tpl/Public/images/page4_bg.jpg"},
		{src:"Tpl/Public/images/page5_bg.jpg"},
    	{src:"Tpl/Public/images/page6_bg.jpg"},
		{src:"Tpl/Public/images/page7_bg.jpg"},
		{src:"Tpl/Public/images/page8_bg.jpg"},
		{src:"Tpl/Public/images/page9_bg.jpg"},
    	{src:"Tpl/Public/images/page10_bg.jpg"},
    	{src:"Tpl/Public/images/paopao.png"},
    	{src:"Tpl/Public/images/clickImg.png"},
    	{src:"Tpl/Public/images/ppr.png"},
    	{src:"Tpl/Public/images/txt1.png"},
		{src:"Tpl/Public/images/txt2.png"},
		{src:"Tpl/Public/images/txt2a.png"},
		{src:"Tpl/Public/images/txt3.png"},
		{src:"Tpl/Public/images/txt4.png"},
		{src:"Tpl/Public/images/txt4a.png"},
		{src:"Tpl/Public/images/txt5.png"},
		{src:"Tpl/Public/images/txt5a.png"},
		{src:"Tpl/Public/images/txt6.png"},
		{src:"Tpl/Public/images/txt6a.png"},
		{src:"Tpl/Public/images/txt7.png"},
		{src:"Tpl/Public/images/txt7a.png"},
		{src:"Tpl/Public/images/txt8.png"},
		{src:"Tpl/Public/images/txt8a.png"},
		{src:"Tpl/Public/images/txt9.png"},
		{src:"Tpl/Public/images/txt9a.png"},
		{src:"Tpl/Public/images/txt10.png"}
    ];

    loader = new createjs.LoadQueue(false);
    loader.addEventListener("complete", handleOverallComplete);
    loader.setMaxConnections(5);
    loader.loadManifest(manifest);

    function handleOverallComplete(event){
        init();
    }

	$(document).on("touchstart",function (){
		if(isTouch){
			isTouch = false;
			document.getElementById("bgSound").play();	
		}
	});
	
    function init(){
        $(".bgSoundImg").show();
        $("#load").remove();
        $(".app-content").show();
		$(".page-move").eq(0).show();
    }

	var isGray = false;
	
	$(".clickImg").on("touchstart",function (){
		TweenMax.to($(".img1"),1,{width:"500px",height:"500px",top:"20%",left:"30%",onComplete:function (){
			isGray = true;
			$(".intro").hide();
			$(".img1").hide();
			$(".ppr").show();
			$(".ppr2").show();
			$(".ppr3").show();
			$(".ppr4").show();
			$(".ppr5").show();
			allowMove = true;	
			$(".guideTop").show();
		}});
	});
	$(".clickImg").on("touchend",function (){
		if(!isGray)
		{
			TweenMax.to($(".img1"),2,{width:"164px",height:"164px",top:"50%",left:"40%"});
		}
	});
	
    $(".bgSoundImg").click(function(){
        if($(".bgSoundImg").hasClass("musicPlay")){
            $(".bgSoundImg").removeClass("musicPlay");
            document.getElementById("bgSound").pause();
        }else{
            $(".bgSoundImg").addClass("musicPlay");
            document.getElementById("bgSound").play();
        }
    });



    $('#icontoucharea').bind("touchmove",function(e){
        e.preventDefault();
    });

    var hammertime = Hammer(document.getElementById('icontoucharea'), {
        //preventDefault: true
    });
	
    hammertime.on('dragend dragdown dragup dragleft dragright', function(ev) {
        ev.preventDefault();
        if(allowMove) {
            switch (ev.type) {
                case 'dragend':
                    if(isUp && isLR) {
                        if(pageNum!=(pageSum-1)) {
                            allowMove = false;
                            TweenLite.to($(".page-move").eq(pageNum), 0.6, {scale: 0.2});
                            TweenLite.to($(".page-move").eq(nextPageNum), 0.6, {top: 0, onComplete: function () {
                                $(".page-move").eq(pageNum).hide();
                                if (pageNum < pageSum - 1) {
                                    pageNum++;
									if(pageNum == (pageSum-1)){
										$(".guideTop").hide();	
									}
                                } else {
                                    //pageNum=0;
									
                                }
                                allowMove = true;
                            }});
                        }else{
                            //$(".weixin-guide").show();
                            $(".guideTop").hide();
                        }
                    }else if(isLR){
                        $(".weixin-guide").hide();
                        $(".guideTop").show();

                        if(pageNum>0) {
                            allowMove = false;
                            TweenLite.to($(".page-move").eq(pageNum), 0.6, {scale: 0.2});
                            TweenLite.to($(".page-move").eq(nextPageNum), 0.6, {top: 0, onComplete: function () {
                                $(".page-move").eq(pageNum).hide();
                                if (pageNum > 0) {
                                    pageNum--;
                                } else {
                                    //pageNum=pageSum-1;
                                }

                                allowMove = true;
                            }});
                        }
                    }
                    break;
                case "dragup":

                    isUp=true;
					isLR = true;
                    if(pageNum<pageSum-1){
                        nextPageNum=pageNum+1;

                        posY = ev.gesture.distance;
                        $(".page-move").eq(nextPageNum).show();
                        TweenLite.set($(".page-move").eq(pageNum), {scale: ((stageH - posY) / stageH),transformOrigin:"top center",zIndex:900});
                        TweenLite.set($(".page-move").eq(nextPageNum), {top: stageH - posY,scale:1,zIndex:1000});
                    }else{
                        //nextPageNum=0;
                    }
                   
                    break;
                case "dragdown":
                    isUp=false;
					isLR = true;
                    if(pageNum>0){

	                   
                        nextPageNum=pageNum-1;
						/************************************************************************************/
						
						
                        posY = ev.gesture.distance;
                        $(".page-move").eq(nextPageNum).show();
                        TweenLite.set($(".page-move").eq(pageNum), {scale: ((stageH - posY) / stageH),transformOrigin:"bottom center",zIndex:900});
                        TweenLite.set($(".page-move").eq(nextPageNum), {top: -stageH+posY,scale:1,zIndex:1000});
                    }else{
                        //nextPageNum=pageSum-1;
                    }

                    break;
				case "dragleft":
				isLR = false;
				break;
				
				case "dragright":
				isLR = false;
				break;

            }
        }
    });
	$(".submit").click(function(){
		console.log("send msg");
		if($("#name").val()=="" || $("#tel").val()=="" || $("#gender").val()=="" ){
			alert("请完整填写姓名，性别，电话后再点击提交");
			return;
		} 
		var msg = {"name":$("#name").val(),"gender":$("#gender").val(),"phone":$("#tel").val()};
		console.log(msg);
		url = "/signup?name="+$("#name").val()+"&"+$("#gender").val()+"&"+$("#tel").val()
		$.post(url,msg,
		function(data,status){
			//alert(status);
			alert("恭喜你，提交成功");
		}, "json");
	});
});