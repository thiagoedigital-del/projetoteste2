"use client";

interface PurchaseTrackerProps {
  value: number;
  currency?: string;
  contentName?: string;
  transactionId?: string;
}

export default function PurchaseTracker({ 
  value, 
  currency = 'USD', 
  contentName,
  transactionId 
}: PurchaseTrackerProps) {
  return null;
}


