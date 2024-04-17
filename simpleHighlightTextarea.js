// 多行输入框指定标识围住的部分修改字体颜色
function textareaColorizeFunc(textareaObj,highlightChars) {
  let text = $(textareaObj).text();
  // 获取当前光标偏移
  let sel = window.getSelection();
  let selectionAnchorNode = sel.anchorNode;
  if(!selectionAnchorNode.parentNode.isSameNode(textareaObj)){
    selectionAnchorNode = selectionAnchorNode.parentNode;
  }
  let selectionAnchorOffset = sel.anchorOffset;
  let nowChildNodes = textareaObj.childNodes;
  let offsetLength = 0;
  // 计算绝对偏移，即文本的偏移值
  for(tmpNode of nowChildNodes){
    if(tmpNode.isSameNode(selectionAnchorNode)){
        break;
    }
    let tmpNodeLength = $(tmpNode).text().length;
    offsetLength += tmpNodeLength;

  }
  offsetLength += selectionAnchorOffset;

  // 根据绝对偏移计算所处节点
  let nodeIndex = 0;
  let nodeOffset = 0;
  let ifInNode = false;
  for(let i=0;i<offsetLength;i++){
    let tmpChar = text[i];
    for(let highlightChar in highlightChars){
        if(tmpChar == highlightChar && i<text.length-1){
            let ifAddFlag = false;
            // 出现标识，判断是否为结束标识
            if(!ifInNode && text.substring(i+1).includes(highlightChar)){
                // 非结束标识且后面存在相同标识，表示进入下一个节点
                ifInNode = true;
                ifAddFlag = true;
                nodeOffset = 0;
            }else if(ifInNode){
                // 为结束标识，直接进入下一个节点
                ifInNode = false;
                ifAddFlag = true;
                nodeOffset = -1;
            }else{
                ifAddFlag = false;
            }
            if(ifAddFlag){
                // 满足进入下一个节点的条件，对相对偏移值进行修改
                nodeIndex += 1;
                break;
            }
        }
    }
    nodeOffset +=1;
  }

  // 修改字体颜色
  for(let highlightChar in highlightChars){
    text = colorizeText(text,highlightChar,highlightChars[highlightChar]);
  }
  textareaObj.innerHTML = text;
  // 尝试恢复光标位置
  let newRange = document.createRange();
  let rangeInNode = textareaObj.childNodes[nodeIndex];
  if(rangeInNode.nodeType==1){
    rangeInNode = rangeInNode.firstChild;
  }
  newRange.setStart(rangeInNode, nodeOffset);
  newRange.setEnd(rangeInNode, nodeOffset);

  sel.removeAllRanges();
  sel.addRange(newRange);
}

// 指定关键字符，两两配对，配对中间的字符修改颜色
function colorizeText(oriText,highlightChar,hightlightColor){
    let tmpSplitArr = oriText.split(highlightChar);
    let solvedCount = Math.floor((tmpSplitArr.length-1)/2);
    let startItemAddStr = "<span style=\"color: "+hightlightColor+";\">";
    let endItemAddStr = "</span>"
    for(let index=0;index<solvedCount;index++){
        if(!tmpSplitArr[index*2].endsWith(startItemAddStr)){
            tmpSplitArr[index*2] = tmpSplitArr[index*2] + startItemAddStr;
        }
        if(!tmpSplitArr[(index+1)*2].startsWith(endItemAddStr)){
            tmpSplitArr[(index+1)*2] = endItemAddStr + tmpSplitArr[(index+1)*2];
        }
    }
    let finalStr = tmpSplitArr.join(highlightChar);
    return finalStr;
}