'use client'

/* eslint-disable @typescript-eslint/no-unused-vars */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center max-w-md px-6">
        <h1 className="mb-4 text-4xl font-bold text-destructive">Lỗi</h1>
        <p className="mb-4 text-muted-foreground">
          Đã xảy ra lỗi khi tải trang này.
        </p>
        <button
          onClick={reset}
          className="px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Thử lại
        </button>
      </div>
    </div>
  );
}
