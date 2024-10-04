// @ts-nocheck
import { printReceipt } from '$lib/printer/print.js';
import { json } from '@sveltejs/kit';

export async function POST() {
  try {
    await printReceipt();
    return json({ success: true });
  } catch (error) {
    console.error('Error in printReceipt:', error);
    return json({ success: false, error: error.message }, { status: 500 });
  }
}
