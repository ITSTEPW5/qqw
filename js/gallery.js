(function()
{
	// Constructor
	var qqw = function(container, options)
	{
		var qqw_instance = this;

		// Default options
		// var defaultOptions = {
		// 	trigger: 'a',
		// 	slideTime: '.5s'
		// };

		// Compare options with default
		this.options = options;

		if(typeof container == 'object')
		{
			this.container = container;
		}
		else if(typeof container == 'string')
 		{
			this.container = $(container);
		}

		this.imageList = [];

		this.container.find(this.options.trigger).each(function(i, e)
		{
			if(e.hasAttribute('href'))
			{
				qqw_instance.imageList.push($(e).attr('href'));
			}
			else
			{
				qqw_instance.imageList.push($(e).data('image'));
			}
		});

		this.container.find(this.options.trigger).click(function(event)
		{
			var clicked_element = this;

			event.preventDefault();
			qqw_instance.bootstrap();

			setTimeout(function()
			{
				qqw_instance.goToIndex($(clicked_element).index());

				$('.qqw__wrap .qqw__next').click(function(){
					qqw_instance.goToIndex(qqw_instance.activeIndex + 1);
				});

				$('.qqw__wrap .qqw__previous').click(function(){
					qqw_instance.goToIndex(qqw_instance.activeIndex - 1);
				});

				$('.qqw__wrap .qqw__close').click(function(){
					$('.qqw__wrap').remove();

					$('body').removeAttr('style');
				});

			}, 100);
		});

	}

	qqw.prototype.bootstrap = function()
	{
		var html = 	'<div class="qqw__wrap">';
		html +=			'<span class="qqw__next"></span>';
		html +=			'<span class="qqw__previous"></span>';
		html +=			'<span class="qqw__close">&times;</span>';
		html +=			'</div>';

		$('body').css('overflow', 'hidden').append(html);
	}

	qqw.prototype.goToIndex = function(index)
	{
		if(index < 0)
		{
			index = this.imageList.length - 1;
		}
		else if(index >= this.imageList.length)
		{
			index = 0;
		}

		this.activeIndex = index;

		$('.qqw__wrap').css('background-image', 'url(' + this.imageList[index] + ')');
	}

	// Export
	window.qqw = qqw;

})();
