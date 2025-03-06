"use client";

// Cache to store stock information with TTL (5 minutes)
const STOCK_CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

class StockService {
  constructor() {
    this.stockCache = new Map();
    this.pendingRequests = new Map();
  }

  // Get stock information from cache or fetch it
  async getVariantStock(productId, variantId) {
    const cacheKey = `${productId}-${variantId}`;

    // Check cache first
    if (this.stockCache.has(cacheKey)) {
      const cachedData = this.stockCache.get(cacheKey);
      // Return cached data if it's still valid
      if (Date.now() - cachedData.timestamp < STOCK_CACHE_TTL) {
        return cachedData.stock;
      }
    }

    // Return existing promise if this variant is already being fetched
    if (this.pendingRequests.has(cacheKey)) {
      return this.pendingRequests.get(cacheKey);
    }

    // Create new request
    const fetchPromise = this.fetchVariantStock(productId, variantId);
    this.pendingRequests.set(cacheKey, fetchPromise);

    try {
      const stock = await fetchPromise;
      return stock;
    } finally {
      this.pendingRequests.delete(cacheKey);
    }
  }

  // Fetch stock from API and cache it
  async fetchVariantStock(productId, variantId) {
    try {
      const { getVariantData } = await import("@/app/actions/productActions");
      const { variant } = await getVariantData(productId, variantId);

      const stock = variant?.stock || 0;

      // Cache the result
      this.stockCache.set(`${productId}-${variantId}`, {
        stock,
        timestamp: Date.now(),
      });

      return stock;
    } catch (error) {
      console.error("Error fetching stock:", error);
      return 0; // Default to 0 on error
    }
  }

  // Batch validate multiple items
  async validateCartItems(cartItems) {
    const stockPromises = cartItems.map(async (item) => {
      if (!item?.product?._id || !item?.variant?._id)
        return { ...item, isValid: false };

      const stock = await this.getVariantStock(
        item.product._id,
        item.variant._id
      );
      return {
        ...item,
        currentStock: stock,
        isValid: stock > 0,
        quantityAdjusted: item.quantity > stock ? stock : null,
      };
    });

    return Promise.all(stockPromises);
  }

  // Clear cache for specific item or entire cache
  clearCache(productId = null, variantId = null) {
    if (productId && variantId) {
      this.stockCache.delete(`${productId}-${variantId}`);
    } else {
      this.stockCache.clear();
    }
  }
}

// Create singleton instance
const stockService = new StockService();
export default stockService;
