import { useState, useEffect, useRef, useCallback } from 'react'
import { auth } from './firebase'

export default function App() {
  const [view, setView] = useState('landing') // 'landing' | 'camera'
  const [status, setStatus] = useState('loading')
  const [mirrored, setMirrored] = useState(false) // TRUE VIEW by default
  const videoRef = useRef(null)
  const streamRef = useRef(null)

  // ── Camera Controller ───────────────────────────────────────────────────
  const startCamera = useCallback(async () => {
    setStatus('loading');
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 } },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().then(() => setStatus('ready')).catch(() => setStatus('ready'));
      }
    } catch (err) {
      alert("Error: " + err.message);
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    if (view === 'camera') {
      startCamera();
    }
    return () => {
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    }
  }, [view, startCamera]);

  if (view === 'landing') {
    return (
      <div className="landing">
        <header className="landing-nav">
          <div className="logo">AsYouAre</div>
          <button className="pill-btn primary" onClick={() => setView('camera')}>Open App</button>
        </header>
        <main className="landing-hero">
          <h1 className="hero-title">See yourself as you <span className="gradient">truly</span> are.</h1>
          <p className="hero-subtitle">
            Most cameras show a flipped version of you. We don't. <br/>
            Experience the "True View" and see yourself the way the world sees you.
          </p>
          <div className="hero-actions">
            <button className="hero-btn primary" onClick={() => setView('camera')}>Get Started</button>
          </div>
        </main>
        <section className="features">
          <div className="feature-card">
            <h3>True View</h3>
            <p>Non-mirrored live preview for an authentic perspective.</p>
          </div>
          <div className="feature-card">
            <h3>As It Is</h3>
            <p>No filters, no mirroring. Just an honest window to the real you.</p>
          </div>
          <div className="feature-card">
            <h3>Minimalist</h3>
            <p>Purpose-built for zero distraction. Simple and intuitive.</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="app-main">
      <div className="app-nav">
        <button className="back-btn" onClick={() => setView('landing')}>← Exit</button>
        <div className="app-logo">AsYouAre</div>
        <div className="status-pill"><div className="dot" /> Live Preview</div>
      </div>

      <div className="cam-viewport">
        {(status === 'ready' || status === 'loading') && (
          <video ref={videoRef} autoPlay playsInline muted className={mirrored ? 'mirrored' : ''} />
        )}
        {status === 'loading' && <div className="cam-overlay">Initializing Camera...</div>}
        
        <div className="cam-v-controls">
           <button className={`mode-pill ${!mirrored ? 'active' : ''}`} onClick={() => setMirrored(false)}>True View</button>
           <button className={`mode-pill ${mirrored ? 'active' : ''}`} onClick={() => setMirrored(true)}>Mirror Mode</button>
        </div>

        {/* Action Button: No Capture, just helpful guidance */}
        <div className="cam-footer">
          <button className="reset-link" onClick={startCamera}>Reset Feed</button>
        </div>
      </div>
    </div>
  );
}
