import { CheckCircle2, Info, AlertCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'info' | 'error';
  onClose?: () => void;
}

export default function Toast({ message, type = 'success' }: ToastProps) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900/95 border border-purple-500/40 text-slate-100 shadow-xl shadow-purple-950/40 text-sm font-medium backdrop-blur-md">
        {type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
        {type === 'info' && <Info className="w-4 h-4 text-purple-400 shrink-0" />}
        {type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
        <span className="truncate max-w-xs">{message}</span>
      </div>
    </div>
  );
}
