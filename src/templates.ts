import { MenuComponent, ComponentType } from './types';

export const DEFAULT_COMPONENTS: Record<ComponentType, Partial<MenuComponent>[]> = {
  HEADER: [
    { name: 'Cyberpunk V1', color: 'bright-cyan', bold: true, content: ['╔══════════════════════════════════════╗', '║  🚀 CYBERPUNK SYSTEM INITIALIZED     ║', '╚══════════════════════════════════════╝'] },
    { name: 'Premium Gold', color: 'bright-yellow', bold: true, content: ['━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', '  🏺 PREMIUM ARCHIVE ACCESS GRANTED     ', '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'] },
    { name: 'Neural Network', color: 'bright-magenta', bold: true, content: ['🧠 NEURAL INTERFACE v2.0.4', '──────────────────────────'] },
    { name: 'System Core', color: 'bright-blue', bold: true, content: ['▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄', '█        ⚙️ SYSTEM CORE MANAGER         █', '▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀'] },
    { name: 'Minimalist', color: 'white', bold: false, content: ['─── 📦 PACKAGE INSTALLER ───'] },
    { name: 'Heavy Duty', color: 'bright-red', bold: true, content: ['╔═╗╔═╗╔═╗╔═╗╔═╗╔═╗╔═╗╔═╗╔═╗╔═╗', '║H║║E║║A║║D║║E║║R║║ ║║V║║1║║.║', '╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝'] },
    { name: 'Modern Slim', color: 'bright-green', bold: true, content: ['━ 🚀 DEPLOYMENT DASHBOARD ━'] },
    { name: 'Double Line', color: 'bright-white', bold: true, content: ['═══ 🧠 BRAIN-SYNC TERMINAL ═══'] },
    { name: 'Cyber Block', color: 'bright-cyan', bold: true, content: ['████████████████████████████████', '█  🔥 FIREWALL PROTECTION ON   █', '████████████████████████████████'] },
    { name: 'Retro Wave', color: 'bright-magenta', bold: true, content: ['▲▼▲▼▲▼ RETRO-SHELL v80 ▲▼▲▼▲▼'] }
  ],
  LIST: [
    { name: 'Checklist OK', color: 'bright-green', bold: true, content: ['✔ Dependências instaladas', '✔ Conexão com banco de dados', '✔ Permissões de escrita'] },
    { name: 'Checklist Mixed', color: 'bright-yellow', bold: true, content: ['✔ Kernel atualizado', '✘ Firewall desativado', '⚠ Espaço em disco baixo'] },
    { name: 'Dependency List', color: 'bright-blue', bold: false, content: ['📦 curl ........... [INSTALADO]', '📦 wget ........... [INSTALADO]', '📦 git ............ [FALTANDO]'] },
    { name: 'Status List', color: 'bright-white', bold: false, content: ['⚙️ Engine: RUNNING', '⚙️ API:    ONLINE', '⚙️ DB:     OFFLINE'] },
    { name: 'Premium List', color: 'bright-cyan', bold: true, content: ['╔═ ✔ Módulo A', '╠═ ✔ Módulo B', '╚═ ✘ Módulo C'] },
    { name: 'Simple Check', color: 'bright-green', bold: false, content: ['[✔] Root access', '[✔] Internet connection', '[✘] SSH keys'] },
    { name: 'Firewall Rules', color: 'bright-red', bold: true, content: ['🔥 Port 80:  OPEN', '🔥 Port 443: OPEN', '🔥 Port 22:  CLOSED'] },
    { name: 'Brain Tasks', color: 'bright-magenta', bold: true, content: ['🧠 Analisando logs...', '🧠 Limpando cache...', '🧠 Otimizando DB...'] },
    { name: 'Package Status', color: 'bright-yellow', bold: true, content: ['🏺 Legacy:  OK', '📦 Modern:  PENDING', '🚀 Future:  READY'] },
    { name: 'Final Check', color: 'bright-white', bold: true, content: ['╔════════════════════╗', '║ ✔ Setup Complete   ║', '║ ✔ Config Saved     ║', '╚════════════════════╝'] }
  ],
  CARD: [
    { name: 'Success Box', color: 'bright-green', bold: true, content: ['╔══════════════════════════════╗', '║  ✔ OPERAÇÃO CONCLUÍDA!       ║', '╚══════════════════════════════╝'] },
    { name: 'Error Box', color: 'bright-red', bold: true, content: ['╔══════════════════════════════╗', '║  ✘ ERRO CRÍTICO NO SISTEMA   ║', '╚══════════════════════════════╝'] },
    { name: 'Warning Card', color: 'bright-yellow', bold: true, content: ['┌── ⚠ AVISO ───────────────────┐', '│ O servidor será reiniciado   │', '│ em 5 minutos.                │', '└──────────────────────────────┘'] },
    { name: 'Info Card', color: 'bright-blue', bold: true, content: ['╔═ INFO ═══════════════════════╗', '║ IP: 192.168.1.100            ║', '║ Uptime: 24 days              ║', '╚══════════════════════════════╝'] },
    { name: 'Cyber Card', color: 'bright-cyan', bold: true, content: ['▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄', '█  🚀 DEPLOYMENT SUCCESSFUL    █', '▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀'] },
    { name: 'Process Card', color: 'bright-magenta', bold: true, content: ['🧠 PROCESSANDO DADOS...', '━━━━━━━━━━━━━━━━━━━━━━━', 'Lote: #8923', 'Status: 45%'] },
    { name: 'Package Card', color: 'bright-white', bold: true, content: ['📦 NOVO PACOTE DISPONÍVEL', '─────────────────────────', 'Versão: 1.5.0', 'Tamanho: 45MB'] },
    { name: 'Alert Card', color: 'bright-red', bold: true, content: ['⚠ SEGURANÇA ⚠', '─────────────', 'Tentativas de login', 'detectadas no IP: 8.8.8.8'] },
    { name: 'Stats Card', color: 'bright-green', bold: true, content: ['📊 ESTATÍSTICAS', '───────────────', 'CPU: 12%', 'RAM: 2.4GB'] },
    { name: 'Legacy Card', color: 'bright-yellow', bold: true, content: ['🏺 SISTEMA LEGADO', '─────────────────', 'Modo de compatibilidade', 'ativado.'] }
  ],
  MENU: [
    { name: 'Cyber Menu', color: 'bright-cyan', bold: true, content: ['╔═ SELEÇÃO ════════════════════╗', '║ [1] 🚀 Iniciar Produção      ║', '║ [2] ⚙️ Configurações         ║', '║ [3] ✘ Sair                   ║', '╚══════════════════════════════╝'] },
    { name: 'Premium Menu', color: 'bright-yellow', bold: true, content: ['━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', '  1) 🏺 Restaurar Backup        ', '  2) 📦 Instalar Módulos        ', '  3) 🧠 Diagnóstico             ', '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'] },
    { name: 'Modern List', color: 'bright-green', bold: true, content: [' > 🚀 Deploy Now', '   ⚙️ Settings', '   ✘ Exit'] },
    { name: 'Block Menu', color: 'bright-blue', bold: true, content: ['█ [A] 📦 UPDATE   █', '█ [B] 🔥 CLEANUP  █', '█ [C] ✘ CANCEL   █'] },
    { name: 'Simple Menu', color: 'white', bold: false, content: ['1. 🚀 Start', '2. ⚙️ Setup', '3. ✘ Quit'] },
    { name: 'Arrow Menu', color: 'bright-magenta', bold: true, content: ['╔════════════════════╗', '║ → 🧠 AI Mode       ║', '║   ⚙️ Manual Mode   ║', '║   ✘ Shutdown      ║', '╚════════════════════╝'] },
    { name: 'Grid Menu', color: 'bright-white', bold: true, content: ['[1] 📦 APP  [2] ⚙️ CFG', '[3] 📊 LOG  [4] ✘ ESC'] },
    { name: 'Bullet Menu', color: 'bright-cyan', bold: true, content: ['• 🚀 Launch', '• 🏺 History', '• ✘ Close'] },
    { name: 'Heavy Menu', color: 'bright-red', bold: true, content: ['╔═╗ 🚀 START', '║1║ ────────', '╠═╣ ⚙️ CONFIG', '║2║ ────────', '╚═╝ ✘ EXIT'] },
    { name: 'Slim Menu', color: 'bright-yellow', bold: true, content: ['(1) 🏺 OLD  (2) 🚀 NEW'] }
  ],
  TEXT: [
    { name: 'Loading V1', color: 'bright-cyan', bold: true, content: ['🚀 Instalando... [||||||    ] 60%'] },
    { name: 'Loading V2', color: 'bright-green', bold: true, content: ['⚙️ Configurando... [##########] 100%'] },
    { name: 'Loading V3', color: 'bright-yellow', bold: true, content: ['🧠 Analisando... [          ] 0%'] },
    { name: 'Success Msg', color: 'bright-green', bold: true, content: ['✔ SISTEMA PRONTO PARA USO!'] },
    { name: 'Error Msg', color: 'bright-red', bold: true, content: ['✘ FALHA NA INSTALAÇÃO.'] },
    { name: 'Warning Msg', color: 'bright-yellow', bold: true, content: ['⚠ ATENÇÃO: REINICIALIZAÇÃO NECESSÁRIA.'] },
    { name: 'Info Msg', color: 'bright-blue', bold: true, content: ['ℹ INFO: VERSÃO 2.0 DISPONÍVEL.'] },
    { name: 'Process Msg', color: 'bright-magenta', bold: true, content: ['🧠 SINCRONIZANDO DADOS...'] },
    { name: 'Package Msg', color: 'bright-white', bold: true, content: ['📦 PACOTE EXTRAÍDO COM SUCESSO.'] },
    { name: 'Legacy Msg', color: 'bright-yellow', bold: true, content: ['🏺 MODO LEGADO ATIVADO.'] },
    { name: 'Firewall Msg', color: 'bright-red', bold: true, content: ['🔥 FIREWALL BLOQUEOU A CONEXÃO.'] },
    { name: 'Brain Msg', color: 'bright-magenta', bold: true, content: ['🧠 PENSANDO...'] },
    { name: 'Success Check', color: 'bright-green', bold: true, content: ['✔ TUDO OK!'] },
    { name: 'Error Cross', color: 'bright-red', bold: true, content: ['✘ ALGO DEU ERRADO.'] },
    { name: 'Wait Msg', color: 'bright-white', bold: false, content: ['Aguarde um momento...'] },
    { name: 'Separator', color: 'white', bold: false, content: ['━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'] },
    { name: 'Dot Separator', color: 'slate-500', bold: false, content: ['..............................'] },
    { name: 'Dash Separator', color: 'slate-500', bold: false, content: ['------------------------------'] },
    { name: 'Double Separator', color: 'white', bold: false, content: ['══════════════════════════════'] },
    { name: 'Thin Separator', color: 'slate-500', bold: false, content: ['──────────────────────────────'] }
  ]
};

const COLORS = ['white', 'bright-white', 'bright-red', 'bright-green', 'bright-yellow', 'bright-blue', 'bright-magenta', 'bright-cyan'];

function randomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

export const FULL_LAYOUTS: { name: string, components: MenuComponent[] }[] = [];

// Generate 50 templates
for (let i = 1; i <= 10; i++) {
  FULL_LAYOUTS.push({
    name: `Installer V${i}`,
    components: [
      { id: `inst_${i}_1`, type: 'HEADER', name: 'Header', x: 2, y: 1, content: ['╔══════════════════════════════════════════════╗', `║  🚀 SYSTEM INSTALLER V${i}.0                  ║`, '╚══════════════════════════════════════════════╝'], color: randomColor(), bold: true },
      { id: `inst_${i}_2`, type: 'TEXT', name: 'Status', x: 2, y: 5, content: ['[✔] Checking dependencies...'], color: 'bright-green', bold: false },
      { id: `inst_${i}_3`, type: 'LIST', name: 'Packages', x: 2, y: 7, content: ['📦 Package A ... OK', '📦 Package B ... OK', '📦 Package C ... PENDING'], color: 'bright-cyan', bold: false },
      { id: `inst_${i}_4`, type: 'TEXT', name: 'Progress', x: 2, y: 11, content: ['Progress: [||||||    ] 60%'], color: 'bright-yellow', bold: true }
    ]
  });
}

for (let i = 1; i <= 10; i++) {
  FULL_LAYOUTS.push({
    name: `Server Dashboard ${i}`,
    components: [
      { id: `srv_${i}_1`, type: 'HEADER', name: 'Header', x: 5, y: 1, content: ['████████████████████████████████', `█  ⚙️ SERVER MONITOR NODE ${i}   █`, '████████████████████████████████'], color: randomColor(), bold: true },
      { id: `srv_${i}_2`, type: 'CARD', name: 'Stats', x: 5, y: 5, content: ['┌── METRICS ─────────────────┐', '│ CPU: 12%                   │', '│ RAM: 4.2GB / 16GB          │', '│ NET: 1Gbps                 │', '└────────────────────────────┘'], color: 'bright-green', bold: true },
      { id: `srv_${i}_3`, type: 'MENU', name: 'Actions', x: 5, y: 11, content: ['> [1] Restart Service', '> [2] View Logs', '> [3] Exit'], color: 'bright-white', bold: false }
    ]
  });
}

for (let i = 1; i <= 10; i++) {
  FULL_LAYOUTS.push({
    name: `Cyber Menu ${i}`,
    components: [
      { id: `cyb_${i}_1`, type: 'HEADER', name: 'Header', x: 10, y: 2, content: [`▲▼▲▼▲▼ NEURAL-NET V${i} ▲▼▲▼▲▼`], color: 'bright-magenta', bold: true },
      { id: `cyb_${i}_2`, type: 'MENU', name: 'Menu', x: 10, y: 5, content: ['╔═ ACCESS ═════════════════════╗', '║ [A] Hack Mainframe           ║', '║ [B] Bypass Firewall          ║', '║ [C] Disconnect               ║', '╚══════════════════════════════╝'], color: 'bright-cyan', bold: true },
      { id: `cyb_${i}_3`, type: 'TEXT', name: 'Warning', x: 10, y: 11, content: ['⚠ TRACE DETECTED'], color: 'bright-red', bold: true }
    ]
  });
}

for (let i = 1; i <= 10; i++) {
  FULL_LAYOUTS.push({
    name: `Network Tool ${i}`,
    components: [
      { id: `net_${i}_1`, type: 'HEADER', name: 'Header', x: 2, y: 1, content: [`━━━ 🌐 NET-SCANNER PRO v${i} ━━━`], color: 'bright-blue', bold: true },
      { id: `net_${i}_2`, type: 'LIST', name: 'Ports', x: 2, y: 4, content: ['Port 80   : OPEN', 'Port 443  : OPEN', 'Port 8080 : FILTERED'], color: 'bright-yellow', bold: false },
      { id: `net_${i}_3`, type: 'TEXT', name: 'Target', x: 2, y: 8, content: [`Target IP: 192.168.1.${100+i}`], color: 'bright-white', bold: true },
      { id: `net_${i}_4`, type: 'TEXT', name: 'Prompt', x: 2, y: 10, content: ['Scan complete. Press any key...'], color: 'slate-500', bold: false }
    ]
  });
}

for (let i = 1; i <= 10; i++) {
  FULL_LAYOUTS.push({
    name: `DB Manager ${i}`,
    components: [
      { id: `db_${i}_1`, type: 'HEADER', name: 'Header', x: 4, y: 1, content: [`─── 🗄️ DB ADMIN CONSOLE ${i} ───`], color: 'bright-yellow', bold: true },
      { id: `db_${i}_2`, type: 'CARD', name: 'Info', x: 4, y: 4, content: ['╔════════════════════════════╗', '║ Status: CONNECTED          ║', '║ Queries/sec: 452           ║', '╚════════════════════════════╝'], color: 'bright-green', bold: true },
      { id: `db_${i}_3`, type: 'MENU', name: 'Menu', x: 4, y: 9, content: ['1. Backup Database', '2. Restore Database', '3. Optimize Tables', '4. Exit'], color: 'bright-white', bold: false }
    ]
  });
}
