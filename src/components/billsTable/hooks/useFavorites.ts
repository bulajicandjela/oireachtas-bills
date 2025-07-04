// NOTE:
//
// For simplicity and to avoid over-engineering at this stage,
// favourites are stored in localStorage and managed on the frontend only.
//
// In a real production setup, I would not use localStorage for user-specific data like favourites.
// Instead, I’d expect backend support to store and retrieve user favourites, with endpoints such as:
//
//   - POST   /users/:id/favourites/:billId   // to favourite a bill
//   - DELETE /users/:id/favourites/:billId   // to unfavourite
//   - GET    /users/:id/favourites           // returns list of favourited bill IDs or full data
//
// Ideally, the GET /bills endpoint should also support filtering by favourited bills:
//   e.g. GET /bills?favouritedBy=userId&page=1
//
// This allows us to fetch favourites with pagination, sorting, and other filters applied —
// rather than loading all bills and filtering client-side.
//
// For now, this is a mock implementation to enable basic UI behavior
// without introducing backend dependencies or hacky workarounds.

import { useState, useEffect, useCallback } from 'react';
import type { Bill } from '../../../types/bill';

export function useFavourites() {
  const [favourites, setFavourites] = useState<Map<string, Bill>>(new Map());

  useEffect(() => {
    const saved = localStorage.getItem('favourites');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Bill[];
        const favMap = new Map(parsed.map((bill) => [bill.id, bill]));
        setFavourites(favMap);
      } catch (e) {
        console.error('Failed to parse favourites from localStorage', e);
        setFavourites(new Map());
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(Array.from(favourites.values())));
  }, [favourites]);

  const toggleFavourite = useCallback((bill: Bill) => {
    setFavourites((prev) => {
      const updated = new Map(prev);
      if (updated.has(bill.id)) {
        updated.delete(bill.id);
      } else {
        updated.set(bill.id, bill);
      }
      return updated;
    });
  }, []);

  return {
    favourites: new Set(favourites.keys()),
    favouriteBills: Array.from(favourites.values()),
    toggleFavourite,
  };
}
