/**
 * Help.js (Helpless)
 * Version: 0.1.3 Beta
 * By: Christoffer Martinsen (@ChrisMartinsen)
 *
 * Tooltip plugin
 *
 * Usage:
 * add the variable data-help="" to the element
 * you want to display a tooltip.
 *
 * Include:
 * jQuery
 * ++
 * <!-- Help.js -->
 * <script type="text/javascript" src="helpjs/jquery.help.js"></script>
 * <link rel="stylesheet" type="text/css" href="helpjs/jquery.helpjs.css"/>
 *
 * Use this to active on all input fields.
 * 
 * $('input').helpjs();
 *
 */

(function($){
	$.fn.helpjs = function(options){
	
		var defaults = {
				background		:	'#e3e3e3',
				color			:	'black',
				rounded			:	false,
				leftPosition	:	20,
				topPosition		:	0,
				position		:	'right',
				border			:	false,
				arrow			:	false
			},
			settings = $.extend({}, defaults, options);
		
		this.each(function(){
			var $this = $(this);
			var helpText = $this.attr('data-help');
			var id = $this.attr('id');
			var x = $(this).offset().left;
			var y = $(this).offset().top;
			
			if(settings.position=='right'){
				var cssPosition = [{
					top: y + settings.topPosition,  
					left: x + settings.leftPosition + $this.width()
				}];
			}else if(settings.position=='left'){
				var cssPosition = [{
					top: y + settings.topPosition,  
					left: x + settings.leftPosition - $this.width()
				}];
			}else if(settings.position=='top'){
				var cssPosition = [{
					top: y + settings.topPosition - $this.height(),  
					left: x + settings.leftPosition
				}];
			}else if(settings.position=='bottom'){
				var cssPosition = [{
					top: y + settings.topPosition + $this.height(),  
					left: x + settings.leftPosition
				}];
			}
			
			if(helpText){
				$this.on('focusin',function(e){
					$('<div id="helpjs-wrap" />')
					.appendTo('body')
					.hide()
					.css(
						cssPosition[0]
					)
					.show();
					
					$('<div id="helpjs" />')  
					.appendTo('#helpjs-wrap')  
					.hide()  
					.html(helpText)  
					.css({  
						backgroundColor: settings.background,  
						color: settings.color 
					})
					.css(
						cssPosition[0]
					)
					.show();
					
					if(settings.rounded){
						$('#helpjs').addClass('helpjs-rounded');
					}
					if(settings.border){
						$('#helpjs').addClass('helpjs-border');
					}
					if(settings.arrow){
						$('#helpjs-wrap').addClass('helpjs-arrow');
					}
				});
			}else{
				null;
			}
		
			$this.blur(function(){
				$('#helpjs-wrap').remove();
			});
		});
		return this;
	}
})(jQuery);