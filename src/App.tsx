import React, { useState, useEffect, useRef } from 'react';
import { 
  Layout, 
  Plus, 
  Trash2, 
  Download, 
  Upload, 
  Settings, 
  Monitor, 
  Code, 
  ChevronRight, 
  ChevronDown,
  Type,
  Square,
  List as ListIcon,
  Menu as MenuIcon,
  Palette,
  Move,
  Save,
  FileCode,
  Maximize,
  Minimize,
  Copy,
  Edit3,
  Search
} from 'lucide-react';
import { motion, AnimatePresence, useDragControls } from 'motion/react';
import { MenuComponent, MenuLayout, ComponentType } from './types';
import { generateBashScript } from './lib/bashGenerator';
import { DEFAULT_COMPONENTS, FULL_LAYOUTS } from './templates';

const COLORS = [
  'white', 'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan',
  'bright-white', 'bright-red', 'bright-green', 'bright-yellow', 'bright-blue', 'bright-magenta', 'bright-cyan'
];

export default function App() {
  const [layout, setLayout] = useState<MenuLayout>({
    name: 'Meu Menu Shell',
    components: [],
    backgroundColor: '#0a0a0a'
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'DESIGN' | 'CODE'>('DESIGN');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [propsOpen, setPropsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [canvasScale, setCanvasScale] = useState(1);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [clipboard, setClipboard] = useState<MenuComponent | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryMode, setGalleryMode] = useState<'COMPONENTS' | 'LAYOUTS'>('COMPONENTS');
  const [bottomTab, setBottomTab] = useState<'PROPS' | 'GALLERY' | 'SETTINGS'>('GALLERY');
  const [gallerySelected, setGallerySelected] = useState<{type: ComponentType, template: Partial<MenuComponent>} | null>(null);
  const [layoutSelected, setLayoutSelected] = useState<{ name: string, components: MenuComponent[] } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const editRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  const selectedComponent = layout.components.find(c => c.id === selectedId);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isEditing) return;

      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedId) removeComponent(selectedId);
      }

      if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        if (selectedId) duplicateComponent(selectedId);
      }

      if (e.ctrlKey && e.key === 'c') {
        if (selectedId) copyComponent(selectedId);
      }

      if (e.ctrlKey && e.key === 'v') {
        pasteComponent();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId, isEditing, clipboard, layout.components]);

  // Handle dynamic canvas scaling
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth - 48; // Padding safety
        const scale = Math.min(1, containerWidth / 800);
        setCanvasScale(scale);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    // Also update when sidebars open/close or tab changes
    const timer = setTimeout(updateScale, 350); 
    return () => {
      window.removeEventListener('resize', updateScale);
      clearTimeout(timer);
    };
  }, [sidebarOpen, propsOpen, activeTab]);

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Close properties drawer when selection changes
  useEffect(() => {
    if (selectedId) setPropsOpen(true);
  }, [selectedId]);

  const addComponent = (type: ComponentType, template: Partial<MenuComponent>) => {
    const newComp: MenuComponent = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      name: template.name || 'Novo Componente',
      content: [...(template.content || [])],
      y: layout.components.length * 5 + 2,
      x: 5,
      color: template.color || 'white',
      bold: false
    };
    setLayout(prev => ({
      ...prev,
      components: [...prev.components, newComp]
    }));
    setSelectedId(newComp.id);
    if (window.innerWidth < 1024) setSidebarOpen(false);
  };

  const updateComponent = (id: string, updates: Partial<MenuComponent>) => {
    setLayout(prev => {
      const comp = prev.components.find(c => c.id === id);
      if (!comp) return prev;

      // If moving and in a group, move all members
      if (comp.groupId && (updates.x !== undefined || updates.y !== undefined)) {
        const dx = updates.x !== undefined ? updates.x - comp.x : 0;
        const dy = updates.y !== undefined ? updates.y - comp.y : 0;
        
        return {
          ...prev,
          components: prev.components.map(c => 
            c.groupId === comp.groupId 
              ? { ...c, x: c.x + dx, y: c.y + dy } 
              : (c.id === id ? { ...c, ...updates } : c)
          )
        };
      }

      return {
        ...prev,
        components: prev.components.map(c => c.id === id ? { ...c, ...updates } : c)
      };
    });
  };

  const ungroup = (groupId: string) => {
    setLayout(prev => ({
      ...prev,
      components: prev.components.map(c => 
        c.groupId === groupId ? { ...c, groupId: undefined } : c
      )
    }));
  };

  const removeComponent = (id: string) => {
    setLayout(prev => ({
      ...prev,
      components: prev.components.filter(c => c.id !== id)
    }));
    setSelectedId(null);
    setPropsOpen(false);
    setIsEditing(null);
  };

  const duplicateComponent = (id: string) => {
    const comp = layout.components.find(c => c.id === id);
    if (!comp) return;

    const newComp: MenuComponent = {
      ...comp,
      id: Math.random().toString(36).substr(2, 9),
      x: comp.x + 2,
      y: comp.y + 2
    };

    setLayout(prev => ({
      ...prev,
      components: [...prev.components, newComp]
    }));
    setSelectedId(newComp.id);
  };

  const copyComponent = (id: string) => {
    const comp = layout.components.find(c => c.id === id);
    if (comp) setClipboard(comp);
  };

  const pasteComponent = () => {
    if (!clipboard) return;
    const newComp: MenuComponent = {
      ...clipboard,
      id: Math.random().toString(36).substr(2, 9),
      x: clipboard.x + 4,
      y: clipboard.y + 4
    };
    setLayout(prev => ({
      ...prev,
      components: [...prev.components, newComp]
    }));
    setSelectedId(newComp.id);
  };

  const handleInlineEdit = (id: string, text: string) => {
    updateComponent(id, { content: text.split('\n') });
  };

  const handleExport = () => {
    const script = generateBashScript(layout);
    const blob = new Blob([script], { type: 'text/x-shellscript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${layout.name.toLowerCase().replace(/\s+/g, '_')}.sh`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-screen bg-[#0f1115] text-slate-200 font-sans overflow-hidden relative flex-col">
      {/* Top Bar */}
      <header className="h-14 bg-[#1a1d23] border-b border-slate-800 flex items-center justify-between px-4 lg:px-6 z-30 shrink-0">
        <div className="flex items-center gap-2 lg:gap-4">
          <button 
            onClick={() => {
              setBottomTab('GALLERY');
              setGallerySelected(null);
              setLayoutSelected(null);
              setGalleryMode('COMPONENTS');
            }}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
            title="Menu de Templates"
          >
            <MenuIcon className="w-5 h-5" />
          </button>
          <div className="h-5 w-px bg-slate-800 mx-1 lg:mx-2" />
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-indigo-600 rounded-lg hidden xs:block">
              <Layout className="w-4 h-4 text-white" />
            </div>
            <h1 className="font-bold text-sm tracking-tight hidden sm:block">Menu Studio</h1>
          </div>
          <div className="h-5 w-px bg-slate-800 mx-1 lg:mx-2 hidden sm:block" />
          <input 
            value={layout.name}
            onChange={(e) => setLayout(prev => ({ ...prev, name: e.target.value }))}
            className="bg-transparent border-none focus:ring-0 text-xs font-semibold w-24 xs:w-32 lg:w-48 truncate"
            placeholder="Nome do Projeto"
          />
        </div>

        <div className="flex items-center bg-slate-800/50 p-1 rounded-xl border border-slate-700 scale-90 sm:scale-100">
          <button 
            onClick={() => setActiveTab('DESIGN')}
            className={`flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${activeTab === 'DESIGN' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">DESIGN</span>
          </button>
          <button 
            onClick={() => setActiveTab('CODE')}
            className={`flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${activeTab === 'CODE' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Code className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">CÓDIGO</span>
          </button>
        </div>

        <div className="flex items-center gap-1 lg:gap-3">
          <button 
            onClick={toggleFullscreen}
            className="p-2 text-slate-400 hover:text-slate-200 transition-colors"
            title={isFullscreen ? "Sair da Tela Cheia" : "Tela Cheia"}
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
          <button onClick={handleExport} className="p-2 text-indigo-400 hover:text-indigo-300 transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden flex flex-col relative bg-[#0a0a0a]">
        
        {/* Slim Tabs Above Terminal */}
        <div className="flex justify-center items-center px-4 border-b border-slate-800/50 bg-[#0f1115] z-10 shrink-0">
          <button 
            onClick={() => setBottomTab('GALLERY')}
            className={`px-4 py-2.5 text-[10px] font-bold tracking-widest transition-all border-b-2 ${bottomTab === 'GALLERY' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
          >
            BIBLIOTECA
          </button>
          <button 
            onClick={() => setBottomTab('PROPS')}
            className={`px-4 py-2.5 text-[10px] font-bold tracking-widest transition-all border-b-2 ${bottomTab === 'PROPS' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
          >
            PROPRIEDADES {selectedId && "•"}
          </button>
          <button 
            onClick={() => setBottomTab('SETTINGS')}
            className={`px-4 py-2.5 text-[10px] font-bold tracking-widest transition-all border-b-2 ${bottomTab === 'SETTINGS' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
          >
            CONFIGURAÇÕES
          </button>
        </div>

        {/* Editor Area */}
        <div className="flex-1 overflow-auto flex flex-col items-center p-2 lg:p-4 scrollbar-thin">
          <div ref={containerRef} className="w-full flex flex-col items-center justify-center min-h-[300px] lg:min-h-[500px]">
            {/* Ungroup Button Above Terminal */}
            <AnimatePresence>
              {selectedComponent?.groupId && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mb-4 flex items-center gap-2 bg-indigo-600/20 border border-indigo-500/50 px-3 py-1.5 rounded-full"
                >
                  <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest">Agrupado</span>
                  <button 
                    onClick={() => ungroup(selectedComponent.groupId!)}
                    className="text-[9px] font-bold text-white hover:text-indigo-200 transition-colors"
                  >
                    DESAGRUPAR
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {activeTab === 'DESIGN' ? (
              <div className="min-w-fit">
                <div 
                  className="relative bg-black rounded-2xl shadow-2xl border border-slate-800 overflow-hidden origin-top transition-transform duration-300"
                  style={{ 
                    width: '800px', 
                    height: '500px',
                    transform: `scale(${canvasScale})`,
                    marginBottom: `${(1 - canvasScale) * -500}px`
                  }}
                >
                  {/* Terminal Header */}
                  <div className="h-8 bg-slate-900 border-b border-slate-800 flex items-center px-4 gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                    <span className="text-[10px] text-slate-500 ml-2 uppercase tracking-widest font-bold">Bash Preview</span>
                  </div>

                  {/* ASCII Canvas */}
                  <div 
                    className="p-4 relative h-full overflow-hidden font-mono" 
                    onClick={() => {
                      setSelectedId(null);
                      setIsEditing(null);
                    }}
                  >
                    {layout.components.map((comp) => (
                      <motion.div
                        key={comp.id}
                        drag={isEditing !== comp.id}
                        dragMomentum={false}
                        onDragEnd={(_, info) => {
                          const newX = Math.round((comp.x * 10 + info.offset.x) / 10);
                          const newY = Math.round((comp.y * 20 + info.offset.y) / 20);
                          updateComponent(comp.id, { x: Math.max(0, newX), y: Math.max(0, newY) });
                        }}
                        onDoubleClick={(e) => {
                          e.stopPropagation();
                          setSelectedId(comp.id);
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsEditing(comp.id);
                          setSelectedId(comp.id); // Also select to show properties below
                        }}
                        className={`absolute cursor-move p-1 rounded transition-shadow outline-none ${selectedId === comp.id ? 'ring-2 ring-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.3)]' : 'hover:ring-1 hover:ring-slate-700'}`}
                        style={{ 
                          top: `${comp.y * 20}px`, 
                          left: `${comp.x * 10}px`,
                          whiteSpace: 'pre',
                          color: comp.color.includes('bright') ? `var(--${comp.color})` : comp.color,
                          fontWeight: comp.bold ? 'bold' : 'normal',
                          zIndex: selectedId === comp.id ? 10 : 1
                        }}
                        contentEditable={isEditing === comp.id}
                        suppressContentEditableWarning
                        onBlur={(e) => {
                          handleInlineEdit(comp.id, e.currentTarget.innerText);
                          setIsEditing(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Escape') {
                            e.currentTarget.blur();
                          }
                        }}
                      >
                        {comp.content.join('\n')}
                      </motion.div>
                    ))}

                    {/* Live Preview - Single Component */}
                    {bottomTab === 'GALLERY' && gallerySelected && (
                      <div 
                        className="absolute p-1 rounded border border-indigo-500/50 bg-indigo-500/5 pointer-events-none opacity-80"
                        style={{ 
                          top: `${(layout.components.length * 5 + 2) * 20}px`, 
                          left: `${5 * 10}px`,
                          whiteSpace: 'pre',
                          color: gallerySelected.template.color?.includes('bright') ? `var(--${gallerySelected.template.color})` : gallerySelected.template.color,
                          fontFamily: 'monospace'
                        }}
                      >
                        <div className="absolute -top-4 left-0 text-[7px] font-bold text-indigo-400 bg-indigo-950/80 px-1 rounded">PREVIEW</div>
                        {gallerySelected.template.content?.join('\n')}
                      </div>
                    )}

                    {/* Live Preview - Full Layout */}
                    {bottomTab === 'GALLERY' && layoutSelected && (
                      <div className="absolute inset-0 pointer-events-none opacity-60 p-4">
                        <div className="absolute top-2 right-2 text-[8px] font-bold text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded-full border border-indigo-500/30">PREVIEW DO TEMPLATE</div>
                        {layoutSelected.components.map((comp, idx) => (
                          <div 
                            key={idx}
                            className="absolute whitespace-pre font-mono"
                            style={{ 
                              top: `${comp.y * 20}px`, 
                              left: `${comp.x * 10}px`,
                              color: comp.color.includes('bright') ? `var(--${comp.color})` : comp.color
                            }}
                          >
                            {comp.content.join('\n')}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-4xl bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden flex flex-col h-[500px]">
                <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-indigo-400" />
                    <span className="text-[10px] lg:text-xs font-bold text-slate-400 uppercase tracking-widest">Script Bash Gerado</span>
                  </div>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(generateBashScript(layout));
                    }}
                    className="text-[10px] font-bold bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-all"
                  >
                    COPIAR
                  </button>
                </div>
                <pre className="flex-1 p-4 lg:p-6 overflow-auto text-xs lg:text-sm text-indigo-300 font-mono leading-relaxed">
                  {generateBashScript(layout)}
                </pre>
              </div>
            )}
          </div>

          {/* Tabbed Panel Below Terminal */}
          <div className="w-full bg-[#0f1115] border-t border-slate-800/50 flex flex-col z-30 shrink-0 h-48">
            {/* Tab Content */}
            <div className="h-full flex flex-col relative">
              {bottomTab === 'GALLERY' && (
                <div className="h-full flex flex-col">
                  <div className="px-4 py-2 border-b border-slate-800/50 flex flex-col sm:flex-row items-center justify-between bg-slate-900/20 gap-3 shrink-0">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <div className="flex items-center bg-slate-900/50 rounded-lg p-0.5 border border-slate-800/50">
                        <button 
                          onClick={() => setGalleryMode('COMPONENTS')}
                          className={`px-3 py-1 rounded text-[9px] font-bold transition-all ${galleryMode === 'COMPONENTS' ? 'bg-indigo-600/80 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                          BLOCOS
                        </button>
                        <button 
                          onClick={() => setGalleryMode('LAYOUTS')}
                          className={`px-3 py-1 rounded text-[9px] font-bold transition-all ${galleryMode === 'LAYOUTS' ? 'bg-indigo-600/80 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                          TEMPLATES COMPLETOS
                        </button>
                      </div>

                      <AnimatePresence>
                        {(gallerySelected || layoutSelected) && (
                          <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            onClick={() => {
                              if (gallerySelected) {
                                addComponent(gallerySelected.type, gallerySelected.template);
                                setGallerySelected(null);
                              } else if (layoutSelected) {
                                const groupId = `group_${Math.random().toString(36).substr(2, 9)}`;
                                setLayout(prev => ({
                                  ...prev,
                                  components: [
                                    ...prev.components,
                                    ...layoutSelected.components.map(c => ({
                                      ...c,
                                      id: Math.random().toString(36).substr(2, 9),
                                      groupId
                                    }))
                                  ]
                                }));
                                setLayoutSelected(null);
                                setBottomTab('PROPS');
                              }
                            }}
                            className="flex items-center gap-2 px-4 py-1.5 bg-green-600 hover:bg-green-500 text-white rounded-lg text-[10px] font-bold transition-all shadow-lg shadow-green-900/20"
                          >
                            <Plus className="w-3 h-3" />
                            FIXAR NO TERMINAL
                          </motion.button>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="relative w-full sm:w-auto">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500" />
                      <input 
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-slate-900/50 border border-slate-800/50 rounded-md py-1 pl-7 pr-3 text-[9px] focus:ring-1 focus:ring-indigo-500 outline-none w-full sm:w-48"
                      />
                    </div>
                  </div>
                  <div className="flex-1 overflow-x-auto overflow-y-hidden p-3 flex gap-2 snap-x scrollbar-none">
                    {galleryMode === 'COMPONENTS' ? (
                      <>
                        {Object.entries(DEFAULT_COMPONENTS).map(([type, templates]) => {
                          const filtered = templates.filter(t => t.name?.toLowerCase().includes(searchTerm.toLowerCase()));
                          if (filtered.length === 0) return null;
                          return filtered.map((t, i) => {
                            const isSelected = gallerySelected?.template.name === t.name;
                            return (
                              <button
                                key={`${type}-${i}`}
                                onClick={() => {
                                  setGallerySelected({ type: type as ComponentType, template: t });
                                  setLayoutSelected(null); // Clear layout selection if component is selected
                                }}
                                className={`shrink-0 w-36 snap-start group bg-[#15181e] border rounded-md px-3 py-2 text-left transition-all flex items-center justify-between ${isSelected ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-800/50 hover:border-slate-700 hover:bg-slate-800/50'}`}
                              >
                                <span className={`text-[10px] font-medium transition-colors truncate ${isSelected ? 'text-indigo-400' : 'text-slate-400 group-hover:text-white'}`}>{t.name}</span>
                                <div className="w-2 h-2 rounded-full shrink-0 ml-2" style={{ backgroundColor: t.color?.includes('bright') ? `var(--${t.color})` : t.color }} />
                              </button>
                            );
                          });
                        })}
                      </>
                    ) : (
                      <>
                        {FULL_LAYOUTS.filter(l => l.name.toLowerCase().includes(searchTerm.toLowerCase())).map((l, i) => {
                          const isSelected = layoutSelected?.name === l.name;
                          return (
                            <button
                              key={i}
                              onClick={() => {
                                setLayoutSelected(l);
                                setGallerySelected(null); // Clear component selection if layout is selected
                              }}
                              className={`shrink-0 w-44 snap-start group bg-[#15181e] border rounded-md px-3 py-2 text-left transition-all flex items-center justify-between ${isSelected ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-800/50 hover:border-slate-700 hover:bg-slate-800/50'}`}
                            >
                              <div className="flex flex-col truncate pr-2">
                                <span className={`text-[10px] font-medium truncate ${isSelected ? 'text-indigo-400' : 'text-slate-400 group-hover:text-white'}`}>{l.name}</span>
                                <span className="text-[8px] text-slate-500">{l.components.length} items</span>
                              </div>
                              <Layout className={`w-3 h-3 shrink-0 ${isSelected ? 'text-indigo-400' : 'text-slate-600'}`} />
                            </button>
                          );
                        })}
                      </>
                    )}
                  </div>
                </div>
              )}

              {bottomTab === 'PROPS' && (
                <div className="h-full overflow-y-auto p-6 scrollbar-thin">
                  {selectedId ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="space-y-4">
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Posição & Nome</label>
                        <input 
                          type="text"
                          value={selectedComponent?.name}
                          onChange={(e) => updateComponent(selectedId, { name: e.target.value })}
                          className="w-full bg-slate-900/50 border border-slate-800 rounded-xl text-xs p-2.5 outline-none focus:ring-1 focus:ring-indigo-500"
                          placeholder="Nome do Componente"
                        />
                        <div className="flex gap-3">
                          <div className="flex-1 relative">
                            <input 
                              type="number"
                              value={selectedComponent?.x}
                              onChange={(e) => updateComponent(selectedId, { x: parseInt(e.target.value) || 0 })}
                              className="w-full bg-slate-900/50 border border-slate-800 rounded-xl text-xs p-2.5 outline-none"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-bold text-slate-600">X</span>
                          </div>
                          <div className="flex-1 relative">
                            <input 
                              type="number"
                              value={selectedComponent?.y}
                              onChange={(e) => updateComponent(selectedId, { y: parseInt(e.target.value) || 0 })}
                              className="w-full bg-slate-900/50 border border-slate-800 rounded-xl text-xs p-2.5 outline-none"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-bold text-slate-600">Y</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Estilo</label>
                          <button 
                            onClick={() => updateComponent(selectedId, { bold: !selectedComponent?.bold })}
                            className={`text-[9px] font-bold px-2 py-1 rounded border transition-all ${selectedComponent?.bold ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-slate-700 text-slate-500'}`}
                          >
                            NEGRITO
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {COLORS.map(color => (
                            <button
                              key={color}
                              onClick={() => updateComponent(selectedId, { color })}
                              className={`w-5 h-5 rounded-md border transition-all ${selectedComponent?.color === color ? 'border-white scale-110 shadow-lg' : 'border-transparent hover:scale-105'}`}
                              style={{ backgroundColor: color.includes('bright') ? `var(--${color})` : color }}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Conteúdo</label>
                          <div className="flex gap-1">
                            <button onClick={() => duplicateComponent(selectedId)} className="p-1.5 hover:bg-slate-800 rounded text-slate-500 hover:text-indigo-400"><Copy className="w-3 h-3" /></button>
                            <button onClick={() => removeComponent(selectedId)} className="p-1.5 hover:bg-red-500/10 rounded text-slate-500 hover:text-red-400"><Trash2 className="w-3 h-3" /></button>
                          </div>
                        </div>
                        <textarea 
                          value={selectedComponent?.content.join('\n')}
                          onChange={(e) => updateComponent(selectedId, { content: e.target.value.split('\n') })}
                          rows={3}
                          className="w-full bg-slate-900/50 border border-slate-800 rounded-xl text-[10px] p-3 font-mono outline-none focus:ring-1 focus:ring-indigo-500 resize-none h-24"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-600 gap-3">
                      <Edit3 className="w-8 h-8 opacity-20" />
                      <p className="text-[10px] font-bold uppercase tracking-widest">Nenhum componente selecionado</p>
                    </div>
                  )}
                </div>
              )}

              {bottomTab === 'SETTINGS' && (
                <div className="h-full overflow-y-auto p-8 flex flex-col items-center justify-center gap-6 scrollbar-thin">
                  <div className="w-full max-w-md space-y-6">
                    <div className="space-y-3">
                      <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Cor de Fundo do Terminal</label>
                      <div className="flex items-center gap-4">
                        <input 
                          type="color" 
                          value={layout.backgroundColor}
                          onChange={(e) => setLayout(prev => ({ ...prev, backgroundColor: e.target.value }))}
                          className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer"
                        />
                        <input 
                          type="text" 
                          value={layout.backgroundColor}
                          onChange={(e) => setLayout(prev => ({ ...prev, backgroundColor: e.target.value }))}
                          className="flex-1 bg-slate-900/50 border border-slate-800 rounded-xl text-xs p-3 outline-none font-mono"
                        />
                      </div>
                    </div>
                    <div className="pt-4 border-t border-slate-800">
                      <button 
                        onClick={() => setLayout({ name: 'Novo Projeto', components: [], backgroundColor: '#0a0a0a' })}
                        className="w-full py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-[10px] font-bold rounded-xl transition-all uppercase tracking-widest border border-red-500/20"
                      >
                        Limpar Todo o Projeto
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Templates Gallery Modal removed as it is now in the bottom panel */}
    </div>
  );
}
