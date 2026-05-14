"use client";

export default function Loading() {
  return (
    <div className="loading-container">
      {/* Title skeleton */}
      <div className="skeleton title" />

      {/* Image block */}
      <div className="image-box">
        <div className="skeleton image" />

        {/* Spinner */}
        <div className="spinner-wrapper">
          <div className="spinner" />
        </div>
      </div>

      {/* Text lines */}
      <div className="skeleton text w90" />
      <div className="skeleton text w80" />
      <div className="skeleton text w95" />

      {/* CSS */}
      <style jsx>{`
        .loading-container {
          padding: 24px;
          animation: fadeIn 0.3s ease-in;
        }

        .image-box {
          position: relative;
          margin: 16px 0;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        /* Skeleton base */
        .skeleton {
          background: linear-gradient(
            90deg,
            #eee 25%,
            #f5f5f5 50%,
            #eee 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.2s infinite;
          border-radius: 8px;
        }

        .title {
          width: 50%;
          height: 36px;
          margin-bottom: 16px;
        }

        .image {
          width: 100%;
          height: 220px;
        }

        .text {
          height: 14px;
          margin-bottom: 10px;
        }

        .w90 { width: 90%; }
        .w80 { width: 80%; }
        .w95 { width: 95%; }

        /* Spinner */
        .spinner-wrapper {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .spinner {
          width: 48px;
          height: 48px;
          border: 4px solid rgba(0,0,0,0.1);
          border-top: 4px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          box-shadow: 0 0 12px rgba(59,130,246,0.5);
        }

        /* Animations */
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}