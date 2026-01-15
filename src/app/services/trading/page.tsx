import { redirect } from 'next/navigation';

export default function TradingRedirect() {
    redirect('/services/security?tab=trading');
}
