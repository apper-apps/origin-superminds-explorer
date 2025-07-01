/**
 * Canvas utility functions to prevent InvalidStateError
 * Addresses issues with external scripts that manipulate canvas elements
 */

/**
 * Safely draws an image to canvas after validating dimensions
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {HTMLImageElement|HTMLCanvasElement} image - Image or canvas to draw
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {number} width - Width (optional)
 * @param {number} height - Height (optional)
 */
export const safeDrawImage = (ctx, image, x = 0, y = 0, width, height) => {
    try {
        // Validate canvas context
        if (!ctx || typeof ctx.drawImage !== 'function') {
            console.warn('Invalid canvas context provided');
            return false;
        }

        // Validate image element
        if (!image) {
            console.warn('No image provided to draw');
            return false;
        }

        // Check if image is a canvas with zero dimensions
        if (image.tagName === 'CANVAS') {
            if (image.width === 0 || image.height === 0) {
                console.warn('Cannot draw canvas with zero dimensions', { 
                    width: image.width, 
                    height: image.height 
                });
                return false;
            }
        }

        // Check if image is loaded (for HTMLImageElement)
        if (image.tagName === 'IMG' && (!image.complete || image.naturalWidth === 0)) {
            console.warn('Image not loaded or has zero dimensions');
            return false;
        }

        // Validate canvas dimensions
        const canvas = ctx.canvas;
        if (canvas.width === 0 || canvas.height === 0) {
            console.warn('Target canvas has zero dimensions', {
                width: canvas.width,
                height: canvas.height
            });
            return false;
        }

        // Perform the draw operation
        if (width !== undefined && height !== undefined) {
            ctx.drawImage(image, x, y, width, height);
        } else {
            ctx.drawImage(image, x, y);
        }

        return true;
    } catch (error) {
        console.error('Error drawing image to canvas:', error);
        return false;
    }
};

/**
 * Ensures a canvas element has valid dimensions
 * @param {HTMLCanvasElement} canvas - Canvas element
 * @param {number} minWidth - Minimum width (default: 1)
 * @param {number} minHeight - Minimum height (default: 1)
 */
export const ensureCanvasDimensions = (canvas, minWidth = 1, minHeight = 1) => {
    if (!canvas || canvas.tagName !== 'CANVAS') {
        console.warn('Invalid canvas element provided');
        return false;
    }

    let updated = false;

    if (canvas.width < minWidth) {
        canvas.width = minWidth;
        updated = true;
    }

    if (canvas.height < minHeight) {
        canvas.height = minHeight;
        updated = true;
    }

    if (updated) {
        console.log('Canvas dimensions updated:', {
            width: canvas.width,
            height: canvas.height
        });
    }

    return true;
};

/**
 * Creates a defensive wrapper around external canvas operations
 * Helps prevent errors from external scripts like apper-dev-script
 */
export const wrapCanvasOperations = () => {
    // Check if canvas API is available
    if (typeof window === 'undefined' || !window.CanvasRenderingContext2D) {
        console.warn('Canvas API not available');
        return () => {}; // Return no-op restore function
    }

    // Store original drawImage method
    const originalDrawImage = window.CanvasRenderingContext2D.prototype.drawImage;

    // Override with safe version
    window.CanvasRenderingContext2D.prototype.drawImage = function(...args) {
        const [image] = args;
        
        // Use our safe draw function
        if (image && (image.tagName === 'CANVAS' || image.tagName === 'IMG')) {
            const success = safeDrawImage(this, ...args);
            if (!success) {
                return; // Skip the operation if validation fails
            }
        }

        // Call original method with validation passed
        return originalDrawImage.apply(this, args);
    };

    // Return function to restore original behavior
    return () => {
        if (window.CanvasRenderingContext2D) {
            window.CanvasRenderingContext2D.prototype.drawImage = originalDrawImage;
        }
    };
};

/**
 * Initialize canvas error prevention
 * Call this early in your application lifecycle
 */
export const initCanvasErrorPrevention = () => {
    // Wrap canvas operations to prevent external script errors
    const restore = wrapCanvasOperations();

    // Listen for canvas-related errors
    window.addEventListener('error', (event) => {
        if (event.message && event.message.includes('drawImage')) {
            console.warn('Canvas drawImage error prevented:', event.message);
            event.preventDefault();
        }
    });

    return restore;
};