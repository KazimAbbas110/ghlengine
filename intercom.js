// ---- Load Intercom Chat Widget Dynamically ----
(function() {
    window.super_cloner = false;

    window.intercomSettings = {
        api_base: "https://api-iam.intercom.io",
        app_id: "lqsbvxy9",
    };

    (function(){
        var w = window;
        var ic = w.Intercom;
        if(typeof ic === "function"){
            ic('reattach_activator'); 
            ic('update', w.intercomSettings);
        } else {
            var d = document;
            var i = function(){ i.c(arguments); };
            i.q = [];
            i.c = function(args){ i.q.push(args); };
            w.Intercom = i;
            var l = function(){
                var s = d.createElement('script');
                s.type = 'text/javascript';
                s.async = true;
                s.src = 'https://widget.intercom.io/widget/lqsbvxy9';
                var x = d.getElementsByTagName('script')[0];
                x.parentNode.insertBefore(s, x);
            };
            if(d.readyState === 'complete'){ l(); }
            else if(w.attachEvent){ w.attachEvent('onload', l); }
            else { w.addEventListener('load', l, false); }
        }
    })();

    console.log('✅ Intercom Chat Widget loaded dynamically');
})();

// ---- Optimized Draggable Enhancement Script ----
(function(){
    console.log('🚀 Starting Intercom Chat Widget with Smooth Dragging...');

    let bubbleDraggable = false;
    let windowDraggable = false;
    let checkCount = 0;
    const maxChecks = 30;
    let animationFrameId = null;

    const checkElements = setInterval(() => {
        checkCount++;
        const widget = document.querySelector('iframe.intercom-launcher-frame');
        if(!widget){
            if(checkCount >= maxChecks){ clearInterval(checkElements); console.log('🚨 Max checks reached - Intercom launcher not found'); }
            return;
        }

        if(!bubbleDraggable){ makeDraggable(widget, 'bubble'); bubbleDraggable = true; console.log('💬 Intercom bubble draggable'); }

        if(bubbleDraggable) clearInterval(checkElements);

    }, 500);

    // ---- Draggable Function ----
    function makeDraggable(element, type){
        element.style.position = 'fixed';
        element.style.zIndex = '999999';
        element.style.userSelect = 'none';
        element.style.webkitUserSelect = 'none';
        element.style.cursor = 'grab';
        element.style.willChange = 'transform';
        element.style.transform = 'translateZ(0)';

        if(type === 'bubble'){
            element.style.bottom = 'auto';
            element.style.right = 'auto';
            element.style.bottom = '20px';
            element.style.right = '20px';
        }

        let startX, startY, initX, initY;
        let isDragging = false, hasMoved = false;
        let clickTimer = null;

        element.removeEventListener('mousedown', handleMouseDown);
        element.removeEventListener('touchstart', handleTouchStart);

        element.addEventListener('mousedown', handleMouseDown);
        element.addEventListener('touchstart', handleTouchStart, { passive: false });

        function handleMouseDown(e){ startDrag(e); }
        function handleTouchStart(e){ startDrag(e.touches[0]); }

        function startDrag(point){
            startX = point.clientX;
            startY = point.clientY;
            const rect = element.getBoundingClientRect();
            initX = rect.left; initY = rect.top;
            isDragging = false; hasMoved = false;

            clickTimer = setTimeout(()=>{},150);

            document.addEventListener('mousemove', handleDragMove);
            document.addEventListener('mouseup', handleDragEnd);
            document.addEventListener('touchmove', handleDragMove, { passive: false });
            document.addEventListener('touchend', handleDragEnd);

            element.style.cursor = 'grabbing';
            document.body.style.userSelect = 'none';
        }

        function handleDragMove(e){
            const point = e.type.includes('touch') ? e.touches[0] : e;
            const dx = point.clientX - startX;
            const dy = point.clientY - startY;

            if(!hasMoved && (Math.abs(dx) > 5 || Math.abs(dy) > 5)){
                hasMoved = true;
                isDragging = true;
                clearTimeout(clickTimer);
            }

            if(!isDragging) return;

            e.preventDefault();
            e.stopPropagation();

            if(animationFrameId) cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(()=>{
                const newX = Math.max(10, Math.min(initX + dx, window.innerWidth - element.offsetWidth - 10));
                const newY = Math.max(10, Math.min(initY + dy, window.innerHeight - element.offsetHeight - 10));
                element.style.left = `${newX}px`;
                element.style.top = `${newY}px`;
                element.style.right = 'auto';
                element.style.bottom = 'auto';
            });
        }

        function handleDragEnd(e){
            if(animationFrameId){ cancelAnimationFrame(animationFrameId); animationFrameId = null; }

            document.removeEventListener('mousemove', handleDragMove);
            document.removeEventListener('mouseup', handleDragEnd);
            document.removeEventListener('touchmove', handleDragMove);
            document.removeEventListener('touchend', handleDragEnd);

            element.style.cursor = 'grab';
            document.body.style.userSelect = '';

            if(isDragging) { e.preventDefault(); e.stopPropagation(); }

            isDragging = false; hasMoved = false;
        }
    }

})();
