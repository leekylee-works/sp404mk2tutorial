import React, { Component, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen w-full flex items-center justify-center bg-[#121212] text-white p-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                <AlertTriangle size={32} className="text-red-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white mb-2">
                  發生錯誤
                </h1>
                <p className="text-gray-400">
                  應用程式遇到了問題，請重新整理頁面
                </p>
              </div>
            </div>

            <div className="bg-[#1a1a1a] border border-[#333] rounded-lg p-6 mb-4">
              <h2 className="text-lg font-bold text-red-400 mb-3">錯誤詳情</h2>
              <div className="bg-black/50 rounded p-4 mb-4">
                <p className="text-red-300 font-mono text-sm">
                  {this.state.error?.toString()}
                </p>
              </div>
              
              {this.state.errorInfo && (
                <details className="text-xs text-gray-400">
                  <summary className="cursor-pointer mb-2 text-orange-400 hover:text-orange-300">
                    顯示堆疊追蹤
                  </summary>
                  <pre className="bg-black/50 rounded p-4 overflow-x-auto whitespace-pre-wrap text-xs">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}
            </div>

            <button
              onClick={() => window.location.reload()}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-bold transition-colors"
            >
              重新整理頁面
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
