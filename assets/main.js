window.onload = function () {
  'use strict';

  var Cropper = window.Cropper;
  var URL = window.URL || window.webkitURL;
  var container = document.querySelector('.img-container');
  var image = container.getElementsByTagName('img').item(0);
  var download = document.getElementById('download');
  var actions = document.getElementById('actions');
  var dataX = document.getElementById('dataX');
  var dataY = document.getElementById('dataY');
  var dataHeight = document.getElementById('dataHeight');
  var dataWidth = document.getElementById('dataWidth');
  var dataRotate = document.getElementById('dataRotate');
  var dataScaleX = document.getElementById('dataScaleX');
  var dataScaleY = document.getElementById('dataScaleY');
  var Color = "#0000";

var defaultPicker = new iro.ColorPicker("#defaultPicker", {
  width: 100,
  color: "rgb(255, 0, 0)",
  borderWidth: 1,
  borderColor: "#fff",
});


 
    defaultPicker.on('color:change', function(color) {
  // log the current color as a HEX string
      var color_string = color.hexString;
          $('.cropper-container.cropper-bg').css('background',color_string);
    $('.img-container, .img-preview').css('background-color',color_string);
      $("#Color_data").val(color_string);
});
  
  var options = {
    aspectRatio: 5 / 3,
    preview: '.img-preview',
    dragMode:'none',
    viewmode:1,
    ready: function (e) {

      // $(".img-preview.preview-lg").width($(".cropper-bg").width());
      // $(".img-preview.preview-lg").height($(".cropper-bg").height());

      console.log(e.type);
    },
    cropstart: function (e) {
      console.log(e.type, e.detail.action);
    },
    cropmove: function (e) {
      console.log(e.type, e.detail.action);
    },
    cropend: function (e) {
      console.log(e.type, e.detail.action);
    },
    crop: function (e) {
      var data = e.detail;

      console.log(e.type);
      $(".img-container").attr("x",Math.round(data.x));
      $(".img-container").attr("y",Math.round(data.y));
      // dataX.value = Math.round(data.x);
      // dataY.value = Math.round(data.y);
      // dataHeight.value = Math.round(data.height);
      // dataWidth.value = Math.round(data.width);
      // dataRotate.value = typeof data.rotate !== 'undefined' ? data.rotate : '';
      // dataScaleX.value = typeof data.scaleX !== 'undefined' ? data.scaleX : '';
      // dataScaleY.value = typeof data.scaleY !== 'undefined' ? data.scaleY : '';
    },
    zoom: function (e) {
      console.log(e.type, e.detail.ratio);
    }
  };
  var cropper = new Cropper(image, options);
  var originalImageURL = image.src;

  var uploadedImageType = 'image/jpeg';
  var uploadedImageName = 'cropped.jpg';
  var uploadedImageURL;


  // Tooltip
  //$('[data-toggle="tooltip"]').tooltip();

  // Buttons
  if (!document.createElement('canvas').getContext) {
    $('button[data-method="getCroppedCanvas"]').prop('disabled', true);
  }

  if (typeof document.createElement('cropper').style.transition === 'undefined') {
    $('button[data-method="rotate"]').prop('disabled', true);
    $('button[data-method="scale"]').prop('disabled', true);
  }

  // Download
  //   if (typeof download.download === 'undefined') {
  //     download.className += ' disabled';
  //     download.title = 'Your browser does not support download';
  //   }

  // Options
  // actions.querySelector('.docs-toggles').onchange = function (event) {
  //   var e = event || window.event;
  //   var target = e.target || e.srcElement;
  //   var cropBoxData;
  //   var canvasData;
  //   var isCheckbox;
  //   var isRadio;

  //   if (!cropper) {
  //     return;
  //   }

  //   if (target.tagName.toLowerCase() === 'label') {
  //     target = target.querySelector('input');
  //   }

  //   isCheckbox = target.type === 'checkbox';
  //   isRadio = target.type === 'radio';

  //   if (isCheckbox || isRadio) {
  //     if (isCheckbox) {
  //       options[target.name] = target.checked;
  //       cropBoxData = cropper.getCropBoxData();
  //       canvasData = cropper.getCanvasData();

  //       options.ready = function () {
  //         console.log('ready');
  //         cropper.setCropBoxData(cropBoxData).setCanvasData(canvasData);
  //       };
  //     } else {
  //       options[target.name] = target.value;
  //       options.ready = function () {
  //         console.log('ready');
  //       };
  //     }

  //     // Restart
  //     cropper.destroy();
  //     cropper = new Cropper(image, options);
  //   }
  // };

  // Methods
  actions.querySelector('.docs-buttons').onclick = function (event) {
    var e = event || window.event;
    var target = e.target || e.srcElement;
    var cropped;
    var result;
    var input;
    var data;
    var Color = document.getElementById('Color_data').value;
    console.log(Color);

    if (!cropper) {
      return;
    }

    while (target !== this) {
      if (target.getAttribute('data-method')) {
        break;
      }

      target = target.parentNode;
    }

    if (target === this || target.disabled || target.className.indexOf('disabled') > -1) {
      return;
    }

    data = {
      method: target.getAttribute('data-method'),
      target: target.getAttribute('data-target'),
      option: target.getAttribute('data-option') || undefined,
      secondOption: target.getAttribute('data-second-option') || undefined
    };

    cropped = cropper.cropped;

    if (data.method) {
      if (typeof data.target !== 'undefined') {
        input = document.querySelector(data.target);

        if (!target.hasAttribute('data-option') && data.target && input) {
          try {
            data.option = JSON.parse(input.value);
          } catch (e) {
            console.log(e.message);
          }
        }
      }

      switch (data.method) {
        case 'rotate':
          if (cropped && options.viewMode > 0) {
            cropper.clear();
          }

          break;

        case 'getCroppedCanvas':
          try {
            data.option = JSON.parse(data.option);
          } catch (e) {
            console.log(e.message);
          }

          if (uploadedImageType === 'image/jpeg') {
            if (!data.option) {
              data.option = {};
            }

            data.option.fillColor = Color;
          }

          break;
      }

      result = cropper[data.method](data.option, data.secondOption);

      switch (data.method) {
        case 'rotate':
          if (cropped && options.viewMode > 0) {
            cropper.crop();
          }

          break;

        case 'scaleX':
        case 'scaleY':
          target.setAttribute('data-option', -data.option);
          break;

        case 'getCroppedCanvas':
          if (result) {
            var data_url = result.toDataURL();
            var width_C = result.width;
            var height_C = result.height;
            if(width_C <= 565){
              width_C = 565;
            }
            if(height_C <=350){
              height_C = 350;
            }

            $(".cropper-outer-main").hide();
            $(".cropper-overlay").hide();
            var can = document.getElementById("Canvas_data");
            var ctx = can.getContext("2d");
            var window_width = $(window).width();
            var img = new Image;
            img.crossOrigin = "anonymous";
            ctx.clearRect(0, 0, can.width, can.height);
            img.onload=function(){
              can.width = width_C;
              can.height = height_C;

              var x = $(".img-container").attr("x");
              var y = $(".img-container").attr("y");
              ctx.fillStyle = Color;

              ctx.fillRect(0, 0, can.width, can.height);
              ctx.drawImage(img,0,0,width_C,height_C);

              var get_bas = can.toDataURL("image/png");
              		$(".new_url").remove();
              	$("body").append("<input type='hidden' class='new_url' value='"+get_bas+"'/>");
              
              var width = width_C;
              var height = height_C;
              // alert(width);
              //               alert(height);
              var image = new Image;
              image.crossOrigin="anonymous";
              image.onload=function(){
                if(window_width <= 750 ){
             //   alert(window_width);
                  ctx.drawImage(image,10,10,15,15);
                  ctx.drawImage(image,width-20,15,15,15);
                  ctx.drawImage(image,10,height_C-20,15,15);
                  ctx.drawImage(image,width-20,height_C-20,15,15);
                  
                }
                else{
       ctx.drawImage(image,10,10,12,12);
ctx.drawImage(image,width-18,10,12,12);
ctx.drawImage(image,10,height_C-18,12,12);
ctx.drawImage(image,width-20,height_C-20,12,12)
                }
                  var color = "#0000";
                $('.cropper-container.cropper-bg').css('background',color);
                $('.img-container, .img-preview').css('background-color',"black");

                var base_64 = can.toDataURL();
                $(".main_product_slider img[data-index='1']").attr("src",base_64);
                
                $(".btns-wrap .new-btn span").html("Replace File");
                $("#remove").css("display","flex");
                $("[name='add']").removeAttr("disabled");
                
//                 setTimeout(function(){

//  					$(".main_product_slider .slider-for__item img[data-index='1']")
//                     	.parent().css({"display":"flex","align-items":"center","justify-content":"center"});               
//                 },500);
                
                $(".main_product_slider .slider-for__item img[data-index='1']").css({"width":"94%"});     
                $(".main_product_slider .slider-for__item img[data-index='1']").parent().css({"background-color":"#ebebeb"});
            
      var height = $(".main_product_slider .slider-for__item img[data-index='2']").parent().height();
            console.log($(".main_product_slider .slider-for__item img[data-index='1']").parent().css({"min-height":height+"px"}));
                
                //console.log($(".slider-for__item img[data-index='1']").css({"box-shadow":"0px 4px 4px 0px rgba(0,0,0,0.27)"}));
console.log($(".main_product_slider .slider-for__item img[data-index='1']").css({"box-shadow":"0px 5px 12px -4px rgba(0,0,0,0.46)"}));
                if($(window).width() <= 768 ){


                  $(".slider-nav__item img[data-index='1']").css("width","68px");
                  $(".slider-nav__item img[data-index='1']").css("min-height","68px");
//                   $(".slider-nav__item img[data-index='1']").css("max-width","68px");
//                   $(".slider-nav__item img[data-index='1']").css("max-height","68px");
                }
                else{

                  $(".slider-nav__item img[data-index='1']").css("width","100%");
                   $(".slider-nav__item img[data-index='1']").css("min-height","98px");
//                   $(".slider-nav__item img[data-index='1']").css("max-width","98px");
//                   $(".slider-nav__item img[data-index='1']").css("max-height","98px");

                }
              }
                
              image.src = 'https://cdn.shopify.com/s/files/1/0254/3868/3184/files/gromm.png?v=1596031061';
            }
            img.src = data_url;




            // Bootstrap's Modal
            // $('#getCroppedCanvasModal').modal().find('.modal-body').html(result);

            if (!download.disabled) {
              download.download = uploadedImageName;
              download.href = result.toDataURL(uploadedImageType);
            }
            
            window.scroll({
              top: 0,
              behavior: 'smooth'
            });
          }

          break;

        case 'destroy':
          cropper = null;

          if (uploadedImageURL) {
            URL.revokeObjectURL(uploadedImageURL);
            uploadedImageURL = '';
            image.src = originalImageURL;
          }

          break;
      }

      if (typeof result === 'object' && result !== cropper && input) {
        try {
          input.value = JSON.stringify(result);
        } catch (e) {
          console.log(e.message);
        }
      }
    }
  };

  document.body.onkeydown = function (event) {
    var e = event || window.event;

    if (e.target !== this || !cropper || this.scrollTop > 300) {
      return;
    }

    switch (e.keyCode) {
      case 37:
        e.preventDefault();
        cropper.move(-1, 0);
        break;

      case 38:
        e.preventDefault();
        cropper.move(0, -1);
        break;

      case 39:
        e.preventDefault();
        cropper.move(1, 0);
        break;

      case 40:
        e.preventDefault();
        cropper.move(0, 1);
        break;
    }
  };

  // Import image
  var inputImage = document.getElementById('inputImage');

  if (URL) {
    inputImage.onchange = function () {
      
      var files = this.files;

      var file;

      if (cropper && files && files.length) {
        
                        $('body').append('<div id="preloader" ><div id="status" >&nbsp;</div></div>')
                        
        file = files[0];
var file_size = this.files[0].size;
  //   alert(this.files[0].width);
   
//             var fSExt = new Array('Bytes', 'KB', 'MB', 'GB'),
//         	i=0;while(file_size>900){file_size/=1024;i++;}
//             var exactSize = (Math.round(file_size*100)/100);
//                 console.log('FILE SIZE = ',exactSize);
       $(".cust-flag-up-img-block span").text(this.files[0].name)
       	.attr( 'title', this.files[0].name);
//         if(fSExt[i] == 'KB'){
//           if(exactSize <=500){
//            //$(".error_file span").text("The file you uploaded exceeds the maximum file size of 5MB.");
//           return false;  	
            
//           }
//         }
        
        
        
        
        
        //  files[0].name;
        
        if(file_size > 9000000){
         $(".error_file").show();
            $(".error_file span").text("The file you uploaded exceeds the maximum file size of 7MB.");
          
          	$('body').find('#preloader').remove()
          return false; 
        }
        
        else{
                
 		var fileType = this.files[0].type;
          var validImageTypes = ["image/gif", "image/jpeg", "image/png"];
          if ($.inArray(fileType, validImageTypes) < 0) {
             $(".error_file span").text("The file you attempted to upload failed.");
            $(".error_file").show();
                      	$('body').find('#preloader').remove()
                        
            return false;
          } 
          
        $(".error_file").hide();

        }
        
        $("#Color_data").val("#000");
        $("#defaultPicker").html('');
        var defaultPicker = new iro.ColorPicker("#defaultPicker", {
  width: 100,
  color: "rgb(255, 0, 0)",
  borderWidth: 1,
  borderColor: "#fff",
});
        
            defaultPicker.on('color:change', function(color) {
  // log the current color as a HEX string
      var color_string = color.hexString;
          $('.cropper-container.cropper-bg').css('background',color_string);
    $('.img-container, .img-preview').css('background-color',color_string);
      $("#Color_data").val(color_string);
});
        
        
        
        
        var reader = new FileReader();

        reader.onload = function (e) {
          var image = new Image;
          image.crossOrigin = 'anonymous';
          image.onload=function(){
            var width = image.width
        
            if(width <=500){
              $(".error_file").show();
   $(".error_file span").text("Please upload file above 500px.");
             $(".cross-cropper").click();
          	$('body').find('#preloader').remove()
                            
            return false;
            }
            
            else{
            
            
            var height = image.height+5;

            //   alert("width="+image.width);
            // alert("height="+image.height);
            $('.img-preview.preview-lg').css({ 
              width: '100%', //width,  sets the starting size to the same as orig image  
              overflow: 'hidden',
              height:    height,
              maxWidth:  width,
              maxHeight: height
            });
               var width = $(".col-md-6.preview-left").innerWidth();
  				$(".col-md-6.preview-left").attr("style", "height:" + width + "px");
//           alert(width);

            $('.img-preview.preview-lg').css("background","black");     




            // $('#blah').attr('src', image.src);
          }
            
                      	$('body').find('#preloader').remove()
          }
          image.src = e.target.result;


        }

        reader.readAsDataURL(file);



        if (/^image\/\w+/.test(file.type)) {
          uploadedImageType = file.type;
          uploadedImageName = file.name;

          if (uploadedImageURL) {
            URL.revokeObjectURL(uploadedImageURL);

          }

          image.src = uploadedImageURL = URL.createObjectURL(file);



          cropper.destroy();
          $(".cropper-overlay").show();
          $(".cropper-outer-main").show();
          $(".cross-cropper").show();

          var contData = $(".cropper-container"); //Get container data

          cropper = new Cropper(image, options);

          inputImage.value = null;
          
//           window.scroll({
//             top: 0, 
//             behavior: 'smooth'
//           });
        } else {
          window.alert('Please choose an image file.');
        }
        
                  	$('body').find('#preloader').remove()
      }
    };
  } else {
    inputImage.disabled = true;
    inputImage.parentNode.className += ' disabled';
  }



};
