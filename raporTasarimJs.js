        function Menu() {
           $(".yanMenu").css("display","none");
           $(".anaMenu").css("width","100%");

        }       
        function reset() {
             updateZoom(0.0);

        }
        function zoomIn() {
             updateZoom(0.1);
        }
        function zoomOut() {
             updateZoom(-0.1);
        }
        zoomLevel = 1;

       var updateZoom = function(zoom) {
            zoomLevel += zoom;
            $('.note-editable').css({ zoom: zoomLevel, '-moz-transform': 'scale(' + zoomLevel + ')' });
            if(zoom == 0)$('.note-editable').css({ zoom: '', '-moz-transform': 'scale(' + '' + ')' });
        }
        function rgbConvertHx(colorBg){
            colorBg = '#'+colorBg.match(/\d+/g).map(function(x){       //Rgb kodunun Hx değerini hesablıyor ..
                  x = parseInt(x).toString(16);
                  return (x.length==1) ? "0"+x : x;
            }).join("");
            return  colorBg;
        }
        function paddingValue() {                                      //Secili nesnenin padding Değerleri buluyor ve yandaki menude gösteriyor ..
            var paddingValue=$(last).css("padding");
            var pd=paddingValue.split(" ");
            $(".PaddingEvents ").val(" ");
            if(pd.length ==1 ) $(".PaddingEvents").val(pd[0].substring(0,(pd[0].length-2)));
            if(pd.length ==2 ){
                $(".pTopBottom").val(pd[0].substring(0,(pd[0].length-2)));
                $(".pLeftRight").val(pd[1].substring(0,(pd[1].length-2)));
            }else if(pd.length ==3 ){
                $("#padding-top").val(pd[0].substring(0,(pd[0].length-2)));
                $(".pLeftRight").val(pd[1].substring(0,(pd[1].length-2)));
                $("#padding-bottom").val(pd[2].substring(0,(pd[2].length-2)));
           }else if(pd.length ==4 ) {
                $("#padding-top").val(pd[0].substring(0,(pd[0].length-2)));
                $("#padding-right").val(pd[1].substring(0,(pd[1].length-2)));
                $("#padding-bottom").val(pd[2].substring(0,(pd[2].length-2)));
                $("#padding-left").val(pd[3].substring(0,(pd[3].length-2)));
            }

        }
        function borderValue(){                                       //Secili nesnenin border Değerleri buluyor ve yandaki menude gösteriyor ..
            var nameStyle = $(last).attr("style");
//debugger;
            var borderStyle=nameStyle.substring(nameStyle.indexOf("border"), ((nameStyle.indexOf("border"))+(nameStyle.substring(nameStyle.indexOf("border"))).indexOf(":")));
            $(".border-status").removeClass("bg-secondary");
            $("#"+borderStyle).addClass("bg-secondary");

            if(nameStyle.indexOf("border") != -1) {
              var fndBorder=foundStyle("border");
              var brd=fndBorder.split(" ");
              $("#kenar").find("option").attr("selected",false);
              if(brd.length ==1){
                 $(`#kenar option[value=${brd[0]}`).attr("selected","true");
                 $(`#borderWdth`).val();
                $(`#borderColor`).val("#ffffff");
              }else if(brd.length ==2){
                 $(`#kenar option[value=${brd[1]}`).attr('selected','selected');
                 $(`#borderWdth`).val(brd[0].substring(0, ((brd[0].length)-2)));
              }else if(brd.length >=3){
                 $(`#kenar option[value=${brd[1]}`).attr('selected','selected');
                 $(`#borderWdth`).val(brd[0].substring(0, ((brd[0].length)-2)));
                 $(`#borderColor`).val(rgbConvertHx(brd[2]+brd[3]+brd[4]));
              }
            }else{
                $("#borderWdth").val("");
                $("#borderColor").val("#000000");
               // $("#kenar").find("option").attr("selected",false);
            }
        }
        function fontValue(){                                         //Secili nesnenin font Değerlerini buluyor ve yandaki menude gösteriyor ..
      //   debugger; 
  var nameStyle = $(last).attr("style");
            if(nameStyle.indexOf("font-family") != -1) {
            var fnt=nameStyle.substring(nameStyle.indexOf("font-family:", ";" ));   //Font Family
            var fntFaminly=fnt.substring( (fnt.indexOf(";")), (fnt.indexOf(":")+1) ).trim();
            $("#textFontFamily").find('option').attr("selected",false) ;
            if(fnt.includes("font") == true)$(`#textFontFamily option[value=${fntFaminly}]`).attr('selected','selected');
            }

    //    debugger;
            var fntColor=foundStyle("color:");                                      //Color
            if(fntColor.includes("rgb") == false | nameStyle.indexOf("color:") == -1) fntColor="rgb(0,0,0);";
            var txtColor=rgbConvertHx(fntColor);
            $("#textColor").val(txtColor);

            var fntSize=foundStyle("font-size:");                                   //Font Size
           if(nameStyle.indexOf("font-size") != -1){ //$("#textFontSize").val($(last).css("font-size"));
            var fntSize=fntSize.substring(0,(fntSize.length-2));
            $("#textFontSize").val(fntSize);
}else{
                 $("#textFontSize").val("");
}

           var fntBgColor=foundStyle("background:");                                //Background d
           if(fntBgColor.includes("rgb") == false | nameStyle.indexOf("background:") == -1) fntBgColor="rgb(255,255,255);";
           var colorBG=rgbConvertHx(fntBgColor);
            $("#bgColor").val(colorBG);

        }
        function sizeValue() {                                      //Secili nesnenin genişlik Değerleri buluyor ve yandaki menude gösteriyor ..
//debugger;   
        var nameStyle = $(last).attr("style");           
     //      debugger;
           $("#width").val("");
           $("#height").val("");
           $(".sizeUnit").removeClass("selectUnit");
//debugger;
           if(nameStyle.indexOf("width") != -1 ){
                var width=foundStyle("width"); 
                if(width.indexOf("px") != -1){
                    $("#width").val(width.substring(0,(width.indexOf("px"))));
                    $("#px").addClass("selectUnit");

                }else if(width.indexOf("%") != -1){
                   $("#width").val(width.substring(0,(width.indexOf("%"))));
                   $("#percent").addClass("selectUnit");
               }
           }
           if(nameStyle.indexOf("height") != -1 ){
                 var height=foundStyle("height");
                if(height.indexOf("px") != -1){
                   $("#height").val(height.substring(0,(height.indexOf("px"))));
                    $("#px").addClass("selectUnit");

                }else if(height.indexOf("%") != -1){
                  $("#height").val(height.substring(0,(height.indexOf("%"))));
                   $("#percent").addClass("selectUnit");
               }
           }

            
        }


        function borderChange(borderDurum){     
//debugger;                  
                var styleString=$(last).attr("style");
               if(styleString != undefined){
                  if(styleString.indexOf("border",";") != -1) {
                   var d2=(styleString.substring(styleString.indexOf("border",";"))).indexOf(";");
                   var str=styleString.substring(0,styleString.indexOf("border",";")).concat(styleString.substring((styleString.indexOf("border",";")+d2)));
                  }else{
                   var str=styleString;
                  }
                }

                var deger=$("#borderWdth").val().trim()+"px";
                var boderDeger=$("#kenar").val();
                var borderColor=$("#borderColor").val();

                $(last).attr("style"," ");
                $(last).attr("style",str);
                if(boderDeger != " ") $(last).css(borderDurum,boderDeger+" "+deger+" "+borderColor);
                if(boderDeger == " ") $(last).css(borderDurum,deger+" "+borderColor);

           }
        var last = null;
        var elem = [];
        function Secim() {                                           // Sectiğimiz nesne
            $('#secili').html(last.tagName + " Seçtik");

            $(last).attr("title", "secili");
            var name = $(last).attr("data-ex");
            var nameClass = $(last).attr("class");
            var nameStyle = $(last).attr("style");

            $('#ex').val(name);
            $('#className').val(nameClass);
            $('#styleName').val(nameStyle);
            $('#colSpan').val($(last).attr('colspan'));
       
            $("#top").val(($(last).css("top")).substring(0, ($(last).css("top")).indexOf("px")));
            $("#bottom").val(($(last).css("bottom")).substring(0, ($(last).css("bottom")).indexOf("px")));
            $("#left").val(($(last).css("left")).substring(0, ($(last).css("left")).indexOf("px")));
            $("#right").val(($(last).css("right")).substring(0, ($(last).css("right")).indexOf("px")));
            $("#position").val($(last).css("position"));
            $("#expression-ınput").val($(last).attr("data-ex"));
            $("#expression-ınput2").val($(last).attr("data-ex2"));
            paddingValue();                                         //Sectiğin nesnenin padding varsa buluyor ve yandaki menude gösteriyor
       //debugger;
         if(nameStyle != undefined){
             borderValue();
             fontValue();
             sizeValue();
          }else{
                $(".border-status").removeClass("bg-secondary");
                $("#bgColor").val("#ffffff");
                $("#textColor").val("#000000");
                $("#textFontSize").val("");
                $("#kenar").find("option").attr("selected",false);
                $("#textFontFamily").find('option').attr("selected",false) ;
                $(`#borderColor`).val("#ffffff");
                $(`#borderWdth`).val("");
                $("#width").val("");
                $("#height").val("");
                $(".sizeUnit").removeClass("selectUnit");
          }

        }
        function foundStyle(styleKey){

            var nameStyle = $(last).attr("style");
            var fnt=nameStyle.substring(nameStyle.indexOf(styleKey, ";" ));        //Background değerini buluyor ve input atıyor
            var fntVariable=fnt.substring((fnt.indexOf(";")), (fnt.indexOf(":")+1) ).trim();
            return fntVariable;
        }

        function IPTAL() {
            $(last).removeAttr("title");
        }
        function P(e) {
            if (e.id != "x") {
                elem.push(e);
                console.log('> ' + e.tagName);

                $('#seciliNesne').append($('<option>', {
                    value: elem.length,
                    text: e.tagName
                }));

                P(e.parentElement);
            }
        }
        function changeAttr(key,value){
            $(last).attr(key, $("#"+value).val());
        }
        $(document).ready(function () {

           $(".note-toolbar").append("<div class='note-btn-group btn-group'><button type='button' class='note-btn btn btn-default btn-sm mr-2' title='Zoom In' onclick='zoomIn()'><i class='fa fa-plus'></i></button><button class='btn btn-sm btn-default mr-2' data-toggle='tooltip' title='Zoom Out' onclick='zoomOut()'><i class='fa fa-minus'></i></button><button class='btn btn-sm btn-default' onclick='reset()' style='padding-top:2px;padding-bottom:2px'>Reset</button></div>");     

         $('#exampleModal').on('show.bs.modal', function() {   //Modal açıldığında .. 
              $(".note-table-popover").css("display","none"); //Arkada tablo secili olduğunda gelen merge row col tablosunu kapatıyor...
                editor.setValue(' ');
                var txt=$(last).attr("data-ex");
                if(txt != undefined){
                editor = ace.edit("editor");
                editor.setValue(txt);
               }
           });
           $('#exampleModal2').on('show.bs.modal', function() {   //Modal açıldığında .. 
debugger;
              $(".note-table-popover").css("display","none"); //Arkada tablo secili olduğunda gelen merge row col tablosunu kapatıyor...
                editor.setValue(' ');
                var txt=$(last).attr("data-ex2");
                if(txt != undefined){
                editor2 = ace.edit("editor2");
                editor2.setValue(txt);
               }
               
           });
           $(".okExpression").on("click",function(){      //Expression ları kayıt etmektedir.
              editor = ace.edit("editor");
              var txt=   editor.getValue();
              $(last).attr("data-ex",txt);
              $("#expression-ınput").val(txt);
//debugger;
           });
           $(".okExpression2").on("click",function(){      //Expression ları kayıt etmektedir.
              editor = ace.edit("editor2");
              var txt=   editor.getValue();
              $(last).attr("data-ex2",txt);
              $("#expression-ınput2").val(txt);
debugger;
           });
           $("#expression").on("click",function(e){
              $("#expressionInput").append("["+$(this).val()+"] ");
              $(last).attr("data-ex", $("#expressionInput").val());
           //     debugger;
           });
           $(".ChangePosition").on("change keyup",function(e){
             if($(this).val() == "nothing"){
                    $(last).css("position","");
                    $(last).css("top","");
                    $(last).css("left","");
                    $(last).css("bottom","");
                    $(last).css("right","");
                   $(".ChangePosition").val(" ");
              }
              $(last).css($(this).attr("events"), $(this).val());
             if($(last).attr("style") != undefined)$("#styleName").val($(last).attr("style"));  //Style input nı güncelliyor
           });
          $(".ChangeEvents").on("change keyup",function(e){
              var id=`#${$(this).attr("id")}`;
              var event=$(this).attr("events");
             $(last).css(event,$(id).val());
             if($(last).attr("style") != undefined)$("#styleName").val($(last).attr("style"));  //Style input nı güncelliyor
          });
          $(".WidthHeightEvents").on("change keyup",function(e){
              var size=$(".selectUnit").attr("data-id");
              var id=`#${$(this).attr("id")}`;
              var event=$(this).attr("events");
              $(last).css(event,$(id).val()+size);
              if($(id).val() == "")$(last).css(event,"");     //width veya hight silince style dan silme gerçekleştiriyor ..
              if($(last).attr("style") != undefined)$("#styleName").val($(last).attr("style"));  //Style input nı güncelliyor
          });

          $(".kenarStatus").on("change keyup",function(e){
//debugger;
                var borderDurum=$(".bg-secondary").attr("id");
                if(borderDurum != undefined)borderChange(borderDurum);

                if($(last).attr("style") != undefined)$("#styleName").val($(last).attr("style"));  //Style input nı güncelliyor
          });
          $(".kenarInput").click(function(e){
                var brd=$("#borderWdth").val();
                var borderDurum=$(this).attr("id");
                if(brd.length !=0)borderChange(borderDurum);
                if($(last).attr("style") != undefined)$("#styleName").val($(last).attr("style"));  //Style input nı güncelliyor

          });

          $("#stylePageName").change(function (e) {                                               //Sayfanın genel style değiştiğinde
                $("#cssPage").empty();
                $("#cssPage").html($("#stylePageName").val());
        
                var style=$(".note-codable").val();
                var stylePage=style.substring(0,(style.indexOf("cssPage")+9))+$("#stylePageName").val()+style.substring(style.indexOf("/style")-1);

                $(".note-codable").val(stylePage);
          });
         $(".note-codable").change(function(){
                var veri=$(".note-codable").val();
              $("#stylePageName").val(veri.substring((veri.indexOf("cssPage")+9),(veri.indexOf("/style")-1)));

        });
          $('.PaddingEvents').on("change keyup",function (e) {
                var p=$(this).attr("id");
                var d=$("#"+p).val();
                if(p == "padding") $(".PaddingEvents").val(d);
                if(p != "padding") $("#padding").val(" ");
                $(last).css(p, d);
                if($(last).attr("style") != undefined)$("#styleName").val($(last).attr("style"));  //Style input nı güncelliyor
          });
          $(".border-status").mouseover(function(){
                 $(this).css("background-color","#eaeaea");
          });

          $(".border-status").mouseout(function(){
                $(this).css("background-color","white");
          });
          $(".sizeUnit").mouseover(function(){
                $(this).css("background-color","#aaaaaa");
          });

          $(".sizeUnit").mouseout(function(){
                $(this).css("background-color","");
          });
          $(".sizeUnit").on("click",function(){
              var durum=$(this).attr("id");
              var w=$("#width").val();
              var h=$("#height").val();
              if(w != null || h!=null){
                if(durum =="percent"){
                   w=w+"%";
                   h=h+"%"; }
                 var nameStyle = $(last).attr("style");  //px ve % değiştirdiğinde
                if(nameStyle != undefined)var style=nameStyle.substring(0,nameStyle.indexOf("width:")).concat(nameStyle.substring(nameStyle.indexOf("width:")+nameStyle.substring(style).indexOf(";")));

                 $(last).removeAttr("style");
                 $(last).attr("style",style);
                 $(last).css("width",w);
                 $(last).css("height", h);
               }

              $(".sizeUnit").removeClass("selectUnit");
              $(`#${durum}`).addClass("selectUnit");

           });


         $(".border-status").on("click",function(e){
              //  $(last).attr("background-color","#eaeaea");
              var durum= $(this).attr("id");
              $(".border-status").removeClass("bg-secondary");
              $("#"+durum).addClass("bg-secondary");
          });



            const dynamicInputs = document.querySelectorAll('input.input-color-picker');
            const handleThemeUpdate = (cssPropName,cssVars) => {
                 $(last).css(cssPropName,cssVars);              //Color anlık olarak değiştiğinde background veya text color değişiyor
                if($(last).attr("style") != undefined)$("#styleName").val($(last).attr("style"));  //Style input nı güncelliyor
            }
            dynamicInputs.forEach((item) => {
            item.addEventListener('input', (e) => {
                 const cssPropName = e.target.getAttribute('data-id');
                 console.log(cssPropName)
                 handleThemeUpdate(cssPropName,e.target.value);
              });
            });


            $(".note-editable").attr("id", "x");
            //$.ajax({                                        //Sayfa ilk açıldığında txt dosyasındaki rapor yükleniyor
            //    type: "POST",
            //    url: "/Home/DataGet",
            //    success: function (data) {
            //        if (data.Response == true) {
            //            var veri = data.DataList;
            //            $('.note-editable').html(veri);
            //       //     debugger;
            //            if(veri.indexOf("cssPage") == -1)$('.note-editable').append("<style id='cssPage'></style>");
            //           // $("#stylePageName").text(data.PageCss);
            //            $("#stylePageName").text(veri.substring((veri.indexOf("cssPage")+9),(veri.indexOf("/style")-1)));
            //        }
            //    }

            //});

        /*    $.ajax({
                type: "POST",
                url: "/Home/ParseData",
                success: function (data) {
                    var list = data.DataList;
                }
            });*/
            $('*').click(function (e) {                     //Sonradan eklenen nesneye tıklandığında
                console.log(this.tagName + ': clicked, target: ' + e.target.tagName)
                if (e.target.tagName == "TD" || e.target.tagName == "TH" || e.target.tagName == "P" || e.target.tagName == "IMG" || e.target.tagName == "SPAN") {
                    //debugger;
                    elem = [];
                    $('#seciliNesne').html("");
                    P(e.target);
                    IPTAL();

                    $("#px").val(e.target.tagName);
                    last = e.target;
                    Secim();
               }
            });

            $('#seciliNesne').on('change', function () {
                IPTAL();
                last = elem[this.value - 1];
                Secim();
            });

            //$(".btn-Save").on("click", function (e) {       //Raporu txt dosyasına kayıt etmektedir.
            //    data = $('.note-editable').html();
            //    $.ajax({
            //        type: 'POST',
            //        url: "/Home/DataSave",
            //        data: { veri: data },
            //        dataType: "json",
            //        success: function (result) {
            //            swal("Basarili Kayıt !");
            //        },
            //        error: function (result) {
            //            swal("basarisiz");
            //        }
            //    });
            //    var htmls = $(".note-editable").html();
            //});
        })
         $("#jqueryCss").on("keyup",function(e){
                 var cssValue=$(this).val();
                 var dg=eval(cssValue);
                 debugger;
 });

/*     $.ajax({
                type: "POST",
                url: "/Home/ReportData",
                success: function (result) {
                    var listeJson=result.JsonList;
                    var parseJsons=JSON.parse(listeJson);
                   var list=[];

                   $.each(parseJsons, function(key, value){
                   var k0=key;
                   $.each(value, function(key, value){
                      var k=key;
                      var v= value;
                      list.push(k0+"."+k);
$("#expression").append("<option>"+k0+"."+k+"</option>");
                      });
                   });

                }
          
            });*/

$(document).ready(function () {
    $(".btn-Exit").on("click",function(){
         window.location= "/Home/Index";
    });
});

