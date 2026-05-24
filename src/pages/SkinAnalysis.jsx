import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Upload, Camera, AlertTriangle } from 'lucide-react'

const AI_RESULTS = [
  {
    condition: 'Normal Skin',
    category: 'normal',
    confidence: 92,
    fillClass: 'fill-green',
    advice: [
      'Your skin appears healthy with no visible abnormalities',
      'Continue regular moisturizing and sun protection',
      'Stay hydrated and maintain a balanced diet',
      'Apply sunscreen (SPF 30+) before going outdoors',
    ],
    showDoctor: false,
  },
  {
    condition: 'Mild Skin Reaction',
    category: 'mild',
    confidence: 78,
    fillClass: 'fill-yellow',
    advice: [
      'Minor redness or rash detected',
      'Apply calamine lotion or aloe vera gel for relief',
      'Avoid scratching the affected area',
      'If symptoms persist beyond 3 days, consult a doctor',
    ],
    showDoctor: false,
  },
  {
    condition: 'Possible Infection',
    category: 'infection',
    confidence: 85,
    fillClass: 'fill-orange',
    advice: [
      'Signs of possible skin infection detected',
      'Keep the area clean and dry at all times',
      'Do NOT apply unverified home remedies',
      'Seek medical consultation within 24-48 hours',
    ],
    showDoctor: true,
  },
  {
    condition: 'Possible Disease – Needs Attention',
    category: 'severe',
    confidence: 71,
    fillClass: 'fill-red',
    advice: [
      'Unusual patterns detected that need professional evaluation',
      'Do not self-medicate or delay consultation',
      'Take a clear photo for your doctor\'s reference',
      'Visit the nearest healthcare center immediately',
    ],
    showDoctor: true,
  },
]

export default function SkinAnalysis() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [image, setImage] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState(null)

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => setImage(ev.target.result)
      reader.readAsDataURL(file)
      setResult(null)
    }
  }

  const handleAnalyze = () => {
    setAnalyzing(true)
    setResult(null)
    // Simulate AI analysis
    setTimeout(() => {
      const randomResult = AI_RESULTS[Math.floor(Math.random() * AI_RESULTS.length)]
      setResult(randomResult)
      setAnalyzing(false)
    }, 2500)
  }

  const handleReset = () => {
    setImage(null)
    setResult(null)
    setAnalyzing(false)
  }

  const categoryEmoji = {
    normal: '✅',
    mild: '⚠️',
    infection: '🦠',
    severe: '🚨',
  }

  return (
    <div className="fade-in">
      <div className="page-header">
        <button className="page-back-btn" onClick={() => navigate('/')} aria-label="Go back">
          <ArrowLeft size={20} />
        </button>
        <h1 className="page-title">Skin Analysis</h1>
      </div>

      {/* Disclaimer */}
      <div className="disclaimer-banner">
        <AlertTriangle size={18} />
        <p className="disclaimer-text">
          <strong>AI is for guidance only.</strong> This analysis does NOT constitute a medical diagnosis. Always consult a healthcare professional.
        </p>
      </div>

      {/* Upload Zone */}
      <div
        className={`upload-zone ${image ? 'has-image' : ''}`}
        onClick={() => !image && fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        id="upload-zone"
      >
        {image ? (
          <img src={image} alt="Uploaded skin image" className="upload-preview" />
        ) : (
          <>
            <div className="upload-illustration">📸</div>
            <p className="upload-text">Upload or Capture Skin Image</p>
            <p className="upload-subtext">Tap to select from gallery or take a photo</p>
          </>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="file-input-hidden"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        id="skin-image-input"
      />

      {/* Action Buttons */}
      {image && !analyzing && !result && (
        <div className="upload-actions">
          <button className="btn btn-secondary btn-sm" onClick={handleReset}>
            Clear
          </button>
          <button className="btn btn-primary" onClick={handleAnalyze} id="analyze-btn">
            <Upload size={18} />
            Analyze with AI
          </button>
        </div>
      )}

      {!image && (
        <div className="upload-actions">
          <button className="btn btn-outline" onClick={() => fileInputRef.current?.click()}>
            <Upload size={18} />
            Gallery
          </button>
          <button className="btn btn-primary" onClick={() => fileInputRef.current?.click()}>
            <Camera size={18} />
            Camera
          </button>
        </div>
      )}

      {/* Analyzing State */}
      {analyzing && (
        <div className="analyzing-overlay">
          <div className="spinner"></div>
          <p className="analyzing-text">Analyzing your image...</p>
          <p className="analyzing-subtext">Our AI is examining the skin patterns</p>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="analysis-result">
          <div className="result-header">
            <div className={`result-status-icon ${result.category}`}>
              {categoryEmoji[result.category]}
            </div>
            <div>
              <h3 className="result-condition">{result.condition}</h3>
              <p className="result-confidence">AI Confidence: {result.confidence}%</p>
            </div>
          </div>

          <div className="result-body">
            {/* Confidence Bar */}
            <div className="confidence-bar">
              <div className="confidence-bar-label">
                <span>Confidence Level</span>
                <span>{result.confidence}%</span>
              </div>
              <div className="confidence-bar-track">
                <div
                  className={`confidence-bar-fill ${result.fillClass}`}
                  style={{ width: `${result.confidence}%` }}
                />
              </div>
            </div>

            {/* Care Advice */}
            <div className="care-advice">
              <h4>💡 Care Suggestions</h4>
              <ul>
                {result.advice.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>

            {/* Doctor Alert */}
            {result.showDoctor && (
              <div className="doctor-alert">
                <span className="doctor-alert-icon">🏥</span>
                <p className="doctor-alert-text">
                  We strongly recommend consulting a doctor or visiting your nearest healthcare center for a proper examination.
                </p>
              </div>
            )}

            {/* Reset */}
            <div className="upload-actions" style={{ padding: 0, marginTop: 16 }}>
              <button className="btn btn-secondary btn-sm" onClick={handleReset}>
                New Scan
              </button>
              <button className="btn btn-outline btn-sm" onClick={() => navigate('/chat')}>
                Ask Health Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
