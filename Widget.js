// ---- Load GHL Chat Widget Dynamically ----
(function() {
    const ghlScript = document.createElement('script');
    ghlScript.src = "https://widgets.leadconnectorhq.com/loader.js";
    ghlScript.setAttribute('data-resources-url', 'https://widgets.leadconnectorhq.com/chat-widget/loader.js');
    ghlScript.setAttribute('data-widget-id', '68f2b84dc62596ad849806a9');
    ghlScript.async = true;
    document.head.appendChild(ghlScript);

    ghlScript.onload = () => {
        console.log('✅ GHL Chat Widget loaded successfully');
    };
})();

// ---- Optimized Draggable Enhancement Script ----
(function(){
    console.log('🚀 Starting GHL Chat Widget with Smooth Dragging...');

    let bubbleDraggable = false;
    let windowDraggable = false;
    let checkCount = 0;
    const maxChecks = 30;
    let animationFrameId = null;

    const checkElements = setInterval(() => {
        checkCount++;
        const widget = document.querySelector('chat-widget');
        if(!widget){
            if(checkCount >= maxChecks){ clearInterval(checkElements); console.log('🚨 Max checks reached - widget not found'); }
            return;
        }
        if(!widget.shadowRoot){
            if(checkCount >= maxChecks){ clearInterval(checkElements); console.log('🚨 Max checks reached - no shadowRoot'); }
            return;
        }

        const bubble = findBubbleElement(widget.shadowRoot);
        const chatWindow = findChatWindow(widget.shadowRoot);

        if(bubble && !bubbleDraggable){ makeDraggable(bubble, 'bubble'); bubbleDraggable = true; console.log('💬 Bubble draggable'); }
        if(chatWindow && !windowDraggable){ makeWindowDraggable(chatWindow); windowDraggable = true; console.log('🪟 Window draggable'); }

        if((bubbleDraggable && windowDraggable) || checkCount >= maxChecks){
            clearInterval(checkElements);
            if(bubbleDraggable && windowDraggable) console.log('🎉 Both bubble & window draggable!');
        }
    }, 500);

    // ---- Finders ----
    function findBubbleElement(root){
        const selectors = ['button','button[aria-label*="chat"]','button[class*="bubble"]','div[class*="bubble"]','.chat-bubble','[role="button"]','div > button'];
        for(let sel of selectors){
            const el = root.querySelector(sel);
            if(el){ const rect = el.getBoundingClientRect(); if(rect.width > 30 && rect.height > 30) return el; }
        }
        return null;
    }

    function findChatWindow(root){
        const selectors = ['div[class*="window"]','div[class*="chat"]','div[class*="modal"]','div[role="dialog"]','div > div','div > div > div'];
        for(let sel of selectors){
            const el = root.querySelector(sel);
            if(el && (el.offsetWidth > 200 || el.offsetHeight > 200)) return el;
        }
        return null;
    }

    // ---- Draggable Function ----
    function makeDraggable(element, type){
        element.style.position = 'fixed';
        element.style.zIndex = type === 'bubble' ? '999999' : '999998';
        element.style.userSelect = 'none';
        element.style.webkitUserSelect = 'none';
        element.style.cursor = type === 'bubble' ? 'grab' : 'move';
        element.style.willChange = 'transform';
        element.style.transform = 'translateZ(0)';

        // Force left/top positioning for mobile drag
        if(type === 'bubble'){
            element.style.bottom = 'auto';
            element.style.right = 'auto';
            element.style.bottom = '20px'; // initial fallback
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

            e.preventDefault(); // Only prevent default if dragging
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

            element.style.cursor = type === 'bubble' ? 'grab' : 'move';
            document.body.style.userSelect = '';

            if(isDragging) { e.preventDefault(); e.stopPropagation(); }

            isDragging = false; hasMoved = false;
        }
    }

    // ---- Window Draggable ----
    function makeWindowDraggable(windowEl){
        windowEl.style.position = 'fixed';
        windowEl.style.zIndex = '999998';
        if(!windowEl.style.top && !windowEl.style.left){
            windowEl.style.top = '50%';
            windowEl.style.left = '50%';
            windowEl.style.transform = 'translate(-50%, -50%)';
        }
        makeDraggable(windowEl,'window');
        window.ghlChatWindow = windowEl;
    }

    // ---- Continuous check for new window ----
    setInterval(()=>{
        if(windowDraggable) return;
        const widget = document.querySelector('chat-widget');
        if(widget && widget.shadowRoot){
            const chatWindow = findChatWindow(widget.shadowRoot);
            if(chatWindow && chatWindow !== window.ghlChatWindow){ makeWindowDraggable(chatWindow); windowDraggable = true; console.log('🔄 Chat window draggable after load'); }
        }
    },1000);

})();
