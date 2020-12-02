var slider = (function(){
    return function(selector){
        var 
            _main = document.querySelector(selector),
            _wrapper = _main.querySelector('.slider__body-wrapper'),
            _items = _main.querySelectorAll('.item'), 
            _wrapperWidth = parseFloat(getComputedStyle(_wrapper).width), 
            _itemWidth = parseFloat(getComputedStyle(_items[0]).width), 
            _left = document.querySelector('.arrow-left'),
            _right = document.querySelector('.arrow-right'),
            _progress = document.querySelectorAll('.progress-back::after'),
            _step = _itemWidth + parseFloat(getComputedStyle(_items[0]).marginRight)*2+parseFloat(getComputedStyle(_items[0]).paddingLeft)*2,
            _stepc = 1,
            _stepProgress = 100 / (_items.length -4),
            _stepProgressC = 0,
            style = document.createElement('style'),
            _itemWidthF = _itemWidth + parseFloat(getComputedStyle(_items[0]).marginRight)*2+parseFloat(getComputedStyle(_items[0]).paddingLeft)*2,
            _leftCount = 0,
            isPause = false,
            t = 0;
        var limits = {
          right: document.querySelector('.slider__body').offsetWidth + document.querySelector('.slider__body').offsetLeft ,
          left: document.querySelector('.slider__body').offsetLeft
        };
        var _goRight = function(e){
            if(_stepc < _step*(_items.length/2)){
                isPause = true;
                setTimeout(function(){
                    isPause = false
                },2000);
                _wrapper.style.transition= 'transform 0s ease';
                _wrapper.style.left = 0;
                _wrapper.style.transition= 'transform 0.6s ease';
                _stepc = parseInt(_stepc,10) + parseInt(_step,10);
                _wrapper.style.transform = 'translateX(-'+_stepc+'px)';
                _stepProgressC = _stepProgressC + _stepProgress;
                style.innerHTML = '.progress-back:after {transform: translateX(' + _stepProgressC + '%);}';
                document.querySelector('head').appendChild(style);
                
            }
        }
        
        var _setListenerRight = function(){
            _right.addEventListener('click',_goRight)
        } 
        var _goLeft = function(e){
            if(_stepc>= -5){
                isPause = true;
                setTimeout(function(){
                    isPause = false
                },5000);
                _wrapper.style.transition= 'transform 0s ease';
                _wrapper.style.left = 0;
                
                _stepc = parseInt(_stepc,10) - parseInt(_step,10);
                _wrapper.style.transform = 'translateX(-'+_stepc+'px)';
                _wrapper.style.transition= 'transform 0.6s ease';
                _stepProgressC = _stepProgressC - _stepProgress;
                style.innerHTML = '.progress-back:after {transform: translateX(' + _stepProgressC + '%);}';
                document.querySelector('head').appendChild(style);
                console.log('Кнопка:')
                console.log(_stepc);
            }
        }
        
        var _setListenerLeft = function(){
            _left.addEventListener('click',_goLeft)
        } 
        

        _wrapper.onmousedown = function(e) {
            var coords = getCoords(_wrapper);
            var shiftX = e.pageX - coords.left;
            var shiftY = e.pageY - coords.top;
            _wrapper.style.position = 'relative';
            isPause = true;
                setTimeout(function(){
                    isPause = false
                },5000);
            function moveAt(e) {
                if (e.pageX - shiftX - _itemWidthF<1&&-(e.pageX - shiftX - _itemWidthF)< limits.right){
                    _wrapper.style.transition= 'transform 0s ease';
                    _wrapper.style.transform = 'translateX(0%)';
                    _wrapper.style.left = e.pageX - shiftX - _itemWidthF + 'px';
                    
                }else{
                    if(e.pageX - shiftX - _itemWidth>1){
                        _wrapper.style.left = 1
                    }else{
                        _wrapper.style.right = limits.right
                    }
                }
            }

            document.onmousemove = function(e) {
                moveAt(e);
            };

            document.querySelector('.slider__body').onmouseup = function() {
                _wrapper.style.transition= 'transform 0s ease';
                document.onmousemove = null;
                _wrapper.onmouseup = null;
                var k = parseInt(_wrapper.style.left,10) * 100 / _wrapperWidth
                var t = (  parseInt(_wrapper.style.left)/_itemWidthF).toFixed() * _itemWidthF
                _wrapper.style.left=t+'px';
                _leftCount = _wrapper.style.left;

                if (parseInt(_wrapper.style.left != 0,10)){
                    _stepc = -(parseInt(_wrapper.style.left,10)).toFixed();
                }else{
                    _stepc =  -(parseInt(_wrapper.style.left,10)).toFixed();
                }
                _stepProgressC = ((_stepc * 100)/_wrapperWidth)/1.22;
                style.innerHTML = '.progress-back:after {transform: translateX(' + _stepProgressC + '%);}';
                document.querySelector('head').appendChild(style);

            };

        }

        _wrapper.ondragstart = function() {
          return false;
        };
        
        let timerId = setInterval(function(){
            if (!isPause){
                _wrapper.style.left = 0;
            _wrapper.style.transition= 'transform 0.6s ease';
            if(_stepc < _step*(_items.length/2)){
                
                _stepc = parseInt(_stepc,10) + parseInt(_step,10);
                _stepProgressC += _stepProgress*1;
                _wrapper.style.transform = 'translateX(-'+_stepc+'px)';
                style.innerHTML = '.progress-back:after {transform: translateX(' + _stepProgressC + '%);}';
                document.querySelector('head').appendChild(style);
//                console.log(_stepc)
            }else{
//                var y = _wrapperWidth-_stepc/_step;
//                if (_wrapperWidth < _stepc){
                    _stepc = 0.1;
                    _stepProgressC = 0;
                    _wrapper.style.transform = 'translateX(-'+_stepc+'px)';
                    _wrapper.style.left = 0;
                    style.innerHTML = '.progress-back:after {transform: translateX(' + _stepProgressC + '%);}';
                    document.querySelector('head').appendChild(style);
                    console.log(parseInt(_wrapperWidth,10));
                    console.log(_stepc);
//                }else{
//                    _stepc += _step;
//                    _stepProgressC += _stepProgress;
//                    _wrapper.style.transform = 'translateX(-'+_stepc+'px)';
//                    style.innerHTML = '.progress-back:after {transform: translateX(' + _stepProgressC + '%);}';
//                    document.querySelector('head').appendChild(style);
//                    console.log(parseInt(_wrapperWidth,10));
//                    console.log(_wrapperWidth-_stepc);
//                }
            }
            }
        }, 5000);
        
        function getCoords(elem) {   
          var box = elem.getBoundingClientRect();
          return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
          };
        } 
        _setListenerRight();
        _setListenerLeft();
    }
}());

var sl = slider('.slider__body');
