export interface UploadHistoryItem {
  id: string;
  url: string;
  fileName: string;
  originalName: string;
  size: number;
  originalSize: number;
  contentType: string;
  optimized: boolean;
  uploadedAt: string;
  thumbnail?: string;
}

const STORAGE_KEY = 'imageurl_upload_history';
const MAX_HISTORY_ITEMS = 100;

export class UploadHistoryManager {
  static getHistory(): UploadHistoryItem[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to load upload history:', error);
      return [];
    }
  }

  static addToHistory(item: UploadHistoryItem): void {
    if (typeof window === 'undefined') return;

    try {
      const history = this.getHistory();
      
      // Remove duplicate if exists
      const filteredHistory = history.filter(h => h.id !== item.id);
      
      // Add new item at the beginning
      const newHistory = [item, ...filteredHistory];
      
      // Limit history size
      const limitedHistory = newHistory.slice(0, MAX_HISTORY_ITEMS);
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedHistory));
    } catch (error) {
      console.error('Failed to save to upload history:', error);
    }
  }

  static removeFromHistory(id: string): void {
    if (typeof window === 'undefined') return;

    try {
      const history = this.getHistory();
      const filteredHistory = history.filter(h => h.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredHistory));
    } catch (error) {
      console.error('Failed to remove from upload history:', error);
    }
  }

  static clearHistory(): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear upload history:', error);
    }
  }

  static getHistoryStats(): { totalUploads: number; totalSize: number; totalSaved: number } {
    const history = this.getHistory();
    
    return {
      totalUploads: history.length,
      totalSize: history.reduce((sum, item) => sum + item.size, 0),
      totalSaved: history.reduce((sum, item) => sum + (item.originalSize - item.size), 0),
    };
  }

  static exportHistory(): string {
    const history = this.getHistory();
    return JSON.stringify(history, null, 2);
  }

  static importHistory(jsonData: string): boolean {
    try {
      const imported = JSON.parse(jsonData);
      if (Array.isArray(imported)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(imported.slice(0, MAX_HISTORY_ITEMS)));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to import history:', error);
      return false;
    }
  }
}
