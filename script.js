import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';

mermaid.initialize({
  startOnLoad: true,
  theme: 'dark',
  securityLevel: 'strict',
  flowchart: {
    useMaxWidth: true,
    htmlLabels: true,
    nodeSpacing: 70,
    rankSpacing: 72,
    curve: 'basis'
  },
  themeVariables: {
    background: '#111317',
    mainBkg: '#171a1f',
    primaryColor: '#171a1f',
    primaryTextColor: '#f4f4f5',
    primaryBorderColor: 'rgba(255,255,255,.16)',
    lineColor: '#34d399',
    secondaryColor: '#0d0f12',
    tertiaryColor: '#09090b',
    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
    fontSize: '18px'
  }
});
