# simpleHighlightTextarea
简单的基于JQuery的用于高亮关键词的textarea javascript库，解决了光标问题，支持不同关键词使用不同颜色  

使用方法如下：  
1、引入jquery和项目的JS和CSS  
2、创建一个 contenteditable="true" 的DIV，并设定该DIV的class为highlight_textarea  
3、给创建的DIV创建一个自定义属性：highlightChars，该属性值为一个json字符串，key为关键词，value为高亮颜色的RGB值，例：highlightChars='{"∮":"#FFA500","%":"#00FF00"}'   
4、批量绑定onInput事件，格式为：  
$(".highlight_textarea").on('input', function() {  
    let highlightChars = $.parseJSON($(this).attr("highlightChars"));  
    textareaColorizeFunc(this,highlightChars);  
});  

可参考项目中的demo.html，使用截图如下：  
![使用截图](https://github.com/abcd1234564499sc/simpleHighlightTextarea/blob/main/demo.jpg "使用截图")  
