

(function(){
    // =========================
    // Configuration - Updated with caching
    // =========================
    const CONFIG = {
        BTN_ID: "ghl-theme-builder-btn",
        POPUP_ID: "ghl-theme-builder-popup",
        STYLE_ID: "ghl-theme-style",
        PREVIEW_STYLE_ID: "ghl-theme-preview",
        BACKEND_API: "https://ghlengine-production.up.railway.app/api",
        AUTH_TOKEN: "110",
        VERSION: "3.2.0", // Updated version
        CACHE_DURATION: 5 * 60 * 1000, // 5 minutes cache
        DEBOUNCE_DELAY: 300 // ms for preview debouncing
    };

    // =========================
    // State Management - Updated with cache
    // =========================
    const state = {
        btnRef: null,
        popupRef: null,
        currentTheme: null,
        currentLocation: null,
        themes: [],
        accessInfo: null,
        isLoading: false,
        isInitialized: false,
        isPreviewing: false,
        previewTheme: null,
        cache: {
            themes: null,
            themesTimestamp: 0,
            currentTheme: null,
            currentThemeTimestamp: 0
        }
    };

    // =========================
    // Cache Service for Speed Optimization
    // =========================
    const cacheService = {
        getThemes() {
            if (state.cache.themes && 
                Date.now() - state.cache.themesTimestamp < CONFIG.CACHE_DURATION) {
                console.log('📦 Using cached themes');
                return state.cache.themes;
            }
            return null;
        },

        setThemes(themes) {
            state.cache.themes = themes;
            state.cache.themesTimestamp = Date.now();
        },

        getCurrentTheme() {
            if (state.cache.currentTheme && 
                Date.now() - state.cache.currentThemeTimestamp < CONFIG.CACHE_DURATION) {
                console.log('📦 Using cached current theme');
                return state.cache.currentTheme;
            }
            return null;
        },

        setCurrentTheme(theme) {
            state.cache.currentTheme = theme;
            state.cache.currentThemeTimestamp = Date.now();
        },

        clearCache() {
            state.cache.themes = null;
            state.cache.themesTimestamp = 0;
            state.cache.currentTheme = null;
            state.cache.currentThemeTimestamp = 0;
            console.log('🗑️ Cache cleared');
        }
    };

    // =========================
    // Debounce Service for Performance
    // =========================
    const debounceService = {
        debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }
    };

  // =========================
    // URL Location Service
    // =========================
    const urlLocationService = {
        extractLocationIdFromURL() {
            try {
                const currentURL = window.location.href;
                console.log('🔍 Checking URL:', currentURL);
                
                // Multiple URL patterns for GHL
                const patterns = [
                    /\/location\/([^\/]+)\/launchpad/,
                    /\/location\/([^\/]+)\/dashboard/,
                    /\/location\/([^\/]+)\/contacts/,
                    /\/location\/([^\/]+)\/workflows/,
                    /\/location\/([^\/]+)\/calendar/,
                    /locationId=([^&]+)/,
                    /location=([^&]+)/
                ];
                
                for (let pattern of patterns) {
                    const match = currentURL.match(pattern);
                    if (match && match[1]) {
                        console.log('✅ Found location ID:', match[1]);
                        return match[1];
                    }
                }
                
                // Fallback: check for any location-like pattern
                const fallbackMatch = currentURL.match(/\/([a-zA-Z0-9]{15,})\//);
                if (fallbackMatch) {
                    console.log('🔄 Using fallback location ID:', fallbackMatch[1]);
                    return fallbackMatch[1];
                }
                
                return null;
            } catch (error) {
                console.error('❌ Error extracting location:', error);
                return null;
            }
        },

        getCurrentLocationName() {
            try {
                const selectors = [
                    '.hl_switcher-loc-name',
                    '[data-location-name]',
                    '.location-name',
                    '.current-location'
                ];

                for (let selector of selectors) {
                    const element = document.querySelector(selector);
                    if (element && element.textContent) {
                        const name = element.textContent.trim();
                        if (name && name.length > 0 && name !== 'GHL') {
                            return name;
                        }
                    }
                }

                return 'Current Location';
            } catch (error) {
                console.error('❌ Error getting location name from DOM:', error);
                return 'Current Location';
            }
        },

        getCurrentLocation() {
            const locationId = this.extractLocationIdFromURL();
            if (!locationId) {
                return null;
            }

            return {
                locationId: locationId,
                name: this.getCurrentLocationName(),
                url: window.location.href
            };
        },

        // Monitor URL changes for SPA navigation
        startUrlChangeMonitoring() {
            let currentUrl = window.location.href;
            
            const observeUrlChanges = () => {
                const newUrl = window.location.href;
                if (newUrl !== currentUrl) {
                    currentUrl = newUrl;
                    
                    // Check if we're on a location page and reload theme if needed
                    const newLocation = this.getCurrentLocation();
                    if (newLocation && newLocation.locationId) {
                        console.log('📍 New location detected in URL, reloading theme...');
                        cacheService.clearCache(); // Clear cache on location change
                        themeManager.loadCurrentTheme();
                    } else {
                        // Not on a location page, remove theme
                        themeCSSService.removeThemeCSS();
                        state.currentTheme = null;
                        cacheService.setCurrentTheme(null);
                    }
                }
            };

            // Check for URL changes every second
            setInterval(observeUrlChanges, 1000);
        }
    };

    // =========================
    // API Service - Enhanced with better error handling
    // =========================
    const apiService = {
        async call(endpoint, options = {}) {
            const url = `${CONFIG.BACKEND_API}${endpoint}`;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CONFIG.AUTH_TOKEN}`,
                ...options.headers
            };

            const config = {
                method: options.method || 'GET',
                headers,
                ...(options.body && { body: JSON.stringify(options.body) })
            };

            try {
                const response = await fetch(url, config);
                const data = await response.json();
                
                if (!response.ok) {
                    console.error(`❌ API Error ${endpoint}:`, {
                        status: response.status,
                        statusText: response.statusText,
                        data: data
                    });
                    
                    const errorMessage = data.message || data.error || `HTTP ${response.status}: ${response.statusText}`;
                    throw new Error(errorMessage);
                }
                
                return data;
            } catch (error) {
                console.error(`❌ API Error ${endpoint}:`, error);
                throw error;
            }
        },

        // Enhanced createTheme with validation and fixed payload
        async createTheme(themeData) {
            // Validate required fields
            const requiredFields = ['name', 'locationId', 'textColor', 'backgroundColor', 'fontFamily'];
            const missingFields = requiredFields.filter(field => !themeData[field]);
            
            if (missingFields.length > 0) {
                throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
            }

            // Clean up data for backend - FIX for 400 error
            const cleanedData = {
                ...themeData,
                backgroundColor: themeData.backgroundColor.replace('33', ''), // Remove alpha channel
                fontFamily: themeData.fontFamily.split(',')[0].trim(), // Only first font family
                isActive: true,
                isGlobal: false
            };

            return this.call('/themes', {
                method: 'POST',
                body: cleanedData
            });
        },

        // Enhanced removeTheme with better error handling for 500 errors
        async removeThemeFromLocation(locationId) {
            if (!locationId) throw new Error('No location ID provided');
            
            try {
                return await this.call('/themes/remove', {
                    method: 'POST',
                    body: { locationId: locationId }
                });
            } catch (error) {
                // If it's a 500 error, we'll handle it gracefully
                if (error.message.includes('500')) {
                    console.warn('⚠️ Backend returned 500 on theme removal, but proceeding...');
                    return { success: true, message: 'Theme removed locally due to backend error' };
                }
                throw error;
            }
        },

        // Keep other methods
        async getAccessStatus(locationId) {
            if (!locationId) throw new Error('No location ID provided');
            return this.call(`/access/status/${locationId}`);
        },

        async getAllThemes() {
            return this.call('/themes');
        },

        async getThemeById(themeId) {
            return this.call(`/themes/${themeId}`);
        },

        async applyThemeToLocation(themeId, locationId) {
            if (!locationId) throw new Error('No location ID provided');
            return this.call('/themes/apply', {
                method: 'POST',
                body: {
                    locationId: locationId,
                    themeId: themeId
                }
            });
        },

        async getThemeByLocation(locationId) {
            if (!locationId) throw new Error('No location ID provided');
            return this.call(`/themes/by-location/${locationId}`);
        },

        async updateTheme(themeId, themeData) {
            return this.call(`/themes/${themeId}`, {
                method: 'PUT',
                body: themeData
            });
        }
    };

    // =========================
    // Access Control Service
    // =========================
    const accessService = {
        async checkThemeBuilderAccess() {
            try {
                // Get current location from URL
                const currentLocation = urlLocationService.getCurrentLocation();
                if (!currentLocation || !currentLocation.locationId) {
                    throw new Error('Could not detect current GHL location from URL');
                }

                // Check access status via API
                const accessResponse = await apiService.getAccessStatus(currentLocation.locationId);
                if (!accessResponse.success || !accessResponse.data) {
                    throw new Error('Access status API call failed');
                }

                const accessInfo = accessResponse.data;
                const isPermitted = accessInfo.themeBuilderAccess === true;

                return {
                    permitted: isPermitted,
                    location: currentLocation,
                    accessInfo: accessInfo
                };

            } catch (error) {
                console.error('❌ Access check failed:', error);
                return {
                    permitted: false,
                    location: null,
                    accessInfo: null,
                    error: error.message
                };
            }
        }
    };
// =========================
// Theme CSS Service (drop-in replacement)
// =========================
const themeCSSService = {
    generateCSS(theme, isPreview = false) {
        if (!theme) return '';

        // safe defaults & fallbacks
        const defaultSidebarStart = '#8e2de2';
        const defaultSidebarEnd   = '#4a00e0';
        const defaultHeaderStart  = '#8e2de2';
        const defaultHeaderEnd    = '#4a00e0';

        const variables = {
            textColor: theme?.textColor || '#ffffff',
            backgroundColor: theme?.backgroundColor || 'rgba(255, 255, 255, 0.33)',
            fontFamily: theme?.fontFamily || 'Roboto, sans-serif',
            sidebarGradientStart: (theme && theme.sidebarGradientStart) || defaultSidebarStart,
            sidebarGradientEnd:   (theme && theme.sidebarGradientEnd)   || defaultSidebarEnd,
            headerGradientStart:  (theme && theme.headerGradientStart)  || defaultHeaderStart,
            headerGradientEnd:    (theme && theme.headerGradientEnd)    || defaultHeaderEnd
        };

        // detect dashboard page (simple URL containment check)
        const isDashboard = typeof window !== 'undefined' && window.location && window.location.href.includes('/dashboard');

        const comment = isPreview ? 'PREVIEW' : 'ACTIVE';
        return `
/* GHL Theme Builder v${CONFIG.VERSION} - ${comment} - Location: ${state.currentLocation?.locationId || 'unknown'} */
:root {
    --ghl-text-color: ${variables.textColor};
    --ghl-bg-color: ${variables.backgroundColor};
    --ghl-font-family: ${variables.fontFamily};
    --ghl-sidebar-start: ${variables.sidebarGradientStart};
    --ghl-sidebar-end: ${variables.sidebarGradientEnd};
    --ghl-header-start: ${variables.headerGradientStart};
    --ghl-header-end: ${variables.headerGradientEnd};
}

/* Sidebar gradient - main container */
.transition-slowest .flex-col > .overflow-hidden {
    background: linear-gradient(135deg, var(--ghl-sidebar-start) 0%, var(--ghl-sidebar-end) 100%) !important;
}

/* Header / top bar gradient */
.sidebar-v2-location .hl_header .container-fluid {
    background: linear-gradient(135deg, var(--ghl-header-start) 0%, var(--ghl-header-end) 100%) !important;
}

/* Notification banner uses header gradient */
.notification-banner-top-bar {
    background: linear-gradient(135deg, var(--ghl-header-start) 0%, var(--ghl-header-end) 100%) !important;
}

/* Text + fonts used across sidebar/header */
.crm-opportunities-status .hl-text,
.notification-title-message,
.sidebar-v2-location .hl_force-block,
.sidebar-v2-location #sidebar-v2 #globalSearchOpener .search-placeholder,
.sidebar-v2-location #sidebar-v2 #globalSearchOpener .search-icon,
.sidebar-v2-location #sidebar-v2 #globalSearchOpener .search-shortcut,
.hl_switcher-loc-name,
.sidebar-v2-location #sidebar-v2 #location-switcher-sidbar-v2 .hl_switcher-loc-city,
.sidebar-v2-location #sidebar-v2 .hl_nav-header nav a .nav-title,
.sidebar-v2-location #sidebar-v2 .hl_nav-header-without-footer nav a .nav-title,
.sidebar-v2-location #sidebar-v2 .hl_nav-settings nav a .nav-title {
    color: var(--ghl-text-color) !important;
    font-family: var(--ghl-font-family) !important;
}

/* Use theme bg color for certain sidebar elements to ensure contrast */
.sidebar-v2-location #sidebar-v2 #location-switcher-sidbar-v2,
.sidebar-v2-location #sidebar-v2 #globalSearchOpener,
.sidebar-v2-location #sidebar-v2 #quickActions,
.sidebar-v2-location #sidebar-v2 #backButtonv2,
#sb_conversation_ai_settings_v2 .hl_new_badge,
#sb_knowledge-base-settings .hl_new_badge,
#sb_objects .hl_new_badge,
#sb_labs .hl_new_badge,
#sb_brand-boards .hl_new_badge {
    background-color: var(--ghl-bg-color) !important;
}

/* Notification close icon color */
#notification_banner-btn-close .h-5 {
    background-color: var(--ghl-text-color) !important;
}

/* =========================
   Dashboard-only card overrides
   ========================= */
${isDashboard ? `
/* Card header uses the theme header gradient for a cohesive look */
.hl-card .hl-card-header {
    background: linear-gradient(135deg, var(--ghl-header-start) 0%, var(--ghl-header-end) 100%) !important;
    color: #ffffff !important;
}

/* Medium text inside cards */
.hl-text-md-medium {
    color: #ffffff !important;
}

/* Wrapper container of dashboard: keep main wrapper white for contrast */
.hl-wrapper-container {
    background-color: #ffffff !important;
}
` : ''}

/* End of generated CSS */
`;
    },

    applyThemeCSS(theme) {
        // Remove existing theme style
        this.removeThemeCSS();

        if (theme) {
            const css = this.generateCSS(theme);
            const style = document.createElement('style');
            style.id = CONFIG.STYLE_ID;
            style.textContent = css;
            document.head.appendChild(style);
            return true;
        }
        return false;
    },

    removeThemeCSS() {
        const existingStyle = document.getElementById(CONFIG.STYLE_ID);
        if (existingStyle) {
            existingStyle.remove();
        }
    },

    previewThemeCSS(theme) {
        // Remove existing preview
        this.removePreviewCSS();

        if (theme) {
            const css = this.generateCSS(theme, true);
            const style = document.createElement('style');
            style.id = CONFIG.PREVIEW_STYLE_ID;
            style.textContent = css;
            document.head.appendChild(style);
            state.isPreviewing = true;
            state.previewTheme = theme;
        }
    },

    removePreviewCSS() {
        const previewStyle = document.getElementById(CONFIG.PREVIEW_STYLE_ID);
        if (previewStyle) {
            previewStyle.remove();
            state.isPreviewing = false;
            state.previewTheme = null;
        }
    },

    applyCurrentTheme() {
        if (state.currentTheme) {
            this.applyThemeCSS(state.currentTheme);
        } else {
            this.removeThemeCSS();
        }
    }
};

    // =========================
    // Theme Management Service - Optimized with caching and API fixes
    // =========================
    const themeManager = {
        async loadThemes() {
            // Check cache first for speed
            const cachedThemes = cacheService.getThemes();
            if (cachedThemes) {
                state.themes = cachedThemes;
                return state.themes;
            }

            try {
                state.isLoading = true;
                const response = await apiService.getAllThemes();

                if (response.success) {
                    // Handle different response structures
                    let themesArray = [];
                    
                    if (Array.isArray(response.data)) {
                        themesArray = response.data;
                    } else if (Array.isArray(response.themes)) {
                        themesArray = response.themes;
                    } else if (response.data && Array.isArray(response.data.themes)) {
                        themesArray = response.data.themes;
                    } else {
                        themesArray = [response.data || response.theme].filter(Boolean);
                    }

                    state.themes = themesArray;
                    cacheService.setThemes(themesArray);
                    console.log(`📦 Loaded ${state.themes.length} themes from backend`);
                    return state.themes;
                }

                throw new Error('Invalid themes response from backend');
            } catch (error) {
                console.error('❌ Failed to load themes from backend:', error);
                state.themes = [];
                return [];
            } finally {
                state.isLoading = false;
            }
        },

        async applyTheme(themeId) {
            try {
                if (!state.currentLocation) throw new Error('No current location detected');

                const locationId = state.currentLocation.locationId;

                // Get theme details from backend
                const response = await apiService.getThemeById(themeId);
                let theme = null;
                
                if (response.success) {
                    theme = response.data || response.theme;
                }
                
                if (!theme) throw new Error('Theme not found in database');

                const applyResponse = await apiService.applyThemeToLocation(themeId, locationId);
                if (applyResponse.success) {
                    state.currentTheme = theme;
                    cacheService.setCurrentTheme(theme);
                    themeCSSService.applyThemeCSS(theme);
                    console.log(`✅ Theme "${theme.name}" applied to location ${locationId} via backend`);
                    return true;
                } else {
                    throw new Error('Backend failed to apply theme to location');
                }
            } catch (error) {
                console.error('❌ Failed to apply theme:', error);
                throw error;
            }
        },

        async removeTheme() {
            try {
                if (!state.currentLocation) throw new Error('No current location detected');
                if (!state.currentTheme) {
                    console.log('ℹ️ No theme to remove');
                    return true;
                }

                const locationId = state.currentLocation.locationId;

                const removeResponse = await apiService.removeThemeFromLocation(locationId);
                if (removeResponse.success) {
                    state.currentTheme = null;
                    cacheService.setCurrentTheme(null);
                    themeCSSService.removeThemeCSS();
                    console.log(`✅ Theme removed from location ${locationId} via backend`);
                    return true;
                } else {
                    // If backend fails but we have a 500 error, still remove locally
                    if (removeResponse.error && removeResponse.error.includes('500')) {
                        console.warn('⚠️ Backend returned 500, but removing theme locally');
                        state.currentTheme = null;
                        cacheService.setCurrentTheme(null);
                        themeCSSService.removeThemeCSS();
                        return true;
                    }
                    throw new Error('Backend failed to remove theme from location');
                }
            } catch (error) {
                console.error('❌ Failed to remove theme:', error);
                // Even if backend fails, remove locally
                state.currentTheme = null;
                cacheService.setCurrentTheme(null);
                themeCSSService.removeThemeCSS();
                throw error;
            }
        },

        async loadCurrentTheme() {
            try {
                if (!state.currentLocation) {
                    console.log('❌ No current location for theme loading');
                    return;
                }

                // Check cache first for speed
                const cachedTheme = cacheService.getCurrentTheme();
                if (cachedTheme) {
                    state.currentTheme = cachedTheme;
                    themeCSSService.applyThemeCSS(cachedTheme);
                    return;
                }

                const locationId = state.currentLocation.locationId;
                const themeResponse = await apiService.getThemeByLocation(locationId);
                
                let theme = null;
                if (themeResponse.success) {
                    theme = themeResponse.theme || themeResponse.data;
                }

                if (theme && theme._id) {
                    await this.setCurrentTheme(theme);
                } else {
                    state.currentTheme = null;
                    cacheService.setCurrentTheme(null);
                    themeCSSService.removeThemeCSS();
                }
            } catch (error) {
                console.error('❌ Failed to load current theme from backend:', error);
                state.currentTheme = null;
                cacheService.setCurrentTheme(null);
                themeCSSService.removeThemeCSS();
            }
        },

        async setCurrentTheme(theme) {
            if (!theme) return;
            state.currentTheme = theme;
            cacheService.setCurrentTheme(theme);
            themeCSSService.applyThemeCSS(theme);
        },

        async createCustomTheme(themeData) {
            try {
                if (!state.currentLocation) throw new Error('No current location detected');

                const locationId = state.currentLocation.locationId;

                // FIXED: Use backend-compatible payload structure
                const completeThemeData = {
                    name: themeData.name,
                    description: themeData.description || "Custom theme created through theme builder",
                    locationId: locationId,
                    userId: CONFIG.AUTH_TOKEN,
                    companyId: "default-company", // Fixed: Use string directly
                    textColor: themeData.textColor,
                    backgroundColor: themeData.backgroundColor,
                    fontFamily: themeData.fontFamily,
                    sidebarGradientStart: themeData.sidebarGradientStart,
                    sidebarGradientEnd: themeData.sidebarGradientEnd,
                    headerGradientStart: themeData.headerGradientStart,
                    headerGradientEnd: themeData.headerGradientEnd,
                    category: "dashboard",
                    isActive: true,
                    isGlobal: false
                };

                const createResponse = await apiService.createTheme(completeThemeData);
                let createdTheme = null;
                
                if (createResponse.success) {
                    createdTheme = createResponse.data || createResponse.theme;
                }

                if (createdTheme) {
                    console.log(`✅ Custom theme created in backend: ${themeData.name}`);

                    // Clear cache and reload
                    cacheService.clearCache();
                    await this.loadThemes();
                    await this.applyTheme(createdTheme._id);

                    return createdTheme;
                } else {
                    throw new Error('Backend failed to create theme: ' + (createResponse.message || 'Unknown error'));
                }
            } catch (error) {
                console.error('❌ Failed to create custom theme in backend:', error);
                throw error;
            }
        },

        // Debounced preview for better performance
        previewTheme: debounceService.debounce((theme) => {
            themeCSSService.previewThemeCSS(theme);
        }, CONFIG.DEBOUNCE_DELAY),

        cancelPreview() {
            themeCSSService.removePreviewCSS();
            themeCSSService.applyCurrentTheme();
        }
    };

    // =========================
    // UI Service - Updated with better error handling
    // =========================
    const uiService = {
        showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = 'ghl-notification';
            notification.innerHTML = `
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span>${this.getNotificationIcon(type)}</span>
                    <span>${message}</span>
                </div>
            `;
            
            Object.assign(notification.style, {
                position: 'fixed',
                top: '20px',
                right: '20px',
                background: this.getNotificationColor(type),
                color: '#ffffff',
                padding: '12px 20px',
                borderRadius: '8px',
                zIndex: 100003,
                fontSize: '14px',
                fontWeight: '500',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                transform: 'translateX(100%)',
                transition: 'transform 0.3s ease'
            });
            
            document.body.appendChild(notification);
            
            setTimeout(() => notification.style.transform = 'translateX(0)', 10);
            setTimeout(() => {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        },

        getNotificationIcon(type) {
            const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
            return icons[type] || icons.info;
        },

        getNotificationColor(type) {
            const colors = {
                success: '#10B981',
                error: '#DC2626',
                warning: '#F59E0B',
                info: '#2563EB'
            };
            return colors[type] || colors.info;
        },

        createFloatingButton() {
            if (state.btnRef) return state.btnRef;
            
            const button = document.createElement('div');
            button.id = CONFIG.BTN_ID;
            button.innerHTML = '🎨 Themes';
            
            Object.assign(button.style, {
                position: 'fixed',
                top: '20px',
                right: '20px',
                padding: '12px 16px',
                background: '#2563EB',
                color: '#ffffff',
                borderRadius: '8px',
                cursor: 'pointer',
                zIndex: 99999,
                fontSize: '14px',
                fontWeight: '600',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                transition: 'all 0.2s ease',
                userSelect: 'none'
            });

            button.addEventListener('mouseenter', () => {
                button.style.background = '#1d4ed8';
                button.style.transform = 'translateY(-2px)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.background = '#2563EB';
                button.style.transform = 'translateY(0)';
            });

            button.addEventListener('click', (e) => {
                e.stopPropagation();
                this.openPopup();
            });
            
            document.body.appendChild(button);
            state.btnRef = button;
            return button;
        },

        async openPopup() {
            await this.createPopup();
            if (state.popupRef) {
                state.popupRef.style.display = 'block';
                await this.updatePopupContent();
            }
        },

        closePopup() {
            if (state.popupRef) {
                state.popupRef.style.display = 'none';
                // Cancel any active preview when closing popup
                themeManager.cancelPreview();
            }
        },

        async createPopup() {
            if (state.popupRef) return state.popupRef;
            
            const popup = document.createElement('div');
            popup.id = CONFIG.POPUP_ID;
            
            Object.assign(popup.style, {
                display: 'none',
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: '#ffffff',
                padding: '24px',
                borderRadius: '12px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                zIndex: 100000,
                maxWidth: '500px',
                width: '90%',
                maxHeight: '80vh',
                overflowY: 'auto',
                border: '1px solid #e5e7eb',
                fontFamily: 'system-ui, -apple-system, sans-serif'
            });

            document.body.appendChild(popup);
            state.popupRef = popup;
            
            document.addEventListener('click', (event) => {
                if (popup.style.display === 'block' && 
                    !popup.contains(event.target) && 
                    event.target.id !== CONFIG.BTN_ID) {
                    this.closePopup();
                }
            });

            return popup;
        },

        async updatePopupContent() {
            if (!state.popupRef) return;

            const currentLocationId = state.currentLocation?.locationId;
            const currentLocationName = state.currentLocation?.name || 'Detecting...';
            const accessStatus = state.accessInfo?.themeBuilderAccess ? '✅ Enabled' : '❌ Disabled';

            state.popupRef.innerHTML = `
                <div style="margin-bottom: 24px;">
                    <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 20px; font-weight: 600;">
                        🎨 GHL Theme Builder
                    </h3>
                    <div style="color: #6b7280; font-size: 14px; line-height: 1.5;">
                        <div><strong>Current Location:</strong> ${currentLocationName}</div>
                        <div><strong>Location ID:</strong> ${currentLocationId || 'Not detected'}</div>
                        <div><strong>Theme Builder Access:</strong> ${accessStatus}</div>
                        ${state.currentTheme ? 
                            `<div style="color: #10B981; margin-top: 4px;">
                                <strong>Current Theme:</strong> ${state.currentTheme.name}
                            </div>` : 
                            '<div style="color: #DC2626; margin-top: 4px;">No theme applied to this location</div>'
                        }
                        ${state.isPreviewing ? 
                            '<div style="color: #F59E0B; margin-top: 4px;"><strong>👀 Preview Mode Active</strong></div>' : 
                            ''
                        }
                    </div>
                </div>

                <div style="margin-bottom: 20px;">
                    <h4 style="margin: 0 0 12px 0; color: #374151; font-size: 16px; font-weight: 600;">
                        Available Themes <small style="color: #6b7280; font-weight: 400;">(Hover to preview)</small>
                    </h4>
                    <div id="theme-buttons-container" style="min-height: 100px; max-height: 300px; overflow-y: auto;">
                        <div style="text-align: center; color: #6b7280; padding: 20px;">
                            Loading themes from backend...
                        </div>
                    </div>
                </div>

                <div style="border-top: 1px solid #e5e7eb; padding-top: 20px;">
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        <button id="refresh-data" 
                                style="flex: 1; padding: 12px; background: #059669; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500;">
                            🔄 Refresh
                        </button>
                        <button id="create-custom-theme" 
                                style="flex: 1; padding: 12px; background: #8B5CF6; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500;">
                            🎨 Create Custom
                        </button>
                        ${state.currentTheme ? `
                            <button id="remove-theme" 
                                    style="flex: 1; padding: 12px; background: #DC2626; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500;">
                                🗑️ Remove
                            </button>
                        ` : ''}
                        <button id="close-popup" 
                                style="flex: 1; padding: 12px; background: transparent; color: #6b7280; border: 1px solid #d1d5db; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500;">
                            Close
                        </button>
                    </div>
                </div>
            `;

            this.attachPopupEventListeners();
            await this.loadThemesIntoPopup();
        },

        attachPopupEventListeners() {
            const refreshBtn = document.getElementById('refresh-data');
            const createBtn = document.getElementById('create-custom-theme');
            const closeBtn = document.getElementById('close-popup');
            const removeBtn = document.getElementById('remove-theme');

            if (refreshBtn) {
                refreshBtn.addEventListener('click', () => this.refreshAllData());
            }

            if (createBtn) {
                createBtn.addEventListener('click', () => this.openCustomizer());
            }

            if (closeBtn) {
                closeBtn.addEventListener('click', () => this.closePopup());
            }

            if (removeBtn) {
                removeBtn.addEventListener('click', () => this.confirmRemoveTheme());
            }
        },

        async refreshAllData() {
            this.showNotification('Refreshing data from backend...', 'info');
            
            try {
                // Clear cache on refresh
                cacheService.clearCache();
                
                // Re-check access with current URL location
                const accessCheck = await accessService.checkThemeBuilderAccess();
                
                if (accessCheck.permitted && accessCheck.location) {
                    state.currentLocation = accessCheck.location;
                    state.accessInfo = accessCheck.accessInfo;
                    
                    // Load in parallel for better performance
                    await Promise.all([
                        themeManager.loadThemes(),
                        themeManager.loadCurrentTheme()
                    ]);
                    
                    await this.updatePopupContent();
                    this.showNotification('Data refreshed from backend!', 'success');
                } else {
                    this.showNotification('Access check failed after refresh', 'error');
                }
            } catch (error) {
                this.showNotification(`Refresh failed: ${error.message}`, 'error');
            }
        },

        async loadThemesIntoPopup() {
            const container = document.getElementById('theme-buttons-container');
            if (!container) return;

            try {
                await themeManager.loadThemes();
                
                if (state.themes.length === 0) {
                    container.innerHTML = `
                        <div style="text-align: center; color: #6b7280; padding: 20px;">
                            No themes found in backend database.
                        </div>
                    `;
                    return;
                }

                container.innerHTML = state.themes.map(theme => {
                    const isActive = state.currentTheme && state.currentTheme._id === theme._id;
                    const color = theme.sidebarGradientStart || '#2563EB';
                    
                    return `
                        <div class="theme-item" data-theme-id="${theme._id}"
                             style="display: flex; align-items: center; justify-content: space-between; width: 100%; margin: 8px 0; padding: 12px; border-radius: 8px; border: ${isActive ? '2px solid #10B981' : '1px solid #e5e7eb'}; background: ${isActive ? '#f0fdf4' : '#f9fafb'}; cursor: pointer; transition: all 0.2s ease;">
                            <div style="display: flex; align-items: center; gap: 10px; flex: 1;">
                                <div style="width: 16px; height: 16px; border-radius: 50%; background: ${color};"></div>
                                <div style="font-weight: 500;">${theme.name}</div>
                            </div>
                            ${isActive ? '<span style="color: #10B981; font-weight: 600;">Active</span>' : ''}
                        </div>
                    `;
                }).join('');

                // Add event listeners with hover preview
                container.querySelectorAll('.theme-item').forEach(item => {
                    const themeId = item.getAttribute('data-theme-id');
                    const theme = state.themes.find(t => t._id === themeId);
                    
                    // Hover preview
                    item.addEventListener('mouseenter', () => {
                        themeManager.previewTheme(theme);
                    });

                    item.addEventListener('mouseleave', () => {
                        themeManager.cancelPreview();
                    });

                    // Click to apply
                    item.addEventListener('click', () => {
                        themeManager.applyTheme(themeId)
                            .then(() => {
                                this.showNotification(`"${theme.name}" applied to ${state.currentLocation.name}!`, 'success');
                                this.updatePopupContent();
                            })
                            .catch(error => {
                                this.showNotification(`Failed to apply theme: ${error.message}`, 'error');
                            });
                    });
                });

            } catch (error) {
                container.innerHTML = `
                    <div style="text-align: center; color: #DC2626; padding: 20px;">
                        Failed to load themes from backend: ${error.message}
                    </div>
                `;
            }
        },
openCustomizer() {
    if (!state.currentLocation) {
        uiService.showNotification('Cannot create theme: No location detected.', 'error');
        return;
    }

    // Generate a unique theme name
    const themeName = `Custom Theme ${new Date().toLocaleDateString()} ${Math.floor(Math.random() * 1000)}`;

    // Random color generator
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    // Random gradient presets
    const GRADIENTS = [
        { start: '#8e2de2', end: '#4a00e0' },
        { start: '#00c6ff', end: '#0072ff' },
        { start: '#43e97b', end: '#38f9d7' },
        { start: '#f7971e', end: '#ffd200' },
        { start: '#ff5f6d', end: '#ffc371' },
        { start: '#f00000', end: '#dc281e' }
    ];
    const randGradient = GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)];

    // Build complete theme object
    const customThemeData = {
        name: themeName,
        description: 'Custom theme created via Theme Builder',
        textColor: getRandomColor(),
        backgroundColor: getRandomColor(),
        fontFamily: 'Roboto, sans-serif',
        sidebarGradientStart: randGradient.start,
        sidebarGradientEnd: randGradient.end,
        headerGradientStart: randGradient.start,
        headerGradientEnd: randGradient.end
    };

    // Create theme via themeManager
    themeManager.createCustomTheme(customThemeData)
        .then((createdTheme) => {
            uiService.showNotification(`🎨 "${createdTheme.name}" created and applied!`, 'success');
            uiService.updatePopupContent();
        })
        .catch((error) => {
            let errorMsg = `Failed to create theme: ${error.message}`;
            if (error.message.includes('400')) {
                errorMsg = 'Invalid theme data. Please check theme values.';
            }
            uiService.showNotification(errorMsg, 'error');
        });
},

        confirmRemoveTheme() {
            if (!state.currentTheme) {
                this.showNotification('No theme to remove', 'warning');
                return;
            }

            if (confirm(`Are you sure you want to remove the current theme from ${state.currentLocation.name}?`)) {
                themeManager.removeTheme()
                    .then(() => {
                        this.showNotification('Theme removed from location!', 'success');
                        cacheService.clearCache();
                        this.updatePopupContent();
                    })
                    .catch(error => {
                        let errorMsg = `Failed to remove theme: ${error.message}`;
                        if (error.message.includes('500')) {
                            errorMsg = 'Theme removed locally (backend issue)';
                            // Still update UI since we removed locally
                            this.updatePopupContent();
                        }
                        this.showNotification(errorMsg, 'error');
                    });
            }
        }
    };

    // =========================
    // Initialization - Optimized
    // =========================
    async function initializeThemeBuilder() {
        if (!document.body) {
            setTimeout(initializeThemeBuilder, 100);
            return;
        }

        if (state.isInitialized) {
            return;
        }

        console.log(`🚀 Initializing GHL Theme Builder v${CONFIG.VERSION}...`);

        try {
            // FIRST: Get current location from URL
            const currentLocation = urlLocationService.getCurrentLocation();
            if (!currentLocation || !currentLocation.locationId) {
                console.log('❌ No location detected - theme builder requires location context');
                return;
            }

            state.currentLocation = currentLocation;

            // SECOND: Immediately load and apply theme for this location
            await themeManager.loadCurrentTheme();

            // THIRD: Check access permissions for UI features
            const accessCheck = await accessService.checkThemeBuilderAccess();
            
            if (accessCheck.permitted) {
                // Set application state
                state.accessInfo = accessCheck.accessInfo;
                
                // Create UI only for permitted locations
                uiService.createFloatingButton();
                
                // Start monitoring URL changes for SPA navigation
                urlLocationService.startUrlChangeMonitoring();
                
                state.isInitialized = true;
                console.log('✅ GHL Theme Builder initialized for location:', state.currentLocation.locationId);
                
            } else {
                console.log('❌ Theme Builder UI not shown - location not permitted, but theme is still applied');
                // Even without access, we still apply the theme for all users
                // Start monitoring URL changes for theme persistence
                urlLocationService.startUrlChangeMonitoring();
                state.isInitialized = true;
            }
        } catch (error) {
            console.error('❌ Failed to initialize Theme Builder:', error);
        }
    }

    // =========================
    // Public API
    // =========================
    window.GHLThemeBuilder = {
        init: initializeThemeBuilder,
        refresh: () => uiService.refreshAllData(),
        open: () => uiService.openPopup(),
        close: () => uiService.closePopup(),
        
        getCurrentTheme: () => state.currentTheme,
        getCurrentLocation: () => state.currentLocation,
        getThemes: () => state.themes,
        
        applyTheme: (themeId) => themeManager.applyTheme(themeId),
        removeTheme: () => themeManager.removeTheme(),
        
        isInitialized: () => state.isInitialized,
        hasAccess: () => state.accessInfo?.themeBuilderAccess === true,

        // Debug methods
        debug: () => {
            console.log('🔧 GHL Theme Builder Debug Info:', {
                state: state,
                config: CONFIG,
                currentURL: window.location.href
            });
        }
    };

    // Auto-initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeThemeBuilder);
    } else {
        initializeThemeBuilder();
    }

    console.log(`🎨 GHL Theme Builder v${CONFIG.VERSION} - Optimized with caching and API fixes`);
})();







