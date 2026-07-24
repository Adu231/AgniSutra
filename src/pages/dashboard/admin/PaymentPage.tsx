import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import { CreditCard, ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const org = searchParams.get('org') || 'DLF Commercial Properties';
  const plan = searchParams.get('plan') || 'professional';

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [processing, setProcessing] = useState(false);

  const price = plan.toLowerCase() === 'enterprise' ? 399 : 149;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !expiry || !cvv || !name) {
      toast.error('Please fill in all credit card details.');
      return;
    }
    setProcessing(true);
    toast.info('Verifying secure transaction credentials...');
    
    // Simulate secure transaction network delay
    await new Promise(r => setTimeout(r, 2000));
    
    setProcessing(false);
    toast.success(`Payment verified! ${org} has been successfully upgraded to ${plan.toUpperCase()}.`);
    navigate('/dashboard/admin/subscriptions');
  };

  return (
    <RoleDashboardLayout title="Confirm Upgrade Payment">
      <div className="p-4 sm:p-6 max-w-xl mx-auto space-y-6">
        <button
          onClick={() => navigate('/dashboard/admin/subscriptions')}
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Subscriptions
        </button>

        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl text-left">
          <div className="p-6 border-b border-border bg-muted/20">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-amber-500" />
              Secure Checkout Gateway
            </h2>
            <p className="text-xs text-muted-foreground">Verify and authorize subscription billing changes</p>
          </div>

          <div className="p-6 space-y-6">
            {/* Upgrade Summary */}
            <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Organization</span>
                <span className="font-semibold">{org}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Upgrade Plan</span>
                <span className="font-semibold text-purple-600 dark:text-purple-400 capitalize">{plan} Tier</span>
              </div>
              <div className="flex justify-between items-center text-sm pt-2 border-t border-border/60">
                <span className="font-bold">Total Amount Due</span>
                <span className="text-base font-black text-amber-600">${price}<span className="text-xs text-muted-foreground font-normal">/month</span></span>
              </div>
            </div>

            {/* Payment Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Cardholder Name</label>
                <input
                  type="text"
                  placeholder="e.g. ARJUN MEHTA"
                  required
                  className="input-field text-sm font-medium"
                  value={name}
                  onChange={e => setName(e.target.value.toUpperCase())}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Card Number</label>
                <input
                  type="text"
                  placeholder="xxxx xxxx xxxx xxxx"
                  required
                  maxLength={19}
                  className="input-field text-sm font-mono"
                  value={cardNumber}
                  onChange={e => {
                    const val = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                    setCardNumber(val);
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Expiration Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    required
                    maxLength={5}
                    className="input-field text-sm font-mono text-center"
                    value={expiry}
                    onChange={e => {
                      let val = e.target.value.replace(/\D/g, '');
                      if (val.length > 2) {
                        val = val.slice(0, 2) + '/' + val.slice(2, 4);
                      }
                      setExpiry(val);
                    }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">CVV / CVC</label>
                  <input
                    type="password"
                    placeholder="***"
                    required
                    maxLength={3}
                    className="input-field text-sm font-mono text-center"
                    value={cvv}
                    onChange={e => setCvv(e.target.value.replace(/\D/g, ''))}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={processing}
                className="w-full mt-2 gradient-fire text-white border-0 font-semibold flex items-center justify-center"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  'Authorize & Confirm Payment'
                )}
              </Button>
            </form>
          </div>

          <div className="px-6 py-4 border-t border-border bg-muted/20 flex items-center justify-center gap-2 text-[10px] text-muted-foreground">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            256-bit Secure Socket Layer (SSL) Encryption Protocol Enabled
          </div>
        </div>
      </div>
    </RoleDashboardLayout>
  );
};

export default PaymentPage;
