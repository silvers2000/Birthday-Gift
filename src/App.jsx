import { useState, useEffect, useRef } from 'react'
import { Heart, Music, Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import './App.css'

// Import photos
import photo1 from './assets/IMG_1054.jpg'
import photo2 from './assets/IMG_1072.jpg'
import photo3 from './assets/IMG_4168.jpg'
import photo4 from './assets/IMG_3702.jpg'
import photo5 from './assets/IMG_1093.jpg'
import photo6 from './assets/IMG_3912.jpg'
import photo7 from './assets/WhatsAppImage2025-07-28at9.25.12AM.jpeg'
import photo8 from './assets/WhatsAppImage2025-07-28at9.26.04AM.jpeg'
import photo9 from './assets/WhatsAppImage2025-07-27at5.59.38PM.jpeg'
import photo10 from './assets/WhatsAppImage2025-07-27at6.13.04PM.jpeg'

const photos = [
  { src: photo1, caption: "Beautiful family moments" },
  { src: photo2, caption: "Elegant evening look" },
  { src: photo3, caption: "Proud moment in uniform" },
  { src: photo4, caption: "Traditional elegance" },
  { src: photo5, caption: "Cozy home vibes" },
  { src: photo6, caption: "Family celebration" },
  { src: photo7, caption: "Joyful selfie moment" },
  { src: photo8, caption: "Sacred family time" },
  { src: photo9, caption: "Adventure with loved ones" },
  { src: photo10, caption: "Beautiful memories together" }
]

function App() {
  const [currentPhoto, setCurrentPhoto] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const audioContextRef = useRef(null)
  const oscillatorRef = useRef(null)
  const gainNodeRef = useRef(null)

  // Calculate age
  const birthDate = new Date('1998-08-04')
  const today = new Date()
  const age = today.getFullYear() - birthDate.getFullYear()

  // Show card animation on load
  useEffect(() => {
    const timer = setTimeout(() => setShowCard(true), 500)
    return () => clearTimeout(timer)
  }, [])

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % photos.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Happy Birthday melody using Web Audio API
  const playBirthdayMelody = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }

    const audioContext = audioContextRef.current
    
    // Happy Birthday melody notes (simplified)
    const notes = [
      { freq: 261.63, duration: 0.5 }, // C4
      { freq: 261.63, duration: 0.5 }, // C4
      { freq: 293.66, duration: 1.0 }, // D4
      { freq: 261.63, duration: 1.0 }, // C4
      { freq: 349.23, duration: 1.0 }, // F4
      { freq: 329.63, duration: 2.0 }, // E4
      { freq: 261.63, duration: 0.5 }, // C4
      { freq: 261.63, duration: 0.5 }, // C4
      { freq: 293.66, duration: 1.0 }, // D4
      { freq: 261.63, duration: 1.0 }, // C4
      { freq: 392.00, duration: 1.0 }, // G4
      { freq: 349.23, duration: 2.0 }, // F4
    ]

    let currentTime = audioContext.currentTime
    
    notes.forEach((note) => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.setValueAtTime(note.freq, currentTime)
      oscillator.type = 'sine'
      
      gainNode.gain.setValueAtTime(0, currentTime)
      gainNode.gain.linearRampToValueAtTime(0.1, currentTime + 0.1)
      gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + note.duration)
      
      oscillator.start(currentTime)
      oscillator.stop(currentTime + note.duration)
      
      currentTime += note.duration
    })
  }

  const toggleMusic = () => {
    if (!isPlaying) {
      playBirthdayMelody()
      setIsPlaying(true)
      // Auto-stop after melody completes
      setTimeout(() => setIsPlaying(false), 12000)
    } else {
      setIsPlaying(false)
      if (oscillatorRef.current) {
        oscillatorRef.current.stop()
      }
    }
  }

  const nextPhoto = () => {
    setCurrentPhoto((prev) => (prev + 1) % photos.length)
  }

  const prevPhoto = () => {
    setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 relative overflow-hidden">
      {/* Floating Hearts Animation */}
      <div className="floating-hearts">
        {[...Array(15)].map((_, i) => (
          <Heart 
            key={i} 
            className={`heart heart-${i + 1} text-pink-400 opacity-70`} 
            size={Math.random() * 20 + 10}
          />
        ))}
      </div>

      {/* Confetti Animation */}
      <div className="confetti-container">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i} 
            className={`confetti confetti-${i + 1}`}
            style={{
              backgroundColor: ['#ff69b4', '#ffd700', '#87ceeb', '#98fb98', '#dda0dd'][i % 5],
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Music Control */}
      <Button
        onClick={toggleMusic}
        className={`fixed top-4 right-4 z-50 shadow-lg transition-all duration-300 ${
          isPlaying 
            ? 'bg-pink-500 hover:bg-pink-600 text-white animate-pulse' 
            : 'bg-white/80 hover:bg-white/90 text-pink-600'
        }`}
        size="sm"
      >
        {isPlaying ? <Music size={16} className="animate-bounce" /> : <Volume2 size={16} />}
        <span className="ml-2 text-xs hidden sm:inline">
          {isPlaying ? 'Playing...' : 'Play Music'}
        </span>
      </Button>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Main Birthday Card */}
        <div className={`birthday-card ${showCard ? 'show' : ''} max-w-4xl mx-auto`}>
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-block">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-4 animate-pulse">
                Happy Birthday
              </h1>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-pink-600 mb-6 animate-bounce">
                Smriti! 🎉
              </h2>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-full px-8 py-4 inline-block shadow-lg border-2 border-pink-200">
              <p className="text-xl md:text-2xl text-gray-700 font-semibold">
                Celebrating <span className="text-pink-600 font-bold text-2xl md:text-3xl">{age}</span> wonderful years! ✨
              </p>
            </div>
          </div>

          {/* Photo Slideshow Section */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-2xl border border-pink-200 mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
              Beautiful Memories 📸
            </h3>
            
            <div className="relative max-w-2xl mx-auto">
              {/* Main Photo Display */}
              <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-square md:aspect-[4/3]">
                <img
                  src={photos[currentPhoto].src}
                  alt={photos[currentPhoto].caption}
                  className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm md:text-base font-medium bg-black/50 rounded-lg px-3 py-2 backdrop-blur-sm">
                    {photos[currentPhoto].caption}
                  </p>
                </div>
              </div>

              {/* Navigation Buttons */}
              <Button
                onClick={prevPhoto}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full w-10 h-10 p-0 shadow-lg"
              >
                ←
              </Button>
              <Button
                onClick={nextPhoto}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full w-10 h-10 p-0 shadow-lg"
              >
                →
              </Button>

              {/* Photo Indicators */}
              <div className="flex justify-center mt-4 space-x-2">
                {photos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPhoto(index)}
                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                      index === currentPhoto 
                        ? 'bg-pink-500 scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Birthday Message */}
          <div className="bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 rounded-3xl p-6 md:p-8 shadow-xl text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Wishing You Joy & Happiness! 🌟
            </h3>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
              May this special day bring you endless joy, beautiful moments, and all the happiness your heart can hold. 
              Here's to another year of wonderful memories, achievements, and dreams coming true! 
              You deserve all the love and celebration today and always. ✨💕
            </p>
            <div className="mt-6 flex justify-center">
              <div className="bg-white/80 rounded-full px-6 py-3 shadow-lg">
                <p className="text-pink-600 font-bold text-lg">
                  With Love & Best Wishes! 🎂💖
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

