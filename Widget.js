<!-- GHL Widget Loader -->
    
      src="https://widgets.leadconnectorhq.com/loader.js"
      data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
      data-widget-id="68f2b84dc62596ad849806a9"


    <!-- Optimized Draggable Enhancement Script -->
 
    (function(){
        console.log('🚀 Starting GHL Chat Widget with Smooth Dragging...');
        
        let bubbleDraggable = false;
        let windowDraggable = false;
        let checkCount = 0;
        const maxChecks = 30;
        
        // Use requestAnimationFrame for smoother animations
        let animationFrameId = null;
        
        // Wait for the GHL widget to load
        const checkElements = setInterval(() => {
            checkCount++;
            
            const widget = document.querySelector('chat-widget');
            
            if(!widget) {
                if(checkCount >= maxChecks) {
                    clearInterval(checkElements);
                    console.log('🚨 Max checks reached - widget not found');
                }
                return;
            }
            
            if(!widget.shadowRoot) {
                if(checkCount >= maxChecks) {
                    clearInterval(checkElements);
                    console.log('🚨 Max checks reached - no shadowRoot');
                }
                return;
            }
            
            const bubble = findBubbleElement(widget.shadowRoot);
            const chatWindow = findChatWindow(widget.shadowRoot);

            // Bubble draggable setup
            if(bubble && !bubbleDraggable) {
                console.log('💬 Found bubble element, making draggable');
                makeDraggable(bubble, 'bubble');
                bubbleDraggable = true;
            }

            // Window draggable setup
            if(chatWindow && !windowDraggable) {
                console.log('🪟 Found chat window, making draggable');
                makeWindowDraggable(chatWindow);
                windowDraggable = true;
            }

            if((bubbleDraggable && windowDraggable) || checkCount >= maxChecks) {
                clearInterval(checkElements);
                if(bubbleDraggable && windowDraggable) {
                    console.log('🎉 Both chat bubble & window are now draggable!');
                }
            }
        }, 500);

        // ---- Enhanced Finders ----
        function findBubbleElement(root) {
            const selectors = [
                'button',
                'button[aria-label*="chat"]',
                'button[class*="bubble"]',
                'div[class*="bubble"]',
                '.chat-bubble',
                '[role="button"]',
                'div > button'
            ];
            
            for (let sel of selectors) {
                const el = root.querySelector(sel);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.width > 30 && rect.height > 30) {
                        return el;
                    }
                }
            }
            return null;
        }

        function findChatWindow(root) {
            const selectors = [
                'div[class*="window"]',
                'div[class*="chat"]',
                'div[class*="modal"]',
                'div[role="dialog"]',
                'div > div',
                'div > div > div'
            ];
            
            for (let sel of selectors) {
                const el = root.querySelector(sel);
                if (el) {
                    // Window might be hidden initially, so check offset dimensions
                    if (el.offsetWidth > 200 || el.offsetHeight > 200) {
                        return el;
                    }
                }
            }
            return null;
        }

        // ---- Optimized Smooth Draggable Function ----
        function makeDraggable(element, type) {
            console.log(`🔧 Making ${type} draggable with smooth movement`);

            // Apply draggable styles
            element.style.position = 'fixed';
            element.style.zIndex = type === 'bubble' ? '999999' : '999998';
            element.style.userSelect = 'none';
            element.style.webkitUserSelect = 'none';
            element.style.cursor = type === 'bubble' ? 'grab' : 'move';
            
            // Add hardware acceleration for smooth dragging
            element.style.willChange = 'transform';
            element.style.transform = 'translateZ(0)';

            // Set initial position for bubble
            if (type === 'bubble') {
                element.style.bottom = '20px';
                element.style.right = '20px';
            }

            let startX, startY, initX, initY;
            let isDragging = false;
            let hasMoved = false;
            let clickTimer = null;

            // Remove any existing listeners
            element.removeEventListener('mousedown', handleMouseDown);
            element.removeEventListener('touchstart', handleTouchStart);

            element.addEventListener('mousedown', handleMouseDown);
            element.addEventListener('touchstart', handleTouchStart, { passive: false });

            function handleMouseDown(e) {
                startDrag(e);
            }

            function handleTouchStart(e) {
                startDrag(e.touches[0]);
                e.preventDefault();
            }

            function startDrag(point) {
                startX = point.clientX;
                startY = point.clientY;
                
                const rect = element.getBoundingClientRect();
                initX = rect.left;
                initY = rect.top;
                
                isDragging = false;
                hasMoved = false;

                // Set a timer to detect click vs drag
                clickTimer = setTimeout(() => {
                    // Click detected - allow GHL default behavior
                }, 150);

                // Add document-level listeners for drag
                document.addEventListener('mousemove', handleDragMove);
                document.addEventListener('mouseup', handleDragEnd);
                document.addEventListener('touchmove', handleDragMove, { passive: false });
                document.addEventListener('touchend', handleDragEnd);

                element.style.cursor = 'grabbing';
                
                // Prevent text selection during drag
                document.body.style.userSelect = 'none';
            }

            function handleDragMove(e) {
                const point = e.type.includes('touch') ? e.touches[0] : e;
                const dx = point.clientX - startX;
                const dy = point.clientY - startY;

                // Check if we've moved enough to consider it a drag
                if (!hasMoved && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
                    hasMoved = true;
                    isDragging = true;
                    clearTimeout(clickTimer); // Cancel click detection
                }

                if (!isDragging) return;

                e.preventDefault();
                e.stopPropagation();

                // Use requestAnimationFrame for smooth animation
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                }
                
                animationFrameId = requestAnimationFrame(() => {
                    const newX = Math.max(10, Math.min(initX + dx, window.innerWidth - element.offsetWidth - 10));
                    const newY = Math.max(10, Math.min(initY + dy, window.innerHeight - element.offsetHeight - 10));
                    
                    element.style.left = `${newX}px`;
                    element.style.top = `${newY}px`;
                    element.style.right = 'auto';
                    element.style.bottom = 'auto';
                });
            }

            function handleDragEnd(e) {
                // Clear the click timer
                if (clickTimer) {
                    clearTimeout(clickTimer);
                    clickTimer = null;
                }

                // Cancel any pending animation frame
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = null;
                }

                // Remove document listeners
                document.removeEventListener('mousemove', handleDragMove);
                document.removeEventListener('mouseup', handleDragEnd);
                document.removeEventListener('touchmove', handleDragMove);
                document.removeEventListener('touchend', handleDragEnd);

                // Restore cursor and text selection
                element.style.cursor = type === 'bubble' ? 'grab' : 'move';
                document.body.style.userSelect = '';

                // If we were dragging, prevent the default click behavior
                if (isDragging) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                
                isDragging = false;
                hasMoved = false;
            }
        }

        // ---- Make Window Draggable ----
        function makeWindowDraggable(windowEl) {
            console.log('🪟 Making chat window draggable...');
            
            // Ensure window is properly positioned
            windowEl.style.position = 'fixed';
            windowEl.style.zIndex = '999998';
            
            // Only set initial position if not already positioned
            if (!windowEl.style.top && !windowEl.style.left) {
                windowEl.style.top = '50%';
                windowEl.style.left = '50%';
                windowEl.style.transform = 'translate(-50%, -50%)';
            }
            
            makeDraggable(windowEl, 'window');
            
            // Store reference for continuous monitoring
            window.ghlChatWindow = windowEl;
        }

        // ---- Continuous check for window ----
        setInterval(() => {
            if (windowDraggable) return;
            
            const widget = document.querySelector('chat-widget');
            if(widget && widget.shadowRoot) {
                const chatWindow = findChatWindow(widget.shadowRoot);
                if(chatWindow && chatWindow !== window.ghlChatWindow) {
                    console.log('🔄 Chat window appeared, making draggable');
                    makeWindowDraggable(chatWindow);
                    windowDraggable = true;
                }
            }
        }, 1000);

    })();
  



