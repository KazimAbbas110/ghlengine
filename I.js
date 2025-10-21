<script>
(function(){
    // =========================
    // Configuration
    // =========================
    const CONFIG = {
        BACKEND_API: "https://ghlengine-production.up.railway.app/api",
        AUTH_TOKEN: "110",
        INTERCOM_APP_ID: "lqsbvxy9",
        CACHE_DURATION: 5 * 60 * 1000 // 5 min
    };

    // =========================
    // State
    // =========================
    const state = {
        accessInfo: null,
        intercomLoaded: false,
        lastCache: 0
    };

    // =========================
    // URL Location Service (reuse your existing logic)
    // =========================
    const urlLocationService = {
        extractLocationIdFromURL() {
            try {
                const currentURL = window.location.href;
                const patterns = [
                    /\/location\/([^\/]+)\/launchpad/,
                    /\/location\/([^\/]+)\/dashboard/,
                    /locationId=([^&]+)/,
                    /location=([^&]+)/
                ];
                for (let pattern of patterns) {
                    const match = currentURL.match(pattern);
                    if (match && match[1]) return match[1];
                }
                return null;
            } catch(e){ return null; }
        },
        getCurrentLocation() {
            const locationId = this.extractLocationIdFromURL();
            if(!locationId) return null;
            return { locationId, url: window.location.href };
        }
    };

    // =========================
    // API Service
    // =========================
    const apiService = {
        async getAccessStatus(locationId) {
            const url = `${CONFIG.BACKEND_API}/access/status/${locationId}`;
            const headers = { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${CONFIG.AUTH_TOKEN}`
            };
            const res = await fetch(url, { method: 'GET', headers });
            const data = await res.json();
            return data.data || { chatWidgetEnabled: false };
        }
    };

    // =========================
    // Intercom Loader
    // =========================
    function loadIntercom() {
        if(state.intercomLoaded) return;
        state.intercomLoaded = true;

        window.intercomSettings = {
            api_base: "https://api-iam.intercom.io",
            app_id: CONFIG.INTERCOM_APP_ID
        };

        (function(){
            var w=window, ic=w.Intercom;
            if(typeof ic==="function"){ ic('reattach_activator'); ic('update',w.intercomSettings); }
            else{
                var d=document; var i=function(){ i.c(arguments); }; i.q=[]; i.c=function(args){ i.q.push(args); };
                w.Intercom=i;
                var l=function(){
                    var s=d.createElement('script'); s.type='text/javascript'; s.async=true;
                    s.src='https://widget.intercom.io/widget/'+CONFIG.INTERCOM_APP_ID;
                    var x=d.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s,x);
                };
                if(d.readyState==='complete'){ l(); } else { w.addEventListener('load',l,false); }
            }
        })();

        console.log('✅ Intercom Loaded');
    }

    // =========================
    // Main Init
    // =========================
    async function init() {
        const location = urlLocationService.getCurrentLocation();
        if(!location) { console.log('❌ No location detected'); return; }

        // Use cached if valid
        if(state.accessInfo && (Date.now() - state.lastCache < CONFIG.CACHE_DURATION)){
            if(state.accessInfo.chatWidgetEnabled) loadIntercom();
            return;
        }

        const access = await apiService.getAccessStatus(location.locationId);
        state.accessInfo = access;
        state.lastCache = Date.now();

        if(access.chatWidgetEnabled) loadIntercom();
        else console.log('ℹ️ Chat Widget disabled for this location');
    }

    init();

})();
</script>
