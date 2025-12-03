"use client";

interface PurchaseTrackerProps {
  value: number;
  currency?: string;
  contentName?: string;
  transactionId?: string;
}

export default function PurchaseTracker({ 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  value, 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  currency = 'USD', 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  contentName,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transactionId 
}: PurchaseTrackerProps) {
  return null;
}


