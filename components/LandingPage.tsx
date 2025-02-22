'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useAnimation, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, X, Menu, BookOpen, Mail, Moon, Sun, DownloadIcon, ArrowDown } from 'lucide-react'
import { useTheme } from 'next-themes'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { BorderBeam } from "@/components/magicui/border-beam";
import Globe from "@/components/magicui/globe";
import { Linkedin, Dribbble, Behance } from 'react-bootstrap-icons';
import { Analytics } from '@vercel/analytics/react';
type CategoryType = 'Graphic Design' | 'Web Design' | 'Flyers' | 'Brand Identity';

interface TreeNodeData {
  id: string;
  name: string;
  children?: TreeNodeData[];
  url?: string;
  category?: CategoryType;
  image?: string;
}

const MagicUIBlurFade: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, filter: "blur(0px)" })
    } else {
      controls.start({ opacity: 0, filter: "blur(10px)" })
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={controls}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}

type Project = {
  id: string
  name: string
  url: string
  category: CategoryType
  image: string
}

const fetchProjects = async (): Promise<Project[]> => {
  const projects = [
    { id: '1', name: 'AiSolves', url: 'https://dribbble.com/shots/24572059-Ai-Solvess', category: 'Web Design', image: '/preview-image.png' },
    { id: '2', name: 'Aleatory', url: 'https://dribbble.com/shots/24572108-Aleatory', category: 'Web Design', image: '/preview-image.png' },
    { id: '3', name: 'Smartpro', url: 'https://www.behance.net/gallery/176340759/Catalogo-de-producto-SmartPro', category: 'Brand Identity', image: '/preview-image.png' },
    { id: '4', name: 'Evolution', url: 'https://www.behance.net/gallery/181161137/Evolution', category: 'Graphic Design', image: '/preview-image.png' },
    { id: '5', name: 'Vynil Cover', url: 'https://dribbble.com/shots/22212739-Cat-with-drip', category: 'Graphic Design', image: '/preview-image.png' },
    { id: '6', name: 'Touché Sports', url: 'https://www.behance.net/gallery/145489119/Touch-Sports', category: 'Graphic Design', image: '/preview-image.png' },
    { id: '7', name: 'Miche Barbershop', url: 'https://www.behance.net/gallery/176339339/Miche-Barbershop', category: 'Brand Identity', image: '/preview-image.png' },
    { id: '8', name: 'Valkiria', url: 'https://www.behance.net/gallery/142578631/Valkiria', category: 'Brand Identity', image: '/preview-image.png' },
    { id: '9', name: 'Hefesto Vynil Cover', url: 'https://www.behance.net/gallery/142401081/Hefesto', category: 'Graphic Design', image: '/preview-image.png' },
    { id: '10', name: 'gh0ts portfolio', url: 'https://gh0t.art', category: 'Web Design', image: '/preview-image.png' },
    { id: '11', name: 'Suburbia', url: 'https://www.behance.net/gallery/142399405/Suburbia', category: 'Flyers', image: '/preview-image.png' },
    { id: '12', name: 'Dreamers', url: 'https://dribbble.com/shots/18051117-Dreamers', category: 'Flyers', image: '/preview-image.png' },
    { id: '13', name: 'Graphic design is my passion', url: 'https://dribbble.com/shots/18051122-Graphic-design-is-my-passion', category: 'Flyers', image: '/preview-image.png' },
    { id: '14', name: 'Techno party', url: 'https://dribbble.com/shots/22212787-TECHNO-FLYER', category: 'Flyers', image: '/preview-image.png' },
    { id: '15', name: 'Emotions', url: 'https://dribbble.com/shots/22280887-Emotions', category: 'Flyers', image: '/preview-image.png' },
    { id: '16', name: 'Emotions pt2', url: 'https://dribbble.com/shots/22401925-Casual-wednesday-art', category: 'Flyers', image: '/preview-image.png' },
    { id: '17', name: 'Teen Age Mutants', url: 'https://dribbble.com/shots/24571936-Teen-age-mutants', category: 'Flyers', image: '/preview-image.png' },
    { id: '18', name: 'Brokers Ads', url: 'https://www.behance.net/gallery/176392849/Landing-BrokersAds', category: 'Web Design', image: '/preview-image.png' },
    { id: '19', name: 'Seneca insumos', url: 'https://dribbble.com/shots/24572243-S-neca-Insumos', category: 'Brand Identity', image: '/preview-image.png' },
    { id: '20', name: 'S.ph', url: 'https://dribbble.com/shots/24572360-S-ph', category: 'Brand Identity', image: '/preview-image.png' },
    { id: '21', name: 'LVM AUTOMOTORES', url: 'https://dribbble.com/shots/24572419-LVM-Automotores', category: 'Brand Identity', image: '/preview-image.png' },
    { id: '22', name: 'Fundación claves', url: 'https://www.behance.net/gallery/183766575/Fundacion-Claves', category: 'Brand Identity', image: '/preview-image.png' },
    { id: '23', name: 'Loyal Insumos', url: 'https://www.behance.net/gallery/183948887/Tarjetas-Personales', category: 'Brand Identity', image: '/preview-image.png' },
    { id: '24', name: 'Lineage 2 jade', url: 'https://l2-jade-v1.vercel.app/', category: 'Web Design', image: '/preview-image.png' },
  ];

  return projects.map(project => ({
    ...project,
    category: project.category as CategoryType
  }));
}

const createTreeStructure = (projects: Project[]): TreeNodeData => {
  const root: TreeNodeData = { 
    id: 'root', 
    name: 'Portfolio', 
    children: [
      { id: 'graphic-design', name: 'Graphic Design', children: [] },
      { id: 'web-design', name: 'Web Design', children: [] },
      { id: 'flyers', name: 'Flyers', children: [] },
      { id: 'brand-identity', name: 'Brand Identity', children: [] },
    ]
  }

  projects.forEach((project) => {
    const node: TreeNodeData = {
      id: project.id,
      name: project.name,
      url: project.url,
      category: project.category,
      image: project.image,
    }
    const category = root.children!.find(cat => cat.name === project.category)
    if (category) {
      category.children!.push(node)
    }
  })

  // Filtrar categorías vacías
  root.children = root.children!.filter(category => category.children!.length > 0)

  return root
}

interface TreeNodeProps {
  node: TreeNodeData;
  level?: number;
  isDarkMode: boolean;
}

// Definir TreeNode antes de usarlo
const TreeNode: React.FC<TreeNodeProps> = ({ node, level = 0, isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(level === 0) // Siempre abierto para el nodo raíz (Portfolio)
  const hasChildren = node.children && node.children.length > 0


  return (
    <div className="select-none text-base font-outfit">
      <div
        className={`flex items-center py-2 px-3 cursor-pointer rounded-md ${
          isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
        }`}
        style={{ paddingLeft: `${level * 20}px` }}
        onClick={() => level !== 0 && hasChildren && setIsOpen(!isOpen)}
      >
        {hasChildren && level !== 0 && (
          isOpen ? (
            <ArrowDown className="w-5 h-5 mr-2 text-green-500" />
          ) : (
            <ArrowDown className="w-5 h-5 mr-2 text-green-500 transform -rotate-90" />
          )
        )}
        {node.url ? (
          <a
            href={node.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${
              isDarkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-700'
            } transition-colors duration-200`}
            onClick={(e) => e.stopPropagation()}
          >
            {node.name}
          </a>
        ) : (
          <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{node.name}</span>
        )}
      </div>
      {(isOpen || level === 0) && hasChildren && (
        <div>
          {node.children!.map((childNode) => (
            <TreeNode key={childNode.id} node={childNode} level={level + 1} isDarkMode={isDarkMode} />
          ))}
        </div>
      )}
    </div>
  )
}

const PortfolioTree: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const [treeData, setTreeData] = useState<TreeNodeData | null>(null)

  useEffect(() => {
    const loadProjects = async () => {
      const projects = await fetchProjects()
      const treeStructure = createTreeStructure(projects)
      setTreeData(treeStructure)
    }
    loadProjects()
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen w-full font-outfit">
      <div className="w-[80vw] p-10 rounded-lg shadow-lg overflow-hidden" style={{
        background: isDarkMode
          ? 'linear-gradient(135deg, rgba(76,175,80,0.1) 0%, rgba(76,175,80,0.55) 100%)'
          : 'linear-gradient(135deg, rgba(76,175,80,0.05) 0%, rgba(76,175,80,0.3) 100%)',
        backdropFilter: 'blur(10px)',
      }}>
        <h2 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>My work</h2>
        <div className="overflow-auto max-h-[75vh]">
          {treeData ? (
            <TreeNode node={treeData} isDarkMode={isDarkMode} />
          ) : (
            <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-base`}>Loading portfolio...</div>
          )}
        </div>
      </div>
    </div>
  )
}

interface Word {
  text: string
  className?: string
}

interface TypewriterEffectSmoothProps {
  words: Word[]
}

const TypewriterEffectSmooth: React.FC<TypewriterEffectSmoothProps> = ({ words }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(true)

  useEffect(() => {
    const word = words[currentWordIndex].text
    const delay = isDeleting ? 50 : 60

    const timer = setTimeout(() => {
      if (!isDeleting && currentText === word) {
        setTimeout(() => setIsDeleting(true), 200)
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false)
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length)
      } else {
        setCurrentText((prev) =>
          isDeleting ? prev.slice(0, -1) : word.slice(0, prev.length + 1)
        )
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [currentText, isDeleting, currentWordIndex, words])

  return (
    <div className="flex flex-wrap justify-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center text-gray-800">
      <span className="mr-2">Build,create,deploy</span>
      <span className="text-[#4CAF50]">{currentText}</span>
      <span className="animate-blink">|</span>
    </div>
  )
}

const BackgroundAnimation: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="ripple-1" />
        <div className="ripple-2" />
        <div className="ripple-3" />
      </div>
    </div>
  )
}

export default function LandingPage() {
  const [text, setText] = useState('')
  const [fullText, setFullText] = useState("Web Designer")
  const [index, setIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { theme, setTheme } = useTheme ( )
  const containerRef = useRef<HTMLDivElement>(null)
  const homeRef = useRef<HTMLDivElement>(null)
  const knowledgeRef = useRef<HTMLDivElement>(null)
  const portfolioRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.8])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isDeleting && index <= fullText.length) {
        setText(fullText.slice(0, index))
        setIndex(prev => prev + 1)
      } else if (isDeleting && index > 0) {
        setText(fullText.slice(0, index))
        setIndex(prev => prev - 1)
      } else {
        setIsDeleting(!isDeleting)
        if (!isDeleting) {
          setFullText(fullText === "Web Designer" ? "Graphic Designer" : "Web Designer")
          setIndex(0)
        }
      }
    }, 100)
  
    return () => clearTimeout(timer)
  }, [fullText, index, isDeleting])

  const updateActiveSection = () => {
    const knowledgeTop = knowledgeRef.current?.offsetTop ?? 0
    const portfolioTop = portfolioRef.current?.offsetTop ?? 0
    const contactTop = contactRef.current?.offsetTop ?? 0

    const scrollPosition = window.scrollY + window.innerHeight / 2

    if (scrollPosition < knowledgeTop) {
      setActiveSection('home')
    } else if (scrollPosition < portfolioTop) {
      setActiveSection('knowledge')
    } else if (scrollPosition < contactTop) {
      setActiveSection('portfolio')
    } else {
      setActiveSection('contact')
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.15)
      updateActiveSection()
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    updateActiveSection()
  }, [])

  useEffect(() => {
    if (canvasRef.current) {
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
      const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true })
      renderer.setSize(300, 300)

      const controls = new OrbitControls(camera, renderer.domElement)
      controls.enableZoom = false
      controls.enablePan = false

      const geometry = new THREE.SphereGeometry(1, 32, 32);
      const material = new THREE.MeshBasicMaterial({ 
        color: isDarkMode ? 0x4CAF50 : 0x2A5E34,
        opacity: 0.55,
        transparent: true
      })

      const points: THREE.Vector3[] = []
      const goldenRatio = (1 + Math.sqrt(5)) / 2
      const turnFraction = 1 - 1 / goldenRatio
      const maxPoints = 500

      for (let i = 0; i < maxPoints; i++) {
        const t = i / maxPoints
        const angle = 2 * Math.PI * turnFraction * i
        const radius = 1.5 * Math.pow(goldenRatio, t / 2)
        const x = radius * Math.cos(angle)
        const y = radius * Math.sin(angle)
        const z = 0.5 * t
        points.push(new THREE.Vector3(x, y, z))
      }

      geometry.setFromPoints(points)
      const spiral = new THREE.Mesh(geometry, material)
      scene.add(spiral)

      camera.position.z = 5

      const animate = () => {
        requestAnimationFrame(animate)
        spiral.rotation.z += 0.002
        controls.update()
        renderer.render(scene, camera)
      }

      animate()

      return () => {
        renderer.dispose()
        geometry.dispose()
        material.dispose()
      }
    }
  }, [isDarkMode])

  useEffect(() => {
    setTheme('light')
  }, [setTheme])

  useEffect(() => {
    setIsDarkMode(theme === 'dark')
  }, [theme])

const handleToggleTheme = () => {
  const newTheme = isDarkMode ? 'light' : 'dark'
  setTheme(newTheme)
}

function scrollToSection(ref: React.RefObject<HTMLElement>) {
  ref.current?.scrollIntoView({ behavior: 'smooth' })
  setMobileMenuOpen(false)
}

  const getBentoBoxStyle = () => {
    return {
      background: isDarkMode 
        ? 'linear-gradient(to right, rgba(31, 31, 31, 0.8), rgba(41, 41, 41, 0.8))'
        : 'linear-gradient(to right, rgba(255, 255, 255, 0.8), rgba(240, 240, 240, 0.8))',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      boxShadow: isDarkMode
        ? '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)'
        : '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
    }
  }

  const words = [
    { text: "awesome websites and grow ur company" },
  ]

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    setVh()
    window.addEventListener('resize', setVh)

    return () => window.removeEventListener('resize', setVh)
  }, [])

  return (
    <motion.div 
      className={`font-outfit min-h-screen ${isDarkMode ? 'bg-[#1a1a1a] text-gray-100' : 'bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700'} relative`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={containerRef}
    >
      {/* Background elements */}
      {isDarkMode ? (
        <div className="fixed inset-0 z-0">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <pattern id="dot-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#4CAF50" opacity="0.3" />
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#dot-pattern)" />
          </svg>
        </div>
      ) : (
        <div className="fixed inset-0 z-10 w-full h-full pointer-events-none">
          <div 
            className="w-full h-full bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"
            style={{ 
              opacity: 0.2,
              maskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 70%)'
            }}
          />
        </div>
      )}

      {/* Navigation */}
<motion.nav 
  className={`fixed left-1/2 transform -translate-x-1/2 z-50 flex justify-center items-center p-2 rounded-full ${
    isDarkMode 
      ? 'bg-gradient-to-r from-gray-800/80 to-gray-900/80' 
      : 'bg-gradient-to-r from-white/80 to-gray-200/80 dark:from-gray-800/80 dark:to-gray-900/80'
  } backdrop-blur-md shadow-lg transition-all duration-300 ease-out animate-fade-up animate-once animate-delay-150 animate-ease-out animate-alternate`}
  style={{ 
    opacity: 0.95,
    top: scrolled ? '5%' : '15%'
  }}
  animate={{
    top: scrolled ? '5%' : '15%'
  }}
  transition={{
    duration: 0.3,
    ease: 'easeInOut'
  }}
>
  <div className="flex items-center space-x-4">
    <Button 
      variant="ghost" 
      size="sm" 
      className={`rounded-full ${
        activeSection === 'home'
          ? isDarkMode
            ? 'bg-[#4CAF50]/20 text-[#4CAF50]'
            : 'bg-[#1a1a1a]/20 text-[#1a1a1a]'
          : isDarkMode
            ? 'hover:bg-[#4CAF50]/10 text-gray-300 hover:text-[#4CAF50]'
            : 'hover:bg-[#1a1a1a]/10 text-[#1a1a1a] hover:text-[#1a1a1a]'
      } transition-colors duration-300 hidden md:flex`}
      onClick={() => scrollToSection(homeRef)}
    >
      <Home className="h-5 w-5 mr-2" />
      Home
    </Button>
    <Button 
      variant="ghost" 
      size="sm" 
      className={`rounded-full ${
        activeSection === 'knowledge'
          ? isDarkMode
            ? 'bg-[#4CAF50]/20 text-[#4CAF50]'
            : 'bg-[#1a1a1a]/20 text-[#1a1a1a]'
          : isDarkMode
            ? 'hover:bg-[#4CAF50]/10 text-gray-300 hover:text-[#4CAF50]'
            : 'hover:bg-[#1a1a1a]/10 text-[#1a1a1a] hover:text-[#1a1a1a]'
      } transition-colors duration-300 hidden md:flex`}
      onClick={() => scrollToSection(knowledgeRef)}
    >
      <BookOpen className="h-5 w-5 mr-2" />
      About me
    </Button>
    <Button 
      variant="ghost" 
      size="sm" 
      className={`rounded-full ${
        activeSection === 'portfolio'
          ? isDarkMode
            ? 'bg-[#4CAF50]/20 text-[#4CAF50]'
            : 'bg-[#1a1a1a]/20 text-[#1a1a1a]'
          : isDarkMode
            ? 'hover:bg-[#4CAF50]/10 text-gray-300 hover:text-[#4CAF50]'
            : 'hover:bg-[#1a1a1a]/10 text-[#1a1a1a] hover:text-[#1a1a1a]'
      } transition-colors duration-300 hidden md:flex`}
      onClick={() => scrollToSection(portfolioRef)}
    >
      <BookOpen className="h-5 w-5 mr-2" />
      Portfolio
    </Button>
    <Button 
      variant="ghost" 
      size="sm" 
      className={`rounded-full ${
        activeSection === 'contact'
          ? isDarkMode
            ? 'bg-[#4CAF50] text-white'
            : 'bg-[#4CAF50] text-white'
          : isDarkMode
            ? 'bg-[#4CAF50]/20 text-[#4CAF50] hover:bg-[#4CAF50]/30'
            : 'bg-[#1a1a1a]/20 text-[#1a1a1a] hover:bg-[#1a1a1a]/30'
      } transition-colors duration-300`}
      onClick={() => scrollToSection(contactRef)}
    >
      <Mail className="h-5 w-5 mr-2" />
      Contact
    </Button>
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggleTheme}
      className={`rounded-full ${isDarkMode ? 'text-gray-300 hover:text-[#4CAF50]' : 'text-[#1a1a1a] hover:text-[#1a1a1a]'} transition-colors duration-300`}
    >
      {isDarkMode ? (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setMobileMenuOpen(true)}
      className={`rounded-full ${isDarkMode ? 'text-gray-300 hover:text-[#4CAF50]' : 'text-[#1a1a1a] hover:text-[#1a1a1a]'} transition-colors duration-300 md:hidden`}
    >
      <Menu className="h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">Open menu</span>
    </Button>
  </div>
</motion.nav>

{/* Mobile menu */}
<AnimatePresence>
  {mobileMenuOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 md:hidden"
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className={`fixed inset-y-0 right-0 w-full max-w-sm ${
          isDarkMode ? 'bg-gray-900' : 'bg-white'
        } shadow-xl p-6 flex flex-col justify-between`}
      >
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Menu</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(false)}
              className={`rounded-full ${isDarkMode ? 'text-gray-300 hover:text-[#4CAF50]' : 'text-[#1a1a1a] hover:text-[#1a1a1a]'} transition-colors duration-300`}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="flex flex-col space-y-4">
            <Button
              variant="ghost"
              className={`justify-start ${
                activeSection === 'home'
                  ? isDarkMode
                    ? 'bg-[#4CAF50]/20 text-[#4CAF50]'
                    : 'bg-[#1a1a1a]/20 text-[#1a1a1a]'
                  : isDarkMode
                    ? 'text-gray-300 hover:bg-[#4CAF50]/10 hover:text-[#4CAF50]'
                    : 'text-[#1a1a1a] hover:bg-[#1a1a1a]/10'
              }`}
              onClick={() => {
                scrollToSection(homeRef)
                setMobileMenuOpen(false)
              }}
            >
              <Home className="h-5 w-5 mr-2" />
              Home
            </Button>
            <Button
              variant="ghost"
              className={`justify-start ${
                activeSection === 'knowledge'
                  ? isDarkMode
                    ? 'bg-[#4CAF50]/20 text-[#4CAF50]'
                    : 'bg-[#1a1a1a]/20 text-[#1a1a1a]'
                  : isDarkMode
                    ? 'text-gray-300 hover:bg-[#4CAF50]/10 hover:text-[#4CAF50]'
                    : 'text-[#1a1a1a] hover:bg-[#1a1a1a]/10'
              }`}
              onClick={() => {
                scrollToSection(knowledgeRef)
                setMobileMenuOpen(false)
              }}
            >
              <BookOpen className="h-5 w-5 mr-2" />
              About me
            </Button>
            <Button
              variant="ghost"
              className={`justify-start ${
                activeSection === 'portfolio'
                  ? isDarkMode
                    ? 'bg-[#4CAF50]/20 text-[#4CAF50]'
                    : 'bg-[#1a1a1a]/20 text-[#1a1a1a]'
                  : isDarkMode
                    ? 'text-gray-300 hover:bg-[#4CAF50]/10 hover:text-[#4CAF50]'
                    : 'text-[#1a1a1a] hover:bg-[#1a1a1a]/10'
              }`}
              onClick={() => {
                scrollToSection(portfolioRef)
                setMobileMenuOpen(false)
              }}
            >
              <BookOpen className="h-5 w-5 mr-2" />
              Portfolio
            </Button>
            <Button
              variant="ghost"
              className={`justify-start ${
                activeSection === 'contact'
                  ? isDarkMode
                    ? 'bg-[#4CAF50] text-white'
                    : 'bg-[#4CAF50] text-white'
                  : isDarkMode
                    ? 'bg-[#4CAF50]/20 text-[#4CAF50] hover:bg-[#4CAF50]/30'
                    : 'bg-[#1a1a1a]/20 text-[#1a1a1a] hover:bg-[#1a1a1a]/30'
              }`}
              onClick={() => {
                scrollToSection(contactRef)
                setMobileMenuOpen(false)
              }}
            >
              <Mail className="h-5 w-5 mr-2" />
              Contact
            </Button>
          </nav>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            handleToggleTheme()
            setMobileMenuOpen(false)
          }}
          className={`self-start rounded-full ${isDarkMode ? 'text-gray-300 hover:text-[#4CAF50]' : 'text-[#1a1a1a] hover:text-[#1a1a1a]'} transition-colors duration-300`}
        >
          {isDarkMode ? (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

      {/* Main content */}
      <motion.div 
        className="relative z-20 pt-20"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Home section */}
        <Analytics />
        <MagicUIBlurFade>
          <motion.section 
            ref={homeRef}
            className="relative h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { 
                  staggerChildren: 0.3,
                  delayChildren: 0.2
                }
              }
            }}
            style={{ opacity: heroOpacity, scale: heroScale }}
          >
            <motion.div 
              className="w-full max-w-[90vw] md:max-w-[70vw] lg:max-w-[50vw] flex flex-col justify-center items-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1 
                className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 text-center ${isDarkMode ? 'text-white' : 'text-gray-900 dark:text-white'}`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      type: 'spring',
                      stiffness: 100,
                      duration: 1,
                      delay: 0.5
                    }
                  }
                }}
              >
                Hi, Im <span className={`${isDarkMode ? 'text-[#4CAF50]' : 'text-[#2A5E34]'} animate-fade animate-once animate-delay-500 animate-ease-in`}>
                  Elio
                </span>
              </motion.h1>
              <motion.div
                className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 ${isDarkMode ? 'text-[#4CAF50]' : 'text-[#2A5E34]'} text-center overflow-hidden h-[1.2em]`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      type: 'spring',
                      stiffness: 100,
                      duration: 1,
                      delay: 0.7
                    }
                  }
                }}
              >
                <span className="inline-block whitespace-nowrap overflow-hidden">
                  {text}
                </span>
              </motion.div>
              <motion.p 
                className={`text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl ${isDarkMode ? 'text-gray-300' : 'text-gray-700 dark:text-gray-300'} mb-10 text-center max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%]`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      type: 'spring',
                      stiffness: 100,
                      duration: 1,
                      delay: 0.9
                    }
                  }
                }}
              >
                Creating eye-catching, easy-to-use designs that make your brand stand out.
              </motion.p>
              <motion.div
                className="text-center pb-[5%]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <p className={`${isDarkMode ? 'text-[#4CAF50]' : 'text-[#2A5E34]'} mb-2 animate-bounce animate-infinite animate-delay-150 animate-ease-linear`}>SCROLL</p>
                <ArrowDown className={`w-6 h-6 ${isDarkMode ? 'text-[#4CAF50]' : 'text-[#2A5E34]'} animate-bounce animate-infinite animate-delay-150 animate-ease-linear mx-auto`} />
              </motion.div>
            </motion.div>
          </motion.section>
        </MagicUIBlurFade>

        {/* Knowledge section */}
        <MagicUIBlurFade>
          <motion.section 
            ref={knowledgeRef}
            className="w-full min-h-screen p-4 sm:p-6 relative overflow-hidden font-outfit"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
            {/* Intro Section */}
            <motion.div
              className="sm:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
                <Card className={`p-4 sm:p-6 rounded-xl shadow-lg relative overflow-hidden`} style={getBentoBoxStyle()}>
                  <div className="relative z-10">
                    <h2 className={`text-xl sm:text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Graphic and web designer with almost 10 years of experience</h2>
                    <p className={`mb-4 font-medium text-sm sm:text-base ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Specialized in creating innovative and user-centered digital experiences, with a focus on Web3 aesthetics and visually striking futuristic designs.</p>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                      <div className="flex space-x-4">
                        <a href="https://www.linkedin.com/in/elio-laurencio/" target="_blank" rel="noopener noreferrer">
                          <Linkedin
                            className={`w-6 h-6 ${isDarkMode ? 'text-white hover:text-[#D1C3B1]' : 'text-black hover:text-[#D1C3B1]'} transition-colors`}
                          />
                        </a>
                        <a href="https://dribbble.com/gh0T" target="_blank" rel="noopener noreferrer">
                          <Dribbble
                            className={`w-6 h-6 ${isDarkMode ? 'text-white hover:text-[#D1C3B1]' : 'text-black hover:text-[#D1C3B1]'} transition-colors`}
                          />
                        </a>
                        <a href="https://behance.net/eliolaurencio" target="_blank" rel="noopener noreferrer">
                          <Behance
                            className={`w-6 h-6 ${isDarkMode ? 'text-white hover:text-[#D1C3B1]' : 'text-black hover:text-[#D1C3B1]'} transition-colors`}
                          />
                        </a>
                      </div>
                      <a 
                          href="https://drive.google.com/file/d/10qz9Ph16cM620BuBOeCXkEg4QQqELRVv/view?usp=sharing" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className={`flex items-center space-x-2 ${
                            isDarkMode 
                              ? 'bg-white text-black hover:bg-[#4CAF50]' 
                              : 'bg-gray-700 text-white hover:bg-[#4CAF50]'
                          } px-4 py-2 rounded-full text-sm font-bold transition-colors`}
                        >
                          <DownloadIcon className="h-4 w-4" />
                          <span>Resume</span>
                        </a>
                    </div>
                  </div>
                  <BorderBeam 
                    size={2} 
                    duration={19} 
                    colorFrom="#4ade80" 
                    colorTo="#22c55e"
                  />
                </Card>
              </motion.div>

              {/* Image Section */}
              <motion.div
                className="row-span-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className={`p-4 sm:p-6 rounded-xl shadow-lg relative overflow-hidden h-full`} style={getBentoBoxStyle()}>
                  <div className="relative z-10 h-full flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className={`text-lg sm:text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>My name is Elio</h3>
                      <p className={`mb-4 font-medium text-sm sm:text-base ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>But you can call me gh0t!</p>
                      <p className={`font-medium text-sm sm:text-base ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Get my <a href="mailto:eliolaurencio@gmail.com" className={`underline hover:text-[#D1C3B1] transition-colors`}>email</a> and contact me</p>
                    </div>
                    <div className="w-full h-48 sm:h-72 rounded-lg overflow-hidden relative group">
                      <div className="absolute inset-x-[10%] bottom-0 w-[80%] z-10"></div>
                      <Image 
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file-442mUV2YUCv1QocduYoUzBJ5a8QaBZ.png" 
                        alt="Profile of Elio" 
                        width={300}
                        height={400}
                        className="w-full h-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-110"
                      />
                    </div>
                  </div>
                  <BorderBeam 
                    size={2} 
                    duration={20} 
                    colorFrom="#4ade80" 
                    colorTo="#22c55e"
                  />
                </Card>
              </motion.div>

              {/* Background Section */}
              <motion.div
                className="sm:col-span-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Card className={`p-4 sm:p-6 rounded-xl shadow-lg relative overflow-hidden`} style={getBentoBoxStyle()}>
                  <div className="relative z-10">
                    <h3 className={`text-lg sm:text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>A bit about me</h3>
                    <p className={`mb-4 font-medium text-sm sm:text-base ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>I&apos;m a graphic designer and web developer with over a decade of experience, specialized in creating visually innovative experiences that combine technology and aesthetics. Since I was 13, I&apos;ve been immersed in the design world, constantly evolving and adapting to new technologies.</p>
                  </div>
                  <BorderBeam 
                    size={2} 
                    duration={18} 
                    colorFrom="#4ade80" 
                    colorTo="#22c55e"
                  />
                </Card>
              </motion.div>

              {/* Experience and Language Section */}
              <motion.div
                className="sm:col-span-2 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                {/* Experience Section */}
                <Card className={`p-4 sm:p-6 rounded-xl shadow-lg relative overflow-hidden`} style={getBentoBoxStyle()}>
                  <div className="relative z-10">
                    <h3 className={`text-lg sm:text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Experience</h3>
                    <div className="space-y-4">
                      {[
                        { period: "Now", role: "Freelance graphic and web designer", company: "g.studio", remote: true },
                        { period: "2024", role: "User experience designer", company: "AiSolves", remote: true },
                        { period: "2022 — 2023", role: "Senior graphic designer", company: "Brokers Ads", remote: "Agency" },
                        { period: "2017-2018", role: "Webmaster", company: "Elevezine", remote: true },
                      ].map((job, index) => (
                        <div key={index} className="flex flex-col">
                          <div className="flex justify-between items-start">
                            <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} pr-2`}>{job.role}</p>
                            <p className={`text-xs font-medium whitespace-nowrap ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{job.period}</p>
                          </div>
                          <div className="flex items-center mt-1">
                            <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{job.company}</p>
                            {job.remote && (
                              <span className={`ml-2 text-xs font-medium ${
                                isDarkMode 
                                  ? 'bg-white/20 text-white' 
                                  : 'bg-gray-900/20 text-gray-900'
                              } px-2 py-0.5 rounded-full hover:bg-opacity-30 transition-colors cursor-default`}>
                                ↗ {job.remote === true ? "Remote" : job.remote}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <BorderBeam 
                    size={2} 
                    duration={19} 
                    colorFrom="#4ade80" 
                    colorTo="#22c55e"
                  />
                </Card>

                {/* Language Section */}
                <Card className={`p-4 sm:p-6 rounded-xl shadow-lg relative overflow-hidden`} style={getBentoBoxStyle()}>
                  <div className="relative z-10">
                    <h3 className={`text-lg sm:text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Languages</h3>
                    <div className="space-y-2">
                      {[
                        { language: "English", level: "B2", description: "Professional writing and speaking" },
                        { language: "Spanish", level: "Native", description: "Native speaking and writing" },
                        { language: "Portuguese", level: "Conversational", description: "Conversational writing and speaking" },
                      ].map((lang, index) => (
                        <div key={index} className="flex flex-col">
                          <div className="flex justify-between items-start">
                            <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{lang.language}</p>
                            <span className={`text-xs font-medium ${
                              isDarkMode 
                                ? 'bg-white/20 text-white' 
                                : 'bg-gray-900/20 text-gray-900'
                            } px-2 py-0.5 rounded-full hover:bg-opacity-30 transition-colors cursor-default`}>
                              {lang.level}
                            </span>
                          </div>
                          <p className={`text-xs font-medium mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{lang.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <BorderBeam 
                    size={2} 
                    duration={20} 
                    colorFrom="#4ade80" 
                    colorTo="#22c55e"
                  />
                </Card>
              </motion.div>

              {/* Tool Stack and 3D Visualization Section */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className={`p-4 rounded-xl shadow-lg relative overflow-hidden`} style={getBentoBoxStyle()}>
                  <div className="relative z-10">
                    <h3 className={`text-lg sm:text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Tool stack</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Figma", "Photoshop", "Illustrator",
                        "Capcut", "Firefly", "Next.Js"
                      ].map((tool, index) => (
                        <button
                          key={index}
                          className={`flex items-center justify-center ${
                            isDarkMode 
                              ? 'bg-white/10 hover:bg-white/20' 
                              : 'bg-gray-900/10 hover:bg-gray-900/20'
                          } rounded-lg p-2 transition-colors`}
                        >
                          <span className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{tool}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <BorderBeam 
                    size={2} 
                    duration={21} 
                    colorFrom="#4ade80" 
                    colorTo="#22c55e"
                  />
                </Card>
                <Card className={`p-4 rounded-xl shadow-lg relative overflow-hidden`} style={getBentoBoxStyle()}>
                  <div className="relative z-10">
                    <div className="w-full aspect-square flex items-center justify-center">
                      <Globe />
                    </div>
                  </div>
                  <BorderBeam 
                    size={2} 
                    duration={22} 
                    colorFrom="#4ade80" 
                    colorTo="#22c55e"
                  />
                </Card>
              </motion.div>

              {/* Education Section */}
              <motion.div
                className="sm:col-span-2 lg:col-span-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                viewport={{ once: true }}
              >
                <Card className={`p-4 sm:p-6 rounded-xl shadow-lg relative overflow-hidden`} style={getBentoBoxStyle()}>
                  <div className="relative z-10">
                    <h3 className={`text-lg sm:text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'} text-center`}>Education</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { period: "2023 — 2023", degree: "Figma prototyping course", institution: "CoderHouse" },
                        { period: "2022 — 2023", degree: "User experience", institution: "CoderHouse" },
                        { period: "2017 — 2019", degree: "Multimedia design", institution: "Fundación Universitas" },
                        { period: "2016 — 2017", degree: "Commercial advertising management", institution: "Fundación Universitas" },
                      ].map((education, index) => (
                        <div key={index} className="flex flex-col items-start">
                          <div className="flex justify-between items-start w-full">
                            <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} pr-2`}>{education.degree}</p>
                            <p className={`text-xs font-medium whitespace-nowrap ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{education.period}</p>
                          </div>
                          <div className="flex items-center mt-1">
                            <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{education.institution}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <BorderBeam 
                    size={2} 
                    duration={23} 
                    colorFrom="#4ade80" 
                    colorTo="#22c55e"
                  />
                </Card>
              </motion.div>
            </div>
          </motion.section>
        </MagicUIBlurFade>

        {/* Portfolio section */}
        <MagicUIBlurFade>
          <motion.section
            ref={portfolioRef}
            className="min-h-screen w-full flex items-center justify-center p-8"
          >
            <PortfolioTree isDarkMode={isDarkMode} />
          </motion.section>
        </MagicUIBlurFade>

        {/* Contact section */}
        <MagicUIBlurFade>
          <motion.section 
            ref={contactRef}
            className="min-h-screen w-full flex items-center justify-center p-4 sm:p-8"
          >
            <div className="relative flex items-center justify-center w-full min-h-screen overflow-hidden" style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }}>
              <BackgroundAnimation />
              <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="overflow-hidden rounded-[1.5rem] sm:rounded-[2.5rem] border border-gray-200 bg-white/60 backdrop-blur-xl">
                  <div className="px-4 py-8 sm:px-6 sm:py-12 md:p-16 lg:p-24">
                    <div className="flex flex-col items-center justify-center text-center">
                      <p className="mb-4 text-gray-600 text-sm sm:text-base">
                        Let&apos;s improve your brand together.
                      </p>
                      <div className="w-full overflow-hidden">
                        <TypewriterEffectSmooth words={words} />
                      </div>
                      <div className="mt-8">
                        <a href="mailto:eliolaurencio@gmail.com" 
                          className="w-40 h-10 rounded-md bg-[#4CAF50] text-white text-sm font-medium transition-colors hover:bg-gray-700 flex items-center justify-center"
                        >
                          Let&apos;s talk
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </MagicUIBlurFade>
      </motion.div>

      {/* Global styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600;700;800;900&display=swap');

        html {
          scroll-behavior: smooth;
        }
        body {
          overflow-x: hidden;
          font-family: 'Outfit', sans-serif;
        }
        .animate-fade-up {
          animation: fadeUp 0.5s ease-out;
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes meteor {
          0% {
            transform: rotate(215deg) translateX(0);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: rotate(215deg) translateX(-500px);
            opacity: 0;
          }
        }
        .animate-meteor-effect {
          animation: meteor 5s linear infinite;
        }
        @keyframes ripple {
          0% {
            transform: scale(0.8);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }
        .ripple-1, .ripple-2, .ripple-3 {
          position: absolute;
          width: 60vw;
          height: 60vw;
          border-radius: 50%;
          border: 2px solid rgba(76, 175, 80, 0.5);
          animation: ripple 4s infinite cubic-bezier(0.65, 0, 0.35, 1);
        }
        .ripple-2 {
          animation-delay: -1s;
        }
        .ripple-3 {
          animation-delay: -2s;
        }
      `}</style>
    </motion.div>
  )
}