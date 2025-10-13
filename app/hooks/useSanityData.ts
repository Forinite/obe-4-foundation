//app/hooks/useSanityData.ts

'use client';
import { useState, useEffect, useCallback } from 'react';

/**
 * Generic hook for fetching data from Sanity with loading, error & refetch support.
 * @param fetchFn - The async function that returns the data (e.g., getHomeData)
 */
export function useSanityData<T>(fetchFn: () => Promise<T>) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refetch = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await fetchFn();
            setData(result);
        } catch (err: any) {
            console.error('Error fetching data:', err);
            setError('Failed to load data. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [fetchFn]);

    useEffect(() => {
        refetch();
    }, [refetch]);

    return { data, loading, error, refetch };
}
